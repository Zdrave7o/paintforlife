//items. item creation and display
const colorItems = [];
const cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function() {
    openPage("home-page");
    createPaints();
    displayPaints(colorItems);
    displayTrending(colorItems);
    updateCart(cart);
});

function addPaint(color, price, type, id){
    type = type.charAt(0).toUpperCase() + type.slice(1);
    let imageName = color.split("@")[0] + (color.split("@")[1] || "");
    switch(type) {
        case "Paint":
            imageName = `${imageName}.png`;
            break;
        case "Spray":
            imageName = `${imageName}-spray.png`;
            break;
        default:
            console.error("Unknown paint type:", type);
            return;
    }


    class Paint{
    constructor(color, price, id){
        this.id = id;
        this.color = color,
        this.type = type || "Paint",
        this.image = imageName,
        this.price = Number(price)
    }
    }   

    colorItems.push(new Paint(color, price, id));
}

//creating the products
function createPaints(){
    let colorCreationId = 0;
    addPaint("dodger@blue", 14.99, "paint", colorCreationId++);
    addPaint("light@green", 14.99, "paint", colorCreationId++);
    addPaint("red@", 14.99, "paint", colorCreationId++);
    addPaint("pink@", 14.99, "paint", colorCreationId++);
    addPaint("yellow@", 14.99, "paint", colorCreationId++);

    addPaint("purple@", 14.99, "spray", colorCreationId++);
    addPaint("yellow@", 14.99, "spray", colorCreationId++);
    addPaint("red@", 14.99, "spray", colorCreationId++);
}

//displaying the  products
function displayPaints(colorItems){
    let html = "";

    //displaying the paints
    const paints = colorItems.filter(paint => paint.type === "Paint");
    paints.forEach(paint => {
        let firstWord = paint.color.split("@")[0];
        let secondWord = paint.color.split("@")[1] || "";
        let message = `${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${paint.type} added to cart.`;
        html+= `<div class="card shadow-sm border-0 col-12 col-sm-6 col-md-4 mb-4 m-3 product-card" style="max-width: 300px;">
                        <img src="assets/${paint.image}" class="img-fluid w-50 m-auto cursor-pointer" alt="Product Image" onclick="openProductPage('${paint.color}', ${paint.price}, '${paint.type}', ${paint.id}, '${paint.image}')">
                        <div class="card-body">
                            <h5 class="card-title cursor-pointer" onclick="openProductPage('${paint.color}', ${paint.price}, '${paint.type}', ${paint.id}, '${paint.image}')">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${paint.type}</h5>
                            <p class="card-text cursor-pointer text-muted mb-1" onclick="openProductPage('${paint.color}', ${paint.price}, '${paint.type}', ${paint.id}, '${paint.image}')">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} paint designed for smooth finish</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="fw-bold">$${paint.price.toFixed(2)}</span>
                                <button class="btn btn-sm" style="background-color:${firstWord + secondWord}; color:black; font-weight:bold;" onclick="addToCart(${paint.id}); showNotification('${message}');">Add to Cart</button>
                            </div>
                        </div>
                    </div>`


    })

    document.querySelector("#all-paints").innerHTML = html;
    document.querySelector("#paints-list").innerHTML = html;

    html = "";

    //displaying the spray cans
    const sprays = colorItems.filter(paint => paint.type === "Spray");
    sprays.forEach(paint => {
        let firstWord = paint.color.split("@")[0];
        let secondWord = paint.color.split("@")[1] || "";
        let message = `${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${paint.type} added to cart.`;
        html+= `<div class="card shadow-sm border-0 col-12 col-sm-6 col-md-4 mb-4 m-3 product-card" style="max-width: 300px;">
                        <img src="assets/${paint.image}" class="img-fluid w-50 m-auto cursor-pointer" alt="Product Image" onclick="openProductPage('${paint.color}', ${paint.price}, '${paint.type}', ${paint.id}, '${paint.image}')">
                        <div class="card-body">
                            <h5 class="card-title cursor-pointer" onclick="openProductPage('${paint.color}', ${paint.price}, '${paint.type}', ${paint.id}, '${paint.image}')">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} Spray Can</h5>
                            <p class="card-text cursor-pointer text-muted mb-1" onclick="openProductPage('${paint.color}', ${paint.price}, '${paint.type}', ${paint.id}, '${paint.image}')">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} spray designed for all surfaces</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="fw-bold">$${paint.price.toFixed(2)}</span>
                                <button class="btn btn-sm" style="background-color:${firstWord + secondWord}; color:black; font-weight:bold;" onclick="addToCart(${paint.id}); showNotification('${message}');">Add to Cart</button>
                            </div>
                        </div>
                    </div>`
    })

    document.querySelector("#spray-cans").innerHTML = html;
    document.querySelector("#sprays-list").innerHTML = html;
    
}

