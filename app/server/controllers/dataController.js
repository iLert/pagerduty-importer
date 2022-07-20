import {PagerDuty} from './pagerDuty.js';

const getUsersFromPagerDuty = async (req,res) => {
    if(!req.headers.pagerdutykey){
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }

    const pagerDuty = new PagerDuty(req.headers.pagerdutykey);
    const users = await pagerDuty.getDataFromPagerDuty('https://api.pagerduty.com/users');

    if(users.error){
        res.status(users.status).send({
            "message": "Error while getting users from PagerDuty",
            "error": users.error
        })
    }
    else{
        res.status(200).send({
            "users": users.data.users
        })
    }
}
const getTeamsFromPagerDuty = async (req,res) => {
    if(!req.headers.pagerdutykey){
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }

    const pagerDuty = new PagerDuty(req.headers.pagerdutykey);
    const teams = await pagerDuty.getDataFromPagerDuty('https://api.pagerduty.com/teams');

    if(teams.error){
        res.status(teams.status).send({
            "message": "Error while getting teams from PagerDuty",
            "error": teams.error
        })
    }
    else{
        res.status(200).send({
            "teams": teams.data.teams
        })
    }
}
const getSchedulesFromPagerDuty = async (req,res) => {
    if(!req.headers.pagerdutykey){
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }

    const pagerDuty = new PagerDuty(req.headers.pagerdutykey);
    const schedules = await pagerDuty.getDataFromPagerDuty('https://api.pagerduty.com/schedules');

    if(schedules.error){
        res.status(schedules.status).send({
            "message": "Error while getting schedules from PagerDuty",
            "error": schedules.error
        })
    }
    else{
        res.status(200).send({
            "schedules": schedules.data.schedules
        })
    }
}
const getEscalationPoliciesFromPagerDuty = async (req,res) => {
    if(!req.headers.pagerdutykey){
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }

    const pagerDuty = new PagerDuty(req.headers.pagerdutykey);
    const escalation_policies = await pagerDuty.getDataFromPagerDuty('https://api.pagerduty.com/escalation_policies');

    if(escalation_policies.error){
        res.status(escalation_policies.status).send({
            "message": "Error while getting escalation_policies from PagerDuty",
            "error": escalation_policies.error
        })
    }
    else{
        res.status(200).send({
            "escalation_policies": escalation_policies.data.escalation_policies
        })
    }
}
const getServicesFromPagerDuty = async (req,res) => {
    if(!req.headers.pagerdutykey){
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }

    const pagerDuty = new PagerDuty(req.headers.pagerdutykey);
    const services = await pagerDuty.getDataFromPagerDuty('https://api.pagerduty.com/services');

    if(services.error){
        res.status(services.status).send({
            "message": "Error while getting services from PagerDuty",
            "error": services.error
        })
    }
    else{
        res.status(200).send({
            "services": services.data.services
        })
    }
}

export {getUsersFromPagerDuty,getTeamsFromPagerDuty,getSchedulesFromPagerDuty,getEscalationPoliciesFromPagerDuty,getServicesFromPagerDuty};