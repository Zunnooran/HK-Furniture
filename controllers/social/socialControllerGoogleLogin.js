import UserModel from "../../models/User.js";
import { getUserInfo, getAccessTokenFromGoogle } from "../../helpers/accessTokenGmail.js";
import { createToken } from "../../helpers/jwtHelper.js";

export async function googleLogin(req, res){
    const { code } = req.body
    if(!code) {
      return res.send({status: "failed", message: "no code token"});
    }
    const response = await getAccessTokenFromGoogle(code, '/auth/signin/google');
    if (response.data.error) {
        return res.send({status: "failed", message: `${response.data.error_description}`});
    }
    const { access_token, token_type } = response.data;
    const userInfo = await getUserInfo(`${token_type} ${access_token}`);
    const { id, email } = userInfo.data;
  
    const user = await UserModel.findOne({ providerId: id});
    const token = createToken(user, false ,'1d');
    if (user) return res.send({status: 'success', message: "Login Success", token: token });
  
    const userByEmail = await UserModel.findOne({ email });
    if (userByEmail) {
      if (userByEmail?.provider === "google" && parseInt(userByEmail?.providerId, 10) === Number(id)) {
        if (userByEmail) return res.send({status: 'success', message: "Login Success", token: token });
    }
    }
    if (!user || !userByEmail) {
      return res.send({status: "failed", message: "This account isn't associated with The body doctor"});
    }
  };