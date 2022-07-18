const pagerDuty = require('./pagerDutyControllers');

const getUsersFromPagerDuty = async (req,res) => {
    if(req.headers && req.headers.pagerdutykey){
        let response = await pagerDuty (req.headers.pagerdutykey, 'https://api.pagerduty.com/users');
        if(response.data && response.status == 200 && response.data.users){
            res.status(200).send({
                "users": response.data.users
            })
        }
        else{
            res.status(500).send({
                "message": "Error while getting users from PagerDuty",
            })
        }
    }
    else{
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }
}
const getTeamsFromPagerDuty = async (req,res) => {
    if(req.headers && req.headers.pagerdutykey){
        let response = await pagerDuty.getDataFromPagerDuty(req.headers.pagerdutykey, 'https://api.pagerduty.com/teams');
        if(response.data && response.status == 200 && response.data.teams){
            res.status(200).send({
                "teams": response.data.teams
            })
        }
        else{
            res.status(500).send({
                "message": "Error while getting teams from PagerDuty",
            })
        }
    }
    else{
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }
}
const getSchedulesFromPagerDuty = async (req,res) => {
    if(req.headers && req.headers.pagerdutykey){
        let response = await pagerDuty.getDataFromPagerDuty(req.headers.pagerdutykey, 'https://api.pagerduty.com/schedules');
        if(response.data && response.status == 200 && response.data.schedules){
            res.status(200).send({
                "schedules": response.data.schedules
            })
        }
        else{
            res.status(500).send({
                "message": "Error while getting schedules from PagerDuty",
            })
        }
    }
    else{
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }
}
const getEscalationPoliciesFromPagerDuty = async (req,res) => {
    if(req.headers && req.headers.pagerdutykey){
        let response = await pagerDuty.getDataFromPagerDuty(req.headers.pagerdutykey, 'https://api.pagerduty.com/escalation_policies');
        if(response.data && response.status == 200 && response.data.escalation_policies){
            res.status(200).send({
                "EscalationPolicies": response.data.escalation_policies
            })
        }
        else{
            res.status(500).send({
                "message": "Error while getting schedules from PagerDuty",
            })
        }
    }
    else{
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }
}
const getServicesFromPagerDuty = async (req,res) => {
    if(req.headers && req.headers.pagerdutykey){
        let response = await pagerDuty.getDataFromPagerDuty(req.headers.pagerdutykey, 'https://api.pagerduty.com/services');
        if(response.data && response.status == 200 && response.data.services){
            res.status(200).send({
                "services": response.data.services
            })
        }
        else{
            res.status(500).send({
                "message": "Error while getting schedules from PagerDuty",
            })
        }
    }
    else{
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }
}

module.exports = {getUsersFromPagerDuty,getTeamsFromPagerDuty,getSchedulesFromPagerDuty,getEscalationPoliciesFromPagerDuty,getServicesFromPagerDuty};