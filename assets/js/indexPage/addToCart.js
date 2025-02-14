let cart = JSON.parse(localStorage.getItem("cart")) || {};

import changeCartCount,{ifINotHaveLogin} from "../globalFunction.js";


export default function addToCart(productName, productPrice, imageSrc) {
  ifINotHaveLogin();
  if (cart[productName]) {
    // If the product already exists in the cart, call ifIHaveThisItem
    ifIHaveThisItem(productName, productPrice);
  } else {
    // If the product doesn't exist in the cart, call ifIDontHaveThisItem
    ifIDontHaveThisItem(productName, productPrice, imageSrc);
    
  }
  
  // Save the updated cart data in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  changeCartCount()
  alert(`This Item is Added: ${productName}`)
}

// Update the quantity and total price if the item already exists in the cart
function ifIHaveThisItem(productName, productPrice) {
  cart[productName].quantity += 1;
  cart[productName].totalPrice += productPrice;
}

// Add the new item to the cart if it doesn't already exist
function ifIDontHaveThisItem(productName, productPrice, imageSrc) {
  cart[productName] = {
    quantity: 1,
    totalPrice: productPrice,
    productPrice: productPrice,
    imageSrc: imageSrc,
  };
  changeCartCount();
}



