const puppeteer = require('puppeteer');
const navigation = require('./browser/nav');
const bufferProcess = require('./browser/buffer_process')
const bufferInfo = require('./browser/voids_info')
var nodemailer = require('nodemailer');
var moment = require('moment'); // require


async function app(){
    const browser = await puppeteer.launch(/*{headless: false}*/);
    const page = await browser.newPage();


    do {
        if(moment().weekday()=="6" || moment().weekday()=="7"){
           console.log("Final de Semana")
        }else{
            console.log("Dia de Semana")
            if(moment().format("HH:mm")>="06:00" && moment().format("HH:mm")<="18:00" ){
                console.log("No horario de trabalho")
                try {
                    await page.goto('http://mob2b-backend.cloudapp.net/User/LogOn?ReturnUrl=%2f');
                    await page.waitForTimeout(10000);
                    await navigation.login(page)
                    await bufferProcess.runBuffer_insert_or_update(await navigation.run(page),browser);
                    await page.waitForTimeout(10000);
                    await bufferInfo.run(page)
                } catch (error) {
                    console.log("Erro geral")
                    console.log(error)
                }    
            }
            console.log(moment().format("HH:mm:ss") + " Dia comum");
            await page.waitForTimeout(10000);

        }
    } while (true);

}

app();