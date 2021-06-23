const db = require("../database/db");
var moment = require('moment'); // require

async function run(buffer){
    await insert_or_update(buffer);
}

async function insert_or_update(buffer){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT * FROM atendimentos where numero_atendimento = ' + buffer[8] );
    console.log(rows.length>0)

    if(rows.length>0){ 
        update(buffer);
    }else{
        insert(buffer);
    }
}

async function update_serial_observacao(browser){
    const conn = await db.connect();
    const [rows] = await conn.query('SELECT numero_atendimento,observacao,numero_serie,id_mob2b_cliente, id_mob2b FROM _mysql.atendimentos where numero_serie = "X_X" or observacao ="X_X"');
   // ////////console.log("Update observacao")
    //console.log(rows.length)
    var page = await browser.newPage();
    if(rows.length>0){
        console.log(rows.length)
        for(i=0;i<rows.length;i++){
           console.log("Update obersavao "+rows[i])
            try {
                console.log(rows[i].id_mob2b_cliente)
                await page.waitForTimeout(5000);
                await page.goto('http://mob2b-backend.cloudapp.net/Tracker/TrackerTarget/Edit/'+rows[i].id_mob2b_cliente);
                await update_serial(rows[i].numero_atendimento,page);
                await page.waitForTimeout(5000);
                await page.goto('http://mob2b-backend.cloudapp.net/Tracker/TrackerTicket/Edit/'+rows[i].id_mob2b)
                await update_observacao(rows[i].id_mob2b,page)
            } catch (error) {
                
            }
        }
    }else{
        //console.log('fora')
    }
    page.close();
}

async function insert(buffer){
  //  console.log("inserir")
    const conn = await db.connect();
    const dt_abertura = moment(buffer[7], 'DD/MM/YYYY HH:mm', true).format('YYYY-MM-DD HH:mm:ss');
    const nome_tec = buffer[6].trim();
    const sql = 'insert into atendimentos (numero_atendimento,nome_cliente,nome_tec,'+
    'atend_status,dt_abertura,id_mob2b,setor,id_mob2b_cliente)'+
    'values '+
    '('+buffer[8]+','+
    '"'+buffer[5]+'",'+
    '"'+nome_tec+'",'+
    '"'+buffer[4]+'",'+
    '"'+dt_abertura+'",'+
    '"'+buffer[3]+'",'+
    '"'+"X_X"+'",'+
    '"'+buffer[2]+'")' 
    console.log(sql);
    conn.query(sql);
}

async function update(buffer){
    const conn = await db.connect();
   // console.log(buffer)
    var dt_fechamento = moment('01/01/2000 00:00','DD/MM/YYYY HH:mm', true).format('YYYY-MM-DD HH:mm:ss');
    var dt_inicio = moment('01/01/2000 00:00','DD/MM/YYYY HH:mm', true).format('YYYY-MM-DD HH:mm:ss');
    if(buffer[0]!=''){
        dt_fechamento = moment(buffer[0],'DD/MM/YYYY HH:mm', true).format('YYYY-MM-DD HH:mm:ss');
    }
    
    if(buffer[1]!=''){
    dt_inicio = moment(buffer[1],'DD/MM/YYYY HH:mm', true).format('YYYY-MM-DD HH:mm:ss');
    }
    const sql = "UPDATE atendimentos SET atend_status=?, dt_fechamento=?,dt_inicio=?, nome_tec=? WHERE numero_atendimento=?";
    const values = [buffer[4],dt_fechamento,dt_inicio,buffer[6],buffer[8]];
    console.log("update "+buffer[8])
    return await conn.query(sql, values);
}

async function update_serial(numero_atendimento,page){
        const numero_serie = await page.evaluate(() => document.querySelector("#TargetExternalReference").value);
        const endereco = await page.evaluate(() => document.querySelector("#Coordinate_Line1").value);
        const cidade = await page.evaluate(() => document.querySelector("#Coordinate_City").value);
        const UF = await page.evaluate(()=> document.querySelector("#Coordinate_StateCode").value);
        const logitude = await page.evaluate(()=> document.querySelector("#Coordinate_Longitude").value);
        const latitude = await page.evaluate(()=> document.querySelector("#Coordinate_Latitude").value);

    //console.log("Inicio do Update");    
    try {
    const conn = await db.connect();
    //console.log("Inicio do banco");
    const sql = 'update atendimentos set numero_serie = ?, cidade = ?, UF = ?, endereco =?, logitude=?,latitude=? where numero_atendimento = ?';
    const values = [numero_serie,cidade,UF,endereco,logitude,latitude,numero_atendimento];
    console.log(sql+values)
    return await conn.query(sql, values);
    } catch (error) {
        console.log(error);
    }
}

async function update_observacao(id_mob2b,page){
    const observacao = await page.evaluate(() => document.querySelector("#Notes").textContent.trim())
    const atend_tipo = await page.evaluate(() => document.querySelector("#s2id_TrackerTicketSLAKey > a").text.trim()); 
    const conn = await db.connect();
    const sql = "UPDATE atendimentos SET observacao=?, atend_tipo=? WHERE id_mob2b=?";
    const values = [observacao,atend_tipo,id_mob2b];
    console.log(sql+values[0],values[1],values[2])
    return await conn.query(sql, values);
}

module.exports={run,update_serial_observacao}