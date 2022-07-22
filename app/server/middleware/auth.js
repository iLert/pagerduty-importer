import axios from "axios";
import { config } from "../config/default.js";

const isAuthorized = async (req, res, next) => {

    const accessToken = req.headers?.authorization?.split(" ")[1] || req.cookies?.ilert_access_token;

    if(!accessToken){
        return res.status(401).send({
            message: "Unauthorized"
        })
    }

    const url  = "https://api.ilert.com/api/developers/oauth2/token_info";
    const params = new URLSearchParams()
    params.append("token", accessToken);

    try {
        let result = await axios.post(url, params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        }
        });

        if(result.data.active == true){
            return next();
        }
        console.log("Token is not active");
    }
    catch(error) {
        console.log("Error while getting access token info =>" + error);
        return res.status(500).send({
            "message": error
        })
    }
    const refreshToken = req.headers?.refresh_token || req.cookies?.ilert_refresh_token;

    if(!refreshToken){
        return res.status(401).send({
            message: "Unauthorized"
        })
    }

    const newTokens = await refreshAccessToken(refreshToken);

    if(newTokens.error){
        return res.status(500).send({
            "message": newTokens.error
        })
    }

    req.headers.ilert_tokens = {
        accessToken: newTokens.access_token,
        refreshToken: newTokens.refresh_token
    }

    res.cookie("ilert_access_token", newTokens.access_token, {
        expires: new Date(Date.now() + 3600 * 1000 * 24) // 1 day
    });
    res.cookie("ilert_refresh_token", newTokens.refresh_token, {
        expires: new Date(Date.now() + 3600 * 1000 * 24 * 365) // 1 year
    });

    return next();
}

const refreshAccessToken = async (refreshToken) => {

    const url  = config.host + config.tokenUrl;
    const params = new URLSearchParams()
      params.append("client_id", config.clientId);
      params.append("client_secret", config.clientSecret);
      params.append("refresh_token", refreshToken);
      params.append("grant_type", "refresh_token");
    try {
        let result = await axios.post(url, params, {
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
        console.log("Error while refreshing access token =>" + error);
        return {
            error: "Error while refreshing access token"
        }
    }
}

export {isAuthorized};