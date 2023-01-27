const { Entries, Tasks, Projects } = require("../db")

const projectEntries = async (project_id, user_id) => {
    try {
        let entries = await Entries.findAll({
            where: {project_id: project_id, user_id: user_id},
            include: [
                {model: Tasks},
                {model: Projects}
            ]
        })
        return entries
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    projectEntries
}