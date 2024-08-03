document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('checkoutForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission

        const shippingInfo = {
            fullName: document.getElementById('fullName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            zip: document.getElementById('zip').value
        };

        const paymentInfo = {
            cardNumber: document.getElementById('cardNumber').value,
            expiryDate: document.getElementById('expiryDate').value,
            cvv: document.getElementById('cvv').value
        };

        const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

        const orderDetails = {
            shippingInfo: shippingInfo,
            paymentInfo: paymentInfo,
            items: cart,
            total: total
        };

        sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));

        // Redirect to the order confirmation page
        window.location.href = 'order_confirmation.html';
    });
});
