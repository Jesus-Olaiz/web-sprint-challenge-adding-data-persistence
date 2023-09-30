const db = require('../../data/dbConfig.js')


function getAll() {
   return db('resources')
}

async function create(resource){
    
    const newResource = await db('resources').insert(resource)
    


    return db('resources').where('resource_id', newResource).select('resource_name')
}


module.exports = {
    getAll,
    create,
}