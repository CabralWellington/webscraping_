const puppeteer = require('puppeteer');
const navigation = require('./browser/nav');
const bufferProcess = require('./browser/buffer_process')
const bufferInfo = require('./browser/voids_info')
var nodemailer = require('nodemailer');


async function app(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    do {

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

    } while (true);

}

app();