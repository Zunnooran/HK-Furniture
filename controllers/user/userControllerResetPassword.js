import UserModel from "../../models/User.js";
import { createToken, verifyToken } from "../../helpers/jwtHelper.js";
import { hashPassword, passwordCompare } from "../../helpers/hashPassword.js";
import compileEmailTemplate from "../../helpers/compile-email-template.js";
import sendMail from "../../libs/mail.js";

class ResetPassword {
    static sendUserPasswordResetEmail = async (req, res) => {
        const { email } = req.body;
        if(!email) return res.send({status: "failed", message: "Email Field is required"});
    
        const user = await UserModel.findOne({email});
        if(!user) return res.send({status: "failed", message: "Invalid Email"});
     
        const token = createToken(user, true , '15m');
        const link = `${process.env.FRONTEND_URL}/api/user/reset/${user._id}/${token}`;
        const template = await compileEmailTemplate({
            fileName: 'forgotPassword.mjml',
            data: {
              name: user?.firstName,
              email,
              url: link,
            },
          });
        try {
            await sendMail(email, 'Reset Password from MailAvail', template);
            // console.log(link);
            res.send({ status: "success", 
            message: "Password Reset Email sent successfully...Please check your Email"});
        } catch (error) {
            console.log(error);
            res.send({ status: "failed", 
            message: "Failed to send reset email. Please try again"});
        }
    };
    
    static passwordReset = async (req, res) => {
        const { password, confirmPassword } = req.body;
        const { id, token } = req.params;
        if(!id || !token) return res.send({status: "failed", message:"Token or ID is missing"});
        if(!confirmPassword || !password) return res.send({status: "failed", message:"All Fields are required"});
        if(password !== confirmPassword) return res.send({status: "failed", message:"New Password and Confirm Password does'nt match"});
    
        const user = await UserModel.findById(id);
        if(!user) return res.send({status: "failed", message:"User does not exist"});
        const isPasswordSame = await passwordCompare(password, user.password);
          if (isPasswordSame) 
            return res.send({ status: "failed", message: "New password cannot be the same as the old password",});
            
        try {
            verifyToken(token, user);
            const hashedPassword = await hashPassword(password);

            await UserModel.findByIdAndUpdate(user._id, { $set: { password: hashedPassword }});
            res.send({status: 'success', message:"Password reset successfully"});
        } catch (error) {
            console.log(error);
            res.send({status: "failed", message:"Invalid token"});
        }
    };
}

export default ResetPassword;