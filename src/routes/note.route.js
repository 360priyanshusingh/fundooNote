
import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { cacheDb ,cacheNoteById} from '../middlewares/redis.middleware';

import {newNoteValidator} from '../validators/note.validator'



const express = require('express');


const router= express.Router()


router.post('/createNote',newNoteValidator,userAuth,noteController.createNote)

router.get('/getAllNotes',userAuth,cacheDb,noteController.getAllNotes)

router.get('/getNoteById/:id',userAuth,cacheNoteById,noteController.getNoteById)

router.put('/updateNote/:id',newNoteValidator,userAuth,noteController.updateNote)

router.put('/updateNoteTrash/:id',userAuth,noteController.updateNoteTrash)

router.put('/updateNoteArchive/:id',userAuth,noteController.updateNoteArchive)

router.put('/updateNoteColour/:id',userAuth,noteController.updateNoteColour)

router.delete('/deleteNote/:id',userAuth,noteController.deleteNote)


module.exports=router;