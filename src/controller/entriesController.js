const { Entries, Projects, Tasks, Users } = require("../db")

const getAllEntries = async () => {
    try {
        let entries = await Entries.findAll({
            include: [
                {model: Projects},
                {model: Tasks},
                {model: Users}
            ]
        })
        return entries
    } catch (error) {
        console.log(error)
    }
}

const approveEntry =  async (id) => {
    try {
    let newEntry = await Entries.update({approved: true},{where: {id: id}})
    return newEntry}
    catch(err) {console.log(err)}
}

const editEntry = async (id, comment, hours) => {
    try{
        let newEntry = await Entries.update({hours: hours, comment: comment},{where:{id: id}})
        return newEntry
    }catch(err) {
        console.log(err)
    }

}

module.exports={
    approveEntry,
    editEntry,
    getAllEntries
}