import User  from "../model/userModel.js";
import bcrypt from "bcrypt";

// registra a un usuario en la base de datos
const register = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username: username });
        if(usernameCheck){
            return res.json({message: "Username already exists", status: false});  
        }
        const emailCheck = await User.findOne({ email: email });
        if(emailCheck){
            return res.json({message: "Email already exists", status: false});  
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({status: true, user});
    } catch (error) {
        next(error);
    }
};

//verifica si el usuario esta en la base de datos
const login = async (req, res, next) => {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if(!user){
            return res.json({message: "incorrect username or password", status: false});  
        }
        const isPassVALID = await bcrypt.compare(password, user.password);
        if(!isPassVALID){
            return res.json({message: "incorrect username or password", status: false});
        }
        delete user.password;
        return res.json({status: true, user});
    } catch (error) {
        next(error);
    }
};

//obtiene todos los usuarios de la base de datos
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email", "username", "avatarImage",  "_id"
        ]);
        return res.json(users)
    } catch (error) {
        next(error);
    }
};

//setea un avatar para un usuario dado 
const setAvatar = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (ex) {
      next(ex);
    }
  };

//desloguea al usuario de la app
const logOut = (req, res, next) => {
    try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
};

export { register, login, getAllUsers, setAvatar, logOut };