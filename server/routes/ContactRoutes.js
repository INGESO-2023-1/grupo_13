import { addContact, getContacts_try } from "../controllers/ContactController.js";
import { Router } from "express";

const router = Router();

router.post("/addcontact", addContact);
router.get("/getcontacts/:user", getContacts_try);

export default router;