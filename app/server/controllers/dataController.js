import {PagerDuty} from "./pagerDuty.js";

const getUsersFromPagerDuty = async (req,res) => {
    if(!req.headers.pagerdutykey){
        return res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }

    const pagerDuty = new PagerDuty(req.headers.pagerdutykey);
    const users = await pagerDuty.getUsersFromPagerDuty();

    if(users.error){
        return res.status(users.error.status).send({
            "message": users.error.message,
        })
    }
    return res.status(200).send({
        "users": users
    })
}
const getTeamsFromPagerDuty = async (req,res) => {
    if(!req.headers.pagerdutykey){
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }

    const pagerDuty = new PagerDuty(req.headers.pagerdutykey);
    const teams = await pagerDuty.getTeamsFromPagerDuty();

    if(teams.error){
        return res.status(teams.error.status).send({
            "message": teams.error.message,
        })
    }
    return res.status(200).send({
        "teams": teams
    })
}
const getSchedulesFromPagerDuty = async (req,res) => {
    if(!req.headers.pagerdutykey){
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }

    const pagerDuty = new PagerDuty(req.headers.pagerdutykey);
    const schedules = await pagerDuty.getSchedulesFromPagerDuty();

    if(schedules.error){
        return res.status(schedules.error.status).send({
            "message": schedules.error.message,
        })
    }
    return res.status(200).send({
        "schedules": schedules
    })
}
const getEscalationPoliciesFromPagerDuty = async (req,res) => {
    if(!req.headers.pagerdutykey){
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }

    const pagerDuty = new PagerDuty(req.headers.pagerdutykey);
    const escalation_policies = await pagerDuty.getEscalationPoliciesFromPagerDuty();

    if(escalation_policies.error){
        return res.status(escalation_policies.error.status).send({
            "message": escalation_policies.error.message,
        })
    }
    return res.status(200).send({
        "escalation_policies": escalation_policies
    })
}
const getServicesFromPagerDuty = async (req,res) => {
    if(!req.headers.pagerdutykey){
        res.status(400).send({
            "message": "No pagerduty key provided",
        })
    }

    const pagerDuty = new PagerDuty(req.headers.pagerdutykey);
    const services = await pagerDuty.getServicesFromPagerDuty();

    if(services.error){
        return res.status(services.error.status).send({
            "message": services.error.message,
        })
    }
    return res.status(200).send({
        "services": services
    })
}

export {getUsersFromPagerDuty,getTeamsFromPagerDuty,getSchedulesFromPagerDuty,getEscalationPoliciesFromPagerDuty,getServicesFromPagerDuty};