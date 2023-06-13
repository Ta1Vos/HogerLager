const explanationToHome = document.querySelector(`.explanation-return-home`);

explanationToHome.addEventListener(`click`, returnToHome);

function returnToHome() {
    window.location = `home.html`;
}