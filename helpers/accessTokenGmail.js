import url from 'url';
import AxiosInstance from "../libs/axios-instance.js";

export async function getAccessTokenFromGoogle(code, endPoint) {
    const path = 'https://oauth2.googleapis.com/token';
    const data = {
      client_id: process.env.GOOGLE_CLIENT_KEY,
      client_secret: process.env.GOOGLE_SECRET_KEY,
      code,
      redirect_uri: `${process.env.FRONTEND_URL}${endPoint}`,
      grant_type: 'authorization_code',
    };
    const params = new url.URLSearchParams(data);
  
    return AxiosInstance.post(path, params.toString(), {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
  }
  
  export async function getUserInfo(token){
    const path = 'https://www.googleapis.com/userinfo/v2/me';
    return AxiosInstance.get(path, {
      headers: {
        Authorization: token,
      },
    });
  }