const { Users, Entries } = require("../db")

const getUserByName = async (userName) => {
    try {
        let user = await Users.findOne(
            {where: {userName: userName}}
        )
        return user

    } catch (error) {
       console.log(error) 
    }
}

const getMyEntries = async (id) => {
    try {
        let entries = await Entries.findAll({
            where: {user_id: id}
        })
        return entries
    } catch(error) {
        console.log(error)
    }
}

module.exports = {
    getUserByName,
    getMyEntries
}