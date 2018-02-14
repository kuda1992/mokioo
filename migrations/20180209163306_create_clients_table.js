exports.up = function (knex, Promise) {

    const clientsTable = knex.schema.createTable('clients', function (columnBuilder) {

        columnBuilder.increments('client_id').primary();
        columnBuilder.string('client_name').notNullable().unique();
        columnBuilder.string('client_address').notNullable();
        columnBuilder.string('client_postcode').notNullable();
        columnBuilder.string('client_email').notNullable();
        columnBuilder.string('client_number').notNullable();
        columnBuilder.string('created_at').notNullable();
        columnBuilder.string('updated_at').notNullable();

    });

    const usersTable = knex.schema.createTable('users', function (columnBuilder) {

        columnBuilder.increments('user_id').primary();
        columnBuilder.bigInteger('client_id').unsigned().index().references('client_id').inTable('clients').notNullable();
        columnBuilder.string('user_title').notNullable();
        columnBuilder.string('user_name').notNullable();
        columnBuilder.string('user_surname').notNullable();
        columnBuilder.string('user_email').notNullable().unique();
        columnBuilder.string('user_role').notNullable().defaultTo('normal');
        columnBuilder.string('user_address').notNullable();
        columnBuilder.string('user_postcode').notNullable();
        columnBuilder.string('user_number').notNullable();
        columnBuilder.string('hash').notNullable();
        columnBuilder.string('salt').notNullable();
        columnBuilder.string('created_at').notNullable();
        columnBuilder.string('updated_at').notNullable();

    });

    const contactsTable = knex.schema.createTable('contacts', function (columnBuilder) {

        columnBuilder.increments('contact_id').primary();
        columnBuilder.bigInteger('user_id').unsigned().index().references('user_id').inTable('users').notNullable();
        columnBuilder.string('contact_title')
        columnBuilder.string('contact_name').notNullable()
        columnBuilder.string('contact_surname').notNullable()
        columnBuilder.string('contact_phone')
        columnBuilder.string('contact_mobile')
        columnBuilder.string('contact_email').notNullable()
        columnBuilder.string('contact_address')
        columnBuilder.string('contact_postcode')
        columnBuilder.string('contact_number').notNullable();
        columnBuilder.string('created_at').notNullable();
        columnBuilder.string('updated_at').notNullable();

    });

    return Promise.all([clientsTable, usersTable, contactsTable]);
};

exports.down = function (knex, Promise) {
    const dropClientsTable =   knex.schema.dropTableIfExists('clients');
    const dropUsersTable  = knex.schema.dropTableIfExists('users');
    const dropContactsTable  = knex.schema.dropTableIfExists('contacts');
    return Promise.all([dropClientsTable, dropUsersTable, dropContactsTable])
};
