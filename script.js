// Initialize cart variables
let totalItems = 0;
let totalPrice = 0;

// Function to update the cart summary
function updateCart() {
    document.getElementById('total-items').innerText = totalItems;
    document.getElementById('total-price').innerText = `₹ ${totalPrice}`;
}

// Function to handle adding items to the cart
function addToCart(price) {
    totalItems++;
    totalPrice += price;
    updateCart();
}

// Function to handle the Explore Pets button click
function explorePets() {
    const petsSection = document.getElementById('pets');
    petsSection.scrollIntoView({ behavior: 'smooth' });
}

// Function to handle navigation
function navigateTo(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}


document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to the Explore Pets button
    const exploreButton = document.querySelector('#home button');
    exploreButton.addEventListener('click', explorePets);

    // Add event listeners to all Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.pet-card button, .product-card button, .service-card button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.pet-card, .product-card, .service-card');
            const priceText = card.querySelector('p:last-child').innerText; // Get the last <p> which contains the price
            const price = parseInt(priceText.replace(/[^0-9]/g, '')); // Extract the numeric value from the price string
            
            addToCart(price);
        });
    });

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor click behavior
            const sectionId = link.getAttribute('href').substring(1); // Get the section ID from href
            navigateTo(sectionId);
        });
    });
    // Initialize the cart array
let cart = [];

// Function to add items to the cart
function addToCart(id, name, price) {
    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        // If it exists, update the quantity
        existingItem.quantity += 1;
    } else {
        // If it doesn't exist, add a new item with quantity 1
        cart.push({ id, name, price, quantity: 1 });
    }
    
    // Update the cart summary
    updateCartSummary();
}

// Function to calculate and display the total amount and total items
function updateCartSummary() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    // Update the DOM elements with the new totals
    document.getElementById('total-items').innerText = totalItems;
    document.getElementById('total-price').innerHTML = `&#8377; ${totalPrice}`;
}

// Function to initialize event listeners for add to cart buttons
function initializeCartButtons() {
    const buttons = document.querySelectorAll('.pet-card button, .product-card button');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.pet-card') || button.closest('.product-card');
            const name = card.querySelector('h3').innerText;
            const priceText = card.querySelector('p').innerText;
            const price = parseInt(priceText.replace(/[^0-9]/g, '')); // Extract numeric value
            
            addToCart(Date.now(), name, price); // Use Date.now() as a unique ID
        });
    });
}

// Initialize event listeners when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeCartButtons();
});
});
