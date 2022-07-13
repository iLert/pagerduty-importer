var axios = require("axios").default;

const getListOfAllUsers = async (token) => {

    try {
        let result = await axios.get('https://api.pagerduty.com/users', {
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
const getListOfTeams = async (token) => {

    try {
        let result = await axios.get('https://api.pagerduty.com/teams', {
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
const getTeam = async (token,teamID) => {

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
const getListOfEscalationPolicies = async (token) => {

    try {
        let userResult = await axios.get('https://api.pagerduty.com/escalation_policies', {
        headers: { 
            'Accept': 'application/vnd.pagerduty+json;version=2', 
            'Content-Type': 'application/json', 
            'Authorization': 'Token token='+ token
          }
        });
        return userResult.data;
        
    } catch (error) {
        return error
    }
}
const getListOfOnCallSchedules = async (token) => {

    try {
        let userResult = await axios.get('https://api.pagerduty.com/oncalls', {
        headers: { 
            'Accept': 'application/vnd.pagerduty+json;version=2', 
            'Content-Type': 'application/json', 
            'Authorization': 'Token token='+ token
          }
        });
        return userResult.data;
        
    } catch (error) {
        return error
    }
}
const getListOfServices = async (token) => {

    try {
        let userResult = await axios.get('https://api.pagerduty.com/services', {
        headers: { 
            'Accept': 'application/vnd.pagerduty+json;version=2', 
            'Content-Type': 'application/json', 
            'Authorization': 'Token token='+ token
          }
        });
        return userResult.data;
        
    } catch (error) {
        return error
    }
}


module.exports = {getListOfAllUsers,getListOfEscalationPolicies,getListOfTeams,getListOfMembersInTeams,getListOfOnCallSchedules,getListOfServices,getTeam};
