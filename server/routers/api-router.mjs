import express from "express";
import {
    addContact,
    addHistoryCall,
    deleteContact,
    deleteHistoryCall,
    getContact,
    getHistoryCall
} from "../controllers/index.mjs";

const router = express.Router();

router.get('/history-call', getHistoryCall);
router.post('/history-call', addHistoryCall);
router.delete('/history-call/:id', deleteHistoryCall);

router.get('/contact', getContact);
router.post('/contact', addContact);
router.delete('/contact/:id', deleteContact);

export { router as apiRouter };