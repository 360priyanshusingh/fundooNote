import { where } from 'sequelize';
import sequelize, { DataTypes } from '../config/database';
const Note = require('../models/note')(sequelize, DataTypes);
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

import bcrypt  from 'bcrypt' ;

import dotenv from 'dotenv'
import { client } from '../config/redisDb';
dotenv.config()

export const createNote = async(body)=>{
    const data = await Note.create(body);
    if(data){

        await client.del('note_cache')
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
    const data = await Note.findAll({where:{email:body.email,isTrash:false}});
   
    if(!data){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:null,
            message:"Notes is not present !"
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
   
        await client.set('note_cache',JSON.stringify(data))
        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:"Get All Notes SuccessFully !"
        }
    }

}

export const getNoteById = async(noteId,body)=>{
    const data = await Note.findOne({where:{id:noteId,email:body.email,isTrash:false}});
    if(!data){
        return{
            code:HttpStatus.BAD_REQUEST,
            data:null,
            message:"Notes is not exit!"
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
        await client.set('note_cache',JSON.stringify(data))
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
        await client.del('note_cache')
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
        await client.del('note_cache')
        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:"Note Trash Updated SuccessFully !"
        }

    }
   

}

export const updateNoteArchive = async(noteId,body)=>{
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

        data.isArchive=!data.isArchive
        data.save()
        await client.del('note_cache')
        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:"Note Archive Updated SuccessFully !"
        }

    }
   

}

export const updateNoteColour = async(noteId,body)=>{
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
               message:"Your notes is not exit your are not right person !"
        }
    }
    else{

        data.colour=body.colour;
        data.save()
        await client.del('note_cache')

        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:"Note Color Updated SuccessFully !"
        }

    }
   

}

export const deleteNote = async(noteId,body)=>{

    const data = await Note.findOne({where:{id:noteId,email:body.email}});
    if(!data){
        return{
            code:HttpStatus.INTERNAL_SERVER_ERROR,
            data:null,
            message:"Note is not present !"
        }
    } 
    else if(!data.isTrash){
        data.isTrash=!data.isTrash
        data.save()
        await client.del('note_cache')
        return{
            code:HttpStatus.ACCEPTED,
            data:data,
            message:"Note Trash Updated SuccessFully !"
        }

    }
    else{
        const newdata = await Note.destroy({ where: { id: noteId } });
        if (newdata) {
            await client.del('note_cache')
            return {
                code: HttpStatus.OK,
                data: newdata, 
                message: "Note deleted successfully!"
            };
        } else {
            return {
                code: HttpStatus.NOT_FOUND,
                data:null,
                message: "Note not found or already deleted!"
            };
        }


    }
   

}