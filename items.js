//items. item creation and display
const colorItems = [];

function addPaint(color, price){
    class Paint{
    constructor(color, price){
        this.color = color,
        this.price = Number(price)
     }
    }   

    colorItems.push(new Paint(color, price));
}

addPaint("blue", 14.99);
addPaint("green", 14.99);
addPaint("red", 14.99);

function displayPaints(colorItems){
    let index=0;
    colorItems.forEach(paint => {
        console.log(paint.color, paint.price, index);
        index++;
    });
}

function displayTrending(colorItems){
    let trending = colorItems.slice(0, 2);
    let html = "";
    trending.forEach(paint => {
        html += `<div class="col-lg-3">
                        <div class="card">
                            <div class="card-body">
                                <h3>${paint.color}</h3>
                                <h4>${paint.price}</h4>
                            </div>
                        </div>
                    </div>`
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

addToCart(colorItems, 0);
addToCart(colorItems, 1);

displayCart(cart);
