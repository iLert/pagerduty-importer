const { debug } = require("console");
const config = require('../config/default');
var axios = require("axios").default;

const authorize = (req,res) => {
    const url = config.host + config.authorizeUrl;
    const queryParams = new URLSearchParams({
        client_id: config.clientId,
        response_type: 'code',
        redirect_uri: config.redirectUri,
        scope: 'profile source:w',
        state: config.state
    });
    
    res.redirect(url + "?" + queryParams.toString());
}

const authorize_result = async (req,res) => {
    const error = req.query.error;
    if(error) {
        return res.end("Failed to authorize: " + error + ", please try again");
    }

    const code = req.query.code;
    if(!code) {
        return res.end("Failed to retrieve 'code', please try again");
    }
    
    const url  = config.host + config.tokenUrl;
    const params = new URLSearchParams()
    params.append("client_id", config.clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("client_secret", config.clientSecret);

    let result = null;
    try {
    result = await axios.post(url, params, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        }
    });
    }
    catch(error) {
        return res.status(500).send({
            message: error.message
        })
    }

    res.cookie('access_token', result.data.access_token, {
        expires: new Date(Date.now() + 3600 * 1000)
    });
    res.cookie('refresh_token', result.data.refresh_token, {
        expires: new Date(Date.now() + 3600 * 1000 * 10)
    });

    res.send(result.data);
}

module.exports = {authorize,authorize_result}