import axios from "axios";

export class PagerDuty {
    constructor(pagerDutyKey) {
        this.pagerDutyKey = pagerDutyKey;
    }
    
    async getDataFromPagerDuty(url) {
        try {
            let res = await axios.get(url, {
                headers: {
                    "Accept": "application/vnd.pagerduty+json;version=2",
                    "Authorization": `Token token=${this.pagerDutyKey}1241`,
                    "Content-Type": "application/json"
                }
                })
            return res;
            
        } catch (error) {
            console.log("Error while getting data from PagerDuty");
            return {
                status: error.response && error.response.status ? error.response.status : 500,
                error: error.response && error.response.data && error.response.data != "" ? error.response.data : error.response.statusText
            }
        }
    }
}