//displaying trending products
function displayTrending(colorItems){
    let html = "";
    index = 0;
    colorItems.slice(0, 2).forEach(paint => {
        let firstWord = paint.color.split("@")[0];
        let secondWord = paint.color.split("@")[1] || "";
        let message = `${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${paint.type} added to cart.`;
        html+= `<div class="card shadow-sm
         border-0 col-12 col-sm-6 col-md-4 mb-4 m-3 product-card" style="max-width: 300px;">
                        <img src="assets/${paint.image}" class="img-fluid w-50 m-auto cursor-pointer" alt="Product Image" onclick="openProductPage('${paint.color}', ${paint.price}, '${paint.type}', ${paint.id}, '${paint.image}')">
                        <div class="card-body">
                            <h5 class="card-title cursor-pointer" onclick="openProductPage('${paint.color}', ${paint.price}, '${paint.type}', ${paint.id}, '${paint.image}')">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${paint.type}</h5>
                            <p class="card-text cursor-pointer text-muted mb-1" onclick="openProductPage('${paint.color}', ${paint.price}, '${paint.type}', ${paint.id}, '${paint.image}')">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} paint designed for smooth finish</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="fw-bold">$${paint.price.toFixed(2)}</span>
                                <button class="btn btn-sm" style="background-color:${firstWord + secondWord}; color:black; font-weight:bold;" onclick="addToCart(${paint.id}); showNotification('${message}');">Add to Cart</button>
                            </div>
                        </div>
                    </div>`
        index++;
    })
    document.querySelector("#trending").innerHTML = html;
}

//cart actions

//adding item to cart
function addToCart(id){
    const paint = colorItems.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);
    if(existing){
        existing.quantity++;
    }else{
        cart.push({...paint, quantity: 1});
    }

    updateCart(cart);
}


