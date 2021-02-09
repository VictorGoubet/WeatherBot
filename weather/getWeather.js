"use strict ";
const axios = require ("axios");
const dateformat = require('dateformat');

const apikey = '5AXPERRZHTM7DKVHFKSQR62AL'; 
let apiurl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

const getWeather = (location, d="today") => {
    location = location.includes("after")?location.slice(0, -15):location
    let today = new Date()
    let yesterday = dateformat(new Date(today.getTime() - 1000*3600*24), "yyyy-m-dd");
    let after_tomorrow = dateformat(new Date(today.getTime() + 2*1000*3600*24), "yyyy-m-dd");
    today = dateformat(today, "yyyy-m-dd");

    return new Promise(async (resolve, reject)=>{
        try{
            const weatherConditions = await axios.get(
                apiurl+location+`/${yesterday}/${after_tomorrow}`,
                {
                    params:{
                        unitGroup:"metric",
                        key:apikey
                    }
                }
            );
            resolve(weatherConditions.data);
        }
        catch(error){
            reject(error);
        }
    });
}

module.exports = getWeather;