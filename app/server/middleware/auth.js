import axios from "axios";
import { config } from "../config/default.js";

const isAuthorized = async (req, res, next) => {
    var _isAuth = false;
    if (req.headers && req.headers.authorization) {
        
        const token = req.headers.authorization.split(' ')[1];
        const isValid = await accessTokenInfo(token);

        if(isValid){
            _isAuth = true;
            next();
        }
    }
    if(!_isAuth && req.headers && req.headers.RefreshToken){
        const tokens = await refreshAccessToken(req.headers.RefreshToken);
        req.headers.authorization = 'Bearer ' + tokens.access_token;
        _isAuth = true;
        next();
    }
    if(!_isAuth && req.cookies && req.cookies.access_token || req.cookies.refresh_token){
        if(req.cookies.access_token){
            const isValid = await accessTokenInfo(req.cookies.access_token);
            if(isValid){
                req.headers.authorization = `Bearer ${req.cookies.access_token}`;
                _isAuth = true;
                next();
            }
        }
        if(!_isAuth && req.cookies.refresh_token){
            
            const tokens = await refreshAccessToken(req.cookies.refresh_token);
            
            req.headers.authorization = tokens.access_token;
            req.cookies.access_token = tokens.access_token;
            req.cookies.refresh_token = tokens.refresh_token;
            _isAuth = true;
            next();
        }
    }
    if(!_isAuth){
        return res.status(401).send({
            message: 'Unauthorized'
        })
    }
}
const refreshAccessToken = async (refreshToken) => {

    const url  = config.host + config.tokenUrl;
    const params = new URLSearchParams()
      params.append("client_id", config.clientId);
      params.append("client_secret", config.clientSecret);
      params.append("refresh_token", refreshToken);
      params.append("grant_type", 'refresh_token');
    let result = null;
    try {
        result = await axios.post(url, params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        }
        });
        
        return {
            access_token: result.data.access_token,
            refresh_token: result.data.refresh_token
        }
    }
    catch(error) {
        return res.send({
            message: error.message
        })
    }
}

const accessTokenInfo = async (accessToken) => {
    const url  = 'https://api.ilert.com/api/developers/oauth2/token_info';
    const params = new URLSearchParams()
    params.append("token", accessToken);

    let result = null;
    try {
        result = await axios.post(url, params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        }
        });

        if(result.data.active == true){
            return true;
        }
        else{
            return false;
        }
    }
    catch(error) {
        return false;
    }
}

export {isAuthorized};