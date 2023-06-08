const buttonHigherLocation = document.querySelector(`.higher-button`);
const buttonLowerLocation = document.querySelector(`.lower-button`);
const gameMenuBtn = document.querySelector(`.back-to-menu-button`);
const buttonSaveBet = document.querySelector(`.save-bet-input`);
const buttonPlayerReady = document.querySelector(`.ready-button`);

//Gives priority to all content within the function
document.addEventListener('DOMContentLoaded', init, false);

function init() {
    gameMenuBtn.addEventListener('click', gameRedirectToMenu);
    buttonSaveBet.addEventListener(`click`, gameSaveBet);
    buttonHigherLocation.addEventListener(`click`, higherButtonClick);
    buttonLowerLocation.addEventListener(`click`, lowerButtonClick);
    buttonPlayerReady.addEventListener(`click`, readyButtonClick);
    // I Used DOMContentLoaded due to the fact that the eventlistener wouldn't load properly thus resulting in it not working.
}

//Dice Values

let player2Dice1 = 0;
let player2Dice2 = 0;
let player1Dice1 = 0;
let player1Dice2 = 0;
let diceP1Save = 0;
let diceP2Save = 0;

let multithrow = false;

// Session storage
let settings = JSON.parse(sessionStorage.getItem('settingsExport'));
let playerNames = JSON.parse(sessionStorage.getItem('playerNamesExport'));


//Location declarations

const scoreboardP1Name = document.querySelector(`.scoreboard-player1-name`);
const scoreboardP2Name = document.querySelector(`.scoreboard-player2-name`);

const player1ScoreLocation = document.querySelector(`.player1-score`);
const player2ScoreLocation = document.querySelector(`.player2-score`);

const bankPointsLocation = document.querySelector(`.bank-points`);
const totalBetPointsLocation = document.querySelector(`.bet-points`);

const roundWinnerTextLocation = document.querySelector(`.round-winner-text`);
const nameOfWinner = document.querySelector(`.winner-name`);
const pointsOfWinner = document.querySelector(`.winner-points`);

const dicePanelP1NameLocation = document.querySelector(`.dicepanel-p1-name`);
const dicePanelP2NameLocation = document.querySelector(`.dicepanel-p2-name`);

const p1LastThrow = document.querySelector(`.p1-last-throw`);
const p2LastThrow = document.querySelector(`.p2-last-throw`);

const currentPlayerNameLocation = document.querySelector(`.game-player-change`);
const textfieldSaveBet = document.querySelector(`.bet-input`);

const playAgainButtonLocation = document.querySelector(`.play-again-button`);
let isPlayButtonActivated = false;


//Player higher/lower Values | true = Higher | false = Lower

let player1HL = false;
let player2HL = false;

let playerAmount = 0;

let roundWinArray = [];
let playerRoundWin = [false, false];

let correctPlayerBet = true;


//Tab true/false statements

let roundComplete = false;

// Function-loop values

let loopAmount = 0;


//Playername import

let player1Name = `Speler 1`;
let player2Name = `Speler 2`;

if (sessionStorage.getItem('playerNamesExport')) {
    player1Name = playerNames.player1Name;
    player2Name = playerNames.player2Name;
}

if (player2Name == `Speler 2` || player2Name == ``) {
    let askedPlayerAmount = prompt(`Speelt u alleen(met 1 speler) of met 2 spelers?`);
    if (askedPlayerAmount == 1 || askedPlayerAmount == `een` || askedPlayerAmount == `één` || askedPlayerAmount == `alleen`) {
        player2Name = `Computer`;
        playerAmount = 1;
    } else {
        playerAmount = 2;
    }
} else {
    playerAmount = 2;
}

if (playerAmount == 0) {
    alert(`OEPS! Er is iets fout gegaan.`);
}

dicePanelP1NameLocation.innerHTML = (`${player1Name}`);
dicePanelP2NameLocation.innerHTML = (`${player2Name}`);

console.log(`${player1Name} en ${player2Name} spelen`);


//Makes normal values from the values listed in the settings object.
//Settings import

let minimumBet = false;
let minimumBetAmount = 0;
let startingPoints = 50;
let winCondition = 1000;

if (sessionStorage.getItem('settingsExport')) {
    minimumBet = settings.minimumBet;
    minimumBetAmount = settings.minimumBetAmount;
    startingPoints = settings.startingPoints;
    winCondition = settings.winCondition;
}


if (minimumBet == false) {
    minimumBetAmount = 0;
}

