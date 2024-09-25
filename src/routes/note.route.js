import * as noteController from '../controllers/note.controller';
import { userAuth } from '../middlewares/auth.middleware';

import {newNoteValidator} from '../validators/note.validator'



const express = require('express');


const router= express.Router()


router.post('/createNote',newNoteValidator,userAuth,noteController.createNote)

router.get('/getAllNotes',userAuth,noteController.getAllNotes)

router.get('/getNoteById/:id',userAuth,noteController.getNoteById)

router.put('/updateNote/:id',newNoteValidator,userAuth,noteController.updateNote)

router.put('/updateNoteTrash/:id',userAuth,noteController.updateNoteTrash)

router.put('/updateNoteArchive/:id',userAuth,noteController.updateNoteArchive)

router.delete('/deleteNote/:id',noteController.deleteNote)


module.exports=router;