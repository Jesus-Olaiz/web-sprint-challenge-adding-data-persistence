const db = require('../../data/dbConfig.js')


async function getAll() {

   let tasks = await db('tasks as t').join('projects as p', 't.project_id', 'p.project_id')
   .select('t.task_id', 't.task_description', 't.task_notes', 't.task_completed', 'p.project_name', 'p.project_description' )

   tasks = tasks.map(task => {
    return {...task, task_completed: task.task_completed === 0? false : true}
})

    
   return tasks
}

async function create(task){
    
    const newTask = await db('tasks').insert(task)
    


    return db('tasks').where('task_id', newTask)
}


module.exports = {
    getAll,
    create,
}