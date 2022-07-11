const pagerDuty = require('./pagerDutyControllers'); 
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

const migrateAllUsers = async (req,res) => {
    if(req.headers && req.headers.pagerdutykey){
        let response = await pagerDuty.getListOfAllUsers(req.headers.pagerdutykey);
        if(response.status === 200){
            try {
                let url = "https://api.ilert.com/api/users?send-invitation=false";
                let promises  = [];
                let users = [];
                let errorUsers = [];
                for (const user of response.data.users) {

                    promises.push(
                        axios.post(url,prepareUserData(user),{
                            headers: {
                                "Accept": "application/json",
                                "Authorization": 'Bearer ' +req.headers.ilertapikey
                            }
                        }).then(() => {
                            users.push(user);
                        })
                        .catch(err => {
                            errorUsers.push({
                                user : user,
                                errorDetail : err.response.data.message,
                                errorStatus: err.response.data.status
                            });
                            console.log('Error for user: ' + user.email + ' => ' + err.response.data.message);
                        })
                    )
                }
                Promise.all(promises).then(() => {

                    if(errorUsers.length > 0 && users.length == 0){
                        res.status(500).send({
                            "message": "Error while migrating users",
                            "errorUsers": errorUsers
                        })
                    }
                    else if(errorUsers.length == 0 && users.length > 0){
                        res.status(200).send({
                            "message": "Users migrated successfully",
                            "users": users
                        })
                    }
                    else if(errorUsers.length > 0 && users.length > 0){
                        res.status(200).send({
                            "message": "Users migrated successfully but there were errors for some users",
                            "users": users,
                            "errorUsers": errorUsers
                        })
                    }
                    else{
                        return res.status(500).send({
                            message: "Failed to migrate users"});
                    }
                })
                
            } catch (error) {
                return res.send({
                    message: "Failed to migrate users: " + response.message});
            }
        }
        else{
            return res.send({
                message: "Failed to migrate users: " + response.message});
        }

    }
    else{
        return res.status(400).send({message: "No PagerDuty key provided"});
    }
    
}

const convertUserName = (userName) => {
    return userName.replaceAll('Ğ','g')
        .replaceAll('Ü','u')
        .replaceAll('Ş','s')
        .replaceAll('I','i')
        .replaceAll('İ','i')
        .replaceAll('Ö','o')
        .replaceAll('Ç','c')
        .replaceAll('ğ','g')
 		.replaceAll('ü','u')
        .replaceAll('ş','s')
        .replaceAll('ı','i')
        .replaceAll('ö','o')
        .replaceAll('ç','c');
}
const prepareUserData = (user) => {
    let user_name = user.name.split(' ');
    let username,firstName,lastName;
    if(user_name.length > 1){
        username = convertUserName(user_name[0] + '_' + user_name[user_name.length - 1]).toLowerCase();
        firstName = user_name[0];
        lastName = user_name[user_name.length - 1];
    }
    else{
        username = convertUserName(user_name[0]).toLowerCase();
        firstName = user_name[0];
        lastName = user_name[0];
    }
    return {
        "username": username,
        "firstName": firstName,
        "lastName": lastName,
        "email": user.email,
    }
}
module.exports = {getCurrentUser,migrateAllUsers};