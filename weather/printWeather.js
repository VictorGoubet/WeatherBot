"use strict ";
const colors = require('colors');
const dateformat = require('dateformat');
const jp = require('jsonpath');

let now = dateformat(new Date(), "HH:00:00");


function get_temp_state(temp){
    let res;
    if(temp < 5){
        res = 'very cold';
    }
    else if(temp < 15){
        res = "cold";
    }
    else if(temp < 25){
        res = "hot";
    }
    else{
        res = 'very hot';
    }
    return res;
}

function SimpleWeather(x){
    data = jp.query(x, `$.days[1].hours[?(@.datetime=="${now}")]`)[0];
    let res = 'Funky news:'.blue.bold;
    res += ' it is '+get_temp_state(data.temp);
    res += ' in '+`${x.resolvedAddress}`.underline;
    res += ', with '+`${Math.round(data.temp)}°C`.red.bold;
    res += ' and '+ `${data.conditions}`.green.bold;
    console.log(res);
}


const ComplexWeather = (x, entities) =>{
    let state = entities.state
    let res;

    data = (entities.time.includes('yesterday')) ? x.days[0]: (entities.time.includes('tomorrow'))? x.days[2]:x.days[1]
    data = jp.query(data, `$.hours[?(@.datetime=="${now}")]`)[0];

    let temp_state = get_temp_state(data.temp);
    state = state.includes('y')?state.slice(0,-1).toLowerCase():state.toLowerCase();

    if(state.includes('hot') || state.includes('cold')){
        if(temp_state.includes(state)){
            res = `A funky yes!`.green.bold+` It is `+`${temp_state} in ${x.address+entities.time} at the same hour with `+`${data.temp}°C`.cyan.bold;
        }
        else{
            res = `Not really.`.red.bold+` It is `+`${temp_state} in ${x.address}${entities.time} at the same hour with `+`${data.temp}°C`.cyan.bold;
        }
    }
    else if(data.conditions.toLowerCase().includes(state)){
        res = `A funky yes!`.green.bold+` It is `+`${data.conditions.toLowerCase()}`.blue.bold+` in ${x.address}${entities.time} at the same hour with `+`${data.temp}°C`.cyan.bold;
    }
    else{
        res = `Not really.`.red.bold+` It is `+`${data.conditions.toLowerCase()}`.blue.bold+` in ${x.address}${entities.time} at the same hour with `+`${data.temp}°C`.cyan.bold;
    }
    console.log(res);
}

module.exports = {SimpleWeather:SimpleWeather,
                  ComplexWeather:ComplexWeather};