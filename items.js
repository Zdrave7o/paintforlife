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
    displayTrending(colorItems);
}

function displayTrending(colorItems){
    let html = "";
    index = 0;
    colorItems.slice(0, 2).forEach(paint => {
        let firstWord = paint.color.split("@")[0];
        let secondWord = paint.color.split("@")[1];

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

    items.forEach(item => {
        total += item.price * item.quantity;
        console.log(item);
        
    })
    console.log(total.toFixed(2));
    
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