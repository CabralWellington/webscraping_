module.exports = {login,ctrlReadPage,getBufferList}

const conn = require('../database/db')
var moment = require('moment'); // require
var bufferList = [];


// Login Check
async function checkLogin(page){
    if(page.url().substr(0,44)=="http://mob2b-backend.cloudapp.net/User/LogOn"){
        return true;
    }else{
        return false;
    }
}

async function login(page1,page2){
    if(checkLogin(page1)){
        await checkLogin(page1)
        await page1.type('#Email', 'administrador@amazoncopy.com.br');
        await page1.type('#Password', 'Wco#$oliveira');
        await page1.click('.buttonLogin');
        await page2.type('#Email', 'administrador@amazoncopy.com.br');
        await page2.type('#Password', 'Wco#$oliveira');
        await page2.click('.buttonLogin');
        await page1.waitForTimeout(20000);
    }

}


async function ctrlReadPage(sizePage1,sizePage2,page1,page2){
    console.log(moment().format("HH:mm:ss") + " Lendo os resultado das paginas");
    for(i=1;i<sizePage1+1;i++){
         await readPage1(i,page1);
    }
    for(i=1;i<sizePage2+1;i++){
         await readPage2(i,page2);
    }

}

async function getBufferList(){
    return bufferList
}









async function readPage1(idPage,page){
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
    localBufferList.unshift(await getInfoPage("Desativado",idPage,page));
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

 //CONVERSOES OU GET DA TELA
 async function getInfoPage(info,idPage,page){
    var infoTela = 0;
    switch (info){
        case "numero_atendimento":
            return await page.evaluate( val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(3)").textContent , idPage);
        break;
        case "dt_abertura":
            return page.evaluate( val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(5)").textContent, idPage);
        case "nome_cliente":
            return page.evaluate( val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(9)").textContent.trim(), idPage);
        break;
        case "nome_tec":
            return page.evaluate(val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(7)").textContent.trim(), idPage);
        break
        case "atend_status":
            return page.evaluate(val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(11)").textContent, idPage);
        break
        case "id_mob2b":
            return page.evaluate(val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(17) > a:nth-child(1)").href.substring(63), idPage);    
        break
        case "id_mob2b_cliente":
            return page.evaluate(val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(9)> a:nth-child(1)").href.substring(63), idPage);   
        break
        case "dt_inicio":
            return page.evaluate(val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(12)").textContent.replace("  "," "), idPage);
        break
        case "dt_fechamento":
            return page.evaluate(val => document.querySelector("#table > tbody > tr:nth-child("+val+") > td:nth-child(13)").textContent.replace("  "," "), idPage);
        break
        case "Desativado":
            return "Desativado";
        break
    }
}