console.log(`${minimumBet} | ${minimumBetAmount} | ${startingPoints} | ${winCondition}`);


// Player scores & Values

let playerTurn = 1;

let player1Score = startingPoints;
let player2Score = startingPoints;


let player1BetAmount = 0;
let player2BetAmount = 0;

let scoreBank = 0;
let totalBet = 0;




// Button back to menu function
function gameRedirectToMenu() {
    const menuConfirm = confirm(`Weet u zeker dat u het spel wilt verlaten? Alle punten zullen verloren gaan.`);

    if (menuConfirm == true) {
        window.location = "home.html";
    }
}



// - - -
// DICE THROW FUNCTIONS
// - - -



// Dice throw function
function throwPlayerDice(playerNumber) {
    if (playerNumber == 1) {
        //Player 1 throw
        player1Dice1 = getRandomNumber(6);
        player1Dice2 = getRandomNumber(6);

        document.querySelector(`.player1-dice1`).innerHTML = (`<img src="img/Dice${player1Dice1}.jpg" width="100" height="100" alt="Dice ${player1Dice1}"> `);
        document.querySelector(`.player1-dice2`).innerHTML = (`<img src="img/Dice${player1Dice2}.jpg" width="100" height="100" alt="Dice ${player1Dice2}"> `);
    } else if (playerNumber == 2) {
        //Player 2 throw
        player2Dice1 = getRandomNumber(6);
        player2Dice2 = getRandomNumber(6);

        document.querySelector(`.player2-dice1`).innerHTML = (`<img src="img/Dice${player2Dice1}.jpg" width="100" height="100" alt="Dice ${player2Dice1}"> `);
        document.querySelector(`.player2-dice2`).innerHTML = (`<img src="img/Dice${player2Dice2}.jpg" width="100" height="100" alt="Dice ${player2Dice2}"> `);
    } else {
        alert(`Er is iets misgegaan!`);
    }
}




function computerThrow() {
    //Smart AI is a boolean
    let playerDiceTotal = player1Dice1 + player1Dice2;
    let computerDiceTotal = player2Dice1 + player2Dice2;

    if (playerDiceTotal < 6) {
        player2HL = true;
    } else if (playerDiceTotal > 7) {
        player2HL = false;
    } else {
        let randomNumber = Math.floor(Math.random() * 2) + 1;
        console.log(randomNumber)
        if (randomNumber == 1) {
            player2HL = false;
        } else if (randomNumber == 2) {
            player2HL = true;
        }
    }


    player2BetAmount = 0;
    player2BetAmount = minimumBetAmount;
    
    if (player2Score <= (minimumBetAmount * 1.5)) {
        //Goes all in if there's not enough points remaining
        player2BetAmount = player2Score;
    } else if (player1BetAmount >= (player1Score / 10 * 8.5)) {
        //Does not bet extra points if the player goes in with 85+%
        player2BetAmount = minimumBetAmount;
    //LOOKS IN LOWER 2 IFS AT OWN DICE
    } else if (computerDiceTotal <= 3 || computerDiceTotal >= 11) {
        //Does not bet extra points if the dice are close to 100% of player winning
        //Just minbet
        player2BetAmount = minimumBetAmount;
    } else if (computerDiceTotal == 4 || computerDiceTotal == 10) {
        // 10% + minbet
        player2BetAmount = Math.round(minimumBetAmount + (player2Score / 10));
    //LOOKS AT PLAYER DICE BELOW THIS
    } else if (playerDiceTotal == 2 || playerDiceTotal == 12) {
        //80%
        player2BetAmount = Math.round(player2BetAmount + (player2Score / 5 * 4));
    } else if (playerDiceTotal <= 3 || playerDiceTotal >= 11) {
        //50%
        player2BetAmount = Math.round(player2BetAmount + (player2Score / 2));
    } else if (playerDiceTotal <= 4 || playerDiceTotal >= 9) {
        //25%
        player2BetAmount = Math.round(player2BetAmount + (player2Score / 4));
    } else {
        //12.5%
        player2BetAmount = Math.round(player2BetAmount + (player2Score / 8));
    }
}


