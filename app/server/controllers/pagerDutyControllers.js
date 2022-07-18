var axios = require("axios").default;

const getDataFromPagerDuty = async (token,endpoint) => {
    try {
        let result = await axios.get(endpoint, {
        headers: { 
            'Accept': 'application/vnd.pagerduty+json;version=2', 
            'Content-Type': 'application/json', 
            'Authorization': 'Token token='+ token
          }
        });
        return result;
        
    } catch (error) {
        return error
    }
}

const getTeamById = async (token,teamID) => {

    try {
        let result = await axios.get(`https://api.pagerduty.com/teams/${teamID}`, {
        headers: { 
            'Accept': 'application/vnd.pagerduty+json;version=2', 
            'Content-Type': 'application/json', 
            'Authorization': 'Token token='+ token
          }
        });
        return result;
        
    } catch (error) {
        return error
    }
}
const getScheduleById = async (token,scheduleID) => {

    try {
        let result = await axios.get(`https://api.pagerduty.com/schedules/${scheduleID}`, {
        headers: { 
            'Accept': 'application/vnd.pagerduty+json;version=2', 
            'Content-Type': 'application/json', 
            'Authorization': 'Token token='+ token
          }
        });
        return result;
        
    } catch (error) {
        return error;
    }
}
const getListOfMembersInTeams = async (token,teamID) => {

    try {
        let userResult = await axios.get(`https://api.pagerduty.com/teams/${teamID}/members`, {
        headers: { 
            'Accept': 'application/vnd.pagerduty+json;version=2', 
            'Content-Type': 'application/json', 
            'Authorization': 'Token token='+ token
          }
        });
        return userResult;
        
    } catch (error) {
        return error
    }
}



module.exports = {getDataFromPagerDuty,getListOfMembersInTeams,getTeamById};
