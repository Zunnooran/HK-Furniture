import UserModel from "../../models/User.js";
import { createToken } from "../../helpers/jwtHelper.js";
import { passwordCompare } from "../../helpers/hashPassword.js";

export const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.send({ status: "failed", message: "All fields are required", });

      const user = await UserModel.findOne({ email: email });
      if (!user)
        return res.send({ status: "failed", message: "Invalid Email or Password", });
      const isMatch = await passwordCompare(password, user?.password);
      if (!isMatch)
        return res.send({ status: "failed", message: "Invalid Email or Password", });
      //Generate JWT Token
      const token = createToken(user, false ,'1d');

      res.send({ status: "success", message: "Login Success", token: token });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };