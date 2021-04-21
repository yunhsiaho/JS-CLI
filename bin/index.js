#!/usr/bin/env node
// console.log("Hello, Node.JS!");
const { getCode, getName } = require('country-list');
const axios = require('axios').default;
const chalk = require('chalk');
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
        const ora = require('ora');
        const spinner = ora().start();
        
        spinner.color = 'blue';
        spinner.text = log(chalk.yellowBright('Here are the holidays in ') + chalk.magentaBright(countryCode) + " :"); 
        
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

        spinner.stop();
        
    }catch(error){
        console.log(error);
    }
}

getHoliday(getYear, countryCode);