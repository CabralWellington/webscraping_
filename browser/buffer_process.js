

const insert_or_update = require("./voids_insert_or_update");

async function runBuffer_insert_or_update(bufferList,browser){
    for(i=1;i=bufferList.length;i++){
       await insert_or_update.run(bufferList.pop(i));
    }
    await insert_or_update.update_serial_observacao(browser);
}

module.exports = {runBuffer_insert_or_update}


