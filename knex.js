var environment = "development";
var config = require("./knexfile");
var environmentConfig = config[environment];
var knex = require("knex");
var Model = require("objection").Model;
var connection = knex(environmentConfig);
Model.knex(connection);
module.exports = connection;
//# sourceMappingURL=knex.js.map