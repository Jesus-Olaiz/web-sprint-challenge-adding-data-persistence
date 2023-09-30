const router = require('express').Router()
const Projects = require('./model')


router.get('/', async (req, res, next) => {
    try {
        let projects = await Projects.getAll()
        
        projects = projects.map(project => {
            return {...project, project_completed: project.project_completed === 0? false : true}
        })


        res.status(200).json(projects)

    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const project = req.body

        const newProject = await Projects.create(project)

        if(!newProject){
            res.status(400).json({message: 'Missing required information. Check all fields and try again.'})
        }else{

            if(newProject[0].project_completed === 0 ){
                newProject[0].project_completed = false
            }else {
                newProject[0].project_completed = true
            }


            res.status(201).json(newProject[0])
        }




    } catch (error) {
        next(error)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err,
      customMessage: "Something bad happened within the accounts router"
    });
  });

module.exports = router