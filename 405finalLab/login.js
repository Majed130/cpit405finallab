document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Mock users data 
    const users = {
        "user1": "password1",
        "user2": "password2"
    };

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        alert('Login successful!');
        window.location.href = 'shop.html'; // Redirect to the main page after successful login
    } else {
        alert('Login failed: Incorrect username or password.');
    }
});
