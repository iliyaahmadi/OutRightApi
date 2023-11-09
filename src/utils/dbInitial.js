//initial DB Connection

function stticRole(role) {
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
}
function stticCat(cat) {
  cat.create({
    id: 1,
    name: 'عناوین بازی',
    slug: 'games',
  });
  cat.create({
    id: 2,
    name: 'گیفت کارت',
    slug: 'giftcards',
  });

  cat.create({
    id: 3,
    name: 'فورتنایت',
    slug: 'fortnite',
  });
  cat.create({
    id: 4,
    name: 'ولورانت',
    slug: 'valorant',
  });

  cat.create({
    id: 5,
    name: 'پابجی',
    slug: 'pubg',
  });
}
module.exports = {
  stticRole,
  stticCat,
};
