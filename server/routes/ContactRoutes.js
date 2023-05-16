import { getContacts, addContact } from "../controllers/ContactController.js";
import { Router } from "express";

const router = Router();

router.post("/addcontact", addContact);
router.get("/getcontacts/:user", getContacts);

export default router;