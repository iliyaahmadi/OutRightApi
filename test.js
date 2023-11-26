//fake info db

module.exports = function temp(user, product, blog) {
  user.create({
    firstname: 'ایلیا',
    lastname: 'احمدی',
    email: 'iliyxhmdi@gmail.com',
    password: '$2b$10$WJPzpvJTA9vE4/BGcVK56.Tv.V5npLsQSEPpcXmViNOQkuIkorXDS',
    number: '09337507323',
    roleId: '3',
  });
  product.create({
    title: 'مرتال کامبت',
    slug: 'mortal-kombat',
    desc: 'لورم ایپسوم متن ساختگی',
    sku: 'OR_1001',
    amount: -1,
    price: 800000,
    user_info: false,
    image: 'https://host.com/image',
    categoryId: 1,
  });
  blog.create({
    title: 'بهترین بازی های سال 2023',
    slug: 'best games of 2023',
    thumb: 'https://host.com/myimage',
    author: 'ادمین',
  });
};
