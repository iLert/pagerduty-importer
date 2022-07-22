import axios from "axios";

export class PagerDuty {
    constructor(pagerDutyKey) {
        this.pagerDutyKey = pagerDutyKey;
    }
    
    async getUsersFromPagerDuty() {
        try {
            let url = "https://api.pagerduty.com/users";
            let isThereMore = true;
            let response = null;
            let data = [];
            let offset = 0;
            while (isThereMore) {
                response = await axios.get(url + `?offset=${offset}` , {
                    headers: {
                        "Accept": "application/vnd.pagerduty+json;version=2",
                        "Authorization": `Token token=${this.pagerDutyKey}gfhs`,
                        "Content-Type": "application/json",
                    }
                    })
                isThereMore = response.data.more;
                offset += response.data.limit;
                data = [...data,...response.data.users];
            }
            return data;

        } catch (error) {
            console.log(error?.response?.data?.message || error?.message ||"Error while fetching users from PagerDuty");
            return {
                error : {
                    message: error?.response?.data?.message || error?.message ||"Error while fetching users from PagerDuty",
                    status : error?.response?.status || 500
                }
                
            }
        }
    }
    async getTeamsFromPagerDuty() {
        try {
            let url = "https://api.pagerduty.com/teams";
            let isThereMore = true;
            let response = null;
            let data = [];
            let offset = 0;
            while (isThereMore) {
                response = await axios.get(url + `?offset=${offset}` , {
                    headers: {
                        "Accept": "application/vnd.pagerduty+json;version=2",
                        "Authorization": `Token token=${this.pagerDutyKey}`,
                        "Content-Type": "application/json",
                    }
                    })
                isThereMore = response.data.more;
                offset += response.data.limit;
                data = [...data,...response.data.teams];
            }
            return data;

        } catch (error) {
            console.log(error?.response?.data?.message || error?.message ||"Error while fetching teams from PagerDuty");
            return {
                error : {
                    message: error?.response?.data?.message || error?.message ||"Error while fetching teams from PagerDuty",
                    status : error?.response?.status || 500
                }
            }
        }
    }
    async getSchedulesFromPagerDuty() {
        try {
            let url = "https://api.pagerduty.com/schedules";
            let isThereMore = true;
            let response = null;
            let data = [];
            let offset = 0;
            while (isThereMore) {
                response = await axios.get(url + `?offset=${offset}` , {
                    headers: {
                        "Accept": "application/vnd.pagerduty+json;version=2",
                        "Authorization": `Token token=${this.pagerDutyKey}`,
                        "Content-Type": "application/json",
                    }
                    })
                isThereMore = response.data.more;
                offset += response.data.limit;
                data = [...data,...response.data.schedules];
            }
            return data;

        } catch (error) {
            console.log(error?.response?.data?.message || error?.message ||"Error while fetching schedules from PagerDuty");
            return {
                error : {
                    message: error?.response?.data?.message || error?.message ||"Error while fetching schedules from PagerDuty",
                    status : error?.response?.status || 500
                }
            }
        }
    }
    async getEscalationPoliciesFromPagerDuty() {
        try {
            let url = "https://api.pagerduty.com/escalation_policies";
            let isThereMore = true;
            let response = null;
            let data = [];
            let offset = 0;
            while (isThereMore) {
                response = await axios.get(url + `?offset=${offset}` , {
                    headers: {
                        "Accept": "application/vnd.pagerduty+json;version=2",
                        "Authorization": `Token token=${this.pagerDutyKey}`,
                        "Content-Type": "application/json",
                    }
                    })
                isThereMore = response.data.more;
                offset += response.data.limit;
                data = [...data,...response.data.escalation_policies];
            }
            return data;

        } catch (error) {
            console.log(error?.response?.data?.message || error?.message ||"Error while fetching escalation policies from PagerDuty");
            return {
                error : {
                    message: error?.response?.data?.message || error?.message ||"Error while fetching escalation policies from PagerDuty",
                    status : error?.response?.status || 500
                }
            }
        }
    }
    async getServicesFromPagerDuty() {
        try {
            let url = "https://api.pagerduty.com/services";
            let isThereMore = true;
            let response = null;
            let data = [];
            let offset = 0;
            while (isThereMore) {
                response = await axios.get(url + `?offset=${offset}` , {
                    headers: {
                        "Accept": "application/vnd.pagerduty+json;version=2",
                        "Authorization": `Token token=${this.pagerDutyKey}`,
                        "Content-Type": "application/json",
                    }
                    })
                isThereMore = response.data.more;
                offset += response.data.limit;
                data = [...data,...response.data.services];
            }
            return data;

        } catch (error) {
            console.log(error?.response?.data?.message || error?.message ||"Error while fetching services from PagerDuty");
            return {
                error : {
                    message: error?.response?.data?.message || error?.message ||"Error while fetching services from PagerDuty",
                    status : error?.response?.status || 500
                }
            }
        }
    }
}


