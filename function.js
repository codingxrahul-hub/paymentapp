// Show loading animation
function showLoadingAnimation() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    // Create spinner
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        border: 4px solid #f3f3f3;
        border-top: 4px solid #0052cc;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    `;

    // Create loading text
    const loadingText = document.createElement('div');
    loadingText.style.cssText = `
        font-size: 16px;
        color: #0052cc;
        font-weight: 500;
        letter-spacing: 2px;
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    `;
    loadingText.textContent = 'Completing';

    // Create blinking dots
    const dots = document.createElement('span');
    dots.id = 'blinking-dots';
    dots.style.cssText = `
        display: inline-block;
        width: 20px;
        text-align: left;
        margin-left: 5px;
    `;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes blink {
            0%, 20% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }

        .dot {
            animation: blink 1.4s infinite;
            display: inline-block;
        }

        .dot:nth-child(1) {
            animation-delay: 0s;
        }

        .dot:nth-child(2) {
            animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
            animation-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);

    // Create individual dots
    const dot1 = document.createElement('span');
    dot1.className = 'dot';
    dot1.textContent = '.';
    const dot2 = document.createElement('span');
    dot2.className = 'dot';
    dot2.textContent = '.';
    const dot3 = document.createElement('span');
    dot3.className = 'dot';
    dot3.textContent = '.';

    dots.appendChild(dot1);
    dots.appendChild(dot2);
    dots.appendChild(dot3);

    loadingText.appendChild(dots);

    loadingOverlay.appendChild(spinner);
    loadingOverlay.appendChild(loadingText);
    document.body.appendChild(loadingOverlay);

    return loadingOverlay;
}

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

    // Show loading animation for 3 seconds
    showLoadingAnimation();

    // Redirect to payment page after 3 seconds
    setTimeout(function() {
        window.location.href = 'payment.html';
    }, 3000);
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

    // Play UPI sound after payment page loads (0.5s delay for animation to start)
    setTimeout(function() {
        const upiSound = new Audio('UPI_sound.mp3');
        upiSound.play().catch(error => console.log('Audio play error:', error));
    }, 500);
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
            clearPaymentData();
            window.location.href = 'index.html';
        });
    }
});

// Clear data when returning to index
function clearPaymentData() {
    localStorage.removeItem('recipientName');
    localStorage.removeItem('paymentAmount');
}
