import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';
import { trace } from '@hapi/joi';


export const createNote= async (req,res)=>{
    // console.log(req.body)
    try {
        const data= await NoteService.createNote(req.body);
        res.status(data.code).json({
           code:data.code,
           data:data.data,
           message:data.message,
        });
    
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code:HttpStatus.INTERNAL_SERVER_ERROR,
          data:[],
          message:error
        })
    
      }

}

export const getAllNotes= async (req,res)=>{
    
    try {
        const data= await NoteService.getAllNotes(req.body);
        res.status(data.code).json({
           code:data.code,
           data:data.data,
           message:data.message,
        });
    
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code:HttpStatus.INTERNAL_SERVER_ERROR,
          data:[],
          message:error
        })
    
      }

}

export const getNoteById= async (req,res)=>{
    
    try {
        const data= await NoteService.getNoteById(req.params.id,req.body);
        res.status(data.code).json({
           code:data.code,
           data:data.data,
           message:data.message,
        });
    
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code:HttpStatus.INTERNAL_SERVER_ERROR,
          data:[],
          message:error
        })
    
      }

}

export const updateNoteTrash= async (req,res)=>{
    
    try {
        const data= await NoteService.updateNoteTrash(req.params.id,req.body);
        res.status(data.code).json({
           code:data.code,
           data:data.data,
           message:data.message,
        });
    
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code:HttpStatus.INTERNAL_SERVER_ERROR,
          data:[],
          message:error
        })
    
      }

}
export const updateNoteArchive= async (req,res)=>{
    
    try {
        const data= await NoteService.updateNoteArchive(req.params.id,req.body);
        res.status(data.code).json({
           code:data.code,
           data:data.data,
           message:data.message,
        });
    
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code:HttpStatus.INTERNAL_SERVER_ERROR,
          data:[],
          message:error
        })
    
      }

}
export const updateNoteColour= async (req,res)=>{
    
    try {
        const data= await NoteService.updateNoteColour(req.params.id,req.body);
        res.status(data.code).json({
           code:data.code,
           data:data.data,
           message:data.message,
        });
    
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code:HttpStatus.INTERNAL_SERVER_ERROR,
          data:[],
          message:error
        })
    
      }

}

export const updateNote= async (req,res,next)=>{
    
    try {
        const data= await NoteService.updateNote(req.params.id,req.body);
        res.status(data.code).json({
           code:data.code,
           data:data.data,
           message:data.message,
        });
    
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code:HttpStatus.INTERNAL_SERVER_ERROR,
          data:[],
          message:error
        })
    
      }

}
export const deleteNote= async (req,res)=>{
    
    try {
        const data= await NoteService.deleteNote(req.params.id,req.body);
        res.status(data.code).json({
           code:data.code,
           data:data.data,
           message:data.message,
        });
    
      } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          code:HttpStatus.INTERNAL_SERVER_ERROR,
          data:[],
          message:error
        })
    
      }

}


