const {sequelize} = require ('./src/db.js')
const app = require('./src/app')
const { projectsDB } = require('./src/controller/dbElements.js')


sequelize.sync({force: false}).then(() => {
    app.listen(3000, async () => {
        await projectsDB()
    })
    console.log('Server on port 3000')
})

