const {Router} = require('express');
const { getAllTasks } = require('../controller/dbElements');
const { taskEntries, getAllTaskAv } = require('../controller/tasksController');
const router = Router()

router.get('/:project_id', async (req, res) => {
    let{project_id} = req.params
    let all = await getAllTasks(project_id)
    res.json(all)
})

router.get('/entries/:task_id/:user_id', async (req, res) => {
    let {task_id, user_id} = req.params
    try{
        let all = await taskEntries(task_id, user_id)
        if(all) {
            res.send(all)
        } else{
            res.send('no entries')
        }
    } catch(err) {
        console.log(err)
    }
})

router.get('/', async (req, res) => {
    try {   
        let all = await getAllTaskAv()
        console.log('ok')
        res.send(all)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;