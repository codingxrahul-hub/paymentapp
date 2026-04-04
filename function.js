// Handle form submission on index.html
function handlePaymentSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const amount = document.getElementById('amount').value.trim();

    if (!name || !amount) {
        alert('Please fill in all fields');
        return;
    }

    // Store data in localStorage
    localStorage.setItem('recipientName', name);
    localStorage.setItem('paymentAmount', amount);

    // Redirect to payment page
    window.location.href = 'payment.html';
}

// Load and display payment details on payment.html
function loadPaymentDetails() {
    const recipientName = localStorage.getItem('recipientName') || 'Guest';
    const paymentAmount = localStorage.getItem('paymentAmount') || '0';

    // Update payment page with retrieved data
    const amountElement = document.querySelector('.amount');
    const recipientElement = document.querySelector('.recipient');

    if (amountElement) {
        amountElement.textContent = '₹' + paymentAmount;
    }

    if (recipientElement) {
        recipientElement.textContent = 'to ' + recipientName;
    }

    // Play UPI sound on payment page
    const upiSound = new Audio('UPI_sound.mp3');
    upiSound.play().catch(error => console.log('Audio play error:', error));
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on payment page
    if (document.querySelector('.form-card') === null && document.querySelector('.amount')) {
        loadPaymentDetails();
    }

    // Attach form listener on index page
    const form = document.querySelector('form[action="payment.html"]');
    if (form) {
        form.addEventListener('submit', handlePaymentSubmit);
    }

    // Back arrow functionality
    const backArrow = document.querySelector('.back-arrow');
    if (backArrow) {
        backArrow.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
});

// Clear data when returning to index
function clearPaymentData() {
    localStorage.removeItem('recipientName');
    localStorage.removeItem('paymentAmount');
}
