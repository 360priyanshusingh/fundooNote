import { where } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
const User = require('../models/user')(sequelize, DataTypes);
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import bcrypt  from 'bcrypt' ;

import dotenv from 'dotenv'
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
    
    return{
      code:HttpStatus.ACCEPTED,
      data:otp,
      message:"Otp Generated !"
    }
    
  }
}




