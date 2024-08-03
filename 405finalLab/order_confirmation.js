document.addEventListener('DOMContentLoaded', () => {
    const orderDetails = JSON.parse(sessionStorage.getItem('orderDetails'));

    if (!orderDetails) {
        console.error('No order details found.');
        document.body.innerHTML = '<p>Error: No order details available.</p>';
        return;
    }

    document.getElementById('shippingAddress').innerHTML = `
        Name: ${orderDetails.shippingInfo.fullName}<br>
        Address: ${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}, ${orderDetails.shipingInfo.zip}
    `;

    document.getElementById('paymentInfo').innerHTML = `
        Card Number: **** **** **** ${orderDetails.paymentInfo.cardNumber.slice(-4)}<br>
        Expiry Date: ${orderDetails.paymentInfo.expiryDate}
    `;

    const itemsList = document.getElementById('orderItems');
    orderDetails.items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        itemsList.appendChild(listItem);
    });
    document.getElementById('orderTotal').textContent = `$${orderDetails.total.toFixed(2)}`;
});
