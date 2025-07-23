//items. item creation and display

const colorItems = [];

document.addEventListener("DOMContentLoaded", function() {
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
            imageName = `spray-${imageName}.png`;
            break;
        default:
            console.error("Unknown paint type:", type);
            return;
            break;
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


function displayPaints(colorItems){
    let html = "";
    const colors = colorItems.filter(paint => paint.type === "Paint");
    colors.forEach(paint => {
        let firstWord = paint.color.split("@")[0];
        let secondWord = paint.color.split("@")[1] || "";
        let message = `${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${paint.type} added to cart.`;
        html+= `<div class="card shadow-sm border-0 col-12 col-sm-6 col-md-4 mb-4 m-3" style="max-width: 300px;">
                        <img src="assets/${paint.image}" class="img-fluid w-50 m-auto" alt="Product Image">
                        <div class="card-body">
                            <h5 class="card-title">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${paint.type}</h5>
                            <p class="card-text text-muted mb-1">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} paint designed for smooth finish</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="fw-bold">$${paint.price.toFixed(2)}</span>
                                <button class="btn btn-sm" style="background-color:${firstWord + secondWord}; color:black; font-weight:bold;" onclick="addToCart(${paint.id}); showNotification('${message}');">Add to Cart</button>
                            </div>
                        </div>
                    </div>`


    })

    document.querySelector("#all-paints").innerHTML = html;

    html = "";
    const sprays = colorItems.filter(paint => paint.type === "Spray");
    sprays.forEach(paint => {
        let firstWord = paint.color.split("@")[0];
        let secondWord = paint.color.split("@")[1] || "";
        let message = `${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${paint.type} added to cart.`;
        html+= `<div class="card shadow-sm border-0 col-12 col-sm-6 col-md-4 mb-4 m-3" style="max-width: 300px;">
                        <img src="assets/spray-${paint.image}" class="img-fluid w-50 m-auto" alt="Product Image">
                        <div class="card-body">
                            <h5 class="card-title">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} Spray Can</h5>
                            <p class="card-text text-muted mb-1">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} spray designed for all surfaces</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="fw-bold">$${paint.price.toFixed(2)}</span>
                                <button class="btn btn-sm" style="background-color:${firstWord + secondWord}; color:black; font-weight:bold;" onclick="addToCart(${paint.id}); showNotification('${message}');">Add to Cart</button>
                            </div>
                        </div>
                    </div>`
    })

    document.querySelector("#spray-cans").innerHTML = html;
    
}

function displayTrending(colorItems){
    let html = "";
    index = 0;
    colorItems.slice(0, 2).forEach(paint => {
        let firstWord = paint.color.split("@")[0];
        let secondWord = paint.color.split("@")[1] || "";
        let message = `${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${paint.type} added to cart.`;
        html+= `<div class="card shadow-sm
         border-0 col-12 col-sm-6 col-md-4 mb-4 m-3" style="max-width: 300px;">
                        <img src="assets/${paint.image}" class="img-fluid w-50 m-auto" alt="Product Image">
                        <div class="card-body">
                            <h5 class="card-title">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${paint.type}</h5>
                            <p class="card-text text-muted mb-1">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} paint designed for smooth finish</p>
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
let cart = JSON.parse(localStorage.getItem("cart")) || [];

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


function updateCart(items){
    localStorage.setItem("cart", JSON.stringify(items));
    items = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    let itemCount = 0;
    let html = `<div class="d-flex justify-content-between align-items-center mb-4">
                            <h3 class="fw-normal mb-0">Cart</h3>
                            <h4 class="fw-normal mb-0" onclick="closeCart()">Close</h4>
                            <div>
                                <p class="mb-0"><span class="text-body" id="total">Total: </span></p>
                            </div>
                        </div>`
    items.forEach(item => {
        total += item.price * item.quantity;
        itemCount += item.quantity;
        let firstWord = item.color.split("@")[0];
        let secondWord = item.color.split("@")[1] || "";
        let message = `${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} ${item.type} removed from cart.`;
        html += `       <div class="card-body p-4 bg-white mb-4 rounded-3 shadow-sm">
                                <div class="row d-flex justify-content-between align-items-center">
                                    <div class="col-md-2 col-lg-2 col-xl-2">
                                        <img src="assets/${item.image}"
                                            class="img-fluid rounded-3" alt="paint">
                                    </div>
                                    <div class="col-md-3 col-lg-3 col-xl-3">
                                        <p class="lead fw-normal mb-2">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)}
                                        ${item.type}</p>
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

function removeFromCart(id){
    const item = cart.find(p => p.id === id);
    if (item) {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
    }

    updateCart(cart);
    
}

function changeQuantity(id, delta) {
    const item = cart.find(p => p.id === id);

    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        let firstWord = item.color.split("@")[0];
        let secondWord = item.color.split("@")[1] || "";
        
        showNotification(`${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} removed from cart.`);
        removeFromCart(id);
    }

    updateCart(cart);
}

let cartHtml = document.querySelector("#cart");

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

function openOrderMenu() {
    closeCart();
    orderMenu.style.display = "flex";
}

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