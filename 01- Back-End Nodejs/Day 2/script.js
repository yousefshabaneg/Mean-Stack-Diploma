// // ! YEAR % 12
// // 0 => MONKEY
// // 1 => ROOSTER
// // 2 ==> DOG
// // 3 ==> PIG
// // 4 => RAT
// // 5 => OX
// // 6 => TIGER
// // 7 => HARE
// // 8 => DRAGON
// // 9 => SNAKE
// // 10 => HORSE
// // 11 => RAM
// /*
// const arr = [
//   "MONKEY",
//   "ROOSTER",
//   "DOG",
//   "PIG",
//   "RAT",
//   "OX",
//   "TIGER",
//   "HARE",
//   "DRAGON",
//   "SNAKE",
//   "HORSE",
//   "RAM",
// ];

// const x = +prompt("Enter Your Year: ");

// const zodiacMod = x % 12;

// console.log(arr[zodiacMod]);
//  */

// const products = [
//   {
//     id: 1,
//     title: "iPhone 9",
//     description: "An apple mobile which is nothing like apple",
//     price: 549,
//     discountPercentage: 12.96,
//     rating: 4.69,
//     stock: 4,
//     brand: "Apple",
//     category: "smartphones",
//   },
//   {
//     id: 2,
//     title: "iPhone X",
//     description:
//       "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
//     price: 899,
//     discountPercentage: 17.94,
//     rating: 4.44,
//     stock: 5,
//     brand: "Apple",
//     category: "smartphones",
//   },
//   {
//     id: 3,
//     title: "Samsung Universe 9",
//     description:
//       "Samsung's new variant which goes beyond Galaxy to the Universe",
//     price: 1249,
//     discountPercentage: 15.46,
//     rating: 4.09,
//     stock: 36,
//     brand: "Samsung",
//     category: "smartphones",
//   },
//   {
//     id: 4,
//     title: "OPPOF19",
//     description: "OPPO F19 is officially announced on April 2021.",
//     price: 280,
//     discountPercentage: 17.91,
//     rating: 4.3,
//     stock: 123,
//     brand: "OPPO",
//     category: "smartphones",
//   },
//   {
//     id: 5,
//     title: "Huawei P30",
//     description:
//       "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
//     price: 499,
//     discountPercentage: 10.58,
//     rating: 4.09,
//     stock: 32,
//     brand: "Huawei",
//     category: "smartphones",
//   },
//   {
//     id: 6,
//     title: "MacBook Pro",
//     description:
//       "MacBook Pro 2021 with mini-LED display may launch between September, November",
//     price: 1749,
//     discountPercentage: 11.02,
//     rating: 4.57,
//     stock: 83,
//     brand: "APPle",
//     category: "laptops",
//     thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
//   },
//   {
//     id: 7,
//     title: "Samsung Galaxy Book",
//     description:
//       "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
//     price: 1499,
//     discountPercentage: 4.15,
//     rating: 4.25,
//     stock: 50,
//     brand: "Samsung",
//     category: "laptops",
//   },
// ];

// const highPriceProducts = products
//   .filter((x) => x.price >= 1000)
//   .map((v) => ({
//     price: v.price,
//     title: v.title,
//   }));

// class Human {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// const joe = new Human("Yousef", 23);

// joe.birthYear = 2022 - joe.age;

// delete joe.age;
// // console.log(joe);

// const newClosure = (x, y) => {
//   return {
//     x,
//     y,
//     add() {
//       return x + y;
//     },
//     increaseY() {
//       this.y++;
//     },
//   };
// };

// const c1 = newClosure(5, 6);
// c1.increaseY();
// // console.log(c1);

// test = (x, y, cb) => {
//   (() => {
//     () => {
//       cb(5);
//     };
//   })();
// };

// test(3, 4, (x) => console.log(x));

// // Promises

// const divideByZero = (x) => {
//   return new Promise((resolve, reject) => {
//     if (x != 0) resolve(x);
//     else reject(new Error("Can't divide by 0"));
//   });
// };

// const num = 100;
// const x = divideByZero(4)
//   .then((res) => divideByZero(10))
//   .catch((err) => console.error(err));
/*
const url = "https://dummyjson.com/products";

const getDataFromApi = async function (url, cb) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    cb(data.products, null);
  } catch (err) {
    cb(null, err);
  }
};

getDataFromApi(url, (products) => console.log(products));
*/

const baseUrl = "https://dummyjson.com/";
const apis = ["posts", "products"];
const btnWrapSection = document.querySelector("#btnWrap");
const resultSection = document.querySelector("#result");
const tableBody = document.querySelector(".body-result");

const apiRequest = async (url, cb) => {
  try {
    const res = await (await fetch(baseUrl + url)).json();
    cb(res[url], null);
  } catch (e) {
    cb(null, `Error Occurred ${e.message}`);
  }
};

const drawRow = (item) => {
  return `
  <tr>
    <td>${item.id}</td>
    <td>${item.title}</td>
  </tr>`;
};

const drawAllData = (res, err) => {
  if (err) {
    console.error(err);
    return;
  }

  tableBody.innerHTML = "";
  res.forEach((item) => {
    const row = drawRow(item);
    tableBody.innerHTML += row;
  });
};

const getApiData = () => {
  apis.forEach((a) => {
    const btn = document.createElement("button");
    btnWrapSection.append(btn);
    btn.innerText = a;
    btn.addEventListener("click", (e) => {
      apiRequest(a, drawAllData);
    });
  });
};

getApiData();
