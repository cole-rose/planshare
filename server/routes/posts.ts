import express from 'express'
import {getSignUps} from '../controllers/signUps'
const router = express.Router();

router.post('/', getSignUps);

export default router;