const { faker } = require('@faker-js/faker');

function createRandomUser() {
  return {
    firstName: faker.internet.userName(),
    lastName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    groupId: faker.number.int({ min: 1, max: 20 }),
  };
}

const USERS = faker.helpers.multiple(createRandomUser, {
  count: 999,
});

module.exports = [
  {
    firstName: 'Mert',
    lastName: 'Efe',
    email: process.env.ADMIN_EMAIL,
    password: process.env.DEFAULT_PASSWORD,
  },
  {
    firstName: 'Efe',
    lastName: 'Mert',
    email: process.env.ADMIN_EMAIL_2,
    password: process.env.DEFAULT_PASSWORD,
  },
  ...USERS,
];
