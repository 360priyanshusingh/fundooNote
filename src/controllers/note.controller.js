import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';
import { trace } from '@hapi/joi';


export const createNote= async (req,res)=>{
    
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
