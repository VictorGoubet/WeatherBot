'use strict';
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const Readline = require('readline'); 
const matcher = require('./matcher');
const getWeather = require('./weather/getWeather');
const printWeather = require('./weather/printWeather');
const colors = require('colors');

const rl = Readline.createInterface({
    input: process.stdin , output: process.stdout , terminal: false
});

console.log("Hey you! I am a "+"FUNKY".green.bold+" weather bot, I can give you the "+"weather forecast".red.bold+" but also help you to "+"watch movies".red.bold+" or "+"listen music".red.bold+"!\nJust ask me!")
rl.setPrompt('>');
rl.prompt(); 

rl.on('line', reply => {
    matcher(reply, cb =>{
        switch(cb.intent){

            case 'Watch Movie':
                console.log('So funky! I play the movie :'+`${cb.entities.moviename}`.blue.bold);
                break;

            case 'Listen music':
                console.log("Okay, funky! Let's listen : "+`${cb.entities.music}`.green.bold+'by '+`${cb.entities.author}`.yellow);
                break;

            case 'SimpleWeather':
                getWeather(cb.entities.city).then(printWeather.SimpleWeather,
                                                  x =>{console.log("We have a "+"UNfunky".red.bold+" error here:\n"+x)});
                break;
            case 'ComplexWeather':
                getWeather(cb.entities.city, cb.entities.time).then(x => {printWeather.ComplexWeather(x, cb.entities)},
                                                                    x => {console.log("We have a "+"UNfunky".red.bold+" error here:\n"+x)});
                break;

            case 'exit':
                console.log("FUNKY".red.bold+" bye !");
                process.exit();

            default:
                console.log("Sorry I don't undertstand what you mean, may it was "+"too funky".cyan.bold.underline+" for me ?");
                break;
        }
        setTimeout(()=>{rl.prompt();}, 1000); 
    });
});