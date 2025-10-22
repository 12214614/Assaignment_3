let cart = [];
let cartCounter = 1;

function addToCart(serviceName, price) {
    const item = {
        id: cartCounter++,
        name: serviceName,
        price: price
    };
    
    cart.push(item);
    updateCart();
    
    // Show success feedback
    const button = event.target.closest('.add-item-btn');
    const originalText = button.innerHTML;
    button.innerHTML = '✓ Added';
    button.style.background = '#7ed957';
    button.style.color = 'white';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        button.style.color = '';
    }, 1000);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalAmountElement = document.getElementById('totalAmount');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-icon">ℹ️</div>
                <p>No Items Added</p>
                <span>Add items to the cart from the services bar</span>
            </div>
        `;
        totalAmountElement.textContent = '₹ 0';
    } else {
        let cartHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            cartHTML += `
                <div class="cart-item">
                    <span class="item-number">${index + 1}</span>
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">₹${item.price}</span>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
                </div>
            `;
            total += item.price;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        totalAmountElement.textContent = `₹ ${total}`;
    }
}

function bookNow() {
    const fullName = document.getElementById('fullName').value;
    const emailId = document.getElementById('emailId').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    
    if (cart.length === 0) {
        alert('Please add at least one service to your cart!');
        return;
    }
    
    if (!fullName || !emailId || !phoneNumber) {
        alert('Please fill in all the fields!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert('Please enter a valid 10-digit phone number!');
        return;
    }
    
    // Create booking summary
    let servicesList = cart.map(item => `${item.name} - ₹${item.price}`).join('\n');
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    
    alert(`Booking Confirmed! 🎉\n\nCustomer: ${fullName}\nEmail: ${emailId}\nPhone: ${phoneNumber}\n\nServices:\n${servicesList}\n\nTotal: ₹${total}\n\nThank you for choosing our laundry service!`);
    
    // Reset form and cart
    document.getElementById('fullName').value = '';
    document.getElementById('emailId').value = '';
    document.getElementById('phoneNumber').value = '';
    cart = [];
    cartCounter = 1;
    updateCart();
}

// Smooth scroll to services section when clicking the CTA button
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('.services-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
});

// Newsletter subscription
function subscribeNewsletter() {
    const name = document.getElementById('newsletterName').value;
    const email = document.getElementById('newsletterEmail').value;
    
    if (!name || !email) {
        alert('Please fill in both name and email fields!');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    alert(`Thank you for subscribing, ${name}! 📧\n\nYou'll receive our newsletter at: ${email}`);
    
    document.getElementById('newsletterName').value = '';
    document.getElementById('newsletterEmail').value = '';
}

// Initialize cart on page load
updateCart();