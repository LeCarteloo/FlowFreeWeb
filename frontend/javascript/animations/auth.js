const btnGoRegister = document.getElementById('btn-goRegister');
const btnGoLogin = document.getElementById('btn-goLogin')

const circle = document.querySelector('.circle');
const registerPrompt = document.querySelector('.register-prompt');
const registerPanel = document.querySelector('.register-panel');
const loginPanel = document.querySelector('.login-panel');
const loginPrompt = document.querySelector('.login-prompt');


btnGoRegister.addEventListener('click', () => {
    circle.classList.toggle("login");
    setTimeout(function() { 
        loginPanel.classList.add("hide");
        registerPanel.classList.remove("hide");
        loginPrompt.classList.remove("hide")}, 1000);
});

btnGoLogin.addEventListener('click', () => {
   circle.classList.remove("login");
   setTimeout(function() { 
    registerPanel.classList.add("hide");
    loginPanel.classList.remove("hide");
    loginPrompt.classList.add("hide")}, 1000);
});

