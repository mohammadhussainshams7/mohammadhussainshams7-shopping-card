/* Change cart Count From Navbar */
export default function changeCartCount() {
   
    // Check if there's any cart data in localStorage, and if so, load it into the cart object
    if (localStorage.getItem("cart")) {
      let getLengthCart = Object.keys(JSON.parse(localStorage.getItem("cart"))).length
      document.getElementById("cart-link-navbar").innerText=getLengthCart;
    }
  }


 export function findOutIfTheUserIsLoggedInOrNot() {
    let loginButton = document.getElementById("loginName");
  
    if (localStorage.getItem("dataUser")) {
      loginButton.innerHTML = localStorage.getItem("dataUser");
      loginButton.addEventListener("click", () => {
        localStorage.removeItem("dataUser");
        window.location.replace("login.html");
      });
    } else {
      loginButton.innerHTML = "Login";
      loginButton.addEventListener("click", () => {
        window.location.replace("login.html");
      });
    }
  }

  export function ifINotHaveLogin() {
    if (!localStorage.getItem("dataUser")) {
      window.location.replace("login.html");
    }
  }

