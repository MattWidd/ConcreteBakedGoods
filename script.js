//basket script
document.addEventListener('DOMContentLoaded', () => {
    const basket = document.getElementById('basket');
    const basketBtn = document.getElementById('basket-btn');

    // Track whether the basket is currently open
    let isBasketVisible = false;

    // Toggle basket visibility on button click
    basketBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents immediate closing after opening

        // Toggle visibility
        if (isBasketVisible) {
            // Hide basket with transition
            basket.classList.remove('active');
            setTimeout(() => {
                basket.style.visibility = 'hidden'; // Set visibility hidden after fade-out
                isBasketVisible = false; // Update the state
            }, 500); // Match this delay with your CSS transition duration (0.5s)
        } else {
            // Show basket with transition
            basket.style.visibility = 'visible'; // Make it visible immediately
            basket.classList.add('active'); // Add active class to trigger transition
            isBasketVisible = true; // Update the state
        }
    });

    // Hide basket when clicking outside
    document.addEventListener('click', (event) => {
        if (!basket.contains(event.target) && 
        !basketBtn.contains(event.target) && 
        isBasketVisible && !event.target.closest('.basket-item')) {
            // Hide basket with transition
            basket.classList.remove('active');
            setTimeout(() => {
                basket.style.visibility = 'hidden'; // Set visibility hidden after fade-out
                isBasketVisible = false; // Update the state
            }, 500); // Match this delay with your CSS transition duration (0.5s)
        }
    });

    // Ensure visibility is set correctly when transitioning ends
    basket.addEventListener('transitionend', () => {
        if (isBasketVisible) {
            basket.style.visibility = 'visible'; // Ensure it's visible when active
        }
    });
});

// Basket items array
let basketItems = []; // Array to store items in the basket
const basketItemsContainer = document.getElementById('basket-items'); // Container for displaying items
const totalPriceElement = document.getElementById('total-price'); // Element to display total price

function addItemToBasket(itemName, itemPrice) {
    const existingItemIndex = basketItems.findIndex(item => item.name === itemName);
    
    if (existingItemIndex > -1) {
        // If the item already exists, increase the quantity
        basketItems[existingItemIndex].quantity += 1;
    } else {
        // If the item does not exist, add it with quantity 1
        basketItems.push({ name: itemName, price: itemPrice, quantity: 1 });
    }
    
    updateBasketDisplay();
    showNotification(`${itemName} added to basket!`);
}

function updateBasketDisplay() {
    // Clear existing items
    basketItemsContainer.innerHTML = '';

    // Add each item to the basket display
    basketItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'basket-item'; // Add a class for styling
        itemElement.innerHTML = `
            <span>${item.name}: $${item.price.toFixed(2)} x ${item.quantity}</span>
            <button onclick="adjustQuantity('${item.name}', 1)">+</button>
            <button onclick="adjustQuantity('${item.name}', -1)">-</button>
        `;
        basketItemsContainer.appendChild(itemElement);
    });

    // Calculate and display total price
    const totalPrice = basketItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}
//basket contents
function adjustQuantity(itemName, delta) {
    const itemIndex = basketItems.findIndex(item => item.name === itemName);
    if (itemIndex > -1) {
        // Update quantity based on the delta value
        basketItems[itemIndex].quantity += delta;
        // Remove item if quantity is zero
        if (basketItems[itemIndex].quantity <= 0) {
            basketItems.splice(itemIndex, 1);
        }
        updateBasketDisplay();
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Append to body
    document.body.appendChild(notification);

    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.remove();
    }, 1000);
}

// Smooth scrolling function
function smoothScroll(targetId, offset = 0) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
            top: top,
            behavior: 'smooth' // Smooth scroll
        });
    }
}

// Add event listeners for all links with the "scroll-link" class
document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        const targetId = link.getAttribute('data-target'); // Get the target section ID
        const offset = targetId === 'shop' ? 100 : 0; // Apply offset only for 'shop'
        smoothScroll(targetId, offset);
    });
});

//select goods items from shop
document.addEventListener('DOMContentLoaded', () => {
    const goodsElements = document.querySelectorAll('.goods');

    goodsElements.forEach(goods => {
        goods.addEventListener('mousedown', () => {
            goods.classList.add('clicked');
        });

        goods.addEventListener('mouseup', () => {
            setTimeout(() => {
                goods.classList.remove('clicked');
            }, 100);
        });

        // Reset color on mouse leave to ensure proper state
        goods.addEventListener('mouseleave', () => {
            goods.classList.remove('clicked');
        });
    });
});
//checkout Section
document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('checkout-btn');
    const modal = document.getElementById('checkout-modal');
    const closeButton = document.querySelector('.close-button');

    // Open modal on button click
    checkoutBtn.addEventListener('click', () => {
        modal.style.display = 'grid';
        basket.classList.remove('active');
            setTimeout(() => {
                basket.style.visibility = 'hidden'; // Set visibility hidden after fade-out
                isBasketVisible = false; // Update the state
            }, 500);
    });

    // Close modal on close button click
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Handle form submission
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
        alert('Order has been placed successfully!');
        modal.style.display = 'none'; // Close modal after submission
    });
});