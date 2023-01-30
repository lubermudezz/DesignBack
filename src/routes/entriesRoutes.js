const {Router} = require('express');
const { addTime } = require('../controller/dbElements');
const { approveEntry, editEntry, getAllEntries } = require('../controller/entriesController');
const { Tasks, Entries } = require('../db');
const router = Router()

router.get('/', async (req, res) => {
    let all = await getAllEntries()
    if(all.length === 0) {
        res.send('no entries')
    } else {
        res.json(all)
    }
    
})

router.post('/', async (req, res) => {
    let {hours, comment, user_id, project_id, task_id, date} = req.body
    let newTime = await Entries.create({
        hours,
        comment,
        date,
        task_id,
        user_id,
        project_id
    })

    res.send(newTime)
})

router.put('/approve/:id', async(req, res) => {
    let {id} = req.params
    let newEntry = await approveEntry(id)
    res.send('entry approved')
})

router.put('/edit/:id', async (req, res) => {
    let {id} = req.params
    let {hours, comment} = req.body
    let newEntry = await editEntry(id, comment, hours)
    res.send(newEntry)
})

module.exports = router;