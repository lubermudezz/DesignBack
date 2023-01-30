require('dotenv').config()
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, PG_USER, PG_HOST, PG_PASSWORD, PG_DATABASE } = process.env;
//add deploy
const sequelize = new Sequelize(`postgresql://${PG_USER || DB_USER}:${PG_PASSWORD || DB_PASSWORD}@${PG_HOST || DB_HOST}/${PG_DATABASE || 'timetracking'}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
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
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    sequelize,     // para importart la conexión { conn } = require('./db.js');
    Entries, Tasks, Projects, Users
  };