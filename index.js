let cart = [];
let cartCounter = 1;

function addToCart(serviceName, price, btn) {
    // support both inline-pass (this) and legacy event
    const button = btn || (typeof event !== 'undefined' && event.target.closest('.add-item-btn'));
    const item = {
        id: cartCounter++,
        name: serviceName,
        price: price
    };
    
    cart.push(item);
    updateCart();
    
    // feedback on the add button
    if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = '✓ Added';
        button.style.background = '#7ed957';
        button.style.color = 'white';
        // hide the add button after short feedback
        setTimeout(() => {
            button.style.display = 'none';
            button.innerHTML = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 700);
    
        // show or create remove button inside same .service-item
        const container = button.closest('.service-item');
        if (container) {
            let removeBtn = container.querySelector('.remove-item-btn');
            if (!removeBtn) {
                removeBtn = document.createElement('button');
                removeBtn.className = 'remove-item-btn';
                removeBtn.textContent = 'Remove';
                removeBtn.style.marginLeft = '8px';
                removeBtn.onclick = () => removeFromCart(item.id, removeBtn);
                button.after(removeBtn);
            } else {
                removeBtn.style.display = '';
                removeBtn.onclick = () => removeFromCart(item.id, removeBtn);
            }
        }
    }
}

function removeFromCart(itemId, btn) {
    // remove from cart data
    cart = cart.filter(item => item.id !== itemId);
    updateCart();

    // toggle buttons in DOM
    const removeBtn = btn || (typeof event !== 'undefined' && event.target.closest('.remove-item-btn'));
    const container = removeBtn ? removeBtn.closest('.service-item') : null;
    if (container) {
        const addBtn = container.querySelector('.add-item-btn');
        if (addBtn) addBtn.style.display = ''; // show add button again
        // remove the remove button element
        if (removeBtn) removeBtn.remove();
    }
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
                    <button class="remove-btn" onclick="removeFromCart(${item.id}, this)">×</button>
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
