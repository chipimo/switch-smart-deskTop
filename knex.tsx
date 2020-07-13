const environment = "development";
const config = require("./knexfile");
const environmentConfig = config[environment];
const knex = require("knex");
const { Model } = require("objection");
const connection = knex(environmentConfig);

Model.knex(connection);

module.exports = connection;
