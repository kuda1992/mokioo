module.exports = {
    client: 'pg',
    connection: {
        host : 'localhost',
        port: 5432,
        user : 'docker',
        password : 'docker',
        database : 'docker'
    },
    migrations: {
        directory: __dirname + '/migrations'
    }
}