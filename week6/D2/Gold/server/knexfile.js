module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "your_username",
      password: "your_password",
      database: "todo_db",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
