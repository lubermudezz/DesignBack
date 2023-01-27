const {Router} = require('express');
const { getAllProjects } = require('../controller/dbElements');
const { projectEntries } = require('../controller/projectController');
const router = Router()

router.get('/', async (req, res) => {
    let all = await getAllProjects()
    res.json(all)
})

router.get('/myEntries/:user_id/:project_id', async(req, res) => {
    let {project_id, user_id} = req.params
    try {
        let all = await projectEntries(project_id, user_id)
        if(all.length !== 0) {
            res.send(all)
        } else res.send('no entries')
    } catch (error) {
        console.log(error)
    }
    
})





module.exports = router;

