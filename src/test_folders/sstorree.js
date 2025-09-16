// import { configureStore, createSlice } from "@reduxjs/toolkit";

// // ✅ Load persisted state from localStorage (force array)
// const loadState = (key, fallback) => {
//   try {
//     const data = localStorage.getItem(key);
//     const parsed = data ? JSON.parse(data) : fallback;
//     return Array.isArray(parsed) ? parsed : fallback;
//   } catch {
//     return fallback;
//   }
// };

// // ✅ Save state to localStorage
// const saveState = (key, state) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(state));
//   } catch {}
// };

// // ------------------ PRODUCTS SLICE ------------------
// let productsSlice = createSlice({
//   name: "products",
//   initialState: {
//     veg: [
//       { id: 1001, name: "Carrot", price: 100, unit: "Kg", imageUrl: "/Images/carrot.jpg", rating: 4 },
//       { id: 1002, name: "Brinjal", price: 50, unit: "Kg", imageUrl: "/Images/brinjal.jpg", rating: 3 },
//       { id: 1003, name: "Potato", price: 80, unit: "Kg", imageUrl: "/Images/potato.jpg", rating: 5 },
//       { id: 1004, name: "Spinach", price: 75, unit: "Kg", imageUrl: "/Images/spinach.jpg", rating: 4 },
//       { id: 1005, name: "Tomato", price: 70, unit: "Kg", imageUrl: "/Images/tomato.jpg", rating: 5 },
//       { id: 1006, name: "Cabbage", price: 60, unit: "Kg", imageUrl: "/Images/cabbage.jpg", rating: 3 },
//       { id: 1007, name: "Cauliflower", price: 90, unit: "Kg", imageUrl: "/Images/cauliflower.jpg", rating: 4 },
//       { id: 1008, name: "Onion", price: 85, unit: "Kg", imageUrl: "/Images/onion.jpg", rating: 5 },
//       { id: 1009, name: "Beans", price: 95, unit: "Kg", imageUrl: "/Images/beans.jpg", rating: 4 },
//       { id: 1010, name: "Beetroot", price: 70, unit: "Kg", imageUrl: "/Images/beetroot.jpg", rating: 3 },
//       { id: 1011, name: "Cucumber", price: 60, unit: "Kg", imageUrl: "/Images/cucumber.jpg", rating: 4 },
//       { id: 1012, name: "Radish", price: 55, unit: "Kg", imageUrl: "/Images/radish.jpg", rating: 2 },
//       { id: 1013, name: "Bitter Gourd", price: 50, unit: "Kg", imageUrl: "/Images/bittergourd.jpg", rating: 3 },
//       { id: 1014, name: "Bottle Gourd", price: 65, unit: "Kg", imageUrl: "/Images/bottlegourd.jpg", rating: 4 },
//       { id: 1015, name: "Lady Finger", price: 75, unit: "Kg", imageUrl: "/Images/ladyfinger.jpg", rating: 5 },
//       { id: 1016, name: "Drumstick", price: 120, unit: "Kg", imageUrl: "/Images/drumstick.jpg", rating: 4 },
//     ],
//     nonVeg: [
//       { id: 3001, name: "Mutton", price: 650, unit: "Kg", imageUrl: "/Images/mutton.png", rating: 5 },
//       { id: 3002, name: "Fish Rohu", price: 220, unit: "Kg", imageUrl: "/Images/rohu.png", rating: 4 },
//       { id: 3003, name: "Prawns", price: 450, unit: "Kg", imageUrl: "/Images/prawns.png", rating: 5 },
//       { id: 3004, name: "Eggs (12 pack)", price: 70, unit: "Pack", imageUrl: "/Images/eggs.png", rating: 4 },
//       { id: 3005, name: "Salmon", price: 1200, unit: "Kg", imageUrl: "/Images/salmon.png", rating: 5 },
//       { id: 3006, name: "Chicken Breast", price: 300, unit: "Kg", imageUrl: "/Images/chickenbreast.png", rating: 4 },
//       { id: 3007, name: "Crab", price: 500, unit: "Kg", imageUrl: "/Images/crab.png", rating: 3 },
//       { id: 3008, name: "Quail Meat", price: 400, unit: "Kg", imageUrl: "/Images/quail.png", rating: 4 },
//       { id: 3019, name: "Duck Meat", price: 600, unit: "Kg", imageUrl: "/Images/duck.png", rating: 5 },
//       { id: 3010, name: "Turkey", price: 750, unit: "Kg", imageUrl: "/Images/turkey.png", rating: 4 },
//       { id: 3011, name: "Liver (Goat)", price: 350, unit: "Kg", imageUrl: "/Images/liver.png", rating: 3 },
//       { id: 3012, name: "Chicken Legs", price: 280, unit: "Kg", imageUrl: "/Images/chickenlegs.png", rating: 4 },
//       { id: 3013, name: "Basa Fillet", price: 450, unit: "Kg", imageUrl: "/Images/basa.png", rating: 5 },
//       { id: 3014, name: "Chicken Wings", price: 280, unit: "Kg", imageUrl: "/Images/chickenwings.png", rating: 5 },
//     ],
//     drinks: [
//       { id: 2001, name: "Coca Cola", price: 40, unit: "500ml", imageUrl: "/Images/product3.png", rating: 5 },
//       { id: 2002, name: "Pepsi", price: 40, unit: "500ml", imageUrl: "/Images/pepsi.png", rating: 4 },
//       { id: 2003, name: "Sprite", price: 35, unit: "500ml", imageUrl: "/Images/sprite.png", rating: 4 },
//       { id: 2004, name: "Fanta", price: 35, unit: "500ml", imageUrl: "/Images/fanta.png", rating: 3 },
//       { id: 2005, name: "Mountain Dew", price: 45, unit: "500ml", imageUrl: "/Images/mountaindew.png", rating: 5 },
//       { id: 2006, name: "7Up", price: 35, unit: "500ml", imageUrl: "/Images/7up.png", rating: 4 },
//       { id: 2007, name: "Red Bull", price: 120, unit: "250ml", imageUrl: "/Images/redbull.png", rating: 5 },
//       { id: 2008, name: "Appy Fizz", price: 25, unit: "500ml", imageUrl: "/Images/appyfizz.png", rating: 3 },
//       { id: 2009, name: "Slice", price: 30, unit: "500ml", imageUrl: "/Images/slice.png", rating: 4 },
//       { id: 2010, name: "Maaza", price: 30, unit: "500ml", imageUrl: "/Images/maaza.png", rating: 5 },
//       { id: 2011, name: "Tropicana Orange", price: 50, unit: "1L", imageUrl: "/Images/tropicana.png", rating: 4 },
//       { id: 2012, name: "Paper Boat Aamras", price: 30, unit: "250ml", imageUrl: "/Images/paperboat.png", rating: 3 },
//       { id: 2013, name: "Minute Maid Pulpy Orange", price: 40, unit: "500ml", imageUrl: "/Images/minutemaid.png", rating: 4 },
//       { id: 2014, name: "Bisleri Soda", price: 20, unit: "750ml", imageUrl: "/Images/bislerisoda.png", rating: 3 },
//       { id: 2015, name: "Sting Energy", price: 25, unit: "250ml", imageUrl: "/Images/sting.png", rating: 4 },
//       { id: 2016, name: "Oreo Shake", price: 90, unit: "Glass", imageUrl: "/Images/oreoshake.png", rating: 5 },
//     ],
//     chocolates: [
//       { id: 4001, name: "Dairy Milk", price: 40, unit: "Bar", imageUrl: "/Images/dairymilk.png", rating: 5 },
//       { id: 4002, name: "KitKat", price: 30, unit: "Bar", imageUrl: "/Images/kitkat.png", rating: 4 },
//       { id: 4003, name: "Perk", price: 20, unit: "Bar", imageUrl: "/Images/perk.png", rating: 3 },
//       { id: 4004, name: "5 Star", price: 25, unit: "Bar", imageUrl: "/Images/5star.png", rating: 4 },
//       { id: 4005, name: "Munch", price: 15, unit: "Bar", imageUrl: "/Images/munch.png", rating: 3 },
//       { id: 4006, name: "Snickers", price: 50, unit: "Bar", imageUrl: "/Images/snickers.png", rating: 5 },
//       { id: 4007, name: "Ferrero Rocher (4 pack)", price: 180, unit: "Pack", imageUrl: "/Images/ferrero.png", rating: 5 },
//       { id: 4008, name: "Bounty", price: 60, unit: "Bar", imageUrl: "/Images/bounty.png", rating: 4 },
//       { id: 4009, name: "Lindt", price: 300, unit: "Bar", imageUrl: "/Images/lindt.png", rating: 5 },
//       { id: 4010, name: "Toblerone", price: 250, unit: "Bar", imageUrl: "/Images/toblerone.png", rating: 5 },
//       { id: 4011, name: "MilkyBar", price: 25, unit: "Bar", imageUrl: "/Images/milkybar.png", rating: 3 },
//       { id: 4012, name: "Temptations", price: 100, unit: "Bar", imageUrl: "/Images/temptations.png", rating: 4 },
//       { id: 4013, name: "Amul Dark", price: 120, unit: "Bar", imageUrl: "/Images/amuldark.png", rating: 5 },
//       { id: 4014, name: "Hershey’s", price: 200, unit: "Bar", imageUrl: "/Images/hersheys.png", rating: 4 },
//       { id: 4015, name: "Galaxy", price: 150, unit: "Bar", imageUrl: "/Images/galaxy.png", rating: 5 },
//       { id: 4016, name: "Ritter Sport", price: 220, unit: "Bar", imageUrl: "/Images/ritter.png", rating: 5 },
//     ],
//   },
//   reducers: {},
// });

