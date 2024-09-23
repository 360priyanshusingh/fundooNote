import { where } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
const Note = require('../models/note')(sequelize, DataTypes);
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import bcrypt  from 'bcrypt' ;

import dotenv from 'dotenv'
dotenv.config()

export const createNote = async(body)=>{
    const data = await Note.create(body);
    if(data){
        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:"Note SuccessFully Created !"
        }
    }
    else{
        return{
            code:HttpStatus.BAD_REQUEST,
            data:null,
            message:"Note Not Created !"
        }

    }

}