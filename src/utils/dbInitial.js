//initial DB Connection

module.exports = function initial(role) {
  role.create({
    id: 1,
    name: 'user',
  });
  role.create({
    id: 2,
    name: 'blogger',
  });

  role.create({
    id: 3,
    name: 'admin',
  });
};