// // ------------------ CART SLICE ------------------
// // ------------------ CART SLICE ------------------
// let cartSlice = createSlice({
//   name: "cart",
//   initialState: loadState("cart", []),
//   reducers: {
//     addToCart: (state, action) => {
//       let item = state.find((item) => item.id === action.payload.id);
//       if (item) {
//         item.quantity += 1;
//       } else {
//         state.push({ ...action.payload, quantity: 1 });
//       }
//       saveState("cart", state);
//     },

//     increaseQty: (state, action) => {
//       let item = state.find((i) => i.id === action.payload);
//       if (item) item.quantity += 1;
//       saveState("cart", state);
//     },

//     reduceQty: (state, action) => {
//       let item = state.find((i) => i.id === action.payload);
//       if (item) {
//         if (item.quantity > 1) {
//           item.quantity -= 1;
//         } else {
//           // remove if quantity reaches 0
//           return state.filter((i) => i.id !== action.payload);
//         }
//       }
//       saveState("cart", state);
//     },

//     // removeFromCart: (state, action) => {
//     //   return state.filter((item) => item.id !== action.payload.id);
//     // },
//      removeFromCart: (state, action) => {
//           let index = state.findIndex((item) => item.name === action.payload.name);
//           if (index !== -1) state.splice(index, 1);
//           saveState("cart", state);
//         },

