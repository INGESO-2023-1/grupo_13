import contacts from "../model/contactModel.js";
import Users from "../model/userModel.js";

const addContact = async (req, res, next) => {
    try {
        const { user, friend } = req.body;
        const existsUser = await Users.findOne({username: friend});
        if(!existsUser){
            return res.json({message: "User does not exist", status: false});
        }
        const contact1 = await contacts.create({
            user,
            friend,
        });
        const contact2 = await contacts.create({
            user: friend,
            friend: user,
        });
        return res.json({status: true, contact1, contact2});
    } catch (error) {
        next(error);
    }
};

const getContacts = async (req, res, next) => {
    try {
        const contact = await contacts.find({user: req.params.user}, {friend: 1, _id: 0});
        return res.json({status: true, contact});
    } catch (error) {
        next(error);
    }
};

export { getContacts, addContact };