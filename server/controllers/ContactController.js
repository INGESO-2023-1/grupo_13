import contacts from "../model/contactModel.js";
import Users from "../model/userModel.js";


//TODO: fix addContact and getContacts, the first one is not working and the second one is not returning the correct data
//     in addContact, the first if is not working, the second one is working but the update is not working
//     in getContacts, the query is not working, returns an empty array
const addContact = async (req, res, next) => {
    try {
        const { user, friend } = req.body;
        const existsUser = await Users.findOne({username: friend});
        if (!existsUser) {
            return res.json({message: "User does not exist", status: false});
        }
        const existsContact = await contacts.findOne({user: user, friend: friend});
        if (existsContact) {
            console.log(existsContact)
            if (existsContact.friend === friend) {
                return res.json({message: "Friend already added", status: false});
            }
            await contacts.updateOne({user: user}, {$push: {friend: friend}});
            return res.json({status: true, message: "User added", user: user, friend: friend});
        }
        console.log("hola2")
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