//Throws both dices in order with 'animation', this is a function while loop with a wait inside of it.
function throwAllDice(waitTimeInMs) {
    if (multithrow == true && loopAmount <= 10) {
        setTimeout(() => {
            loopAmount++;
            throwPlayerDice(1);
            throwAllDice(waitTimeInMs);
            if (loopAmount == 1) {
                p1LastThrow.innerHTML = (`${diceP1Save}`);
            }
        }, waitTimeInMs);
    } else if (multithrow == true && loopAmount <= 20) {
        setTimeout(() => {
            loopAmount++;
            throwPlayerDice(2);
            throwAllDice(waitTimeInMs);
            if (loopAmount == 12) {
                p2LastThrow.innerHTML = (`${diceP2Save}`);
            }
        }, waitTimeInMs);
    } else {
        loopAmount = 0;
        multithrow = false;
        calculateWinner();
    }
}


//Gets a random number within the given value
function getRandomNumber(eyes) {
    const random = Math.floor(Math.random() * eyes) + 1;

    return random;
}


function calculateWinner() {
    let p1DiceTotal = player1Dice1 + player1Dice2;
    let p2DiceTotal = player2Dice1 + player2Dice2;

    let pointsWon = scoreBank + totalBet;

    let currentTotalBet = totalBet;

    console.log(`total 1 = ${p1DiceTotal} | total 2 = ${p2DiceTotal}`);

    if (p1DiceTotal < diceP2Save && player1HL == false) {
        playerRoundWin[0] = true;
        roundWinArray.unshift(`true`);
    } else if (p1DiceTotal > diceP2Save && player1HL == true) {
        playerRoundWin[0] = true;
        roundWinArray.unshift(`false`);
    } else {
        playerRoundWin[0] = false;
        roundWinArray.unshift(`none`);
    }

    if (p2DiceTotal < diceP1Save && player2HL == false) {
        playerRoundWin[1] = true;
        if (roundWinArray[0] == `true`) {
            roundWinArray[0] = `Tie`;
        }
    } else if (p2DiceTotal > diceP1Save && player2HL == true) {
        playerRoundWin[1] = true;
    } else {
        playerRoundWin[1] = false;
    }

    for (i = 0; i <= 1; i++) {
        console.log(`for:${roundWinArray[i]}`);
        if (roundWinArray[0] == `none` && roundWinArray[1] == `none`) {
            totalBet = Math.round(totalBet * 1.5);
            updatePage();
        } else if (roundWinArray[0] == `Tie` && roundWinArray[1] == `Tie`) {
            totalBet = Math.round(totalBet * 0.5);
            updatePage();
        }
    }


    if (playerRoundWin[0] == true && playerRoundWin[1] == true) {
        player1Score = player1Score + (scoreBank / 2) + (totalBet / 2);
        player2Score = player2Score + (scoreBank / 2) + (totalBet / 2);
        nameOfWinner.innerHTML = (`${player1Name} & ${player2Name}`);
        pointsOfWinner.innerHTML = (`allebei ${(scoreBank / 2) + (totalBet / 2)} punten`);
    } else if (playerRoundWin[0] == true) {
        player1Score = player1Score + scoreBank + totalBet;
        nameOfWinner.innerHTML = (`${player1Name}`);
        pointsOfWinner.innerHTML = (`${pointsWon}`);
    } else if (playerRoundWin[1] == true) {
        player2Score = player2Score + scoreBank + totalBet;
        nameOfWinner.innerHTML = (`${player2Name}`);
        pointsOfWinner.innerHTML = (`${pointsWon}`);
    } else {
        nameOfWinner.innerHTML = (`Niemand`);
        pointsOfWinner.innerHTML = (`dus 0`);
        scoreBank = scoreBank + (totalBet / 10);
    }


    roundWinnerTextLocation.classList.add(`round-winner-text-cyan`);
    setTimeout(() => {
        updatePage();
        if (playerRoundWin[0] == true || playerRoundWin[1] == true) {
            scoreBank = 0;
            totalBet = 0;
        }
        scoreBank = Math.round(scoreBank + 100 - (player1Score / 25 + player2Score / 25));
    }, 500);

    setTimeout(() => {

        updatePage();
        roundWinnerTextLocation.classList.remove(`round-winner-text-cyan`);
    }, 2500);

    diceP1Save = p1DiceTotal;
    diceP2Save = p2DiceTotal;
}



// - - -
//  BET FUNCTIONS
// - - -



//Updates the score for total added bet
function updatePlayerBet() {
    let betTextfield = Number(textfieldSaveBet.value);
    const element = document.querySelector(`.save-bet-input`);

    if (playerTurn == 1) {
        player1BetAmount = betTextfield;
    } else if (playerTurn == 2) {
        player2BetAmount = betTextfield;
    } else {
        alert(`Er is iets fout gegaan, start de website opnieuw op a.u.b.`);
    }

    element.innerHTML = (`Opgeslagen!`);
    //Makes a timeout to change it back after 1s.
    setTimeout(() => {
        element.innerHTML = (`Sla inzet op`);
    }, 1000);
}



