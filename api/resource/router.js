const router = require('express').Router()
const Resources = require('./model')


router.get('/', async (req, res, next) => {
    try {
        let resources = await Resources.getAll()

        resources = resources.map(resource => {
            return {...resource, resource_completed: resource.resource_completed === 0? false : true}
        })

        
        res.status(200).json(resources)

    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const resource = req.body

        const newResource = await Resources.create(resource)

        if(!newResource){
            res.status(400).json({message: 'Missing required information. Check all fields and try again.'})
        }else{
            res.status(201).json(newResource[0])
        }




    } catch (error) {
        next(error)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err,
      customMessage: "Something bad happened within the resource router"
    });
  });

module.exports = router