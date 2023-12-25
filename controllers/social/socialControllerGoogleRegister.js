import UserModel from "../../models/User.js";
import { getUserInfo, getAccessTokenFromGoogle } from "../../helpers/accessTokenGmail.js";
import { createToken } from "../../helpers/jwtHelper.js";
import compileEmailTemplate from "../../helpers/compile-email-template.js";
import sendMail from "../../libs/mail.js";

export async function registerAccountByGoogle(req, res) {
  const { code } = req.body;
  if (!code) {
    return res.send({ status: "failed", message: "no code token" });
  }
  const response = await getAccessTokenFromGoogle(code, "/auth/signup/google");
  if (response.data.error) {
    return res.send({ status: "failed", message: `${response.data.error_description}` });
  }
  const { access_token, token_type } = response.data;
  const userInfo = await getUserInfo(`${token_type} ${access_token}`);
  const { id, given_name: firstName, family_name: lastName, email, picture, } = userInfo.data;

  const user = await UserModel.findOne({ providerId: id });
  if (user) { return res.send({ status: "failed", message: "This account is already associated with The body doctor"}); }

  const existEmail = await UserModel.findOne({ email });
  if (existEmail) {
    if ( existEmail?.provider === "google" && parseInt(existEmail?.providerId, 10) === Number(id) ) {
      return res.send({ status: "failed", message: "This account is already associated with The body doctor"});
    }
  }
  try {
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      providerId: id,
      provider: "google",
      picture: picture,
    });

    await newUser.save();
    const savedUser = await UserModel.findOne({ email });
    //Generate JWT Token
    const token = createToken(savedUser, false, "1d");

    const template = await compileEmailTemplate({
      fileName: "googleRegister.mjml",
      data: {
        firstName,
      },
    });
    if (savedUser._id) {
      try { 
        await sendMail( email, "Your Account on The body doctor is Created Successfully", template );
        res.status(201).send({ status: "success", message: "User created successfully", token: token, });
      } catch (error) {
        res.send({ status: "failed", message: "Failed to send Create User email. Please try again", });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
}