function gameSaveBet() {
    let betTextfield = Number(textfieldSaveBet.value);
    let currentPlayerScore = 0;
    let currentPlayerName;

    //Detects the current turn of which player and uses their score to be able to detect how much the score is on one single value to save space.

    if (betTextfield == 0) {
        betTextfield = 0;
    } else if (betTextfield == ``) {
        betTextfield = 0;
        alert(`Geef a.u.b. een nummer op wanneer u inzet. De inzet is nu op 0 gezet.`);
    }


    if (playerTurn == 1) {
        currentPlayerScore = player1Score;
        currentPlayerName = player1Name;
    } else if (playerTurn == 2) {
        currentPlayerScore = player2Score;
        currentPlayerName = player2Name;
    }

    if (betTextfield <= currentPlayerScore && minimumBet == false && betTextfield >= 0) {
        // function Updates the player score as it is a value that can be used.
        correctPlayerBet = true;
        updatePlayerBet();
    } else if (isNaN(betTextfield)) {
        correctPlayerBet = false;
        alert(`"${textfieldSaveBet.value}" is geen getal.`);
    } else if (betTextfield > currentPlayerScore) {
        correctPlayerBet = false;
        alert(`${currentPlayerName} heeft niet genoeg punten, je hebt ${betTextfield} punten ingezet terwijl je maar ${currentPlayerScore} punten hebt.`);
    } else if (betTextfield < 0) {
        correctPlayerBet = false;
        alert(`Geef a.u.b. een getal gelijk aan 0 of hoger dan 0 op. U had ${betTextfield} opgegeven.`)
    }
    else if (minimumBet == true) {
        if (betTextfield >= settings.minimumBetAmount) {
            correctPlayerBet = true;
            updatePlayerBet();
        } else {
            correctPlayerBet = false;
            alert(`${currentPlayerName} moet een hogere inzet geven, het moeten minimaal ${minimumBetAmount} punten zijn.`);
        }
    }
}



// - - -
// UPDATE FUNCTIONS
// - - -


function updatePage() {
    bankPointsLocation.innerHTML = (`${scoreBank}`);
    totalBetPointsLocation.innerHTML = (`${totalBet}`);
    player1ScoreLocation.innerHTML = player1Score;
    player2ScoreLocation.innerHTML = player2Score;
}


function updateAllPointLocations() {
    if (playerTurn == 1) {
        player1Score = player1Score - player1BetAmount;
        totalBet = Math.trunc(totalBet + (player1BetAmount / 100 * 110));

    } else if (playerTurn == 2) {
        player2Score = player2Score - player2BetAmount;
        totalBet = Math.trunc(totalBet + (player2BetAmount / 100 * 110));
    }

    player1BetAmount = 0;
    player2BetAmount = 0;
}



// - - -
// UPDATE FUNCTIONS
// - - -

function higherButtonClick() {
    if (playerTurn == 1) {
        player1HL = true;
    } else if (playerTurn == 2) {
        player2HL = true;
    }
    //turns higher button brighter on
    buttonHigherLocation.classList.add(`higher-button-click`);
    //turns lower button brighter off
    buttonLowerLocation.classList.remove(`lower-button-click`);
}

function lowerButtonClick() {
    if (playerTurn == 1) {
        player1HL = false;
    } else if (playerTurn == 2) {
        player2HL = false;
    }
    //turns higher button brighter off
    buttonHigherLocation.classList.remove(`higher-button-click`);
    //turns lower button brighter on
    buttonLowerLocation.classList.add(`lower-button-click`);
}


function playAgainButtonActivate() {
    if (isPlayButtonActivated == false) {
        playAgainButtonLocation.addEventListener(`click`, playAgainButtonActivate);
        isPlayButtonActivated = true;
        setTimeout(() => {
            buttonPlayerReady.classList.add(`invisible`);
        }, 1);
    } else if (isPlayButtonActivated == true) {
        window.location = (`/game.html`);
    }
}


