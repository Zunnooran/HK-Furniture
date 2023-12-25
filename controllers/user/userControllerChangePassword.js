import UserModel from "../../models/User.js";
import { hashPassword, passwordCompare } from "../../helpers/hashPassword.js";

export const changePassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    if (password && confirmPassword) {
      if (password !== confirmPassword)
        return res.send({ status: "failed", message: "Password and confirm password did'nt match",});
        
      const isPasswordSame = await passwordCompare(password, req.user.password);
      if (isPasswordSame) 
        return res.send({ status: "failed", message: "New password cannot be the same as the old password",});

      const hashedPassword = await hashPassword(password);

      await UserModel.findByIdAndUpdate(req.user._id, { $set: {password: hashedPassword}});

      res.send({ status: "success", message: "Password Changed Successfully", });
    } else {
      res.send({ status: "failed", message: "All fields are required", });
    }
  };