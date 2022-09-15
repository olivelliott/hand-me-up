const db = require("./connection");
const { User, Product, Charity, Category } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: "Women" },
    { name: "Men" },
  ]);

  console.log("categories seeded 💫");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Sweater Set",
      brand: "Free People",
      size: "Medium",
      description:
        "Free People gently used sweater set. Perfect for lounging at home!",
      image: "fp_sweater_set.jpeg",
      quantity: 1,
      price: 2.99,
      category: categories[0]._id,
      email: "pamela@testmail.com"
    },
    {
      name: "Linen Tank Top",
      brand: "Old Navy",
      size: "XX-Large",
      description: "Used linen tank top. Has one small stain on the back!",
      image: "linen_tank.jpeg",
      quantity: 1,
      price: 2.99,
      category: categories[0]._id,
      email: "pamela@testmail.com"
    },
    {
      name: "Black Long Sleeve",
      brand: "J Crew",
      size: "Small",
      description:
        "Simple black long sleeve top. Great for layering in the cold months!",
      image: "navy_long_sleeve.jpeg",
      quantity: 1,
      price: 2.99,
      category: categories[0]._id,
      email: "pamela@testmail.com"
    },
    {
      name: "Printed Maxi Dress",
      brand: "Anthropologie",
      size: "Large",
      description:
        "In new condition without tags. Wore it once and its just not really my style.",
      image: "maxi_dress.jpeg",
      quantity: 1,
      price: 2.99,
      category: categories[0]._id,
      email: "eholt@testmail.com"
    },
    {
      name: "Color Block Sneakers",
      brand: "New Balance",
      size: "Ten",
      description:
        "Super fun color block sneakers! In used condition but they have some miles to go!",
      image: "color_block_sneakers.jpeg",
      quantity: 1,
      price: 2.99,
      category: categories[0]._id,
      email: "jswilson@testmail.com"
    },
    {
      name: "Black Long Sleeve",
      brand: "Tommy Hilfiger",
      size: "Medium",
      description:
        "Button down collared linen shirt. Great for spring and summer and appropriate for work!",
      image: "blue_button_shirt.jpeg",
      quantity: 1,
      price: 2.99,
      category: categories[0]._id,
      email: "jswilson@testmail.com"
    },
    // {
    //   name: "Sweatshirt",
    //   brand: "Adidas",
    //   size: "Medium",
    //   description:
    //     "New with tags! Nothing wrong with it, I just don't wear it. Fleece lining on the inside.",
    //   image: "mens_sweatshirt.jpeg",
    //   quantity: 1,
    //   price: 2.99,
    //   category: categories[1]._id,
    // },
    // {
    //   name: "Cargo Pants",
    //   brand: "Abercrombie & Fitch",
    //   size: "Large",
    //   description:
    //     "Gently used mens cargo pants. They fit a little tight for a Large but are otherwise in good condition!",
    //   image: "white_pants.jpeg",
    //   quantity: 1,
    //   price: 2.99,
    //   category: categories[1]._id,
    // },
    // {
    //   name: "Black Flannel",
    //   brand: "REI",
    //   size: "Medium",
    //   description:
    //     "Really warm flannel. Its in well-loved condition but it will keep you warm.",
    //   image: "flannel.jpeg",
    //   quantity: 1,
    //   price: 2.99,
    //   category: categories[1]._id,
    // },
    // {
    //   name: "Black Long Sleeve",
    //   brand: "J Crew",
    //   size: "Small",
    //   description:
    //     "Simple black long sleeve top. Great for layering in the cold months!",
    //   image: "navy_long_sleeve.jpeg",
    //   quantity: 1,
    //   price: 2.99,
    //   category: categories[0]._id,
    // },
    // {
    //   name: "Navy Striped Tie",
    //   brand: "Dior",
    //   size: "One Size",
    //   description: "Gently used navy striped tie. One stain on the top.",
    //   image: "navy_tie.jpeg",
    //   quantity: 1,
    //   price: 2.99,
    //   category: categories[1]._id,
    // },
  ]);

  console.log("products seeded 💫");

  await User.deleteMany();

//   TODO: I need to fix the order & products, its not working in connecting to the user
  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    // orders: [
    //   {
    //     products: [products[0]._id, products[1]._id],
    //   },
    // ],
    // products: [products[3]._id, products[4]._id, products[5]._id],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
    // orders: [],
    // products: [products[6]._id, products[7]._id, products[8]._id],
  });

  await User.create({
    firstName: "Jamie",
    lastName: "Wilson",
    email: "jswilson@testmail.com",
    password: "password12345",
    // orders: [],
    // products: [products[9]._id, products[10]._id],
  });

  console.log("users seeded");

  process.exit();
});
