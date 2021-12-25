import express from 'express'
import {getSignUps} from '../controllers/signUps'
const router = express.Router();

router.post('/signup', getSignUps);

export default router;