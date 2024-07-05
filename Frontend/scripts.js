// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Function to fetch and display leaderboard data
    const fetchLeaderboardData = async () => {
        try {
            const response = await fetch('https://a.com/api/leaderboard'); // Replace with actual API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Fetched data:', data);
            populateLeaderboard(data);
        } catch (error) {
            console.error('Failed to fetch leaderboard data:', error);
        }
    };

    // Function to populate the leaderboard table
    const populateLeaderboard = (data) => {
        const leaderboardTable = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
        leaderboardTable.innerHTML = ''; // Clear existing entries
        data.forEach(entry => {
            const row = leaderboardTable.insertRow();
            const nameCell = row.insertCell(0);
            const pointsCell = row.insertCell(1);
            nameCell.textContent = entry.name;
            pointsCell.textContent = entry.totalPoints;
        });
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form submission

        // Get current date and time
        const now = new Date();
        const dayOfWeek = now.getDay(); // Sunday - Saturday : 0 - 6
        const hours = 9//now.getHours();
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

        // Send JSON data to API
        try {
            const response = await fetch('https://a.com/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            if (!response.ok) {
                throw new Error('Failed to submit order');
            }
            alert('Order submitted successfully!');
            // Optionally clear the form after successful submission
            document.getElementById('orderForm').reset();
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Failed to submit order. Please try again later.');
        }
    };

    // Attach submit event listener to the form
    const form = document.getElementById('orderForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    // Fetch leaderboard data on page load if on leaderboard page
    if (document.getElementById('leaderboard')) {
        fetchLeaderboardData();
    }
});