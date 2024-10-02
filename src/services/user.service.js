import { where } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
const sendEmail = require('../utils/user.util'); 

import bcrypt  from 'bcrypt' ;

import dotenv from 'dotenv'
import { connectRabbitMqQueue } from '../config/rabbitMq';
dotenv.config()
let otp='';

                         

export const newUser = async (body) => {
  const data = await User.findOne({where :{email:body.email} }) ;

  if(data){
    return {
      code:HttpStatus.BAD_REQUEST,
      data:null,
      message:"User Already Present !"
    }
  }

 else{
  
  const hashedPassword= await bcrypt.hash(body.password,4);
  body.password=hashedPassword;
  const user = await User.create(body);

 

  const emailOptions = {
    to: body.email,  
    subject: 'Welcome to Fundoo App!',
    text: `Thank you for registering with Fundoo App. I am Priyanshu Sisodiya i am testing email sending api. if you recevied the mail than please reply` ,
    html: `<b>Thank you for registering with Fundoo App. I am Priyanshu Sisodiya i am testing email sending api. if you recevied the mail than please reply </b>`,  // HTML version
  };

  const emailResult = await sendEmail(emailOptions);
  // console.log("new Servise called ",emailResult,body)
  if (emailResult.success) {
    console.log('Welcome email sent to:', user.email);
  } else {
    console.error('Failed to send email:', emailResult.error);
    return {
      code:HttpStatus.BAD_REQUEST,
      data:emailResult.error,
      message:"Registration mail not send to you !"
    }
  }
  
  const rabbitMqMessage= await connectRabbitMqQueue(emailOptions)
  if(rabbitMqMessage.success){
  console.log('massage sent By the rabbitMq SuccesFully');
  }
  else{
    console.error('Falied to massage sent By the rabbitMq ');
  }
 
  return {
    code:HttpStatus.ACCEPTED,
    data:user,
    message:"User Succesfully Created !"
  }

 }

};

export const loginUser = async (body) => {

  const data = await User.findOne({ where: { email: body.email } });
  if(data===null){
    return {
      code: HttpStatus.BAD_REQUEST, 
      data: null,
      message: 'User is not registered !',
    };

  }
   const passwordMatch = await bcrypt.compare(body.password, data.password); 

   if(!passwordMatch){
     return{
        code:HttpStatus.BAD_REQUEST,
        data:null,
        message:'User Password Is Wrong !',
     };
  }

  const token = jwt.sign({
    userId: data.id,
    email:data.email,
  }, process.env.JWT_SECRET);


  return{
    code:HttpStatus.CREATED,
    data:token,
    message:'User successfully Login',
 };
  

};

export const forgetFassword= async(body)=>{
  const data = await User.findOne({where:{email:body.email}})

  if(!data){
    return{
      code:HttpStatus.BAD_REQUEST,
      data:null,
      message:"User not registered !"
    }
  }
  else{

    for(let i=0;i<5;i++){
      otp+=Math.floor(Math.random()*10)
    }

    const emailOptions = {
      to: body.email,  
      subject: 'Welcome to Fundoo App!',
      html: `<h3>Thank you for registering with Fundoo App. Your reset password process started . Please do Not share the otp your OTP : ${otp} </h3>`,  // HTML version
    };
  
    const emailResult = await sendEmail(emailOptions);
    // console.log("new Servise called ",emailResult,body)
    if (emailResult.success) {
      console.log('Welcome email sent to:', body.email);

      return{
        code:HttpStatus.ACCEPTED,
        data:null,
        message:"Otp Generated Please ckeck your mail !"
      }
    } else {
      console.error('Failed to send email:', emailResult.error);
      return {
        code:HttpStatus.BAD_REQUEST,
        data:emailResult.error,
        message:"Registration mail not send to you !"
      }
    }

  }
}

export const resetPassword= async(email,body)=>{
  const data=await User.findOne({where:{email:email}});
 //  console.log(data);
 console.log(body)
 console.log("Heloo This line for OTP",otp)
  if(!data){
   return{
     code:HttpStatus.BAD_REQUEST,
     data:null,
     message:"User not registered !"
   }
 }
  else if(otp!==body.otp){
   return{
     code:HttpStatus.BAD_REQUEST,
     data:null,
     message:"Otp is wrong !"
   }
 }
 else{
  const hashedPassword= await bcrypt.hash(body.newPassword,4);
  data.password=hashedPassword;
  data.save()
  otp='';

   return{
     code:HttpStatus.ACCEPTED,
     data:data,
     message:"Your Password Succesfully Reset !"
   }
   
 }

}



