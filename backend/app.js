var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// get data form this file
var AllProduct = require("./ProductController");
var Electronics = require("./Controllers/electronicsController");
var Phones = require("./Controllers/phonesController");
var Clothes = require("./Controllers/clothesController");
// var productController = new productControllerClass()
//mongo altals

mongoose
  .connect(
    "mongodb+srv://mohamed443:XZQEzfd4ID7CD74S@cluster0.fi2xlys.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/" + "Index.html");
});

// get data form data base to add in angular
app.get("/getProducts", function (reg, res) {
  Product.find().then((data) => {
    console.log(data);
    let elec = [];
    for (let i = 0; i < 5; i++) {
      elec[i] = data[i];
    }
    res.send(elec); // just data because this added in angular
  });
});

// let randomNumber = [];

// function createRandomNumber(num = 8, conllection) {
//   while (randomQuestions.length < num) {
//     let r = Math.floor(Math.random() * conllection.length);
//     if (randomNumber.indexOf(r) === -1) randomNumber.push(r);
//   }
// }

app.get("/geElectronics", function (reg, res) {
  const query = { Category: "Electronics" };
  AllProduct.find(query)
    .limit(3)
    .then((data) => {
      res.send(data); // just data because this added in angular
    });
});

app.get("/gePhones", function (reg, res) {
  const query = { Category: "Shoes" };
  AllProduct.find(query)
    .limit(4)
    .then((data) => {
      res.send(data); // just data because this added in angular
    });
});

app.get("/geClothes", function (reg, res) {
  const query = { Category: "Furniture" };
  AllProduct.find(query)
    .limit(5)
    .then((data) => {
      res.send(data); // just data because this added in angular
    });
});
app.get("/getAllElectronics", function (reg, res) {
  const query = { Category: "Electronics" };
  AllProduct.find(query).then((data) => {
    console.log(data);
    res.send(data); // just data because this added in angular
  });
});

app.get("/getAllPhones", function (reg, res) {
  const query = { Category: "Shoes" };
  AllProduct.find(query).then((data) => {
    console.log(data);
    res.send(data); // just data because this added in angular
  });
});

app.get("/getAllClothes", function (reg, res) {
  const query = { Category: "Furniture" };
  AllProduct.find(query).then((data) => {
    console.log(data);
    res.send(data); // just data because this added in angular
  });
});

app.get("/getSingleElectronics/:id", function (req, res) {
  // console.log("Back End getSingleElectronics/:id", id);
  let url = req.url;
  console.log(url);
  let id = url.split("/");
  console.log("this id", id[2]);
  const query = { ProductID: id[2] };
  AllProduct.findOne(query).then((data) => {
    console.log("this ID");
    console.log(data);
    res.send(data); // just data because this added in angular
  });
});

app.get("/addToCart/:id", function (req, res) {
  let url = req.url;
  console.log(req.body);
  let id = url.split("/");
  console.log("this id", id[2]);
  // const query = { ProductID: id[2] };
  // AllProduct.findOne(query).then((data) => {
  //   console.log("this ID");
  //   console.log(data);
  //   res.send(data); // just data because this added in angular
  // });
});

// app.get("/add", function (req, res) {
//   res.sendFile(__dirname + "/" + "AddProduct.html");
// });

app.post("/insert", function (req, res) {
  // this data from addProduct.html
  let productToInserted = new Product({
    ProductID: req.body.ProductID,
    Name: req.body.Name,
    Price: req.body.Price,
    Quantity: req.body.Quantity,
    img: req.body.img,
  });

  // save => add this data into data base
  productToInserted.save().then(() => {
    console.log("Inserted");
    // res.redirect("/");
  });
});

