import express from 'express'
import {getPosts} from '../controllers/getPosts'
const router = express.Router();

router.get('/', getPosts);

export default router;