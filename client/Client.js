const solveForm = document.getElementById('solve-form');
const socket = io();

// Message from server
socket.on('message', data => {
    console.log(data);
});

solveForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Only on Client side
    // console.log("Button clicked");

    // Emit message to server
    socket.emit('solve', true);
});


// Output message to DOM