function announceWinner() {
    //Announces winner and ends the game
    if (minimumBet == false) {
        //If condition is false it will go here and if its true it will go to the other elses, makes it so I don't have to use multiple ifs!
    } else if (player1Score < minimumBetAmount && player2Score < minimumBetAmount) {
        alert(`${player1Name} en ${player2Name} hebben niet genoeg punten om door te gaan, jullie hebben allebei verloren. Het is gelijkspel!`);
        playAgainButtonLocation.classList.remove(`invisible`);
        playAgainButtonActivate();
    } else if (player1Score < minimumBetAmount) {
        alert(`${player1Name} heeft niet genoeg punten om door te gaan, ${player1Name} heeft verloren! ${player2Name} heeft gewonnen!`);
        playAgainButtonLocation.classList.remove(`invisible`);
        playAgainButtonActivate();
    } else if (player2Score < minimumBetAmount) {
        alert(`${player2Name} heeft niet genoeg punten om door te gaan, ${player2Name} heeft verloren! ${player1Name} heeft gewonnen!`);
        playAgainButtonLocation.classList.remove(`invisible`);
        playAgainButtonActivate();
    }

    if (player1Score >= winCondition && player2Score >= winCondition) {
        alert(`${player1Name} en ${player2Name} hebben het spel gewonnen! ${player1Name} met ${player1Score} punten en ${player2Name} met ${player2Score} punten! Het is gelijkspel!`);
        playAgainButtonLocation.classList.remove(`invisible`);
        playAgainButtonActivate();
    } else if (player1Score >= winCondition) {
        alert(`${player1Name} heeft het spel gewonnen met ${player1Score} punten!`);
        playAgainButtonLocation.classList.remove(`invisible`);
        playAgainButtonActivate();
    } else if (player2Score >= winCondition) {
        alert(`${player2Name} heeft het spel gewonnen met ${player2Score} punten!`);
        playAgainButtonLocation.classList.remove(`invisible`);
        playAgainButtonActivate();

    }
}


function readyButtonClick() {
    buttonHigherLocation.classList.remove(`higher-button-click`);
    buttonLowerLocation.classList.remove(`lower-button-click`);


    if (multithrow == false) {
        if (player1Score == 0 && playerTurn == 1) {
            correctPlayerBet = true;
        } else if (player2Score == 0 && playerTurn == 2) {
            correctPlayerBet = true;
        }
        if (playerTurn == 1 && correctPlayerBet == true) {
            currentPlayerNameLocation.innerHTML = (`${player2Name}'s beurt`);
            //Updates all point locations
            updateAllPointLocations();
            playerTurn = 2;
            if (playerAmount == 1) {
                readyButtonClick();
            }
        } else if (playerTurn == 2 && correctPlayerBet == true && playerAmount == 2) {
            roundComplete = true;
            setTimeout(() => {
                currentPlayerNameLocation.innerHTML = (`${player1Name}'s beurt`);
                announceWinner();
            }, 5000);
            //Updates all point locations
            updateAllPointLocations();
            playerTurn = 1;
            multithrow = true;
            throwAllDice(225);
        } else if (correctPlayerBet == false) {
            alert(`De inzet is ongeldig, geef a.u.b. een correcte inzet op.`);
        } else if (playerAmount == 1) {
            roundComplete = true;
            computerThrow();
            setTimeout(() => {
                currentPlayerNameLocation.innerHTML = (`${player1Name}'s beurt`);
                announceWinner();
            }, 5000);
            //Line break
            updateAllPointLocations();
            playerTurn = 1;
            multithrow = true;
            throwAllDice(225);
        }
    }

    updatePage();
    if (correctPlayerBet == true) {
        buttonPlayerReady.classList.add(`invisible`);
        setTimeout(() => {
            if (playerAmount == 1) {
                setTimeout(() => {
                    buttonPlayerReady.classList.remove(`invisible`);
                }, 2000);
            } else {
                buttonPlayerReady.classList.remove(`invisible`);
            }
        }, 3000);
    }
}





// Code to initialize all text reliable on variables, or easier said this loads the game in.

throwPlayerDice(1);
throwPlayerDice(2);

diceP1Save = player1Dice1 + player1Dice2;
diceP2Save = player2Dice1 + player2Dice2;

scoreBank = 100;

updatePage();

currentPlayerNameLocation.innerHTML = (`${player1Name}`);
playAgainButtonLocation.classList.add(`invisible`);

scoreboardP1Name.innerHTML = (`${player1Name}:`);
scoreboardP2Name.innerHTML = (`${player2Name}:`);

nameOfWinner.innerHTML = (`Niemand`);
pointsOfWinner.innerHTML = (`nog`);