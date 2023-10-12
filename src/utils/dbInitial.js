//initial DB Connection

module.exports = function initial(role) {
    role.create({
      id: 1,
      name: 'user',
    });
    role.create({
      id: 2,
      name: 'premium',
    });
  
    role.create({
      id: 3,
      name: 'artist',
    });
    role.create({
      id: 4,
      name: 'admin',
    });
  };
  