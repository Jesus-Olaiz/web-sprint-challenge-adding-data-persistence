const router = require('express').Router()
const Tasks = require('./model')


router.get('/', async (req, res, next) => {
    try {
        const tasks = await Tasks.getAll()
        
        res.status(200).json(tasks)

    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const task = req.body

        const newTask = await Tasks.create(task)

        if(!newTask){
            res.status(400).json({message: 'Missing required information. Check all fields and try again.'})
        }else{

            if (newTask[0].task_completed === 1){
                newTask[0].task_completed = true
            }else{
                newTask[0].task_completed = false
            }
            res.status(201).json(newTask[0])
        }




    } catch (error) {
        next(error)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err,
      customMessage: "Something bad happened within the task router"
    });
  });

module.exports = router