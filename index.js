require('dotenv').config()
const {sequelize} = require ('./src/db.js')
const app = require('./src/app')
const { projectsDB } = require('./src/controller/dbElements.js')
const {PORT} = process.env;


sequelize.sync({force: false}).then(() => {
    app.listen(PORT, async () => {
        await projectsDB()
    })
    console.log('Server on port 3001')
})

