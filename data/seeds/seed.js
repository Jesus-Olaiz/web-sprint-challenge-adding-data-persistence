/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  await knex('projects').truncate()
  await knex('tasks').truncate()
  await knex('resources').truncate()


  await knex('projects').insert([
    {project_name: 'The first cool project', project_description: "This project is too cool to describe", project_completed: 1},
    {project_name: 'The second cool project', project_description: "This project makes brains explode", project_completed: 1},
    {project_name: 'The third cool project', project_description: "This project hacks the whole internet", project_completed: 0}
  ]);

  await knex('resources').insert([
    {resource_name: 'Some', resource_description: "Description of the resource"},
    {resource_name: 'Resource', resource_description: "Description of the resource"},
    {resource_name: 'Name', resource_description: "Description of the resource"}    
  ])

  await knex('tasks').insert([
    {task_description: "do a thing", task_notes:"make sure you have this when you do it", project_id:3},
    {task_description: "do a thing", task_notes:"make sure you have this when you do it", project_id:2},
    {task_description: "do a thing", task_notes:"make sure you have this when you do it", project_id:1}
  ])

  await knex('project_resources').insert([
    {
      project_id:1, resource_id:2
    },
    {
      project_id:2, resource_id:2
    },
    {
      project_id:3, resource_id:1
    }
  ])

};
