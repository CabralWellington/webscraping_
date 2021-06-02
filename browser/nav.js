
module.exports = {run,login}

var bufferList = [];

async function run(page){
   await trackerTicket(page);
   return await bufferList;
}

async function checkLogin(page){
    if(page.url().substr(0,44)=="http://mob2b-backend.cloudapp.net/User/LogOn"){
        return true;
    }else{
        return false;
    }
}

async function login(page){
    if(checkLogin(page)){
        await checkLogin(page)
        await page.type('#Email', 'administrador@amazoncopy.com.br');
        await page.type('#Password', 'Wco#$oliveira');
        await page.click('.buttonLogin');
        await page.waitForTimeout(30000);
    }

}

async function trackerTicket(page){
    await page.goto('http://mob2b-backend.cloudapp.net/Tracker/TrackerTicket');
    await page.waitForTimeout(30000);
    await ctrlReadPage2(await applyFilterDisable(page),page);
    await ctrlReadPage(await applyFilterEnable(page),page);
    await ctrlReadPage(await applyFilterEnable2(page),page);
}

async function applyFilterDisable(page){
    await page.select('#TrackerTicketStatusCode', '')
    await page.select('#table_length > label > select', '800')
    const newInputValue = "01/05/2021 00:00:01";
    await page.evaluate(val => document.querySelector("#StartDate").value = val, newInputValue);
    await page.evaluate(val => document.querySelector("#table > thead > tr > th:nth-child(5)").click());
    await page.evaluate(val => document.querySelector("#table > thead > tr > th:nth-child(5)").click());
    await page.evaluate(val => document.querySelector("#Active").value = "False");
    await page.evaluate(val => document.querySelector("#btnApply").click());
    await page.waitForTimeout(60000);
    return sizePage = await page.evaluate(() => document.querySelector("#table > tbody").rows.length);
}

async function applyFilterEnable(page){
    await page.waitForTimeout(60000);
    await page.evaluate(val => document.querySelector("#Active").value = "True");
    await page.evaluate(val => document.querySelector("#btnApply").click());
    await page.waitForTimeout(60000);
    return sizePage = await page.evaluate(() => document.querySelector("#table > tbody").rows.length);
}

async function applyFilterEnable2(page){
    await page.waitForTimeout(60000);
    await page.evaluate(val => document.querySelector("#table_wrapper > div:nth-child(3) > div > div.pull-right > div > ul > li.next > a").click());
    await page.waitForTimeout(60000);
    return sizePage = await page.evaluate(() => document.querySelector("#table > tbody").rows.length);
}

async function ctrlReadPage(sizePage,page){
    for(i=1;i<sizePage+1;i++){
        console.log(i)
         await readPage(i,page);
    }
}
async function ctrlReadPage2(sizePage,page){
    for(i=1;i<sizePage+1;i++){
        console.log(i)
         await readPage2(i,page);
    }
}


async function readPage(idPage,page){
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