//     clearCart: () => {
//       saveState("cart", []);
//       return [];
//     },
//   },
// });


// // ------------------ ORDERS SLICE ------------------
// let orderSlice = createSlice({
//   name: "orders",
//   initialState: loadState("orders", []),
//   reducers: {
//     addOrders: (state, action) => {
//       state.push(action.payload);
//       saveState("orders", state);
//     },
//   },
// });

// export let { addOrders } = orderSlice.actions;
// export let { addToCart, removeFromCart, reduceQty, clearCart, increaseQty } = cartSlice.actions;

// // ------------------ STORE ------------------
// let store = configureStore({
//   reducer: {
//     products: productsSlice.reducer,
//     cart: cartSlice.reducer,
//     orders: orderSlice.reducer,
//   },
// });

// export default store;




























































// import { configureStore, createSlice } from "@reduxjs/toolkit";

// // ✅ Load persisted state from localStorage (force array)
// const loadState = (key, fallback) => {
//   try {
//     const data = localStorage.getItem(key);
//     const parsed = data ? JSON.parse(data) : fallback;
//     return Array.isArray(parsed) ? parsed : fallback;
//   } catch {
//     return fallback;
//   }
// };

// // ✅ Save state to localStorage
// const saveState = (key, state) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(state));
//   } catch {}
// };

