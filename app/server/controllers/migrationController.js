const pagerDuty = require('./pagerDutyControllers'); 
var axios = require("axios").default;

const migrateUsersAndTeams = async (req,res) => {
    if(req.headers && req.headers.pagerdutykey){
        let response = await pagerDuty.getListOfAllUsers(req.headers.pagerdutykey);
        if(response.data && response.status == 200){
            try {
                let result = await migrateAllUsers(response.data.users,req.headers.ilertapikey);
                
                if(result.errorUsers.length > 0 && result.users.length == 0){
                    res.status(500).send({
                        "message": "Error while migrating users",
                        "errorUsers": result.errorUsers
                    })
                }
                else if((result.errorUsers.length == 0 && result.users.length > 0) || (result.errorUsers.length > 0 && result.users.length > 0)){
                    try {
                        let response = await migrateAllTeams(result.teams,req.headers.ilertapikey,req.headers.pagerdutykey);
                    
                        if(response.errorTeams.length == 0 && response.teams.length > 0 && result.errorUsers.length == 0){
                            res.status(200).send({
                                "message": "Users and teams migrated successfully",
                                "errorTeams": errorTeams
                            })
                        }
                        else if(response.errorTeams.length == 0 && response.teams.length > 0 && result.errorUsers.length > 0){
                            res.status(200).send({
                                "message": "Users and teams migrated successfully but there are some errors for some users",
                                "errorUsers": result.errorUsers,
                            })
                        }
                        else if(response.errorTeams.length > 0 && response.teams.length > 0 && result.errorUsers.length == 0){
                            res.status(200).send({
                                "message": "Users and teams migrated successfully but there are some errors for some teams",
                                "errorTeams": errorTeams
                            })
                        }
                        else if(response.errorTeams.length > 0 && response.teams.length > 0 && result.errorUsers.length > 0){
                            res.status(200).send({
                                "message": "Users and teams migrated successfully but there are some errors for some users and teams",
                                "errorUsers": result.errorUsers,
                                "errorTeams": response.errorTeams
                            })
                        }
                        else{
                            res.status(500).send({
                                "message": "Error while migrating teams",
                                "errorUsers": result.errorUsers,
                                "errorTeams": response.errorTeams
                            })
                        }
                        
                    } catch (error) {
                        console.log(error);
                        res.status(500).send({
                            "message": "Error while migrating and teams" + error.message,
                        })
                    }
                    
                }
                else{
                    return res.status(500).send({
                        message: "Failed to migrate users"
                    });
                }
            } catch (error) {
                return res.status(500).send({
                    message: "Failed to migrate users: " + error.message
                });
            }
        }
        else{
            return res.status(500).send({
                message: "Error occured while fetching users from PagerDuty"});
        }

    }
    else{
        return res.status(400).send({message: "No PagerDuty key provided"});
    }
    
}
const migrateAllUsers = async (allUsers,ilertKey) => {
    var _users = [];
    var _errorUsers = [];
    var _teams = {};
    let promises = [];
    var response = {};
    for (const user of allUsers) {
        promises.push(axios.post("https://api.ilert.com/api/users",prepareUserData(user),{
            headers: {
                "Accept": "application/json",
                "Authorization": 'Bearer ' + ilertKey
            }
            }).then((response) => {
                if(user.teams.length > 0){
                    for (const team of user.teams) {
                        if(_teams[team.id]){
                            _teams[team.id].push({
                                "user":{
                                    "id": response.data.id,
                                },
                                "role": response.data.role
                            });
                        }
                        else{
                            _teams[team.id] = [{
                                    "user":{
                                        "id": response.data.id,
                                    },
                                    "role": response.data.role
                                }];
                        }
                    }
                }
                console.log("User migrated: " + user.name);
                _users.push(user);
            })
            .catch(err => {
                _errorUsers.push({
                    user : user,
                    errorDetail : err.response ? err.response.data.message : "",
                    errorStatus: err.response ? err.response.data.status : ""
                });
                console.log(err.response ? 'Failed to migrate user ' + user.name + ' => ' + err.response.data.message : 'Failed to migrate user ' + user.name);
            })
        );
        
    }
    await Promise.all(promises).then(() => {
        response = {
            users: _users,
            errorUsers: _errorUsers,
            teams: _teams
        }
    });
    return response;
    
}
const migrateAllTeams = async (teams, ilertKey,pagerdutykey) => {
    let errorTeams_ = [];
    let teams_ = [];
    let promises = [];
    var response = {};
    let teamUrl = "https://api.ilert.com/api/teams/";
    for (const teamId in teams) {

        let _response = await pagerDuty.getTeam(pagerdutykey, teamId);

        if (_response.status == 200) {
            promises.push(axios.post(teamUrl,
                {
                    "name": _response.data.team.name,
                    "visibility": "PUBLIC",
                    "members": teams[teamId]
                },
                {
                headers: {
                    "Accept": "application/json",
                    "Authorization": 'Bearer ' + ilertKey
                }
                }).then((response) => {
                    console.log("Team migrated: " + response.data.team.name);
                    teams_.push(response.data);
                }).catch((err) => {
                    errorTeams_.push({
                        team : _response.data.team,
                        errorDetail : err.response.data.message,
                        errorStatus: err.response.data.status
                    });
                    console.log('Team update failed for team '+ teamId + ' => ' + err.response.data.message);
                })
            );
        }
        else{
            console.log('Failed to get a team from PagerDuty: ' + teamId);
        }
            
    }
    await Promise.all(promises).then(() => {
        response = {
            teams: teams_,
            errorTeams: errorTeams_
        }
    });
    return response;
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

module.exports = {migrateUsersAndTeams};