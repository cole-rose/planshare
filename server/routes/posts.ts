import express from 'express'
import {getSignUps} from '../controllers/signUps'
const router = express.Router();

router.post('/signup', getSignUps);
router.post("v1/auth/google", getGoogleUser);
export default router;