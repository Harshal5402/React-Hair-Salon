import express from 'express'
import { getAccountInfo, updateAccountInfo } from '../controllers/accountController.js';

const accountRouter = express.Router()

accountRouter.get('/getaccount', getAccountInfo);
accountRouter.put('/updateaccount', updateAccountInfo);

export default accountRouter;