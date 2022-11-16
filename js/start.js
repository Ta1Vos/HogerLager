document.addEventListener('DOMContentLoaded', init, false);
function redirectToHome() {
    window.location = "/html/home.html";
}


function init() {
    //Age restriction before page loads
    function ageVerification(age) {
        if (age >= 18 && age <= 100) {
            redirectToHome();
        } else if (age < 18) {
            let textPlace = document.querySelector(`.age-not-verified`);
            textPlace.innerHTML += (`<h1>Helaas is deze website alleen toegankelijk voor 18+ jarigen, excuses voor het ongemak.</h1>`);
        } else if (age > 100) {
            alert(`Geef een realistisch getal op a.u.b.`);
            ageVerification();
        } else {
            alert(`Geef een getal op, uw huigige invoer is incorrect.`);
            ageVerification();
        }
    }

    ageVerification(prompt(`Wat is uw leeftijd? Geef a.u.b. een getal op`));
}
