import contacts_try from "../model/contactModel.js";
import Users from "../model/userModel.js";


const addContact = async (req, res, next) => {
    try {
        const { user, friend } = req.body;
        const existsUser_friend = await Users.findOne({username: friend});
        if (!existsUser_friend) {
            return res.json({message: "Friend does not exist", status: false});
        }
        const existsUser = await Users.findOne({username: user});
        if (!existsUser) {
            return res.json({message: "User does not exist", status: false});
        }
        const existsContact = await contacts_try.findOne({user: user});
        if (existsContact) {
            if (existsContact.friend.includes(friend)) {
                return res.json({message: "Friend already added", status: false});
            }
            await contacts_try.updateOne({user: user}, {$push: {friend: friend}});
            const existsContact_friend = await contacts_try.findOne({user: friend});
            if (!existsContact_friend) {
                const contact2 = await contacts_try.create({
                    user: friend,
                    friend: user,
                });
                return res.json({status: true, message: "user updated and friend created", user: user, contact2});
            } else {
                await contacts_try.updateOne({user: friend}, {$push: {friend: user}});
                return res.json({status: true, message: "User and friend updated", user: user, friend: friend});
            }
            
        }
        const contact1 = await contacts_try.create({
            user,
            friend,
        });
        const existsContact_friend = await contacts_try.findOne({user: friend});
        if (existsContact_friend) {
            await contacts_try.updateOne({user: friend}, {$push: {friend: user}});
            return res.json({status: true, message: "User created and friend updated", contact1, friend: friend});
        }
        const contact2 = await contacts_try.create({
            user: friend,
            friend: user,
        });
        return res.json({status: true, message: "User and friend created", contact1, contact2});
    } catch (error) {
        next(error);
    }
};

const getContacts_try = async (req, res, next) => {
    try {
        const contact = await contacts_try.find({user: req.params.user}, {friend: 1, _id: 0});
        return res.json({status: true, contact});
    } catch (error) {
        next(error);
    }
};

export { addContact, getContacts_try };