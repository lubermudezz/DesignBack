const {Router} = require('express');
const { getAllUsers } = require('../controller/dbElements');
const { getUserByName, getMyEntries } = require('../controller/userController');
const router = Router()

router.get('/', async (req, res) => {
    let all = await getAllUsers()
    res.json(all)
})


router.get('/login/:userName', async (req, res) => {
    let {userName} = req.params
    try {
        let user =  await getUserByName(userName)
        if(user){
            res.send(user)
        }else{
            res.send('no user found')
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/entries/:id', async(req, res) => {
    try {
        let {id} = req.params 
        let entries = await getMyEntries(id)
        if(entries) {
            res.send(entries)
        } else{
            res.send('no entries found')
        }
    } catch(err) {
        console.log(err)
    }
})


module.exports = router;