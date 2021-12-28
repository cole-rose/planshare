import express from 'express'
import {getSignUps} from '../controllers/signUps'
import {getUser} from '../controllers/login'
const router = express.Router();

router.post('/signup', getSignUps);
router.post('/login', getUser);
export default router;