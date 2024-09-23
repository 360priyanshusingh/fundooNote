import * as noteController from '../controllers/note.controller';

import {newNoteValidator} from '../validators/note.validator'

const express = require('express');


const router= express.Router()


router.post('/createNote',newNoteValidator,noteController.createNote)

router.get('/getAllNotes',noteController.getAllNotes)

router.get('/getNoteById/:id',noteController.getNoteById)

router.put('/updateNote/:id',noteController.updateNote)

router.delete('/deleteNote/:id',noteController.deleteNote)


module.exports=router;