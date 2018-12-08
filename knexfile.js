// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'cluckr_database'
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    }
  }

};
