// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const form = document.getElementById('orderForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        console.log('Form submission prevented');

        // Get current date and time
        const now = new Date();
        const dayOfWeek = now.getDay(); // Sunday - Saturday : 0 - 6
        const hours = now.getHours();
        const minutes = now.getMinutes();

        // Check if the current time is within the allowed range
        const isWithinAllowedTime = () => {
            if (dayOfWeek < 1 || dayOfWeek > 5) {
                return false; // Outside Monday to Friday
            }
            if (dayOfWeek === 1 && hours < 9) {
                return false; // Before 9 AM on Monday
            }
            if (dayOfWeek === 5 && (hours > 11 || (hours === 11 && minutes > 15))) {
                return false; // After 11:15 AM on Friday
            }
            return true; // Within allowed time
        };

        if (!isWithinAllowedTime()) {
            alert('Orders can only be placed from 9 AM on Monday until 11:15 AM on Friday.');
            return; // Prevent submission
        }

        // Capture form data
        const name = document.getElementById('name').value;
        const curry = document.getElementById('curry').value;
        const spice = document.getElementById('spice').value;
        const naan = document.getElementById('naan').value;
        const drink = document.getElementById('drink').value;

        console.log('Form data captured:', { name, curry, spice, naan, drink });

        // Create JSON object
        const order = {
            name: name,
            curry: curry,
            spice: spice,
            naan: naan,
            drink: drink
        };

        // Display JSON output
        const jsonOutput = JSON.stringify(order, null, 2);
        document.getElementById('jsonOutput').textContent = jsonOutput;
        console.log('JSON output:', jsonOutput);
    });
});
