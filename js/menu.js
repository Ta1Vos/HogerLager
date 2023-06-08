//Buttons
const gameBtn = document.querySelector(`.launch-game`);
const settingsBtn = document.querySelector(`.settings-toggle`);
const minimumBetBtn = document.querySelector('.min-bet');
const minimumBetAmountBtn = document.querySelector(`.minbet-amount-button`);
const startingPointsBtn = document.querySelector(`.starting-points`);
const winAmountBtn = document.querySelector(`.win-amount`);
const explanationBtn = document.querySelector(`.open-explanations`);
const playerSaveBtn = document.querySelector(`.players-save`);

// textfields
const minimumBetAmountTextfield = document.querySelector(".minbet-input");
const startingPointsTextfield = document.querySelector(".starting-points-input");
const winAmountTextfield = document.querySelector(".win-amount-input");
const p1Textfield = document.querySelector(`.player-1-input`);
const p2Textfield = document.querySelector(`.player-2-input`);

const betTextfield = document.querySelector(`.minbet-setting`);



//Toggle settings tab
let settingsOpen = false;


//Default settings are kept if there is nothing in the sessionStorage.
let settings = {
    //Toggle min. bet
    minimumBet: false,
    //Required amount of points for the bet.
    minimumBetAmount: 0,
    //Points players start with
    startingPoints: 50,
    //Amount points req. to win
    winCondition: 1000,
}

let playerNames = {
    player1Name: String(`Speler 1`),
    player2Name: String(`Speler 2`),
}

// Names of given users
if (sessionStorage.getItem('playerNamesExport')) {
    playerNames = JSON.parse(sessionStorage.getItem('playerNamesExport'));
    p1Textfield.value = `${playerNames.player1Name}`;
    p2Textfield.value = `${playerNames.player2Name}`;
}

//Initializing saved settings
if (sessionStorage.getItem('settingsExport')) {
    settings = JSON.parse(sessionStorage.getItem('settingsExport'));

    toggleSettingsButton();
    if (settings.minimumBet == false) {
        minimumBetBtn.style.background = `rgba(255, 0, 0, 0.836)`;
    } else {
        minimumBetBtn.style.background = `rgba(0, 255, 0, 0.527)`;
        minimumBetBtn.innerHTML = (`Minimale Inzet: Aan`);
        betTextfield.classList.remove("invisible");
    }
    minimumBetAmountBtn.innerHTML = (`Sla verplichte inzet op (${settings.minimumBetAmount})`);
    startingPointsBtn.innerHTML = (`Sla beginpunten op (${settings.startingPoints})`);
    winAmountBtn.innerHTML = (`Sla het aantal punten op nodig om te winnen (${settings.winCondition})`);
    toggleSettingsButton();
}


function saveSessionStorage() {
    sessionStorage.setItem("settingsExport", JSON.stringify(settings));
    if (sessionStorage.getItem('playerNamesExport') != playerNames) {
        sessionStorage.setItem("playerNamesExport", JSON.stringify(playerNames));
    }
}


function redirectToGame() { 
    let redirectConfirm = true;
    if (playerNames.player1Name == `Speler 1`) {
        redirectConfirm = confirm(`U heeft nog geen spelernaam gekozen, wilt u doorgaan?`);
    }

    if (redirectConfirm == true) {
        saveSessionStorage();
        window.location = "game.html";
    }
} 

function redirectToExplanation() {
    saveSessionStorage();
    window.location = `explanation.html`;
}


 //Settings button
function toggleSettingsButton(){
    if (settingsOpen == false) {
        settingsOpen = true;
    } else if (settingsOpen == true) {
        settingsOpen = false;
    }

    const element = document.querySelector(`.all-settings`);
    if (settingsOpen == false) {
        element.style.display = `none`;
        element.style.visibility = `hidden`;
    } else if (settingsOpen == true) {
        element.style.display = `contents`;
        element.style.visibility = `visible`;
    }
}



//Settings-- toggle minimum bet
function minBetButton() {

    if (settings.minimumBet == false) {
        settings.minimumBet = true;
        minimumBetBtn.innerHTML = (`Minimale Inzet: Aan`);
        minimumBetBtn.style.background = `rgba(0, 255, 0, 0.527)`;
        betTextfield.classList.remove("invisible");
    } else if (settings.minimumBet == true) {
        settings.minimumBet = false;
        minimumBetBtn.innerHTML = (`Minimale Inzet: Uit`);
        minimumBetBtn.style.background = `rgba(255, 0, 0, 0.836)`;
        betTextfield.classList.add("invisible");
    }
}




