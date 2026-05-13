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

    // Redirect to UPI verification page
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

// Handle back arrow navigation
function handleBackArrow() {
    const currentPage = window.location.pathname;

    if (currentPage.includes('upi-verify.html')) {
        // Go back to index from verification
        window.location.href = 'index.html';
    } else if (currentPage.includes('payment.html')) {
        // Go back to index from payment
        window.location.href = 'index.html';
    }
}

// Handle resend code link
function handleResendCode() {
    const upiCodeInput = document.getElementById('upi-code');
    const upiPinInput = document.getElementById('upi-pin');

    if (upiCodeInput) {
        upiCodeInput.value = '';
        upiCodeInput.focus();
    }
    if (upiPinInput) {
        upiPinInput.value = '';
    }

    alert('New code has been sent to your registered mobile number');
}

// Animate circle on input
function animateCircleOnInput() {
    const upiCodeInput = document.getElementById('upi-code');
    const circleFill = document.querySelector('.circle-fill');

    if (upiCodeInput && circleFill) {
        upiCodeInput.addEventListener('input', function() {
            const fillPercentage = (this.value.length / 6) * 100;
            const offset = 282.7 * (1 - fillPercentage / 100);
            circleFill.style.strokeDashoffset = offset;
        });
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on payment page
    if (document.querySelector('.form-card') === null && document.querySelector('.amount')) {
        loadPaymentDetails();
    }

    // Check if we're on UPI verification page
    if (document.getElementById('upiVerifyForm')) {
        const form = document.getElementById('upiVerifyForm');
        form.addEventListener('submit', handleUPIVerify);
        animateCircleOnInput();

        // Resend link
        const resendLink = document.querySelector('.resend-link');
        if (resendLink) {
            resendLink.addEventListener('click', handleResendCode);
        }
    }

    // Attach form listener on index page
    const initialForm = document.getElementById('initialForm');
    if (initialForm) {
        initialForm.addEventListener('submit', handlePaymentSubmit);
    }

    // Back arrow functionality on all pages
    const backArrow = document.querySelector('.back-arrow');
    if (backArrow) {
        backArrow.addEventListener('click', handleBackArrow);
    }
});

// Clear data when returning to index
function clearPaymentData() {
    localStorage.removeItem('recipientName');
    localStorage.removeItem('paymentAmount');
    localStorage.removeItem('upiCode');
    localStorage.removeItem('verified');
}
