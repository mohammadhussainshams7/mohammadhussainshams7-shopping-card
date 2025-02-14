import products from "./indexPage/products.js";
import addToCart from "./indexPage/addToCart.js";
import changeCartCount , {findOutIfTheUserIsLoggedInOrNot} from "./globalFunction.js";



/* Show All Products In Html Element */
function createProductCard() {
    for (const product in products){
        // Create the outer div for the card
        const cardDiv = document.createElement('div');
        cardDiv.classList.add( "col-md-3");
        
        // Create the card div
        const card = document.createElement('div');
        card.classList.add('card');
    
        // Create the image container div
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        // Create the image element
        const img = document.createElement('img');
        img.src = products[product].imageSrc;
        img.classList.add('card-img-top');
        img.alt = products[product].title;
        img.width = "30"
        // Append the image to the image container
        imgContainer.appendChild(img);
    
        // Create the card body div
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
    
        // Create and append the card title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = products[product].title;
    
        // Create and append the card description
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = products[product].description;
    
        // Create and append the price paragraph
        const price = document.createElement('p');
        price.innerHTML = `Price: <span>${products[product].price}</span>`;
    
        // Create the Add To Cart button
        const addButton = document.createElement('button');
        addButton.classList.add('btn', 'btn-primary');
        addButton.innerHTML = 'Add To Cart <i class="fa-solid fa-cart-shopping"></i>';
    
        // Add the onclick handler to the button
        addButton.onclick = function () {
            addToCart(products[product].title, products[product].price, products[product].imageSrc);
        };
    
        // Append all elements to the card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(price);
        cardBody.appendChild(addButton);
    
        // Append the image container and card body to the card div
        card.appendChild(imgContainer);
        card.appendChild(cardBody);
    
        // Append the card to the outer div (card div)
        cardDiv.appendChild(card);
    
        // Append the entire card div to the container
        document.getElementById('productElement').appendChild(cardDiv);
    }
}

window.addEventListener("DOMContentLoaded",(ev=>

    {
        createProductCard();
        changeCartCount();
        findOutIfTheUserIsLoggedInOrNot();
    }
))
