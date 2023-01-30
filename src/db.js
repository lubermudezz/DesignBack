require('dotenv').config()
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, PG_USER, PG_HOST, PG_PASSWORD, PG_DATABASE } = process.env;

const sequelize = new Sequelize(`postgresql://${PG_USER || DB_USER}:${PG_PASSWORD || DB_PASSWORD}@${PG_HOST || DB_HOST}/${PG_DATABASE || 'timetracking'}`, {
  logging: false, 
  native: false, 
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const {Entries, Projects, Tasks, Users} = sequelize.models

Projects.hasMany(Entries, {foreignKey: "project_id", sourceKey: 'id'})
Projects.hasMany(Tasks, {foreignKey: "project_id", sourceKey: 'id'})
Tasks.hasMany(Entries, {foreignKey: "task_id", sourceKey: 'id'})
Users.hasMany(Entries, {foreignKey: "user_id", sourceKey: 'id'})

Entries.belongsTo(Users, {foreignKey: "user_id", targetKey: 'id'})
Entries.belongsTo(Tasks, {foreignKey: "task_id", targetKey: 'id'})
Entries.belongsTo(Projects, {foreignKey:"project_id", targetKey: 'id'})
Tasks.belongsTo(Projects, {foreignKey: "project_id", targetKey: 'id'})

module.exports = {
    ...sequelize.models, 
    sequelize,  
    Entries, Tasks, Projects, Users
  };