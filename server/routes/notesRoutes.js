import express from 'express';
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/notesControllers.js';
import { isLoggedIn } from '../middleware/auth.js';

const router=express.Router();

router.post('/notes', isLoggedIn, createNote);
router.get('/notes', isLoggedIn, getNotes);
router.put('/notes/:id', isLoggedIn, updateNote);
router.delete('/notes/:id', isLoggedIn, deleteNote);


export default router;

