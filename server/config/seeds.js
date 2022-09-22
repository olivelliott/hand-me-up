const db = require('./connection')
const { User, Product, Charity, Category } = require('../models')

db.once('open', async () => {
  await User.deleteMany()

  // !added by CPM to connected products to a user.
  // !Oliva - I commented out the individuate create users below... not sure the benefit of individual vs the array but I think I needed an array in order to get the user email connected to a product
  const users = await User.insertMany([
    {
      firstName: 'Pamela',
      lastName: 'Washington',
      email: 'pamela@testmail.com',
      password: 'password12345',
    },
    {
      firstName: 'Elijah',
      lastName: 'Holt',
      email: 'eholt@testmail.com',
      password: 'password12345',
    },
    {
      firstName: 'Jamie',
      lastName: 'Wilson',
      email: 'jswilson@testmail.com',
      password: 'password12345',
    },
  ])

  console.log('users seeded 💫')

  await Category.deleteMany()

  const categories = await Category.insertMany([
    { name: 'Women' },
    { name: 'Men' },
  ])

  console.log('categories seeded 💫')

  await Product.deleteMany()

  const products = await Product.insertMany([
    {
      name: 'Waffle-Knit Jogger Sweater Set',
      brand: 'Free People',
      size: 'Medium',
      description:
        'Tan Free People gently used sweater set with button details at the top. Perfect for fall lounging at home!',
      image: 'fp_sweater_set.jpeg',
      quantity: 1,
      price: '2.99',
      category: categories[0].id,
      user: users[0],
    },
    {
      name: 'Old Navy Tan Crew Neck Linen Tank Top',
      brand: 'Old Navy',
      size: 'XX-Large',
      description:
        'Used tan linen tank top. Lightweight and airy. Has one small stain on the back that you can barely see. Great for "coastal grandma" style.',
      image: 'linen_tank.jpeg',
      quantity: 1,
      price: 2.99,
      category: categories[0].id,
      user: users[0],
    },
    {
      name: 'Black J Crew Classic Long Sleeved Shirt',
      brand: 'J Crew',
      size: 'Small',
      description:
        'Simple black crew neck three-quarter length long sleeve top. High quality cotton. Great for layering!',
      image: 'navy_long_sleeve.jpeg',
      quantity: 1,
      price: 2.99,
      category: categories[0].id,
      user: users[0],
    },
    {
      name: 'Paisley Printed Anthropologie Maxi Dress',
      brand: 'Anthropologie',
      size: 'Large',
      description:
        'In new condition but without tags. Paisley pattern in fall colors. Wore it once and its just not really my style.',
      image: 'maxi_dress.jpeg',
      quantity: 1,
      price: 2.99,
      category: categories[0].id,
      user: users[1],
    },
    {
      name: 'Color-Block Cross-Trainer Sneakers',
      brand: 'New Balance',
      size: 'Ten',
      description:
        'Super fun color block sneakers! In used condition but they have some miles to go!',
      image: 'color_block_sneakers.jpeg',
      quantity: 1,
      price: 2.99,
      category: categories[0].id,
      user: users[2],
    },
    {
      name: 'Blue Patterned TH Button-Down Shirt',
      brand: 'Tommy Hilfiger',
      size: 'Medium',
      description:
        'Button down collared linen shirt. Very lightweight and perfect for spring and summer, and appropriate for work! In almost-new shape.',
      image: 'blue_button_shirt.jpeg',
      quantity: 1,
      price: 2.99,
      category: categories[0].id,
      user: users[2],
    },
    {
      name: 'Black ADIDAS Mockneck Logo Sweatshirt',
      brand: 'Adidas',
      size: 'Medium',
      description:
        "New with tags! Mockneck sweatshirt with circle logo. Nothing wrong with it, I just don't wear it. Fleece lining on the inside--very warm!",
      image: 'mens_sweatshirt.jpeg',
      quantity: 1,
      price: 2.99,
      category: categories[1].id,
      user: users[2],
    },
    {
      name: 'Abercrombie Mens Khaki Cargo Pants',
      brand: 'Abercrombie & Fitch',
      size: 'Large',
      description:
        'Gently used, lightweight mens cargo pants in very light khaki color. They fit a little tight for a Large but are otherwise in good condition!',
      image: 'white_pants.jpeg',
      quantity: 1,
      price: 2.99,
      category: categories[1].id,
      user: users[2],
    },
    {
      name: 'Black Flannel',
      brand: 'REI',
      size: 'Medium',
      description:
        'Really warm flannel. Its in well-loved condition but it will keep you warm. Great for fall and winter layering',
      image: 'flannel.jpeg',
      quantity: 1,
      price: 2.99,
      category: categories[1].id,
      user: users[0],
    },
    {
      name: 'Black J Crew Classic Long Sleeved Shirt',
      brand: 'J Crew',
      size: 'Small',
      description:
        'Simple black crew neck three-quarter length long sleeve top. High quality cotton. Great for layering!',
      image: 'navy_long_sleeve.jpeg',
      quantity: 1,
      price: 2.99,
      category: categories[0].id,
      user: users[2],
    },
    {
      name: 'Navy Striped Tie',
      brand: 'Dior',
      size: 'One Size',
      description: 'Gently used navy striped tie. One stain on the top.',
      image: 'navy_tie.jpeg',
      quantity: 1,
      price: 2.99,
      category: categories[1].id,
      user: users[2],
    },
  ])

  console.log('products seeded 💫')

  process.exit()
})