// // ------------------ PRODUCTS SLICE ------------------
// let productsSlice = createSlice({
//   name: "products",
//   initialState: {
//     veg: [
//       { id: 1001, name: "Carrot", price: 100, unit: "Kg", imageUrl: "/Images/carrot.jpg", rating: 4 },
//       { id: 1002, name: "Brinjal", price: 50, unit: "Kg", imageUrl: "/Images/brinjal.jpg", rating: 3 },
//       { id: 1003, name: "Potato", price: 80, unit: "Kg", imageUrl: "/Images/potato.jpg", rating: 5 },
//       { id: 1004, name: "Spinach", price: 75, unit: "Kg", imageUrl: "/Images/spinach.jpg", rating: 4 },
//       { id: 1005, name: "Tomato", price: 70, unit: "Kg", imageUrl: "/Images/tomato.jpg", rating: 5 },
//       { id: 1006, name: "Cabbage", price: 60, unit: "Kg", imageUrl: "/Images/cabbage.jpg", rating: 3 },
//       { id: 1007, name: "Cauliflower", price: 90, unit: "Kg", imageUrl: "/Images/cauliflower.jpg", rating: 4 },
//       { id: 1008, name: "Onion", price: 85, unit: "Kg", imageUrl: "/Images/onion.jpg", rating: 5 },
//       { id: 1009, name: "Beans", price: 95, unit: "Kg", imageUrl: "/Images/beans.jpg", rating: 4 },
//       { id: 1010, name: "Beetroot", price: 70, unit: "Kg", imageUrl: "/Images/beetroot.jpg", rating: 3 },
//       { id: 1011, name: "Cucumber", price: 60, unit: "Kg", imageUrl: "/Images/cucumber.jpg", rating: 4 },
//       { id: 1012, name: "Radish", price: 55, unit: "Kg", imageUrl: "/Images/radish.jpg", rating: 2 },
//       { id: 1013, name: "Bitter Gourd", price: 50, unit: "Kg", imageUrl: "/Images/bittergourd.jpg", rating: 3 },
//       { id: 1014, name: "Bottle Gourd", price: 65, unit: "Kg", imageUrl: "/Images/bottlegourd.jpg", rating: 4 },
//       { id: 1015, name: "Lady Finger", price: 75, unit: "Kg", imageUrl: "/Images/ladyfinger.jpg", rating: 5 },
//       { id: 1016, name: "Drumstick", price: 120, unit: "Kg", imageUrl: "/Images/drumstick.jpg", rating: 4 },
//     ],
//     nonVeg: [
//       { id: 3001, name: "Mutton", price: 650, unit: "Kg", imageUrl: "/Images/mutton.png", rating: 5 },
//       { id: 3002, name: "Fish Rohu", price: 220, unit: "Kg", imageUrl: "/Images/rohu.png", rating: 4 },
//       { id: 3003, name: "Prawns", price: 450, unit: "Kg", imageUrl: "/Images/prawns.png", rating: 5 },
//       { id: 3004, name: "Eggs (12 pack)", price: 70, unit: "Pack", imageUrl: "/Images/eggs.png", rating: 4 },
//       { id: 3005, name: "Salmon", price: 1200, unit: "Kg", imageUrl: "/Images/salmon.png", rating: 5 },
//       { id: 3006, name: "Chicken Breast", price: 300, unit: "Kg", imageUrl: "/Images/chickenbreast.png", rating: 4 },
//       { id: 3007, name: "Crab", price: 500, unit: "Kg", imageUrl: "/Images/crab.png", rating: 3 },
//       { id: 3008, name: "Quail Meat", price: 400, unit: "Kg", imageUrl: "/Images/quail.png", rating: 4 },
//       { id: 3019, name: "Duck Meat", price: 600, unit: "Kg", imageUrl: "/Images/duck.png", rating: 5 },
//       { id: 3010, name: "Turkey", price: 750, unit: "Kg", imageUrl: "/Images/turkey.png", rating: 4 },
//       { id: 3011, name: "Liver (Goat)", price: 350, unit: "Kg", imageUrl: "/Images/liver.png", rating: 3 },
//       { id: 3012, name: "Chicken Legs", price: 280, unit: "Kg", imageUrl: "/Images/chickenlegs.png", rating: 4 },
//       { id: 3013, name: "Basa Fillet", price: 450, unit: "Kg", imageUrl: "/Images/basa.png", rating: 5 },
//       { id: 3014, name: "Chicken Wings", price: 280, unit: "Kg", imageUrl: "/Images/chickenwings.png", rating: 5 },
//     ],
//     drinks: [
//       { id: 2001, name: "Coca Cola", price: 40, unit: "500ml", imageUrl: "/Images/product3.png", rating: 5 },
//       { id: 2002, name: "Pepsi", price: 40, unit: "500ml", imageUrl: "/Images/pepsi.png", rating: 4 },
//       { id: 2003, name: "Sprite", price: 35, unit: "500ml", imageUrl: "/Images/sprite.png", rating: 4 },
//       { id: 2004, name: "Fanta", price: 35, unit: "500ml", imageUrl: "/Images/fanta.png", rating: 3 },
//       { id: 2005, name: "Mountain Dew", price: 45, unit: "500ml", imageUrl: "/Images/mountaindew.png", rating: 5 },
//       { id: 2006, name: "7Up", price: 35, unit: "500ml", imageUrl: "/Images/7up.png", rating: 4 },
//       { id: 2007, name: "Red Bull", price: 120, unit: "250ml", imageUrl: "/Images/redbull.png", rating: 5 },
//       { id: 2008, name: "Appy Fizz", price: 25, unit: "500ml", imageUrl: "/Images/appyfizz.png", rating: 3 },
//       { id: 2009, name: "Slice", price: 30, unit: "500ml", imageUrl: "/Images/slice.png", rating: 4 },
//       { id: 2010, name: "Maaza", price: 30, unit: "500ml", imageUrl: "/Images/maaza.png", rating: 5 },
//       { id: 2011, name: "Tropicana Orange", price: 50, unit: "1L", imageUrl: "/Images/tropicana.png", rating: 4 },
//       { id: 2012, name: "Paper Boat Aamras", price: 30, unit: "250ml", imageUrl: "/Images/paperboat.png", rating: 3 },
//       { id: 2013, name: "Minute Maid Pulpy Orange", price: 40, unit: "500ml", imageUrl: "/Images/minutemaid.png", rating: 4 },
//       { id: 2014, name: "Bisleri Soda", price: 20, unit: "750ml", imageUrl: "/Images/bislerisoda.png", rating: 3 },
//       { id: 2015, name: "Sting Energy", price: 25, unit: "250ml", imageUrl: "/Images/sting.png", rating: 4 },
//       { id: 2016, name: "Oreo Shake", price: 90, unit: "Glass", imageUrl: "/Images/oreoshake.png", rating: 5 },
//     ],
//     chocolates: [
//       { id: 4001, name: "Dairy Milk", price: 40, unit: "Bar", imageUrl: "/Images/dairymilk.png", rating: 5 },
//       { id: 4002, name: "KitKat", price: 30, unit: "Bar", imageUrl: "/Images/kitkat.png", rating: 4 },
//       { id: 4003, name: "Perk", price: 20, unit: "Bar", imageUrl: "/Images/perk.png", rating: 3 },
//       { id: 4004, name: "5 Star", price: 25, unit: "Bar", imageUrl: "/Images/5star.png", rating: 4 },
//       { id: 4005, name: "Munch", price: 15, unit: "Bar", imageUrl: "/Images/munch.png", rating: 3 },
//       { id: 4006, name: "Snickers", price: 50, unit: "Bar", imageUrl: "/Images/snickers.png", rating: 5 },
//       { id: 4007, name: "Ferrero Rocher (4 pack)", price: 180, unit: "Pack", imageUrl: "/Images/ferrero.png", rating: 5 },
//       { id: 4008, name: "Bounty", price: 60, unit: "Bar", imageUrl: "/Images/bounty.png", rating: 4 },
//       { id: 4009, name: "Lindt", price: 300, unit: "Bar", imageUrl: "/Images/lindt.png", rating: 5 },
//       { id: 4010, name: "Toblerone", price: 250, unit: "Bar", imageUrl: "/Images/toblerone.png", rating: 5 },
//       { id: 4011, name: "MilkyBar", price: 25, unit: "Bar", imageUrl: "/Images/milkybar.png", rating: 3 },
//       { id: 4012, name: "Temptations", price: 100, unit: "Bar", imageUrl: "/Images/temptations.png", rating: 4 },
//       { id: 4013, name: "Amul Dark", price: 120, unit: "Bar", imageUrl: "/Images/amuldark.png", rating: 5 },
//       { id: 4014, name: "Hershey’s", price: 200, unit: "Bar", imageUrl: "/Images/hersheys.png", rating: 4 },
//       { id: 4015, name: "Galaxy", price: 150, unit: "Bar", imageUrl: "/Images/galaxy.png", rating: 5 },
//       { id: 4016, name: "Ritter Sport", price: 220, unit: "Bar", imageUrl: "/Images/ritter.png", rating: 5 },
//     ],
//   },
//   reducers: {},
// });

