const products = [
    { id: 1, name: "Blue Men's Jacket", category: "Clothes", price: 59.99, description: "Stylish.", image: "./men-s-jacket.jpg" },
    { id: 2, name: "Black Women's Coat", category: "Clothes", price: 89.99, description: "Elegant and perfect for cold weather.", image: "./415HrCxc6RL._AC_UF1000,1000_QL80_.jpg" },
    { id: 3, name: "Running Shoes", category: "Shoes", price: 49.99, description: "Ideal for all terrains.", image: "./running-shoes-2048px-5960.jpg" },
    { id: 4, name: "Fragrance Oil", category: "Perfumes", price: 19.99, description: "Soothing and natural.", image: "./download.jpg" }
];

window.onload = function() {
    loadProductDetails();
    displayCart(); 
};

function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const container = document.getElementById('productDetailContainer');
        container.innerHTML = `
            <div class="product-detail">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="price">$${product.price}</p>
                <p>${product.description}</p>
                <label for="quantity-${product.id}">Quantity:</label>
                <input type="number" id="quantity-${product.id}" name="quantity" min="1" max="10" value="1">
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    } else {
        document.getElementById('productDetailContainer').innerHTML = "<p>Product not found.</p>";
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let found = cart.find(p => p.id === productId);

    if (found) {
        found.quantity += quantity;
    } else {
        cart.push({...product, quantity: quantity});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh the cart display to reflect changes
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart'); 
    let html = '<h3>Your Cart</h3><ul>';

    cart.forEach((item, index) => {
        html += `<li>
                    ${item.quantity} x ${item.name} - $${item.price * item.quantity}
                    <button onclick="deleteItem(${index})">Remove</button>
                </li>`;
    });

    html += '</ul>';
    if (cart.length > 0) {
        const total = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        html += `<p>Total: $${total.toFixed(2)}</p>`;
    } else {
        html += '<p>Your cart is empty.</p>';
    }
    cartContainer.innerHTML = html;
}

function deleteItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);  // Remove the item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart));  // Update local storage
    displayCart();  // Refresh the cart display
}

