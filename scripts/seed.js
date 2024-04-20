const { db } = require('@vercel/postgres');
const {
  schedules,
  users,
} = require('../src/app/lib/placeholder-data.js');

async function seedusers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedusers = await Promise.all(
      users.map(async (user) => {
        return client.sql`
        INSERT INTO users (id, name, role)
        VALUES (${user.id}, ${user.name}, ${user.role})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedusers.length} users`);

    return {
      createTable,
      users: insertedusers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedSchedule(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "schedule" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS schedule (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    partner_id UUID NOT NULL,
    partner_name TEXT NOT NULL,
    entrepreneur_id UUID,
    entrepreneur_name TEXT,
    date VARCHAR(255) NOT NULL,
    duration TEXT,
    status VARCHAR(255) NOT NULL
  );
`;

    console.log(`Created "schedule" table`);

    // Insert data into the "schedule" table
    const insertedSchedules = await Promise.all(
      schedules.map(
        (schedule) => client.sql`
        INSERT INTO schedule (partner_id, partner_name, date, duration, status)
        VALUES (${schedule.partner_id}, ${schedule.partner_name}, ${schedule.date}, ${schedule.duration}, ${schedule.status})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedSchedules.length} schedule`);

    return {
      createTable,
      invoices: insertedSchedules,
    };
  } catch (error) {
    console.error('Error seeding schedule:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedusers(client);
  await seedSchedule(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
