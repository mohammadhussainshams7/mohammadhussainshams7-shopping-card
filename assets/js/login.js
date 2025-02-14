import users from "./login/users.js"
function login() {
    let form = document.getElementById("loginForm");
    let username = document.getElementById("UserName");
    let password = document.getElementById("password");
    let errorLogin = document.getElementById("error-login");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      for (let index = 0; index < users.length; index++) {
        if (
          users[index].userName === username.value &&
          users[index].password === password.value
        ) {
          /* Save In local Storage */
          localStorage.setItem("dataUser", username.value);
          // replace current URL with newURL
          window.location.replace("index.html");
          break;
        } else {
          errorLogin.classList.remove("d-none");
        }
      }
    });
  }

  function ifIHaveLogin() {
    if (localStorage.getItem("dataUser")) {
      window.location.replace("index.html");
    }
  }

  window.addEventListener("DOMContentLoaded", ev=>{
    ifIHaveLogin();
    login();
  })