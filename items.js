//items. item creation and display
const colorItems = [];

function addPaint(color, price, id){
    class Paint{
    constructor(color, price, id){
        this.id = id;
        this.color = color,
        this.image = `assets/${color.split("@")[0] + color.split("@")[1] || ""}.png`,
        this.price = Number(price)
     }
    }   

    colorItems.push(new Paint(color, price, id));
}

addPaint("dodger@blue", 14.99, 1);
addPaint("light@green", 14.99, 2);
addPaint("red@", 14.99, 3);
addPaint("pink@", 14.99, 4);
addPaint("yellow@", 14.99, 5);

function displayPaints(colorItems){
    let index=0;
    let html = "";
    colorItems.forEach(paint => {
        let firstWord = paint.color.split("@")[0];
        let secondWord = paint.color.split("@")[1] || "";
        html+= `<div class="card shadow-sm border-0 col-12 col-sm-6 col-md-4 mb-4 m-3" style="max-width: 300px;">
                        <img src="${paint.image}" class="img-fluid w-50 m-auto" alt="Product Image">
                        <div class="card-body">
                            <h5 class="card-title">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)}</h5>
                            <p class="card-text text-muted mb-1">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} paint designed for smooth finish</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="fw-bold">$${paint.price.toFixed(2)}</span>
                                <button class="btn btn-sm" style="background-color:${firstWord + secondWord}; color:black; font-weight:bold;" onclick="addToCart(${paint.id})">Add to Cart</button>
                            </div>
                        </div>
                    </div>`
        index++;

    })

    document.querySelector("#all-paints").innerHTML = html;
}

function displayTrending(colorItems){
    let html = "";
    index = 0;
    colorItems.slice(0, 2).forEach(paint => {
        let firstWord = paint.color.split("@")[0];
        let secondWord = paint.color.split("@")[1] || "";

        html+= `<div class="card shadow-sm
         border-0 col-12 col-sm-6 col-md-4 mb-4 m-3" style="max-width: 300px;">
                        <img src="${paint.image}" class="img-fluid w-50 m-auto" alt="Product Image">
                        <div class="card-body">
                            <h5 class="card-title">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)}</h5>
                            <p class="card-text text-muted mb-1">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} paint designed for smooth finish</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="fw-bold">$${paint.price.toFixed(2)}</span>
                                <button class="btn btn-sm" style="background-color:${firstWord + secondWord}; color:black; font-weight:bold;" onclick="addToCart(${paint.id})">Add to Cart</button>
                            </div>
                        </div>
                    </div>`
        index++;
    })
    document.querySelector("#trending").innerHTML = html;
}
displayTrending(colorItems);
displayPaints(colorItems);

//should get implemented in html document

//cart actions
const cart = [];

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
    let total = 0;
    let html = `<div class="d-flex justify-content-between align-items-center mb-4">
                            <h3 class="fw-normal mb-0">Shopping Cart</h3>
                            <h4 class="fw-normal mb-0" onclick="closeCart()">Close</h4>
                            <div>
                                <p class="mb-0"><span class="text-muted">Sort by:</span> <a href="#!" class="text-body">price <i
                                            class="fas fa-angle-down mt-1"></i></a></p>
                            </div>
                        </div>`;

    items.forEach(item => {
        let firstWord = item.color.split("@")[0];
        let secondWord = item.color.split("@")[1] || "";
        html += `       <div class="card-body p-4 bg-white mb-4 rounded-3 shadow-sm">
                                <div class="row d-flex justify-content-between align-items-center">
                                    <div class="col-md-2 col-lg-2 col-xl-2">
                                        <img src="${item.image}"
                                            class="img-fluid rounded-3" alt="paint">
                                    </div>
                                    <div class="col-md-3 col-lg-3 col-xl-3">
                                        <p class="lead fw-normal mb-2">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)}</p>
                                    </div>
                                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                        <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                            <i class="fas fa-minus"></i>
                                        </button>
        
                                        <input id="form1" min="0" name="quantity" value="${item.quantity}" type="number"
                                            class="form-control form-control-sm" />
            
                                        <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2"
                                        >
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                        <h5 class="mb-0">${item.price.toFixed(2)}</h5>
                                    </div>
                                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                        <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg">Remove</i></a>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        total += item.price * item.quantity;
        console.log(item);
        
    })
    document.querySelector("#cartHtml").innerHTML = html + `<div class="card mb-4">
                            <div class="card-body p-4 d-flex flex-row">
                                <div data-mdb-input-init class="form-outline flex-fill">
                                    <input type="text" id="form1" class="form-control form-control-lg" />
                                    <label class="form-label" for="form1">Discound code</label>
                                </div>
                                <button type="button" data-mdb-button-init data-mdb-ripple-init
                                    class="btn btn-outline-warning btn-lg ms-3">Apply</button>
                            </div>
                        </div>
            
                        <div class="card">
                            <div class="card-body">
                                <button type="button" data-mdb-button-init data-mdb-ripple-init
                                    class="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
                            </div>
                        </div>`;
    console.log(total.toFixed(2));
    
}

let cartHtml = document.querySelector("#cart");
cartHtml.style.display = "none";

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