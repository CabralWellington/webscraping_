const puppeteer = require('puppeteer');
const navigation = require('./browser/nav');
const bufferProcess = require('./browser/buffer_process')
const bufferInfo = require('./browser/voids_info')
const voids = require('./voids/ctrl_voids')
var nodemailer = require('nodemailer');
var moment = require('moment'); // require


async function app(){
    const browser1 = await puppeteer.launch(/*{headless: false}*/);
    const browser2 = await puppeteer.launch(/*{headless: false}*/);
    const page2 = await browser2.newPage();
    const page1 = await browser1.newPage();
    
    do {
        if(moment().weekday()=="6" || moment().weekday()=="7"){
           console.log("Final de Semana")
        }else{
            console.log("Dia de Semana")
            if(moment().format("HH:mm")>="06:00" && moment().format("HH:mm")<="18:00" ){
                console.log("No horario de trabalho")
                try {
                    await ctrlPage(page1,page2);
                    await ctrlPage1(page1,page2);
                    await ctrlPage3(browser1);
                    await bufferInfo.run(page1)
                } catch (error) {
                    console.log("Erro geral")
                    console.log(error)
                }    
            }
            await page1.waitForTimeout(10000);

        }
    } while (true);
}

app();


//Realizando Login
async function ctrlPage(page1,page2){
    await page1.goto('http://mob2b-backend.cloudapp.net/User/LogOn?ReturnUrl=%2f');
    await page2.goto('http://mob2b-backend.cloudapp.net/User/LogOn?ReturnUrl=%2f');
    await page1.waitForTimeout(10000);
    await voids.login(page1,page2)
}


//Pesquisando chamados
async function ctrlPage1(page1,page2){
    await page1.goto('http://mob2b-backend.cloudapp.net/Tracker/TrackerTicket');
    await page2.goto('http://mob2b-backend.cloudapp.net/Tracker/TrackerTicket');
    await page1.waitForTimeout(10000)

    // aplicando filtro page1
    await page1.select('#TrackerTicketStatusCode', '')
    await page1.select('#table_length > label > select', '800')
    const newInputValue = "01/05/2021 00:00:01";
    await page1.evaluate(val => document.querySelector("#StartDate").value = val, newInputValue);
    await page1.evaluate(val => document.querySelector("#table > thead > tr > th:nth-child(5)").click());
    await page1.evaluate(val => document.querySelector("#table > thead > tr > th:nth-child(5)").click());
    await page1.waitForTimeout(1500);
    await page1.evaluate(val => document.querySelector("#Active").value = "False");
    await page1.evaluate(val => document.querySelector("#btnApply").click());

    // aplicando filtro page2
    await page2.select('#TrackerTicketStatusCode', '')
    await page2.select('#table_length > label > select', '800')
    await page2.evaluate(val => document.querySelector("#StartDate").value = val, newInputValue);
    await page2.evaluate(val => document.querySelector("#table > thead > tr > th:nth-child(5)").click());
    await page2.evaluate(val => document.querySelector("#table > thead > tr > th:nth-child(5)").click());
    await page2.waitForTimeout(1500);
    await page2.evaluate(val => document.querySelector("#btnApply").click());

    // esperando o filtro
    await page2.waitForTimeout(120000);
    sizePage1 = await page1.evaluate(() => document.querySelector("#table > tbody").rows.length);
    sizePage2 = await page2.evaluate(() => document.querySelector("#table > tbody").rows.length);
    
    //Lendo as paginas
    await voids.ctrlReadPage(sizePage1,sizePage2,page1,page2);
    await console.log(moment().format("HH:mm:ss") + " Finalizado de ler as paginas");




}
//Procurando ativados abertos
async function ctrlPage2(page2){
    await setTimeout(function(){
        voids.ctrl_page_aberto(page2);
    },60000)    



}

//inicia a o processo de atualização
async function ctrlPage3(browser1){
    await bufferProcess.runBuffer_insert_or_update(voids.getBufferList(),browser1);
}


async function readPage2(idPage,page){
    var localBufferList = [];
    //adicionando o numero do atendimento
    //8
    localBufferList.unshift(await getInfoPage("numero_atendimento",idPage,page))
    //7
    localBufferList.unshift(await getInfoPage("dt_abertura",idPage,page));
    //6
    localBufferList.unshift(await getInfoPage("nome_tec",idPage,page));
    //5
    localBufferList.unshift(await getInfoPage("nome_cliente",idPage,page));
    //4
    localBufferList.unshift(await getInfoPage("atend_status",idPage,page));
    //3
    localBufferList.unshift(await getInfoPage("id_mob2b",idPage,page));
    //2
    localBufferList.unshift(await getInfoPage("id_mob2b_cliente",idPage,page));
    //1
    localBufferList.unshift(await getInfoPage("dt_inicio",idPage,page));
    //0
    localBufferList.unshift(await getInfoPage("dt_fechamento",idPage,page));
    await bufferList.unshift(localBufferList)
}
