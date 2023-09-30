const db = require('../../data/dbConfig.js')

async function getAll() {

    const projects = db('projects')

    

   return projects
}

async function create(project){
    
    const newProject = await db('projects').insert(project)
    


    return db('projects').where('project_id', newProject)
}


module.exports = {
    getAll,
    create,
}