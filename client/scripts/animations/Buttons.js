createRoom.addEventListener('mousemove', (event) => {
    const x = event.pageX - createRoom.offsetLeft;
    const y = event.pageY - createRoom.offsetTop;
    createRoom.style.setProperty('--valueX', x + 'px');
    createRoom.style.setProperty('--valueY', y + 'px');
});

joinRoom.addEventListener('mousemove', (event) => {
    const x = event.pageX - joinRoom.offsetLeft;
    const y = event.pageY - joinRoom.offsetTop;
    joinRoom.style.setProperty('--valueX', x + 'px');
    joinRoom.style.setProperty('--valueY', y + 'px');
});

startGameBtn.addEventListener('mousemove', (event) => {
    const x = event.pageX - startGameBtn.offsetLeft;
    const y = event.pageY - startGameBtn.offsetTop;
    startGameBtn.style.setProperty('--valueX', x + 'px');
    startGameBtn.style.setProperty('--valueY', y + 'px');
});

hintsBtn.addEventListener('mousemove', (event) => {
    const x = event.pageX - hintsBtn.offsetLeft;
    const y = event.pageY - hintsBtn.offsetTop;
    hintsBtn.style.setProperty('--valueX', x + 'px');
    hintsBtn.style.setProperty('--valueY', y + 'px');
});

changeMapBtn.addEventListener('mousemove', (event) => {
    const x = event.pageX - changeMapBtn.offsetLeft;
    const y = event.pageY - changeMapBtn.offsetTop;
    changeMapBtn.style.setProperty('--valueX', x + 'px');
    changeMapBtn.style.setProperty('--valueY', y + 'px');
});

resetUi.addEventListener('mousemove', (event) => {
    const x = event.pageX - resetUi.offsetLeft;
    const y = event.pageY - resetUi.offsetTop;
    resetUi.style.setProperty('--valueX', x + 'px');
    resetUi.style.setProperty('--valueY', y + 'px');
});

