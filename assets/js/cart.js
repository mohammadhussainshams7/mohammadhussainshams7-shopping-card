import changeCartCount, { findOutIfTheUserIsLoggedInOrNot, ifINotHaveLogin } from "./globalFunction.js";

const localStorageData = JSON.parse(localStorage.getItem("cart")) || {};
let total = 0;
function CartDisplay() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  for (let product in localStorageData) {
    const listItem = document.createElement("li");

    listItem.classList.add("d-flex", "align-items-center");

    const img = document.createElement("img");
    img.classList.add("img-fluid", "m-5");
    img.width = "50";
    img.src = window.location.origin + "/shopping-card/" + localStorageData[product].imageSrc;

    const nameInSpan = document.createElement("span");
    nameInSpan.innerText = `${product}`;

    const priceText = document.createElement("span");
    priceText.innerText = " Total Price: ";

    const priceInSpan = document.createElement("span");
    priceInSpan.innerText = localStorageData[product].totalPrice.toFixed(2);
    priceInSpan.classList.add("iPrice");

    const input = document.createElement("input");
    input.type = "number";
    input.value = localStorageData[product].quantity;
    input.classList.add("form-control");
    input.addEventListener("change", (event) => {
      if (
        event.target.value <= 0 &&
        confirm(`Are you sure you want to delete ${product}?`)
      ) {
        const listItem = event.target.closest("li"); // Find the closest <li> element
        if (listItem) {
          listItem.remove(); // Remove the listItem from the DOM
          delete localStorageData[product];
          localStorage.setItem("cart", JSON.stringify(localStorageData));
          changeCartCount();
        }
      } else {
        let updatedQuantity = event.target.value;
        let totalPriceItem =
          localStorageData[product]?.productPrice * updatedQuantity;
        priceInSpan.innerText = totalPriceItem.toFixed(2); // Update the price display
        localStorageData[product].quantity = updatedQuantity; // Update the quantity in localStorageData
        localStorage.setItem("cart", JSON.stringify(localStorageData));
      }
      showTotalItems(); // Recalculate the total after changes
    });

    const deleteElement = document.createElement("button");
    deleteElement.classList.add("btn", "btn-danger", "m-2");
    deleteElement.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteElement.addEventListener("click", function (event) {
      if (confirm(`Are you sure you want to delete ${product}?`)) {
        const listItem = event.target.closest("li"); // Find the closest <li> element
        if (listItem) {
          listItem.remove(); // Remove the listItem from the DOM
          delete localStorageData[product];
          localStorage.setItem("cart", JSON.stringify(localStorageData));
          changeCartCount();
          showTotalItems(); 
        }
      }
    });

    cartList.appendChild(listItem);
    listItem.appendChild(img);
    listItem.appendChild(nameInSpan);
    listItem.appendChild(input);
    listItem.appendChild(priceText);
    listItem.appendChild(priceInSpan);
    listItem.appendChild(deleteElement);
  }


  showTotalItems();
}

function showTotalItems() {
  let totalpriceclass = document.querySelector(".totalPrice");
  totalpriceclass.innerHTML = "";

  let getLength = Object.keys(localStorageData).length;

  if (localStorageData && getLength > 0) {
    for (let a in localStorageData) {
      total += localStorageData[a].productPrice * localStorageData[a].quantity;
    }
    totalpriceclass.innerText = "Total: " + total.toFixed(2) + " $"; // Display total with two decimals
  } else {
    totalpriceclass.innerText = "Empty Shopping Cart ";
  }
}

window.addEventListener("DOMContentLoaded", (ev) => {
  ifINotHaveLogin();
  CartDisplay();
  changeCartCount();
  findOutIfTheUserIsLoggedInOrNot();
});
