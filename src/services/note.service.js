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

export const getAllNotes = async(body)=>{

    const data = await Note.findAll({where:{email:body.email}});
    if(!data){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:null,
            message:"Notes is not prasent !"
        }
    }
    else if(data.length==0){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:data,
            message:"Your notes is not exit !"
        }
    }
    else{
        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:"Get All Notes SuccessFully !"
        }
    }

}

export const getNoteById = async(noteId,body)=>{
    const data = await Note.findOne({where:{id:noteId,email:body.email}});
    if(!data){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:null,
            message:"Notes is not prasent !"
        }
    }
    else if(data.lengh==0){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:data,
               message:" your notes is not exit !"
        }
    }
    else{
        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:"Get Notes by Id SuccessFully !"
        }
    }

}

export const updateNote = async(noteId,body)=>{
    const data = await Note.findOne({where:{id:noteId,email:body.email}});

    if(!data){
        return{
            code:HttpStatus.INTERNAL_SERVER_ERROR,
            data:null,
            message:"Note is not present !"
        }
    }
    else if(data.lengh==0){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:data,
               message:"Your notes is not exit !"
        }
    }
    else{

        data.title=body.title
        data.description=body.description
        data.save()

        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:"Note Updated SuccessFully !"
        }

    }
   

}

export const updateNoteTrash = async(noteId,body)=>{
    const data = await Note.findOne({where:{id:noteId,email:body.email}});
    if(!data){
        return{
            code:HttpStatus.INTERNAL_SERVER_ERROR,
            data:null,
            message:"Note is not present !"
        }
    }
    else if(data.lengh==0){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:data,
               message:"Your notes is not exit !"
        }
    }
    else{

        data.isTrash=!data.isTrash
        data.save()

        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:"Note Updated SuccessFully !"
        }

    }
   

}

export const deleteNote = async(noteId)=>{
    const data = await Note.destroy({where:{id:noteId}});
    if(!data){
        return{
            code:HttpStatus.INTERNAL_SERVER_ERROR,
            data:null,
            message:"Note is not present !"
        }
    }
    else{
        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:"Note deleted SuccessFully !"
        }

    }
   

}