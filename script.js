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

// Attach event listeners
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
});