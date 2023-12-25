import UserModel from "../../models/User.js";
import { createToken, } from "../../helpers/jwtHelper.js";
import { hashPassword, } from "../../helpers/hashPassword.js";

class UserController {
  static userRegistration = async (req, res) => {
    const { firstName,lastName,userName,email,password,confirmPassword,tc, } = req.body;
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !email ||
      !password ||
      !confirmPassword ||
      !tc
    )
      return res.send({ status: "failed", message: "All fields are required" });

    const user = await UserModel.findOne({ email });
    const isUserName = await UserModel.findOne({ userName });

    if (user)
      return res.send({ status: "failed", message: "Email already exists" });
    if (isUserName)
      return res.send({ status: "failed", message: "UserName already exists" });

    if (password !== confirmPassword)
      return res.send({
        status: "failed",
        message: "Password and Confirm Password doesn't match",
      });

      try {
        const hashedPassword = await hashPassword(password);
        const newUser = new UserModel({
          firstName,
          lastName,
          userName,
          email,
          password: hashedPassword,
          tc,
        });
        await newUser.save();
        const savedUser = await UserModel.findOne({ email });
        //Generate JWT Token
        const token = createToken(savedUser, false ,'1d');

        res.status(201).send({ status: "success", message: "User created successfully", token: token, });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
}

export default UserController;
