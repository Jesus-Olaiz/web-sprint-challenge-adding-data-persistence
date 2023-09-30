/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return knex.schema 
        .createTable('projects', tbl => {
            tbl.increments('project_id')
            tbl.text('project_name').notNullable()
            tbl.text('project_description')
            tbl.boolean("project_completed").defaultTo(false)
        })

        .createTable('resources', tbl => {
            tbl.increments('resource_id')
            tbl.text('resource_name').notNullable().unique()
            tbl.text('resource_description')
        })

        .createTable('tasks', tbl => {
            tbl.increments('task_id');
            tbl.text('task_description').notNullable()
            tbl.text('task_notes')
            tbl.boolean('task_completed').defaultTo(false)
            tbl.integer('project_id').notNullable() 
                .references('project_id').inTable('projects')
            
        })

        .createTable('project_resources', tbl => {
            tbl.text('project_id')
                .references('project_id').inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.text('resource_id')
                .references('resource_id').inTable('resources')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
            tbl.primary(['project_id', 'resource_id'])
        })
        
        

    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('projects')
        
    
};
