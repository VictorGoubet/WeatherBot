"use strict ";
const axios = require ("axios");
const dateformat = require('dateformat');

const apikey = '5AXPERRZHTM7DKVHFKSQR62AL'; 
let apiurl= 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

const getWeather = (location, d="today") =>{
    let today = new Date()
    let tomorrow = dateformat(new Date(today.getTime() + 1000*3600*24), "yyyy-m-dd");
    let yesterday = dateformat(new Date(today.getTime() - 1000*3600*24), "yyyy-m-dd");
    today = dateformat(today, "yyyy-m-dd");

    return new Promise(async (resolve, reject)=>{
        try{
            const weatherConditions = await axios.get(
                apiurl+location+`/${yesterday}/${tomorrow}`,
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