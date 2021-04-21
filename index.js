#!/usr/bin/env node
// console.log("Hello, Node.JS!");
const { getCode, getName } = require('country-list');
const axios = require('axios').default;
const chalk = require('chalk');
const ora = require('ora');
const figlet = require('figlet');
const log = console.log;
// Combine styled and normal strings

// let getYear = newDate.getFullYear();
let getYear = process.argv[2];
console.log(process.argv[2]);
let country = process.argv[3];
let countryCode = getCode(country);
console.log(countryCode);

const getHoliday = async(year, countryCode)=>{
    try{
        const spinner = ora().start();
        
        spinner.color = 'blue';
        spinner.text = log(chalk.yellowBright('Here are the holidays in ') + chalk.magentaBright(country) + " :"); 
        
        const result = await axios.get(`https://date.nager.at/api/v2/PublicHolidays/${year}/${countryCode}`);

        result['data'].forEach(data => {
            const x = Object.values(chalk.cyanBright(data['date'])+" "+data['localName']+chalk.redBright(' aka ')+data['name']);
            const cleanData = x.join("") ;
            console.log(cleanData);
        });

        // let data = result['data'];
        // console.log(Object.values(data['date'])+Object.values(data['localName'])+Object.values(data['name']));
        // console.log(getYear);
        ora('THE END!').succeed();
        

    figlet('Made by Hsia', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

        spinner.stop();
        
    }catch(error){
        console.log(error);
    }
}
if(countryCode===undefined){
    console.log("It's not a valid country name. Try again!");
}else{
    getHoliday(getYear, countryCode);
}