// // ------------------ CART SLICE ------------------
// let cartSlice = createSlice({
//   name: "cart",
//   initialState: loadState("cart", []),
//   reducers: {
//     addToCart: (state, action) => {
//       let item = state.find((item) => item.id === action.payload.id);
//       if (item) {
//         item.quantity += 1;
//       } else {
//         state.push({ ...action.payload, quantity: 1 });
//       }
//       saveState("cart", state);
//     },

//     increaseQty: (state, action) => {
//       let item = state.find((i) => i.id === action.payload);
//       if (item) item.quantity += 1;
//       saveState("cart", state);
//     },

//     reduceQty: (state, action) => {
//       let item = state.find((i) => i.id === action.payload);
//       if (item) {
//         if (item.quantity > 1) {
//           item.quantity -= 1;
//         } else {
//           // remove if quantity reaches 0
//           return state.filter((i) => i.id !== action.payload);
//         }
//       }
//       saveState("cart", state);
//     },

//     // removeFromCart: (state, action) => {
//     //   return state.filter((item) => item.id !== action.payload.id);
//     // },
//      removeFromCart: (state, action) => {
//           let index = state.findIndex((item) => item.name === action.payload.name);
//           if (index !== -1) state.splice(index, 1);
//           saveState("cart", state);
//         },

//     clearCart: () => {
//       saveState("cart", []);
//       return [];
//     },
//   },
// });


// // ------------------ ORDERS SLICE ------------------
// let orderSlice = createSlice({
//   name: "orders",
//   initialState: loadState("orders", []),
//   reducers: {
//     addOrders: (state, action) => {
//       state.push(action.payload);
//       saveState("orders", state);
//     },
//   },
// });

// export let { addOrders } = orderSlice.actions;
// export let { addToCart, removeFromCart, reduceQty, clearCart, increaseQty } = cartSlice.actions;

// // ------------------ STORE ------------------
// let store = configureStore({
//   reducer: {
//     products: productsSlice.reducer,
//     cart: cartSlice.reducer,
//     orders: orderSlice.reducer,
//   },
// });

// export default store;
