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







