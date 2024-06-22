const { faker: fakerGroup } = require('@faker-js/faker');

function createRandomGroup() {
  return {
    name: fakerGroup.company.name(),
  };
}

const GROUPS = fakerGroup.helpers.multiple(createRandomGroup, {
  count: 20,
});

module.exports = [...GROUPS];
