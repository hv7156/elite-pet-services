let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCartSummary();
    window.location.hash = '#cart-summary';
}

function updateCartSummary() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    document.getElementById('total-items').innerText = totalItems;
    document.getElementById('total-price').innerHTML = `&#8377; ${totalPrice}`;
    
    displayCartItems();
}

function displayCartItems() {
    const cartSummary = document.getElementById('cart-summary');
    const cartItemsList = document.createElement('ul');
    
    cartItemsList.innerHTML = '';

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.name} - Quantity: ${item.quantity} - Price: &#8377; ${item.price * item.quantity}`;
        cartItemsList.appendChild(listItem);
    });

    cartSummary.appendChild(cartItemsList);
}

function initializeCartButtons() {
    const buttons = document.querySelectorAll('.pet-card button, .product-card button');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.pet-card') || button.closest('.product-card');
            const name = card.querySelector('h3').innerText;
            const priceText = card.querySelector('p').innerText;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));
            
            addToCart(name, price);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeCartButtons();
});
