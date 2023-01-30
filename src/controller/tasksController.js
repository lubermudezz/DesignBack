const { Entries, Tasks, Projects } = require("../db")

const taskEntries = async (task_id, user_id) => {
    if(task_id && user_id) {
        try{
            let tasks = await Entries.findAll({
                where: {task_id: task_id, user_id: user_id},
                include:[
                    {model: Tasks},
                    {model: Projects}
                ]
            })
            return tasks
        } catch(err){
            console.log(err)
        }
    } else {
       console.log(`didn't get params`)
    }

}

const getAllTaskAv = async () => {
    try {
        let task = await Tasks.findAll({
            include:[
                {model: Entries},
                {model: Projects}
            ]
        })
        return task
    } catch (error) {
        console.log(error)
    }
}

const userEntries = async (user_id) => {
    if(user_id) {
        try{
            let tasks = await Entries.findAll({
                where: {user_id: user_id},
                include:[
                    {model: Tasks},
                    {model: Projects}
                ]
            })
            return tasks
        } catch(err){
            console.log(err)
        }
    } else {
       console.log(`didn't get params`)
    }

}



module.exports = {
    taskEntries,
    getAllTaskAv,
    userEntries}