// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    const form = document.getElementById('orderForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        console.log('Form submission prevented');

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