let test = [
  {
    id: 7,
    title: "Ergonomic Granite Fish",
    price: 193,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=8101",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2718",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3574",
    ],
  },
  {
    id: 8,
    title: "Handmade Wooden Hat",
    price: 105,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=5796",
      "https://api.lorem.space/image/watch?w=640&h=480&r=3047",
      "https://api.lorem.space/image/watch?w=640&h=480&r=8478",
    ],
  },
  {
    id: 9,
    title: "Incredible Metal Shoes",
    price: 527,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4443",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=119",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6615",
    ],
  },
  {
    id: 11,
    title: "Refined Wooden Pizza",
    price: 933,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=7527",
      "https://api.lorem.space/image?w=640&h=480&r=1101",
      "https://api.lorem.space/image?w=640&h=480&r=1471",
    ],
  },
  {
    id: 12,
    title: "Tasty Concrete Hat",
    price: 809,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=5238",
      "https://api.lorem.space/image/watch?w=640&h=480&r=9763",
      "https://api.lorem.space/image/watch?w=640&h=480&r=1491",
    ],
  },
  {
    id: 13,
    title: "Gorgeous Rubber Hat",
    price: 487,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2861",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2730",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=9345",
    ],
  },
  {
    id: 14,
    title: "Small Fresh Chicken",
    price: 769,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=1919",
      "https://api.lorem.space/image/watch?w=640&h=480&r=4702",
      "https://api.lorem.space/image/watch?w=640&h=480&r=310",
    ],
  },
  {
    id: 15,
    title: "Licensed Frozen Shoes",
    price: 352,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7030",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1684",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6859",
    ],
  },
  {
    id: 16,
    title: "Refined Cotton Hat",
    price: 357,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=140",
      "https://api.lorem.space/image?w=640&h=480&r=8673",
      "https://api.lorem.space/image?w=640&h=480&r=4941",
    ],
  },
  {
    id: 17,
    title: "Awesome Soft Mouse",
    price: 165,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=1827",
      "https://api.lorem.space/image/watch?w=640&h=480&r=2287",
      "https://api.lorem.space/image/watch?w=640&h=480&r=3609",
    ],
  },
  {
    id: 18,
    title: "Rustic Granite Tuna",
    price: 532,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3614",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4207",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1695",
    ],
  },
  {
    id: 19,
    title: "Small Metal Mouse",
    price: 800,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=8214",
      "https://api.lorem.space/image?w=640&h=480&r=905",
      "https://api.lorem.space/image?w=640&h=480&r=337",
    ],
  },
  {
    id: 20,
    title: "Rustic Cotton Shirt",
    price: 72,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=1080",
      "https://api.lorem.space/image/watch?w=640&h=480&r=1442",
      "https://api.lorem.space/image/watch?w=640&h=480&r=6679",
    ],
  },
  {
    id: 21,
    title: "Unbranded Metal Salad",
    price: 880,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7818",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7847",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=372",
    ],
  },
  {
    id: 22,
    title: "Handcrafted Concrete Table",
    price: 982,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=8282",
      "https://api.lorem.space/image/watch?w=640&h=480&r=7125",
      "https://api.lorem.space/image/watch?w=640&h=480&r=5015",
    ],
  },
  {
    id: 23,
    title: "Generic Frozen Chicken",
    price: 52,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=2572",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=479",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9702",
    ],
  },
  {
    id: 24,
    title: "Gorgeous Granite Bacon",
    price: 645,
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=506",
      "https://api.lorem.space/image/watch?w=640&h=480&r=5664",
      "https://api.lorem.space/image/watch?w=640&h=480&r=2689",
    ],
  },
  {
    id: 25,
    title: "Ergonomic Metal Hat",
    price: 856,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9433",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=8762",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=8434",
    ],
  },
  {
    id: 26,
    title: "Rustic Cotton Mouse",
    price: 693,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=990",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=5884",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=6412",
    ],
  },
  {
    id: 27,
    title: "Unbranded Frozen Keyboard",
    price: 854,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5351",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1494",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2499",
    ],
  },
  {
    id: 28,
    title: "Tasty Wooden Chicken",
    price: 272,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=9554",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=8136",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=755",
    ],
  },
  {
    id: 29,
    title: "Handcrafted Steel Pizza",
    price: 23,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=2328",
      "https://api.lorem.space/image?w=640&h=480&r=2553",
      "https://api.lorem.space/image?w=640&h=480&r=4817",
    ],
  },
  {
    id: 30,
    title: "Rustic Cotton Pants",
    price: 680,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=5094",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=9610",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=4652",
    ],
  },
  {
    id: 31,
    title: "Ergonomic Steel Mouse",
    price: 302,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1884",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=2716",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=5103",
    ],
  },
  {
    id: 32,
    title: "Generic Steel Table",
    price: 102,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=3087",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=9639",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=542",
    ],
  },
  {
    id: 33,
    title: "Handcrafted Wooden Table",
    price: 378,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=3269",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6031",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6339",
    ],
  },
  {
    id: 34,
    title: "Small Fresh Chips",
    price: 571,
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=9526",
      "https://api.lorem.space/image/watch?w=640&h=480&r=2220",
      "https://api.lorem.space/image/watch?w=640&h=480&r=6202",
    ],
  },
  {
    id: 35,
    title: "Awesome Cotton Soap",
    price: 957,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=9673",
      "https://api.lorem.space/image/watch?w=640&h=480&r=3013",
      "https://api.lorem.space/image/watch?w=640&h=480&r=3558",
    ],
  },
  {
    id: 36,
    title: "Sleek Cotton Bacon",
    price: 891,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=8929",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2558",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1744",
    ],
  },
  {
    id: 37,
    title: "Awesome Soft Keyboard",
    price: 438,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=5034",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=987",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=5666",
    ],
  },
  {
    id: 38,
    title: "Handmade Soft Pants",
    price: 908,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7532",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1794",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6565",
    ],
  },
  {
    id: 39,
    title: "Intelligent Granite Pants",
    price: 592,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2447",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5732",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3594",
    ],
  },
  {
    id: 40,
    title: "Fantastic Plastic Computer",
    price: 808,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=5649",
      "https://api.lorem.space/image?w=640&h=480&r=2133",
      "https://api.lorem.space/image?w=640&h=480&r=1173",
    ],
  },
  {
    id: 41,
    title: "Intelligent Frozen Bacon",
    price: 973,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=7441",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=2808",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=3753",
    ],
  },
  {
    id: 42,
    title: "Awesome Rubber Table",
    price: 749,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=6698",
      "https://api.lorem.space/image/watch?w=640&h=480&r=6842",
      "https://api.lorem.space/image/watch?w=640&h=480&r=4559",
    ],
  },
  {
    id: 43,
    title: "Gorgeous Cotton Sausages",
    price: 74,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=2024",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7579",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7865",
    ],
  },
  {
    id: 44,
    title: "Rustic Plastic Tuna",
    price: 870,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=3669",
      "https://api.lorem.space/image?w=640&h=480&r=888",
      "https://api.lorem.space/image?w=640&h=480&r=6694",
    ],
  },
  {
    id: 45,
    title: "Small Wooden Shirt",
    price: 306,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=2851",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=3732",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=3827",
    ],
  },
  {
    id: 46,
    title: "Gorgeous Metal Ball",
    price: 527,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=7351",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=5041",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9237",
    ],
  },
  {
    id: 47,
    title: "Ergonomic Plastic Ball",
    price: 380,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=2339",
      "https://api.lorem.space/image?w=640&h=480&r=4556",
      "https://api.lorem.space/image?w=640&h=480&r=3049",
    ],
  },
  {
    id: 48,
    title: "Fantastic Steel Computer",
    price: 58,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6674",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3098",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3756",
    ],
  },
  {
    id: 49,
    title: "Handmade Wooden Chair",
    price: 112,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=9814",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1034",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=8470",
    ],
  },
  {
    id: 50,
    title: "Unbranded Wooden Pizza",
    price: 622,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=5545",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=433",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=2261",
    ],
  },
  {
    id: 51,
    title: "Fantastic Concrete Sausages",
    price: 686,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1770",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=255",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6835",
    ],
  },
  {
    id: 52,
    title: "Gorgeous Metal Ball",
    price: 677,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=730",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=1821",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=7462",
    ],
  },
  {
    id: 53,
    title: "Gorgeous Cotton Car",
    price: 848,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=942",
      "https://api.lorem.space/image?w=640&h=480&r=8549",
      "https://api.lorem.space/image?w=640&h=480&r=9305",
    ],
  },
  {
    id: 54,
    title: "Awesome Fresh Computer",
    price: 764,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=4504",
      "https://api.lorem.space/image/watch?w=640&h=480&r=7591",
      "https://api.lorem.space/image/watch?w=640&h=480&r=3063",
    ],
  },
  {
    id: 55,
    title: "Handmade Frozen Fish",
    price: 474,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=8801",
      "https://api.lorem.space/image?w=640&h=480&r=7503",
      "https://api.lorem.space/image?w=640&h=480&r=4611",
    ],
  },
  {
    id: 56,
    title: "Handmade Plastic Gloves",
    price: 462,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2238",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4971",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=8548",
    ],
  },
  {
    id: 57,
    title: "Incredible Soft Cheese",
    price: 858,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=2719",
      "https://api.lorem.space/image/watch?w=640&h=480&r=3106",
      "https://api.lorem.space/image/watch?w=640&h=480&r=6435",
    ],
  },
  {
    id: 58,
    title: "Refined Frozen Gloves",
    price: 183,
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=4500",
      "https://api.lorem.space/image?w=640&h=480&r=7212",
      "https://api.lorem.space/image?w=640&h=480&r=7200",
    ],
  },
  {
    id: 59,
    title: "Awesome Soft Table",
    price: 19,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6742",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7855",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6979",
    ],
  },
  {
    id: 60,
    title: "Gorgeous Cotton Hat",
    price: 765,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=1259",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=1735",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=5577",
    ],
  },
  {
    id: 61,
    title: "Tasty Soft Bacon",
    price: 889,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=9625",
      "https://api.lorem.space/image/watch?w=640&h=480&r=4899",
      "https://api.lorem.space/image/watch?w=640&h=480&r=5207",
    ],
  },
  {
    id: 62,
    title: "Practical Plastic Chair",
    price: 244,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=778",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7384",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=360",
    ],
  },
  {
    id: 63,
    title: "Practical Wooden Shoes",
    price: 285,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=825",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6296",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3905",
    ],
  },
  {
    id: 64,
    title: "Unbranded Granite Shoes",
    price: 834,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=9793",
      "https://api.lorem.space/image?w=640&h=480&r=2429",
      "https://api.lorem.space/image?w=640&h=480&r=1540",
    ],
  },
  {
    id: 65,
    title: "Gorgeous Plastic Chicken",
    price: 683,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7692",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=2823",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7088",
    ],
  },
  {
    id: 66,
    title: "Generic Concrete Shoes",
    price: 713,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=9923",
      "https://api.lorem.space/image/watch?w=640&h=480&r=4908",
      "https://api.lorem.space/image/watch?w=640&h=480&r=5376",
    ],
  },
  {
    id: 67,
    title: "Fantastic Plastic Car",
    price: 478,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=5175",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=6037",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=8814",
    ],
  },
  {
    id: 68,
    title: "Gorgeous Rubber Fish",
    price: 418,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=4581",
      "https://api.lorem.space/image?w=640&h=480&r=3191",
      "https://api.lorem.space/image?w=640&h=480&r=6666",
    ],
  },
  {
    id: 69,
    title: "Intelligent Steel Sausages",
    price: 715,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1928",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=47",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=887",
    ],
  },
  {
    id: 70,
    title: "Incredible Soft Shirt",
    price: 446,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=8739",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4214",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=770",
    ],
  },
  {
    id: 71,
    title: "Refined Concrete Tuna",
    price: 803,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=3663",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=5642",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9957",
    ],
  },
  {
    id: 72,
    title: "Handmade Cotton Pants",
    price: 861,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=8448",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4378",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=9205",
    ],
  },
  {
    id: 73,
    title: "Fantastic Fresh Mouse",
    price: 560,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=5231",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=6934",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=7467",
    ],
  },
  {
    id: 74,
    title: "Ergonomic Metal Salad",
    price: 123,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=9928",
      "https://api.lorem.space/image?w=640&h=480&r=4072",
      "https://api.lorem.space/image?w=640&h=480&r=530",
    ],
  },
  {
    id: 75,
    title: "Handmade Plastic Hat",
    price: 408,
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3814",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4820",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1231",
    ],
  },
  {
    id: 76,
    title: "Sleek Cotton Bike",
    price: 374,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=9030",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1718",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=5079",
    ],
  },
  {
    id: 77,
    title: "Refined Wooden Keyboard",
    price: 940,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=821",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2346",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7680",
    ],
  },
  {
    id: 78,
    title: "Licensed Steel Table",
    price: 224,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=4655",
      "https://api.lorem.space/image?w=640&h=480&r=2841",
      "https://api.lorem.space/image?w=640&h=480&r=7834",
    ],
  },
  {
    id: 79,
    title: "Intelligent Soft Pizza",
    price: 242,
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=5356",
      "https://api.lorem.space/image?w=640&h=480&r=654",
      "https://api.lorem.space/image?w=640&h=480&r=1227",
    ],
  },
  {
    id: 80,
    title: "Ergonomic Granite Tuna",
    price: 21,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=6611",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=8760",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=8241",
    ],
  },
  {
    id: 81,
    title: "Incredible Soft Pants",
    price: 893,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=3896",
      "https://api.lorem.space/image/watch?w=640&h=480&r=1334",
      "https://api.lorem.space/image/watch?w=640&h=480&r=529",
    ],
  },
  {
    id: 82,
    title: "Licensed Steel Computer",
    price: 487,
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=239",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1010",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=8674",
    ],
  },
  {
    id: 83,
    title: "Refined Fresh Bacon",
    price: 766,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=3113",
      "https://api.lorem.space/image/watch?w=640&h=480&r=7098",
      "https://api.lorem.space/image/watch?w=640&h=480&r=3625",
    ],
  },
  {
    id: 84,
    title: "Intelligent Fresh Sausages",
    price: 347,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5490",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3435",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=9608",
    ],
  },
  {
    id: 85,
    title: "Sleek Cotton Pizza",
    price: 243,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=5356",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9701",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4027",
    ],
  },
  {
    id: 86,
    title: "Licensed Cotton Chicken",
    price: 806,
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=427",
      "https://api.lorem.space/image/watch?w=640&h=480&r=9471",
      "https://api.lorem.space/image/watch?w=640&h=480&r=9184",
    ],
  },
  {
    id: 87,
    title: "Licensed Frozen Soap",
    price: 857,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=945",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6559",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=3366",
    ],
  },
  {
    id: 88,
    title: "Practical Soft Bike",
    price: 853,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=3546",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=3322",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=8475",
    ],
  },
  {
    id: 89,
    title: "Fantastic Wooden Chicken",
    price: 498,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=2138",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4511",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=8927",
    ],
  },
  {
    id: 90,
    title: "Intelligent Metal Pants",
    price: 347,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=4471",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=4382",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=4074",
    ],
  },
  {
    id: 91,
    title: "Sleek Steel Chips",
    price: 843,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=4838",
      "https://api.lorem.space/image/watch?w=640&h=480&r=106",
      "https://api.lorem.space/image/watch?w=640&h=480&r=1441",
    ],
  },
  {
    id: 92,
    title: "Awesome Steel Pizza",
    price: 381,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=5190",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=9536",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1710",
    ],
  },
  {
    id: 93,
    title: "Intelligent Metal Bike",
    price: 314,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=7702",
      "https://api.lorem.space/image/watch?w=640&h=480&r=8721",
      "https://api.lorem.space/image/watch?w=640&h=480&r=3988",
    ],
  },
  {
    id: 94,
    title: "Incredible Wooden Fish",
    price: 95,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=4335",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=4133",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1282",
    ],
  },
  {
    id: 95,
    title: "Small Steel Bike",
    price: 124,
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=2755",
      "https://api.lorem.space/image?w=640&h=480&r=8788",
      "https://api.lorem.space/image?w=640&h=480&r=9802",
    ],
  },
  {
    id: 96,
    title: "Intelligent Soft Pants",
    price: 108,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=5315",
      "https://api.lorem.space/image/watch?w=640&h=480&r=8452",
      "https://api.lorem.space/image/watch?w=640&h=480&r=5928",
    ],
  },
  {
    id: 97,
    title: "Licensed Granite Towels",
    price: 798,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=4405",
      "https://api.lorem.space/image/watch?w=640&h=480&r=1793",
      "https://api.lorem.space/image/watch?w=640&h=480&r=7694",
    ],
  },
  {
    id: 98,
    title: "Licensed Cotton Keyboard",
    price: 951,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=7873",
      "https://api.lorem.space/image?w=640&h=480&r=721",
      "https://api.lorem.space/image?w=640&h=480&r=5856",
    ],
  },
  {
    id: 99,
    title: "Incredible Wooden Ball",
    price: 631,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2575",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7269",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2698",
    ],
  },
  {
    id: 100,
    title: "Sleek Cotton Computer",
    price: 580,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6604",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=4774",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7135",
    ],
  },
  {
    id: 101,
    title: "Fantastic Fresh Mouse",
    price: 240,
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=2400",
      "https://api.lorem.space/image/watch?w=640&h=480&r=6361",
      "https://api.lorem.space/image/watch?w=640&h=480&r=9435",
    ],
  },
  {
    id: 102,
    title: "Awesome Fresh Hat",
    price: 207,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=7879",
      "https://api.lorem.space/image/watch?w=640&h=480&r=7521",
      "https://api.lorem.space/image/watch?w=640&h=480&r=7216",
    ],
  },
  {
    id: 103,
    title: "Refined Plastic Chicken",
    price: 662,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=4485",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=861",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7672",
    ],
  },
  {
    id: 104,
    title: "Rustic Rubber Keyboard",
    price: 932,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4956",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3468",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4257",
    ],
  },
  {
    id: 105,
    title: "Unbranded Metal Shoes",
    price: 603,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=8458",
      "https://api.lorem.space/image?w=640&h=480&r=7247",
      "https://api.lorem.space/image?w=640&h=480&r=5055",
    ],
  },
  {
    id: 106,
    title: "Awesome Metal Chicken",
    price: 321,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=4791",
      "https://api.lorem.space/image?w=640&h=480&r=8233",
      "https://api.lorem.space/image?w=640&h=480&r=3013",
    ],
  },
  {
    id: 107,
    title: "Refined Plastic Bacon",
    price: 849,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=963",
      "https://api.lorem.space/image?w=640&h=480&r=9194",
      "https://api.lorem.space/image?w=640&h=480&r=655",
    ],
  },
  {
    id: 108,
    title: "Handmade Rubber Bike",
    price: 288,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=9116",
      "https://api.lorem.space/image/watch?w=640&h=480&r=3743",
      "https://api.lorem.space/image/watch?w=640&h=480&r=3524",
    ],
  },
  {
    id: 109,
    title: "Awesome Wooden Chair",
    price: 386,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=9463",
      "https://api.lorem.space/image?w=640&h=480&r=1757",
      "https://api.lorem.space/image?w=640&h=480&r=9437",
    ],
  },
  {
    id: 110,
    title: "Tasty Concrete Soap",
    price: 118,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=2179",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=940",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6577",
    ],
  },
  {
    id: 111,
    title: "Fantastic Soft Shirt",
    price: 565,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=8312",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6616",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=942",
    ],
  },
  {
    id: 112,
    title: "Ergonomic Soft Soap",
    price: 688,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9617",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=2907",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4554",
    ],
  },
  {
    id: 113,
    title: "Awesome Steel Pants",
    price: 132,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1389",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=3034",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6789",
    ],
  },
  {
    id: 114,
    title: "Gorgeous Frozen Sausages",
    price: 879,
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=7509",
      "https://api.lorem.space/image/watch?w=640&h=480&r=4671",
      "https://api.lorem.space/image/watch?w=640&h=480&r=6236",
    ],
  },
  {
    id: 115,
    title: "Ergonomic Plastic Shoes",
    price: 678,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=633",
      "https://api.lorem.space/image?w=640&h=480&r=94",
      "https://api.lorem.space/image?w=640&h=480&r=2248",
    ],
  },
  {
    id: 116,
    title: "Small Metal Chicken",
    price: 154,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9239",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4111",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=7139",
    ],
  },
  {
    id: 117,
    title: "Gorgeous Cotton Shoes",
    price: 802,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=4315",
      "https://api.lorem.space/image/watch?w=640&h=480&r=2185",
      "https://api.lorem.space/image/watch?w=640&h=480&r=4828",
    ],
  },
  {
    id: 118,
    title: "Refined Steel Chips",
    price: 234,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=2315",
      "https://api.lorem.space/image?w=640&h=480&r=1652",
      "https://api.lorem.space/image?w=640&h=480&r=7094",
    ],
  },
  {
    id: 119,
    title: "Handcrafted Plastic Shoes",
    price: 372,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=2911",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=4832",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7169",
    ],
  },
  {
    id: 120,
    title: "Awesome Frozen Ball",
    price: 576,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=1120",
      "https://api.lorem.space/image?w=640&h=480&r=278",
      "https://api.lorem.space/image?w=640&h=480&r=2531",
    ],
  },
  {
    id: 121,
    title: "Incredible Frozen Soap",
    price: 657,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2683",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6983",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1329",
    ],
  },
  {
    id: 122,
    title: "Gorgeous Wooden Pants",
    price: 981,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9202",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9941",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=1391",
    ],
  },
  {
    id: 123,
    title: "Incredible Rubber Keyboard",
    price: 42,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6149",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1866",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=8021",
    ],
  },
  {
    id: 124,
    title: "Handmade Frozen Gloves",
    price: 727,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=8098",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=3771",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1180",
    ],
  },
  {
    id: 125,
    title: "Incredible Fresh Pants",
    price: 632,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=2178",
      "https://api.lorem.space/image/watch?w=640&h=480&r=9194",
      "https://api.lorem.space/image/watch?w=640&h=480&r=8036",
    ],
  },
  {
    id: 126,
    title: "Intelligent Granite Pants",
    price: 120,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=6955",
      "https://api.lorem.space/image?w=640&h=480&r=2088",
      "https://api.lorem.space/image?w=640&h=480&r=7034",
    ],
  },
  {
    id: 127,
    title: "Awesome Wooden Pizza",
    price: 584,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=735",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7162",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6449",
    ],
  },
  {
    id: 128,
    title: "Licensed Cotton Hat",
    price: 165,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=8932",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4610",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=534",
    ],
  },
  {
    id: 129,
    title: "Licensed Steel Table",
    price: 71,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=9977",
      "https://api.lorem.space/image/watch?w=640&h=480&r=1207",
      "https://api.lorem.space/image/watch?w=640&h=480&r=983",
    ],
  },
  {
    id: 130,
    title: "Fantastic Frozen Ball",
    price: 729,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=9427",
      "https://api.lorem.space/image/watch?w=640&h=480&r=4618",
      "https://api.lorem.space/image/watch?w=640&h=480&r=6232",
    ],
  },
  {
    id: 131,
    title: "Unbranded Concrete Keyboard",
    price: 950,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=480",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=1182",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4219",
    ],
  },
  {
    id: 132,
    title: "Intelligent Concrete Soap",
    price: 533,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=2315",
      "https://api.lorem.space/image?w=640&h=480&r=5165",
      "https://api.lorem.space/image?w=640&h=480&r=7711",
    ],
  },
  {
    id: 133,
    title: "Licensed Rubber Bacon",
    price: 248,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=8340",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6398",
    ],
  },
  {
    id: 134,
    title: "Gorgeous Cotton Bike",
    price: 271,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=2775",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7539",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=9595",
    ],
  },
  {
    id: 135,
    title: "Refined Concrete Pizza",
    price: 75,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6945",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7783",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5126",
    ],
  },
  {
    id: 136,
    title: "Incredible Metal Pants",
    price: 18,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4862",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=1661",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=6797",
    ],
  },
  {
    id: 137,
    title: "Practical Soft Pizza",
    price: 943,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1436",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=8158",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1363",
    ],
  },
  {
    id: 138,
    title: "Sleek Metal Ball",
    price: 388,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=1119",
      "https://api.lorem.space/image?w=640&h=480&r=9586",
      "https://api.lorem.space/image?w=640&h=480&r=4007",
    ],
  },
  {
    id: 139,
    title: "Practical Steel Cheese",
    price: 119,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=1732",
      "https://api.lorem.space/image/watch?w=640&h=480&r=248",
      "https://api.lorem.space/image/watch?w=640&h=480&r=8345",
    ],
  },
  {
    id: 140,
    title: "Handcrafted Fresh Soap",
    price: 245,
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=3562",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=9173",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7910",
    ],
  },
  {
    id: 141,
    title: "Practical Steel Soap",
    price: 262,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=7512",
      "https://api.lorem.space/image?w=640&h=480&r=8661",
      "https://api.lorem.space/image?w=640&h=480&r=1801",
    ],
  },
  {
    id: 142,
    title: "Fantastic Frozen Shirt",
    price: 441,
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=9837",
      "https://api.lorem.space/image/watch?w=640&h=480&r=6265",
      "https://api.lorem.space/image/watch?w=640&h=480&r=9044",
    ],
  },
  {
    id: 143,
    title: "Rustic Wooden Bike",
    price: 430,
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=5465",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=1231",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=8874",
    ],
  },
  {
    id: 144,
    title: "Practical Soft Tuna",
    price: 551,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=7275",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=7832",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4879",
    ],
  },
  {
    id: 145,
    title: "Incredible Fresh Bike",
    price: 285,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=6849",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=404",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=5015",
    ],
  },
  {
    id: 146,
    title: "Practical Concrete Computer",
    price: 326,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3825",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=41",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2131",
    ],
  },
  {
    id: 147,
    title: "Awesome Frozen Chair",
    price: 162,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=9784",
      "https://api.lorem.space/image?w=640&h=480&r=3659",
      "https://api.lorem.space/image?w=640&h=480&r=4224",
    ],
  },
  {
    id: 148,
    title: "Handcrafted Metal Hat",
    price: 5,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9161",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=6061",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=2236",
    ],
  },
  {
    id: 149,
    title: "Practical Rubber Bike",
    price: 867,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=429",
      "https://api.lorem.space/image?w=640&h=480&r=3751",
      "https://api.lorem.space/image?w=640&h=480&r=1160",
    ],
  },
  {
    id: 150,
    title: "Generic Fresh Ball",
    price: 7,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=9051",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3662",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1027",
    ],
  },
  {
    id: 151,
    title: "Generic Rubber Sausages",
    price: 63,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=5858",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9790",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=6311",
    ],
  },
  {
    id: 152,
    title: "Refined Concrete Bike",
    price: 794,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1068",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5342",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7294",
    ],
  },
  {
    id: 153,
    title: "Licensed Rubber Hat",
    price: 638,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=2486",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=7967",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4633",
    ],
  },
  {
    id: 154,
    title: "Incredible Fresh Sausages",
    price: 390,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=7231",
      "https://api.lorem.space/image/watch?w=640&h=480&r=6350",
      "https://api.lorem.space/image/watch?w=640&h=480&r=2731",
    ],
  },
  {
    id: 155,
    title: "Awesome Granite Shirt",
    price: 549,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=5985",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=3821",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=9108",
    ],
  },
  {
    id: 156,
    title: "Fantastic Wooden Pants",
    price: 296,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=2496",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7707",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=3924",
    ],
  },
  {
    id: 157,
    title: "Awesome Frozen Car",
    price: 217,
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5499",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2764",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1713",
    ],
  },
  {
    id: 158,
    title: "Gorgeous Rubber Shoes",
    price: 819,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=612",
      "https://api.lorem.space/image/watch?w=640&h=480&r=9919",
      "https://api.lorem.space/image/watch?w=640&h=480&r=5637",
    ],
  },
  {
    id: 159,
    title: "Ergonomic Granite Car",
    price: 272,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=729",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=664",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=6280",
    ],
  },
  {
    id: 160,
    title: "Incredible Soft Bike",
    price: 579,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=4067",
      "https://api.lorem.space/image?w=640&h=480&r=5486",
      "https://api.lorem.space/image?w=640&h=480&r=3207",
    ],
  },
  {
    id: 161,
    title: "Generic Metal Bacon",
    price: 89,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=1820",
      "https://api.lorem.space/image/watch?w=640&h=480&r=6557",
      "https://api.lorem.space/image/watch?w=640&h=480&r=5036",
    ],
  },
  {
    id: 162,
    title: "Incredible Metal Computer",
    price: 231,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7502",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=8975",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=3503",
    ],
  },
  {
    id: 163,
    title: "Incredible Wooden Keyboard",
    price: 505,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6396",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=9394",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=5000",
    ],
  },
  {
    id: 164,
    title: "Tasty Rubber Computer",
    price: 801,
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=7775",
      "https://api.lorem.space/image/watch?w=640&h=480&r=5065",
      "https://api.lorem.space/image/watch?w=640&h=480&r=2560",
    ],
  },
  {
    id: 165,
    title: "Handcrafted Fresh Towels",
    price: 674,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=1174",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=4835",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9148",
    ],
  },
  {
    id: 166,
    title: "Ergonomic Concrete Mouse",
    price: 285,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=1297",
      "https://api.lorem.space/image/watch?w=640&h=480&r=3528",
      "https://api.lorem.space/image/watch?w=640&h=480&r=6507",
    ],
  },
  {
    id: 167,
    title: "Generic Rubber Chips",
    price: 123,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=2482",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9233",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9491",
    ],
  },
  {
    id: 168,
    title: "Tasty Metal Keyboard",
    price: 942,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=393",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7904",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=246",
    ],
  },
  {
    id: 169,
    title: "Gorgeous Cotton Cheese",
    price: 732,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=637",
      "https://api.lorem.space/image?w=640&h=480&r=278",
      "https://api.lorem.space/image?w=640&h=480&r=3957",
    ],
  },
  {
    id: 170,
    title: "Incredible Frozen Bike",
    price: 374,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=4735",
      "https://api.lorem.space/image?w=640&h=480&r=9837",
      "https://api.lorem.space/image?w=640&h=480&r=9381",
    ],
  },
  {
    id: 171,
    title: "Unbranded Granite Chips",
    price: 88,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=8354",
      "https://api.lorem.space/image/watch?w=640&h=480&r=5573",
      "https://api.lorem.space/image/watch?w=640&h=480&r=3564",
    ],
  },
  {
    id: 172,
    title: "Intelligent Soft Table",
    price: 244,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=8285",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=9254",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1415",
    ],
  },
  {
    id: 173,
    title: "Refined Rubber Shoes",
    price: 986,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9614",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=3167",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=3918",
    ],
  },
  {
    id: 174,
    title: "Ergonomic Metal Bacon",
    price: 645,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=3028",
      "https://api.lorem.space/image/watch?w=640&h=480&r=5331",
      "https://api.lorem.space/image/watch?w=640&h=480&r=7070",
    ],
  },
  {
    id: 175,
    title: "Rustic Wooden Ball",
    price: 645,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7654",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1111",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6486",
    ],
  },
  {
    id: 176,
    title: "Rustic Soft Pants",
    price: 71,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7404",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7928",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3357",
    ],
  },
  {
    id: 177,
    title: "Rustic Steel Hat",
    price: 773,
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=8271",
      "https://api.lorem.space/image?w=640&h=480&r=2555",
      "https://api.lorem.space/image?w=640&h=480&r=995",
    ],
  },
  {
    id: 178,
    title: "Awesome Granite Salad",
    price: 880,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4672",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4898",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6770",
    ],
  },
  {
    id: 179,
    title: "Practical Soft Bike",
    price: 190,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=5272",
      "https://api.lorem.space/image?w=640&h=480&r=3251",
      "https://api.lorem.space/image?w=640&h=480&r=2227",
    ],
  },
  {
    id: 180,
    title: "Practical Wooden Soap",
    price: 503,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=7290",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=445",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1338",
    ],
  },
  {
    id: 181,
    title: "Sleek Plastic Fish",
    price: 684,
    description:
      "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7799",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=778",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7706",
    ],
  },
  {
    id: 182,
    title: "Unbranded Fresh Fish",
    price: 620,
    description:
      "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4514",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1862",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6908",
    ],
  },
  {
    id: 183,
    title: "Refined Cotton Pants",
    price: 439,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=1477",
      "https://api.lorem.space/image?w=640&h=480&r=9304",
      "https://api.lorem.space/image?w=640&h=480&r=141",
    ],
  },
  {
    id: 184,
    title: "Incredible Metal Sausages",
    price: 561,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4335",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6034",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=2550",
    ],
  },
  {
    id: 185,
    title: "Small Concrete Tuna",
    price: 755,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=3808",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=7139",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=2193",
    ],
  },
  {
    id: 186,
    title: "Small Steel Hat",
    price: 250,
    description:
      "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=8971",
      "https://api.lorem.space/image?w=640&h=480&r=8070",
      "https://api.lorem.space/image?w=640&h=480&r=6095",
    ],
  },
  {
    id: 187,
    title: "Licensed Metal Table",
    price: 594,
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=8965",
      "https://api.lorem.space/image?w=640&h=480&r=5869",
      "https://api.lorem.space/image?w=640&h=480&r=3158",
    ],
  },
  {
    id: 188,
    title: "Ergonomic Granite Car",
    price: 137,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 5,
      name: "Others",
      image: "https://api.lorem.space/image?w=640&h=480&r=1108",
    },
    images: [
      "https://api.lorem.space/image?w=640&h=480&r=7965",
      "https://api.lorem.space/image?w=640&h=480&r=7208",
      "https://api.lorem.space/image?w=640&h=480&r=381",
    ],
  },
  {
    id: 189,
    title: "Licensed Steel Soap",
    price: 2,
    description:
      "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=3610",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=8956",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6381",
    ],
  },
  {
    id: 190,
    title: "Handcrafted Cotton Computer",
    price: 660,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=8086",
      "https://api.lorem.space/image/watch?w=640&h=480&r=4791",
      "https://api.lorem.space/image/watch?w=640&h=480&r=752",
    ],
  },
  {
    id: 191,
    title: "Handcrafted Rubber Shirt",
    price: 193,
    description:
      "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3335",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=1326",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5907",
    ],
  },
  {
    id: 192,
    title: "Awesome Steel Table",
    price: 312,
    description:
      "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=8232",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=7208",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=5588",
    ],
  },
  {
    id: 193,
    title: "Sleek Fresh Shirt",
    price: 39,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4784",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3631",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=563",
    ],
  },
  {
    id: 194,
    title: "Ergonomic Frozen Chicken",
    price: 214,
    description:
      "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
    category: {
      id: 3,
      name: "Furniture",
      image: "https://api.lorem.space/image/furniture?w=640&h=480&r=6576",
    },
    images: [
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1035",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=6697",
      "https://api.lorem.space/image/furniture?w=640&h=480&r=1986",
    ],
  },
  {
    id: 195,
    title: "Tasty Cotton Soap",
    price: 46,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=5045",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7581",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6074",
    ],
  },
  {
    id: 196,
    title: "Sleek Frozen Towels",
    price: 315,
    description:
      "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
    category: {
      id: 1,
      name: "Clothes",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    images: [
      "https://api.lorem.space/image/fashion?w=640&h=480&r=129",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=9433",
      "https://api.lorem.space/image/fashion?w=640&h=480&r=1614",
    ],
  },
  {
    id: 197,
    title: "Small Fresh Towels",
    price: 33,
    description:
      "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=4445",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=3983",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=8109",
    ],
  },
  {
    id: 198,
    title: "Ergonomic Cotton Chips",
    price: 439,
    description: "The Football Is Good For Training And Recreational Purposes",
    category: {
      id: 4,
      name: "Shoes",
      image: "https://api.lorem.space/image/shoes?w=640&h=480&r=6917",
    },
    images: [
      "https://api.lorem.space/image/shoes?w=640&h=480&r=6979",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7855",
      "https://api.lorem.space/image/shoes?w=640&h=480&r=7903",
    ],
  },
  {
    id: 199,
    title: "Handcrafted Steel Shoes",
    price: 226,
    description:
      "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
    category: {
      id: 2,
      name: "Electronics",
      image: "https://api.lorem.space/image/watch?w=640&h=480&r=9784",
    },
    images: [
      "https://api.lorem.space/image/watch?w=640&h=480&r=6902",
      "https://api.lorem.space/image/watch?w=640&h=480&r=5072",
      "https://api.lorem.space/image/watch?w=640&h=480&r=7125",
    ],
  },
  {
    title: "New Product Course",
    price: 9999,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 201,
  },
  {
    title: "New Product Course",
    price: 9999,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 203,
  },
  {
    title: "New Product Course",
    price: 9999,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 204,
  },
  {
    title: "205",
    price: 212,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 205,
  },
  {
    title: "Producto Nuevo TEST",
    price: 10,
    description: "Una descripcion del producto",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 207,
  },
  {
    title: "Bicycle-Jherom",
    price: 1000,
    description: "Sport bicycle",
    images: [
      "https://s3.ap-south-1.amazonaws.com/choosemybicycle.webp/images/bicycles/nuze-s3-new.webp",
    ],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 218,
  },
  {
    title: "Bicycle-Jherom",
    price: 1000,
    description: "Sport bicycle",
    images: [
      "https://s3.ap-south-1.amazonaws.com/choosemybicycle.webp/images/bicycles/nuze-s3-new.webp",
    ],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 219,
  },
  {
    title: "Case de computadora",
    price: 200,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 223,
  },
  {
    title: "Se cambió este producto xd",
    price: 666,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 224,
  },
  {
    title: "Case de computadora 225",
    price: 200,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 225,
  },
  {
    title: "prducto nuevo",
    price: 9999,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 227,
  },
  {
    title: "EL GORDO DE PLATZY ES PÉSIMO PROFESOR.",
    price: 9999,
    description: "SE LE NOTA QUE NO FUE A LA UNIVERSIDAD, PARA LEER LEO YO.",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 228,
  },
  {
    title: "QA03 TEST",
    price: 75,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 229,
  },
  {
    title: "QA03 TEST",
    price: 75,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 230,
  },
  {
    price: 75,
    title: "QA03 TEST2",
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 231,
  },
  {
    title: "formal shoes",
    description: "nice to look",
    price: 3460,
    images: [],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 232,
  },
  {
    title: "212",
    price: 212,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 240,
  },
  {
    title: "Objeto creado por Skiva",
    price: 721,
    description: "fecha: 8/9/2022",
    images: [
      "https://media-exp1.licdn.com/dms/image/C4E0BAQHh0AcJIkru1g/company-logo_200_200/0/1579651021500?e=2147483647&v=beta&t=f3r9UahQfPBH3bKNTCEjm3BJKQnd0c32bIw3n2oVnSI",
    ],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 244,
  },
  {
    title: "New Product Course",
    price: 9999,
    description: "New product de Lille",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 245,
  },
  {
    title: "New Product Course",
    price: 9999,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 246,
  },
  {
    title: "New Product fresh",
    price: 500,
    description: "Just a fresh product",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 248,
  },
  {
    title: "ojotas",
    price: 110,
    description: "ojotas facheras",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 249,
  },
  {
    title: "ojotas",
    price: 110,
    description: "ojotas messina",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 250,
  },
  {
    title: "bueno",
    price: 999,
    description: "lo mejor",
    images: [""],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 251,
  },
  {
    title: "MMA Gloves",
    price: 1000,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 253,
  },
  {
    title: "MMA Gloves",
    price: 1000,
    description: "A description",
    images: ["https://placeimg.com/640/480/any"],
    category: {
      id: 1,
      name: "Clothes",
      keyLoremSpace: "fashion",
      image: "https://api.lorem.space/image/fashion?w=640&h=480&r=1298",
    },
    id: 254,
  },
];

// for (let i = 0; i < test.length; i++) {
//   // if (test[i].category.name === "Shoes") {
//   let productToInserted = new AllProduct({
//     ProductID: test[i].id,
//     Name: test[i].title,
//     Price: test[i].price,
//     Category: test[i].category.name,
//     img: test[i].images[0],
//   });

//   productToInserted.save().then(() => {
//     console.log("Inserted");
//   });
//   // }
//   // End For Loop
// }

app.listen(3500, function () {
  console.log("Example app listening...");
});

// for (let i = 0; i < test.length; i++) {}
