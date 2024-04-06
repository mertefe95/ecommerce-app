const { AdminRole } = require('@prisma/client');

module.exports = [
  {
    userName: 'Mert',
    email: process.env.ADMIN_EMAIL,
    password: process.env.DEFAULT_PASSWORD,
  },
];
