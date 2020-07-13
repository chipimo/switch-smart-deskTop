// Update with your config settings.
module.exports = {
    development: {
        client: "pg",
        connection: {
            user: "postgres",
            host: "localhost",
            password: "root",
            port: 5432,
            database: "switch_smart",
            ssl: false,
        },
    },
};
//# sourceMappingURL=knexfile.js.map