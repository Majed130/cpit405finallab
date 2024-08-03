const products = [
    { id: 1, name: "Blue Men's Jacket", category: "Clothes", price: 59.99, description: "Stylish.", image: "./men-s-jacket.jpg" },
    { id: 2, name: "Black Women's Coat", category: "Clothes", price: 89.99, description: "Elegant and perfect for cold weather.", image: "./415HrCxc6RL._AC_UF1000,1000_QL80_.jpg" },
    { id: 3, name: "Running Shoes", category: "Shoes", price: 49.99, description: "Ideal for all terrains.", image: "./running-shoes-2048px-5960.jpg" },
    { id: 4, name: "Fragrance Oil", category: "Perfumes", price: 19.99, description: "Soothing and natural.", image: "./download.jpg" }
];

window.onload = function() {
    displayProducts(products);
    updateMiniCart();  // Ensure the cart is updated on page load
};

function displayProducts(products) {
    const container = document.getElementById('productContainer');
    let colSize = 12 / products.length;  // Dynamically determine the column size
    colSize = Math.max(colSize, 3);  // Ensure a minimum size for the columns

    container.innerHTML = '<div class="row">'; // Start the row

    products.forEach(product => {
        container.innerHTML += `
            <div class="col-${colSize}"> <!-- Dynamic column size -->
                <div class="card mb-4 shadow-sm">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" onclick="addToCart(${product.id})" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                                <a href="product_detail.html?id=${product.id}" class="btn btn-sm btn-outline-secondary">View</a>
                            </div>
                            <small class="text-muted">$${product.price}</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML += '</div>'; // Close the row
}



function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let found = cart.find(p => p.id === productId);

    if (found) {
        found.quantity++;  // Increase quantity if the item is already in the cart
    } else {
        // Add new item to the cart
        cart.push({...product, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateMiniCart();  // Update the mini-cart whenever items are added
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let index = cart.findIndex(p => p.id === productId);

    if (index !== -1) {
        cart.splice(index, 1);  // Remove the item
        localStorage.setItem('cart', JSON.stringify(cart));
        updateMiniCart();  // Update the mini-cart whenever items are removed
    }
}

function updateMiniCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    document.getElementById('itemCount').textContent = itemCount;
    document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
}

function filterProducts() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(keyword) || 
        product.description.toLowerCase().includes(keyword)
    );
    displayProducts(filteredProducts);
}

function navigateToCheckout() {
    window.location.href = 'checkout.html'; 
}