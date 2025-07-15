//items. item creation and display
const colorItems = [];

function addPaint(color, price){
    class Paint{
    constructor(color, price){
        this.color = color,
        this.image = `assets/${color.split("@")[0] + color.split("@")[1]}.png`,
        this.price = Number(price)
     }
    }   

    colorItems.push(new Paint(color, price));
}

addPaint("dodger@blue", 14.99);
addPaint("light@green", 14.99);
addPaint("red@", 14.99);
addPaint("pink@", 14.99);
addPaint("yellow@", 14.99);

function displayPaints(colorItems){
    let index=0;
    let html = "";
    colorItems.forEach(paint => {
        let firstWord = paint.color.split("@")[0];
        let secondWord = paint.color.split("@")[1];
        html+= `<div class="card shadow-sm border-0 col-12 col-sm-6 col-md-4 mb-4 m-3" style="max-width: 300px;">
                        <img src="${paint.image}" class="img-fluid w-50 m-auto" alt="Product Image">
                        <div class="card-body">
                            <h5 class="card-title">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)}</h5>
                            <p class="card-text text-muted mb-1">${firstWord.charAt(0).toUpperCase() + firstWord.slice(1)} ${secondWord.charAt(0).toUpperCase() + secondWord.slice(1)} paint designed for smooth finish</p>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="fw-bold">$${paint.price.toFixed(2)}</span>
                                <button class="btn btn-sm" style="background-color:${firstWord + secondWord}; color:black; font-weight:bold;" onclick="addToCart(colorItems, ${index})">Add to Cart</button>
                            </div>
                        </div>
                    </div>`
        index++;

        document.querySelector("#all-paints").innerHTML = html;
    })
}

function displayTrending(colorItems){
    let trending = colorItems.slice(0, 2);
    let html = "";
    let index = 0;
    trending.forEach(paint => {
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
                                <button class="btn btn-sm" style="background-color:${firstWord + secondWord}; color:black; font-weight:bold;" onclick="addToCart(trending, ${index})">Add to Cart</button>
                            </div>
                        </div>
                    </div>`
        index++;
    })
    document.querySelector("#trending").innerHTML = html;
}

displayPaints(colorItems);
displayTrending(colorItems);

//should get implemented in html document

//cart actions
const cart = [];

function addToCart(items, index){
    cart.push(items[Number(index)]);
    console.log(cart[index]);
    
}

function sumCartPrice(items){
    let cartPrice = 0;
    items.forEach(item =>{
        cartPrice+= item.price;
    })

    console.log(cartPrice.toFixed(2));
    
}

function displayCart(items){
    items.forEach(item => {
        console.log(item.color, item.price);
    })

    sumCartPrice(cart); 
}

displayCart(cart);
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