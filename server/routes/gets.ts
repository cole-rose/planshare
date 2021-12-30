import express from 'express'
import {getUser} from '../controllers/login'
const router = express.Router();

router.get('/login', getUser);
export default router;