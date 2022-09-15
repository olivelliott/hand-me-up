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
      category: categories[0]._id,
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Linen Tank Top",
      brand: "Old Navy",
      size: "XX-Large",
      description: "Used linen tank top. Has one small stain on the back!",
      image: "linen_tank.jpeg",
      category: categories[0]._id,
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Black Long Sleeve",
      brand: "J Crew",
      size: "Small",
      description:
        "Simple black long sleeve top. Great for layering in the cold months!",
      image: "navy_long_sleeve.jpeg",
      category: categories[0]._id,
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Printed Maxi Dress",
      brand: "Anthropologie",
      size: "Large",
      description:
        "In new condition without tags. Wore it once and its just not really my style.",
      image: "maxi_dress.jpeg",
      category: categories[0]._id,
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Color Block Sneakers",
      brand: "New Balance",
      size: "Ten",
      description:
        "Super fun color block sneakers! In used condition but they have some miles to go!",
      image: "color_block_sneakers.jpeg",
      category: categories[0]._id,
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Black Long Sleeve",
      brand: "Tommy Hilfiger",
      size: "Medium",
      description:
        "Button down collared linen shirt. Great for spring and summer and appropriate for work!",
      image: "blue_button_shirt.jpeg",
      category: categories[0]._id,
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Sweatshirt",
      brand: "Adidas",
      size: "Medium",
      description:
        "New with tags! Nothing wrong with it, I just don't wear it. Fleece lining on the inside.",
      image: "mens_sweatshirt.jpeg",
      category: categories[1]._id,
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Cargo Pants",
      brand: "Abercrombie & Fitch",
      size: "Large",
      description:
        "Gently used mens cargo pants. They fit a little tight for a Large but are otherwise in good condition!",
      image: "white_pants.jpeg",
      category: categories[1]._id,
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Black Flannel",
      brand: "REI",
      size: "Medium",
      description:
        "Really warm flannel. Its in well-loved condition but it will keep you warm.",
      image: "flannel.jpeg",
      category: categories[1]._id,
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Black Long Sleeve",
      brand: "J Crew",
      size: "Small",
      description:
        "Simple black long sleeve top. Great for layering in the cold months!",
      image: "navy_long_sleeve.jpeg",
      category: categories[0]._id,
      price: 2.99,
      quantity: 1,
    },
    {
      name: "Navy Striped Tie",
      brand: "Dior",
      size: "One Size",
      description: "Gently used navy striped tie. One stain on the top.",
      image: "navy_tie.jpeg",
      category: categories[1]._id,
      price: 2.99,
      quantity: 1,
    },
  ]);
});
