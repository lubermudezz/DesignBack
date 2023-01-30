const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const entryRoute = require('./entriesRoutes')
const projectRoute = require('./projectRoutes')
const taskRoute = require ('./tasksRoutes')
const userRoute = require('./usersRoutes')

const router = Router();

router.use('/projects', projectRoute);
router.use('/entries', entryRoute);
router.use('/tasks', taskRoute)
router.use('/users', userRoute)

module.exports = router;