
const {Projects, Tasks, Entries, Users} = require('../db')
const fs = require('fs')

const jsonData = fs.readFileSync('./data.json', 'utf-8')
const projects = JSON.parse(jsonData)

const projectsDB = async () => {
    const allProjects = await Projects.findAll()
    try{
        if(allProjects.length !== 0) {
            console.log('projects already in DB')
        } else {
            projects.map(async (el) => {
                await Projects.create({
                    name: el.name,
                    description: el.description
                })
            } )
            return console.log('project in db')
        }
        createTask()
        createUsers()
    }catch(err) {
        console.log(err)
    }
}

const getAllProjects = async () => {
    const allP = await Projects.findAll(
        {
            include: [
                {model: Tasks},
                {model: Entries}
            ]
        }
    )
    if(allP.length !== 0){
        return allP
    } else {console.log('no projects saved')}
}

const getAllTasks = async (project_id) => {
    const allTask = await Tasks.findAll({where: {project_id: project_id}})
    if(allTask.length !== 0) {
        return allTask
    } else {console.log('no tasks saved')}
}

const jsonTask = fs.readFileSync('./task.json', 'utf-8')
const tasks = JSON.parse(jsonTask)

const createTask = async () => {
    const allTasks = await Tasks.findAll()
    if(allTasks.length !== 0) {
        console.log('tasks already in DB')
    } else {
        tasks.map(async (e) => {
            await Tasks.create({
                name: e.name,
                project_id: e.project_id
            })
        })
        console.log('task in db')
    }

}

const jsonUsers = fs.readFileSync('./user.json', 'utf-8')
const users = JSON.parse(jsonUsers)

const createUsers = async () => {
    const allUsers = await Users.findAll()
    if(allUsers.length !== 0) {
        console.log('users already in DB')
    } else {
        users.map(async (e) => {
            await Users.create({
                userName: e.userName,
                admin: e.admin ? e.admin : false
            })
        })
        console.log('users in db')
    }

}


const getAllUsers = async () => {
    const allUsers = await Users.findAll()
    if(allUsers.length === 0) {
        console.log('no users')
    } else {
        return allUsers
    }
}



module.exports = {
    projectsDB,
    getAllProjects, 
    getAllTasks,
    getAllUsers
}