//Settings-- minimum bet amount
function minBetAmountSave() {
    settings.minimumBetAmount = minimumBetAmountTextfield.value;
    settings.minimumBetAmount = Number(settings.minimumBetAmount);

    if (settings.minimumBetAmount >= 0) {
       minimumBetAmountBtn.innerHTML = (`Sla verplichte inzet op (${settings.minimumBetAmount})`);
    } else if (isNaN(settings.minimumBetAmount)) {
        alert(`"${minimumBetAmountTextfield.value}" is geen getal.`);
        settings.minimumBetAmount = 0;
        minimumBetAmountBtn.innerHTML = (`Sla verplichte inzet op (0)`);
    } else {
        alert(`Geef een nummer op dat gelijk is aan 0 of hoger is dan 0. U had ${settings.minimumBetAmount} opgegeven.`);
        settings.minimumBetAmount = 0;
        minimumBetAmountBtn.innerHTML = (`Sla verplichte inzet op (0)`);
    }
}



//Settings-- starting points, the points you start with in-game.

let numberSaveSP = settings.startingPoints;
//SP = Starting Points
function gameStartingPointsSave() {
    settings.startingPoints = startingPointsTextfield.value;
    settings.startingPoints = Number(settings.startingPoints);

    if (settings.startingPoints >= 0 && settings.startingPoints < settings.winCondition) {
        startingPointsBtn.innerHTML = (`Sla beginpunten op (${settings.startingPoints})`);
        //Save an accepted value into a value
        numberSaveSP = settings.startingPoints;
     } else if (isNaN(settings.startingPoints)) {
        alert(`"${startingPointsTextfield.value}" is geen getal.`);
        //recall StartingPoints save
        settings.startingPoints = numberSaveSP;
        startingPointsBtn.innerHTML = (`Sla beginpunten op (${numberSaveSP})`);
     } else if (settings.startingPoints < 0) {
        alert(`Geef een nummer op dat gelijk is aan 0 of hoger is dan 0. U had ${settings.startingPoints} opgegeven.`);
        //recall SP save
        settings.startingPoints = numberSaveSP;
        startingPointsBtn.innerHTML = (`Sla beginpunten op (${numberSaveSP})`);
     } else {
        alert(`Beginpunten moeten lager zijn dan de punten nodig om te winnen(${settings.winCondition}). U had ${settings.startingPoints} opgegeven.`);
        settings.startingPoints = numberSaveSP;
        startingPointsBtn.innerHTML = (`Sla beginpunten op (${numberSaveSP})`);
    }
}



//Settings-- Win points, the amount of points required to win in-game.

let numberSaveWA = settings.winCondition;
//WA = Win Amount
function winAmountSave() {
    settings.winCondition = winAmountTextfield.value;
    settings.winCondition = Number(settings.winCondition);

    if (settings.winCondition > settings.startingPoints) {
        winAmountBtn.innerHTML = (`Sla het aantal punten op nodig om te winnen (${settings.winCondition})`);
        //Save an accepted value into a value
        numberSaveWA = settings.winCondition;
     } else if (isNaN(settings.winCondition)) {
        alert(`"${winAmountTextfield.value}" is geen getal.`);
        //recall WA save
        settings.winCondition = numberSaveWA;
        winAmountBtn.innerHTML = (`Sla het aantal punten op nodig om te winnen (${numberSaveWA})`);
     } else {
        alert(`Punten nodig om te winnen moet hoger zijn dan de beginpunten(${settings.startingPoints}). U had ${settings.winCondition} opgegeven.`);
        //recall WA save
        settings.winCondition = numberSaveWA;
        winAmountBtn.innerHTML = (`Sla het aantal punten op nodig om te winnen (${numberSaveWA})`);
     }
}

function savePlayerNames() {
    playerNames.player1Name = String(`${p1Textfield.value}`);
    playerNames.player2Name = String(`${p2Textfield.value}`);

    if (playerNames.player1Name != `` && playerNames.player2Name == ``) {
        alert(`Uw naam is opgeslagen! Welkom ${playerNames.player1Name}`);
    } else if (playerNames.player2Name != ``) {
        alert(`Jullie namen zijn opgeslagen! Welkom ${playerNames.player1Name} en ${playerNames.player2Name}`);
    }

    if (playerNames.player1Name == ``) {
        playerNames.player1Name = `Speler 1`;
    } 

    if (playerNames.player2Name == ``) {
        playerNames.player2Name = `Speler 2`;
    } 
}   


//Button loaders
playerSaveBtn.addEventListener(`click`, savePlayerNames);
gameBtn.addEventListener(`click`, redirectToGame);
settingsBtn.addEventListener(`click`, toggleSettingsButton);
minimumBetBtn.addEventListener(`click`, minBetButton);
minimumBetAmountBtn.addEventListener(`click`, minBetAmountSave);
startingPointsBtn.addEventListener(`click`, gameStartingPointsSave);
winAmountBtn.addEventListener(`click`, winAmountSave);
explanationBtn.addEventListener(`click`, redirectToExplanation);