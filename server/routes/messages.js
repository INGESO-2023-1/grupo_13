import {addMessage, getMessages} from "../controllers/messageController.js";
import { Router } from "express";

const router = Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);
export default router;