//updating cart's state
function updateCart(items){
    localStorage.setItem("cart", JSON.stringify(items));//setting the cart to local storage
    items = JSON.parse(localStorage.getItem("cart")) || [];//fetching the cart items from local storage
    let total = 0;
    let itemCount = 0;
    let html = `<div class="d-flex justify-content-between align-items-center mb-4">
                            <h3 class="fw-normal cursor-pointer mb-0">Cart</h3>
                            <h4 class="fw-normal cursor-pointer mb-0" onclick="closeCart()">Close</h4>
                            <div>
                                <p class="mb-0"><span class="text-body" id="total">Total: </span></p>
                            </div>
                        </div>`;

    //displaying each item in the cart
    items.forEach(item => {
        total += item.price * item.quantity;
        itemCount += item.quantity;
        let firstWord = item.color.split("@")[0];
        let secondWord = item.color.split("@")[1] || "";
        let message = `${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${item.type} added to cart.`;
        html += `       <div class="card-body p-4 bg-white mb-4 rounded-3 shadow-sm">
                                <div class="row d-flex justify-content-between align-items-center">
                                    <div class="col-md-2 col-lg-2 col-xl-2">
                                        <img src="assets/${item.image}"
                                            class="img-fluid rounded-3" alt="paint" onclick="openProductPage('${item.color}', ${item.price}, '${item.type}', ${item.id}, '${item.image}')">
                                    </div>
                                    <div class="col-md-3 col-lg-3 col-xl-3">
                                        <p class="lead fw-normal cursor-pointer mb-2" onclick="openProductPage('${item.color}', ${item.price}, '${item.type}', ${item.id}, '${item.image}')">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${item.type}
                                        </p>
                                    </div>
                                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                        <button class="btn quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>

                                        <h4>${item.quantity}</h4>

                                        <button class="btn quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                                    </div>
                                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                        <h5 class="mb-0">${item.price.toFixed(2)}$</h5>
                                    </div>
                                    <div class="col-md-1 col-lg-2 col-xl-2 text-end">
                                        <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg" onclick="removeFromCart(${item.id}); showNotification('${message}');">Remove</i></a>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        console.log(item);
        
    })

    //displaying bottom information and contents of the cart
    document.querySelector("#cartHtml").innerHTML = html + `
                            <div class="card mb-4">
                            <div class="card-body p-4 d-flex flex-row">
                                <div class="form-outline flex-fill">
                                    <p class="lead fw-normal mb-2">Total items: ${itemCount}</p>
                                    <p class="lead fw-normal mb-2" id="total2">Total price: $<span id="total">${total.toFixed(2)}</span></p>
                                </div>
                            </div>
                        </div>

                        <div class="card mb-4">
                            <div class="card-body p-4 d-flex flex-row">
                                <div data-mdb-input-init class="form-outline flex-fill">
                                    <input type="text" id="promo" class="form-control form-control-lg" />
                                    <label class="form-label" for="promo">Discount code</label>
                                </div>
                                <button type="button" data-mdb-button-init data-mdb-ripple-init
                                    class="btn btn-outline-warning btn-lg ms-3" onclick='applyPromoCode()'>Apply</button>
                            </div>
                        </div>
            
                        <div class="card">
                            <div class="card-body">
                                <button type="button" data-mdb-button-init data-mdb-ripple-init
                                    class="btn btn-warning btn-block btn-lg" onclick='openOrderMenu()'>Proceed to Order</button>
                            </div>
                        </div>`;
    console.log(total.toFixed(2));
    document.querySelector("#total").textContent =`Total: $${total.toFixed(2)}`;
}

//removing an item from the cart
function removeFromCart(id){
    const item = cart.find(p => p.id === id);
    if (item) {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
    }

    updateCart(cart);
    
}

//changing quantity of products in the cart
function changeQuantity(id, delta) {
    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        let firstWord = item.color.split("@")[0];
        let secondWord = item.color.split("@")[1] || "";
        
        showNotification(`${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${item.type} removed from cart.`);
        removeFromCart(id);
    }

    updateCart(cart);
}

let cartHtml = document.querySelector("#cart");


//opening and closing the cart
function openCart(){
    cartHtml.style.display = "block";
}

function closeCart(){
    cartHtml.style.display = "none";
}

//search bar
function searchPaints(query) {
    const results = colorItems.filter(paint => paint.color.toLowerCase().includes(query.toLowerCase()));
    displayPaints(results);
}

document.querySelector(".search-button").addEventListener("click", function(event) {
    event.preventDefault();
    const query = document.querySelector(".search").value;
    searchPaints(query);
});

//promo code
let isUsed = false;


//applying the promo code
function applyPromoCode() {
    const secretCode = "PAINT20";
    const inputCode = document.querySelector("#promo").value.trim();
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before applying a promo code.");
    }
    else if (inputCode === secretCode && isUsed === false) {
        alert("Promo code applied successfully! You get a 20% discount.");
        isUsed = true;
        const totalElement = document.querySelector("#total");
        const currentTotal = parseFloat(totalElement.textContent.replace("Total: $", ""));
        const discountedTotal = currentTotal * 0.8; // Apply 20% discount
        totalElement.textContent = `Total: $${discountedTotal.toFixed(2)}`;
        document.querySelector("#total2").textContent = `Total price: $${discountedTotal.toFixed(2)}`;
    } else {
        switch (inputCode) {
            case "":
                alert("Please enter a promo code.");
                break;
            case secretCode:
                alert("Promo code already used.");
                break;
            default:
                alert("Invalid promo code. Please try again.");
        }
    }
}

//order menu
const orderMenu = document.querySelector("#order-menu");

//opening the order menu
function openOrderMenu() {
    if(cart.length <= 0 ){
        window.alert("You should add items to your cart before proceeding");
    } else{
        closeCart();
        orderMenu.style.display = "flex";
    }
}

//closing the order menu
function closeOrderMenu() {
    orderMenu.style.display = "none";
}

//notification
function showNotification(message) {
    const notification = document.querySelector(".notification");
    notification.innerHTML= `<div class="container bg-light w-50 shadow p-3" style="min-height: 50px;">
                <h5>${message}</h5>
            </div>`;
    notification.classList.add("show");

    setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

//order
//sends the order to python flask server
function confirmOrder() {
    const name = document.querySelector("#name").value;
    const secondName = document.querySelector("#second-name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const address = document.querySelector("#address").value;
    if(cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before placing an order.");
        return;
    }

    //testing for proper input
    if (!name || !email || !phone || !address) {
        alert("Please fill in all fields.");
        return;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    } else if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid phone number (10 digits).");
        return;
    }


    //creating new class order
    class Order {
        constructor(name, email, phone, address) {
            this.name = name + " " + secondName;
            this.email = email;
            this.phone = phone;
            this.address = address;
            this.items = cart.map(item => ({
                color: item.color,
                quantity: item.quantity,
                price: item.price
            }));
            this.price = parseFloat(document.querySelector("#total").textContent.replace("Total: $", ""));
        }
    }


    //sending the order as an object to the server containing information about the particular order
    const order = new Order(name, email, phone, address);
    localStorage.setItem("order", JSON.stringify(order));

    fetch('http://127.0.0.1:5000/submit-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Order successfully sent:", data);
        })
        .catch(error => console.error("Error:", error));

    alert(`Order confirmed!\nName: ${order.name}\nEmail: ${order.email}\nPhone: ${order.phone}\nAddress: ${order.address}\nItems: ${order.items.map(item => `${item.color} (x${item.quantity})`).join(", ")}\nTotal Price: $${order.price.toFixed(2)}`);
    console.log(order.price);
    cart.length = 0; // Clear the cart after order confirmation
    updateCart(cart);
    closeOrderMenu();
    localStorage.removeItem("order");
}

//page manipulation || pagination
function openProductPage(color, price, type, id, image){
    console.log(color, price, type, id, image);

    window.location.hash = 'product-page';

    const pages = document.querySelectorAll(".page");
    pages.forEach(page => {
        page.classList.add("d-none");
        page.classList.remove("d-block");
    })

    const productPage = document.querySelector("#product-page");
    productPage.classList.remove("d-none");
    productPage.classList.add("d-block");
    
    const productDetails = document.querySelector("#product-details");
    let firstWord = color.split("@")[0];
    let secondWord = color.split("@")[1] || "";
    let message = `${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${type} added to cart.`;
    productDetails.innerHTML = `
        <img src="assets/${image}" class="img-fluid col-lg-3 col-sm-5 px-3" alt="Product Image">
                <div class="col-lg-3 col-sm-5 p-3">
                    <h2 class="card-title mt-3 py-2" style="border-bottom: 5px solid ${firstWord + secondWord}">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${type}</h2>
                    <p class="card-text text-muted mt-3">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${type} designed for smooth finish</p>
                    <h4 class="card-text text-black mt-3">Price: <span class="font-weight-bolder">$${price}</span> </h4>
                    <div class="container-fluid w-100 p-0 m-0">
                        <button class="btn btn-sm p-0 m-0 w-50 h-100 p-2 fw-bold" style="background-color:${firstWord + secondWord};" onclick="addToCart(${id}); showNotification('${message}');">Add To Cart</button>
                    </div>
                </div>`;


    const similarProductsList = document.querySelector('#similar-products');
    const similarProducts = colorItems.filter(paint => paint.type === type && paint.color !== color);
    let html = "";
    
    similarProducts.forEach(paint => {
        firstWord = paint.color.split("@")[0];
        secondWord = paint.color.split("@")[1] || "";
        message = `${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${type} added to cart.`;
        html+= `<div class="card shadow-sm
            border-0 col-12 col-sm-6 col-md-4 mb-4 m-3 product-card" style="max-width: 300px;">
                            <img src="assets/${paint.image}" class="img-fluid w-50 m-auto cursor-pointer" alt="Product Image" onclick="openProductPage('${paint.color}', ${paint.price}, '${paint.type}', ${paint.id}, '${paint.image}')">
                            <div class="card-body">
                                <h5 class="card-title cursor-pointer" onclick="openProductPage('${paint.color}', ${paint.price}, '${paint.type}', ${paint.id}, '${paint.image}')">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${paint.type}</h5>
                                <p class="card-text cursor-pointer text-muted mb-1" onclick="openProductPage('${paint.color}', ${paint.price}, '${paint.type}', ${paint.id}, '${paint.image}')">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} paint designed for smooth finish</p>
                                <div class="d-flex justify-content-between align-items-center mt-3">
                                    <span class="fw-bold">$${paint.price.toFixed(2)}</span>
                                    <button class="btn btn-sm add-to-cart" id="${firstWord + secondWord}-button" style="background-color:${firstWord + secondWord}; color:black; font-weight:bold;" onclick="addToCart(${paint.id}); showNotification('${message}');">Add to Cart</button>
                                </div>
                            </div>
                        </div>`
    })        
    
    similarProductsList.innerHTML = html;

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
}


//route hashing allowing the SPA to return to previous viewed pages
window.addEventListener('hashchange', () => {
  const route = window.location.hash.slice(1); // remove #
  openPage(route);
});


//opening and displaying a page
function openPage(pageId){
    if (pageId !== "product-page"){
        const button = document.getElementById(`${pageId}-button`);
        button.classList.add("active");
        window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    } else{
        window.scrollTo({
        top: 0,
        behavior: "instant"
    });
    }
    
    window.location.hash = pageId;

    //hiding other pages
    const pages = document.querySelectorAll(".page");
    pages.forEach(page => {
        page.classList.add("d-none");
        page.classList.remove("d-block");
    })
    const buttons = document.querySelectorAll(".pagebtn");
    buttons.forEach(button => {
        button.classList.remove("active");
    });

    const targetPage = document.getElementById(`${pageId}`);
    if (targetPage) {
        targetPage.classList.remove("d-none");
        targetPage.classList.add("d-block");
    } else{
        openPage("home-page");
    }
    
}

//chatbot
const chatBot = document.querySelector("#chat-bot");
const chatBotBtn = document.querySelector("#chat-bot-button");
const questionButtons = document.querySelectorAll(".q-button");
activateQuestionBtnsListener();

function activateQuestionBtnsListener(){
    for(let i = 0; i<questionButtons.length; i++){
    const qButton = questionButtons[i];
    
    qButton.addEventListener("click", function(){
        const question = qButton.getAttribute("question");
        askChatbot(question)
    })
}
}

function toggleChatBot(){
    if(chatBot.classList.contains("d-none")){
        chatBot.classList.remove("d-none");
        chatBot.classList.add("d-block")
        chatBotBtn.innerHTML = "Close";
    } else{
        chatBot.classList.remove("d-block");
        chatBot.classList.add("d-none");
        chatBotBtn.innerHTML = "Chat";

    }
}

function askChatbot(question){
    const answerDisplay = document.getElementById("answer");
    let answer = ""
    answerDisplay.innerHTML = "";

    questionButtons.forEach(button => {
        button.disabled = true;
    })

    if(question.includes("What is the best color for a living room?")){
        answer = "The best colors for a living room are red, yellow, brown";

    } else if (question.includes("What is a good color for a kitchen?")){
        answer = "Kitchens colors should be lighter, giving the proper vibe for good food!";
        
    } else{
        answer = "f u punk"
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function display(){
        for(let i = 0; i<answer.length; i++){
            answerDisplay.innerHTML += answer[i];

            await delay(50);
        }

        questionButtons.forEach(button => {
            button.disabled = false;
        })
    }

    display();
    
}

chatBotBtn.addEventListener("click", toggleChatBot);
