var axios = require("axios").default;
const getCurrentUser = async (req,res) => {

    const token = req.headers.authorization.split(' ')[1];
    const userUrl = "https://api.ilert.com/api/users/current";
    let userResult = null;
    try {
        userResult = await axios.get(userUrl, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        });
    } catch(error) {

        if(error.response) {
            return res.end("Failed to fetch current user: " + error.message + ", " + JSON.stringify(error.response.data));
        }

        return res.end("Failed to fetch current user: " + error.message);
    }

    res.send(userResult.data);
}
module.exports = {getCurrentUser};