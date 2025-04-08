let menu = {
    money: 0,
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday"],
    timesOfDay: ["Morning", "Afternoon", "Evening"],
    dayIndex: 0,
    timeIndex: 0
}

let casino = {
    bet: 0,
    splitBet: 0,
    deck: [],
    suits: ['♠️', '♥️', '♦️', '♣️'],
    values: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    playerHand: [],
    dealerHand: [],
    playerSplitHand: [],
    dealerHand: [],
    split: false,
    switchSplit: false,
    playerTotal: function() {
        return getHandValue(this.playerHand);
    },
    playerSplitTotal: function() {
        return getHandValue(this.playerSplitHand);
    },
    dealerTotal: function() {
        return getHandValue(this.dealerHand);
    }
}

let memory = {
    gameBoard: [],
    imageLinks: [
        "bills_images/$5.jpg",
        "bills_images/$10.jpg",
        "bills_images/$20.jpg",
        "bills_images/$50.jpg",
        "bills_images/$100.jpg",
        "bills_images/pessi.jpg"
    ],
    fives: 3,
    tens: 3,
    twentys: 2,
    fiftys: 2,
    hundreds: 1,
    nothing: 1,
    selectedCards: [],
    selectedCardID: [],
    matchesLeft: 8,
    moneyCollected: 0
}

const cards = document.querySelectorAll('.card');
const memoryMatch = document.getElementById('memorymatch');
const blackjack = document.getElementById('blackjack');
const info = document.getElementById('info');
const locator = document.getElementById('locator');
const menubar = document.getElementById('menu');
const wagerAmt = document.getElementById('wager');
const blackjackPlay = document.getElementById('play');
const blackjackOptions = document.getElementById('options');
const blackjackTable = document.getElementById('table');
const player = document.getElementById('player');
const dealer = document.getElementById('dealer');
const doneCasino = document.getElementById('donecasino');
const casinoStatus = document.getElementById('casino');
const workStatus = document.getElementById('work');
const sleepStatus = document.getElementById('sleep');
const currentDay = document.getElementById("day");
const currentTime = document.getElementById("timeofday");
const balance = document.getElementById("balance");
const displayWager = document.getElementById("bet");
const displayPlayerHand = document.getElementById("playerhand");
const displayDealerHand = document.getElementById("dealerhand");
const splitButton = document.getElementById("split");
const doneWork = document.getElementById('donework');
const chances = document.getElementById('chances');
const earnings = document.getElementById('earnings');
const board = document.getElementById('board');
const win = document.getElementById('win');
const lose = document.getElementById('lose');
const restartGame = document.getElementById('restart');

cards.forEach(card => {
    card.addEventListener('click', function(event) {
        if (memory.matchesLeft == 0) {
            info.innerHTML = 'Out of matches!';
            return;
        }
        if (event.target.classList.contains('card') && !event.target.classList.contains('flipped')) {
            event.target.classList.add('flipped');
            if (memory.selectedCards.length == 0) {
                memory.selectedCards.push(cards[parseInt(event.target.id)].src);
                memory.selectedCardID.push(event.target.id);
            }
            else {
                memory.selectedCards.push(cards[parseInt(event.target.id)].src);
                memory.selectedCardID.push(event.target.id);
                checkMatch();
            }
        }
    });
});

function updateBalance(amount) {
    menu.money += amount;
    balance.innerHTML = `Money: ${menu.money}`;
}

function playBlackJack() {
    if (menu.money == 0) {
        info.innerHTML = 'You need money to play at the casino';
        return;
    }
    casino.bet = 0;
    casino.splitBet = 0;
    blackjack.classList.remove('hide');
    info.innerHTML = 'Choose an amount to wager';
    locator.innerHTML = 'The Grand Casino'
    menubar.classList.add('hide');
    wagerAmt.classList.remove('hide');
    blackjackPlay.classList.remove('hide');
    blackjackOptions.classList.add('hide');
    blackjackTable.classList.add('hide');
    doneCasino.classList.add('hide');
    displayWager.innerHTML = `Current Bet: ${casino.bet}`;
}

function addMoney(element) {
    let amountBet = element.id;
    if (amountBet == "one") {
        if (1 > menu.money) {
            info.innerHTML = 'Cannot afford bet';
            return;
        }
        updateMoney(1);
    }
    else if (amountBet == "ten") {
        if (10 > menu.money) {
            info.innerHTML = 'Cannot afford bet';
            return;
        }
        updateMoney(10);
    }
    else if (amountBet == "hundred") {
        if (100 > menu.money) {
            info.innerHTML = 'Cannot afford bet';
            return;
        }
        updateMoney(100);
    }
    else {
        updateMoney(menu.money);
    }
    info.innerHTML = 'Good Luck!';
}

function updateMoney(addedMoney) {
    if (casino.switchSplit) {
        casino.splitBet += addedMoney;
        displayWager.innerHTML = `Current Bet: ${casino.splitBet}`;
        updateBalance(-addedMoney);
    }
    else {
        casino.bet += addedMoney;
        displayWager.innerHTML = `Current Bet: ${casino.bet}`;
        updateBalance(-addedMoney);
    }       
}

function refundMoney() {
    updateBalance(casino.bet);
    casino.bet = 0;
    displayWager.innerHTML = `Current Bet: ${casino.bet}`;
}

function createDeck() {
    casino.deck = [];
    for (let suit of casino.suits) {
        for (let value of casino.values) {
            casino.deck.push({suit, value});
        }
    }
    for (let i = casino.deck.length - 1; i > 0; i--) {
        const temp = Math.floor(Math.random() * (i + 1));
        [casino.deck[i], casino.deck[temp]] = [casino.deck[temp], casino.deck[i]];
    }
}

function getHandValue(hand) {
    let totalValue = 0;
    let aces = 0;
    let oneaces = 0;
    hand.forEach(card => {
        if (['J', 'Q', 'K'].includes(card.value)) {
            totalValue += 10;
        } 
        else if (['A'].includes(card.value)) {
            aces += 1;
            if ((totalValue + 11) > 21) {
                totalValue += 1;
                oneaces += 1;
            }
            else {
                totalValue += 11;
            }
        } 
        else {
            totalValue += parseInt(card.value);
        }
    });
    if (totalValue > 21 && aces > oneaces){
        totalValue -= 10;
        oneaces += 1;
    }
    return totalValue;
}

function getCardValue(card) {
    if (card.value.includes("J") || card.value.includes("Q") || card.value.includes("K")) {
        return 10;
    } 
    else if (card.value.includes("A")) {
        return 11;
    } 
    else {
        return parseInt(card.value);
    }
}

function startGame() {
    if (casino.bet === 0) {
        info.innerHTML = 'A bet is required to play';
        return;
    }
    wagerAmt.classList.add('hide');
    blackjackPlay.classList.add('hide');
    blackjackOptions.classList.remove('hide');
    blackjackTable.classList.remove('hide');
    splitButton.classList.remove('hide');
    player.innerHTML = '';
    dealer.innerHTML = '';
    createDeck();
    casino.playerHand = [];
    casino.dealerHand = [];
    casino.playerSplitHand = [];
    casino.switchSplit = false;
    casino.split = false;
    dealCard(casino.playerHand, 'player');
    dealCard(casino.playerHand, 'player');
    dealCard(casino.dealerHand, 'dealer');
    updatePlayerHand();
    updateDealerHand();
    if (casino.playerTotal() == 21) {
        gambleOver();
    }
    else {
        info.innerHTML = 'What will you do?';
    }
}

function updatePlayerHand() {
    displayPlayerHand.innerHTML = `Your Hand: ${casino.playerTotal()}`;
}

function updateSplitPlayerHand() {
    displayPlayerHand.innerHTML = `Your Hand: ${casino.playerSplitTotal()}`;
}

function updateDealerHand() {
    displayDealerHand.innerHTML = `Dealer Hand: ${casino.dealerTotal()}`;
}

function dealCard(hand, element) {
    let addedCard = casino.deck.pop();
    hand.push(addedCard);
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('addedCard');
    cardDiv.textContent = `${addedCard.value}${addedCard.suit}`;
    document.getElementById(element).appendChild(cardDiv);
}

function hit() {
    if (casino.switchSplit) {
        dealCard(casino.playerSplitHand, 'player');
        updateSplitPlayerHand();
    }
    else {
        dealCard(casino.playerHand, 'player');
        updatePlayerHand();
    }
    if (casino.playerTotal() == 21 || casino.playerSplitTotal() == 21) {
        stand();
    }
    else if (casino.playerTotal() > 21 || casino.playerSplitTotal() > 21) {
        if (casino.split) {
            info.innerHTML = 'Bust! Switching hands...';
            setTimeout(playSplit, 2000);
            return;
        }
        gambleOver();
    }
    else {
        info.innerHTML = 'Risk it?';
    }
}

function stand() {
    if (casino.split) {
        info.innerHTML = 'Switching hands...';
        setTimeout(playSplit, 2000);
        return;
    }
    while (casino.dealerTotal() < 17) {
        dealCard(casino.dealerHand, 'dealer');
    }
    updateDealerHand();
    gambleOver();
}

function split() {
    splitButton.classList.add('hide');
    if (menu.money < casino.bet) {
        info.innerHTML = 'You cannot afford to split your hand';
        return;
    }
    if (casino.playerHand.length == 2 && getCardValue(casino.playerHand[0]) == getCardValue(casino.playerHand[1])) {
        casino.splitBet += casino.bet;
        updateBalance(-casino.splitBet);
        casino.playerSplitHand.push(casino.playerHand.pop());
        casino.playerHand.push(casino.deck.pop());
        casino.playerSplitHand.push(casino.deck.pop());
        player.innerHTML = '';
        for (let i = 0; i < casino.playerHand.length; i++) {
            let addedCard = casino.playerHand[i];
            let cardDiv = document.createElement('div');
            cardDiv.classList.add('addedCard');
            cardDiv.textContent = `${addedCard.value}${addedCard.suit}`;
            player.appendChild(cardDiv);
        }
        updatePlayerHand();
        casino.split = true;
        if (casino.playerTotal() == 21) {
            info.innerHTML = 'Successfully split hand. Blackjack! Switching hands...';
            setTimeout(playSplit, 2000);
        }
        else {
            info.innerHTML = 'Successfully split hand. The other hand will be played after this hand has concluded';
        }
    }
    else {
        info.innerHTML = 'Cannot split hand now';
    }
}

function playSplit() {
    casino.split = false;
    casino.switchSplit = true;
    player.innerHTML = '';
    info.innerHTML = 'What will you do?';
    displayWager.innerHTML = `Current Bet: ${casino.splitBet}`;
    for (let i = 0; i < casino.playerSplitHand.length; i++) {
        let addedCard = casino.playerSplitHand[i];
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('addedCard');
        cardDiv.textContent = `${addedCard.value}${addedCard.suit}`;
        player.appendChild(cardDiv);
    }
    updateSplitPlayerHand();
    if (casino.playerSplitTotal() == 21) {
        gambleOver();
    }
}

function switchSplit() {
    casino.switchSplit = false;
    player.innerHTML = '';
    displayWager.innerHTML = `Current Bet: ${casino.bet}`;
    for (let i = 0; i < casino.playerHand.length; i++) {
        let addedCard = casino.playerHand[i];
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('addedCard');
        cardDiv.textContent = `${addedCard.value}${addedCard.suit}`;
        player.appendChild(cardDiv);
    }
    updatePlayerHand();
    if (casino.playerHand.length == 2 && casino.playerTotal() == 21) {
        gambleOver();
    }
    else if (casino.dealerHand.length == 1 && casino.playerTotal() < 22) {
        stand();
    }
    else {
        gambleOver();
    }
}

function doubleDown() {
    if (casino.switchSplit) {
        if (menu.money < casino.splitBet) {
            info.innerHTML = 'You cannot afford to double down';
            return;
        }
        if (casino.playerSplitHand.length == 2) {
            updateMoney(casino.splitBet);
            dealCard(casino.playerSplitHand, 'player');
            updateSplitPlayerHand();
            if (casino.playerSplitTotal() > 21) {
                gambleOver();
            }
            else {
                stand();
            }
        }
        else {
            info.innerHTML = 'Cannot double down now';
        }
    }
    else {
        if (menu.money < casino.bet) {
            info.innerHTML = 'You cannot afford to double down';
            return;
        }
        if (casino.playerHand.length == 2) {
            updateMoney(casino.bet);
            dealCard(casino.playerHand, 'player');
            updatePlayerHand();
            if (casino.playerTotal() > 21) {
                if (casino.split) {
                    info.innerHTML = 'Bust! Switching hands...';
                    setTimeout(playSplit, 2000);
                }
                else {
                    gambleOver();
                }
            }
            else {
                stand();
            }
        }
        else {
            info.innerHTML = 'Cannot double down now';
        }
    }
}

function gambleOver() {
    if (casino.switchSplit) {
        splitGambleOver();
        return;
    }
    if (casino.playerTotal() == 21 && casino.playerHand.length == 2) {
        info.innerHTML = 'Blackjack! You win (automatically)!';
        updateBalance(casino.bet*2);
    }
    else if (casino.dealerTotal() == 21 && casino.dealerHand.length == 2) {
        info.innerHTML = 'Dealer blackjack! You lose!';
    }
    else if (casino.playerTotal() > 21) {
        info.innerHTML = 'Bust! You lose!';
    }
    else if (casino.dealerTotal() > 21) {
        info.innerHTML = 'Dealer bust! You win!';
        updateBalance(casino.bet*2);
    }
    else if (casino.dealerTotal() > casino.playerTotal()) {
        info.innerHTML = 'You lose!';
    }
    else if (casino.dealerTotal() == casino.playerTotal()) {
       info.innerHTML = 'Push! (Tie)';
       updateBalance(casino.bet);
    }
    else {
        info.innerHTML = 'You win!';
        updateBalance(casino.bet*2);
    }
    setTimeout(updateTime(), 1000);
    blackjackOptions.classList.add('hide');
    doneCasino.classList.remove('hide');
}

function splitGambleOver() {
    if (casino.playerSplitTotal() == 21 && casino.playerSplitHand.length == 2) {
        info.innerHTML = 'Blackjack! You win (automatically)! Switching hands...';
        updateBalance(casino.splitBet*2);
    }
    else if (casino.dealerTotal() == 21 && casino.dealerHand.length == 2) {
        info.innerHTML = 'Dealer blackjack! You lose! Switching hands...';
    }
    else if (casino.playerSplitTotal() > 21) {
        info.innerHTML = 'Bust! You lose! Switching hands...';
    }
    else if (casino.dealerTotal() > 21) {
        info.innerHTML = 'Dealer bust! You win! Switching hands...';
        updateBalance(casino.splitBet*2);
    }
    else if (casino.dealerTotal() > casino.playerSplitTotal()) {
        info.innerHTML = 'You lose! Switching hands...';
    }
    else if (casino.dealerTotal() == casino.playerSplitTotal()) {
       info.innerHTML = 'Push! (Tie). Switching hands...';
       updateBalance(casino.splitBet);
    }
    else {
        info.innerHTML = 'You win! Switching hands...';
        updateBalance(casino.splitBet*2);
    }
    setTimeout(switchSplit, 3000);
}

function stayCasino() {
    if (menu.timeIndex < 2) {
        info.innerHTML = "Alright. One more round it is";
        playBlackJack();
    }
    else {
        info.innerHTML = "Sadly, the casino has just closed";
    }
}

function leaveCasino() {
    info.innerHTML = "Time to leave the casino";
    goHome();
}

function startWork() {
    memoryMatch.classList.remove('hide');
    info.innerHTML = 'Match images under the squares to win money';
    locator.innerHTML = 'Extreme Memory Match'
    doneWork.classList.add('hide');
    menubar.classList.add('hide');
    memory.gameBoard = [];
    memory.selectedCards = [];
    memory.selectedCardID = [];
    memory.moneyCollected = 0;
    memory.matchesLeft = 8;
    createBoard();
    updateStats();
    for (let i = 0; i < cards.length; i++) {
        cards[i].setAttribute("src", memory.gameBoard[i]);
    }
}

function updateStats() {
    earnings.innerHTML = `Money Earned: ${memory.moneyCollected}`;
    if (memory.matchesLeft == 0) {
        chances.innerHTML = 'Work Finished';
        workOver();
    }
    else {
        chances.innerHTML = `Matches Left: ${memory.matchesLeft}`;
    }
}

function createBoard() {
    cards.forEach(card => {
        card.classList.remove('flipped');
    });
    for (let i = 0; i < memory.fives; i++) {
        memory.gameBoard.push(memory.imageLinks[0], memory.imageLinks[0]);
    }
    for (let i = 0; i < memory.tens; i++) {
        memory.gameBoard.push(memory.imageLinks[1], memory.imageLinks[1]);
    }
    for (let i = 0; i < memory.twentys; i++) {
        memory.gameBoard.push(memory.imageLinks[2], memory.imageLinks[2]);
    }
    for (let i = 0; i < memory.fiftys; i++) {
        memory.gameBoard.push(memory.imageLinks[3], memory.imageLinks[3]);
    }
    for (let i = 0; i < memory.hundreds; i++) {
        memory.gameBoard.push(memory.imageLinks[4], memory.imageLinks[4]);
    }
    for (let i = 0; i < memory.nothing; i++) {
        memory.gameBoard.push(memory.imageLinks[5], memory.imageLinks[5]);
    }
    for (let i = memory.gameBoard.length - 1; i > 0; i--) {
        const tempval = Math.floor(Math.random() * (i + 1));
        [memory.gameBoard[i], memory.gameBoard[tempval]] = [memory.gameBoard[tempval], memory.gameBoard[i]];
    } 
}

function checkMatch() {
    if (memory.selectedCards[0] == memory.selectedCards[1]) {
        info.innerHTML = 'Nice match!';
        if (memory.selectedCards[0].includes("bills_images/$5.jpg")) {
            updateEarnings(5);
        }
        else if (memory.selectedCards[0].includes("bills_images/$10.jpg")) {
            updateEarnings(10);
        }
        else if (memory.selectedCards[0].includes("bills_images/$20.jpg")) {
            updateEarnings(20);
        }
        else if (memory.selectedCards[0].includes("bills_images/$50.jpg")) {
            updateEarnings(50);
        }
        else if (memory.selectedCards[0].includes("bills_images/$100.jpg")) {
            updateEarnings(100);
        }
        else {
            memory.matchesLeft += 1;
        }
    }
    else {
        info.innerHTML = 'Try again!';
        setTimeout(removeFlipped, 1000, memory.selectedCardID);
    }
    memory.selectedCardID = [];
    memory.selectedCards = [];
    memory.matchesLeft -= 1;
    updateStats();
}

function removeFlipped(cards){
    cards.forEach(card => {
        document.getElementById(card).classList.remove('flipped');
    });
}

function updateEarnings(amt) {
    updateBalance(amt);
    memory.moneyCollected += amt;
}

function workOver() {
    setTimeout(updateTime(), 1000);
    doneWork.classList.remove('hide');
}

function stayWork() {
    if (menu.timeIndex < 2) {
        info.innerHTML = "Alright. One more shift it is";
        startWork();
    }
    else {
        info.innerHTML = "The office has just closed";
    }
}

function leaveWork() {
    info.innerHTML = "Time to leave work";
    goHome();
}

function goHome() {
    blackjack.classList.add('hide');
    memoryMatch.classList.add('hide');
    menubar.classList.remove('hide');
    locator.innerHTML = "Home";
    info.innerHTML = "Home Sweet Home";
}

function updateDay() {
    menu.timeIndex = 0;
    menu.dayIndex += 1;
    if (menu.dayIndex > 7) {
        return;
    }
    currentDay.innerHTML = menu.daysOfWeek[menu.dayIndex];
    currentTime.innerHTML = menu.timesOfDay[menu.timeIndex];
    if (menu.dayIndex > 6) {
        setTimeout(gameOver, 1000);
    }
    else if (menu.dayIndex > 4) {
        if (menu.money == 0 || menu.money >= 1000) {
            setTimeout(gameOver, 1000);
        }
        else {
            openCasino();
            closeSleep();
        }
    }
    else {
        openWork();
        openCasino();
        closeSleep();
    }
}

function updateTime() {
    if ((menu.money === 0 || menu.money >= 1000) && menu.dayIndex > 4) {
        setTimeout(gameOver, 1000);
    }
    menu.timeIndex += 1;
    currentTime.innerHTML = menu.timesOfDay[menu.timeIndex];
    if (menu.timeIndex > 1) {
        closeCasino();
        closeWork();
        openSleep();
    }
}

function openCasino() {
    casinoStatus.style.backgroundColor = "lightgreen";
    casinoStatus.disabled = false;
}

function closeCasino() {
    casinoStatus.style.backgroundColor = "#ff7777";
    casinoStatus.disabled = true;
}

function openWork() {
    workStatus.style.backgroundColor = "lightgreen";
    workStatus.disabled = false;
}

function closeWork() {
    workStatus.style.backgroundColor = "#ff7777";
    workStatus.disabled = true;
}

function openSleep() {
    sleepStatus.style.backgroundColor = "lightgreen";
    sleepStatus.disabled = false;
}

function closeSleep() {
    sleepStatus.style.backgroundColor = "#ff7777";
    sleepStatus.disabled = true;
}

function gameOver() {
    if (menu.money >= 1000) {
        alert("Congratulations!!!");
        memoryMatch.classList.add('hide');
        blackjack.classList.add('hide');
        menubar.classList.add('hide');
        info.classList.add('hide');
        win.classList.remove('hide');
        restartGame.classList.remove('hide');
        locator.innerHTML = 'Game Over!';
    }
    else {
        alert("You are now homeless!");
        memoryMatch.classList.add('hide');
        blackjack.classList.add('hide');
        menubar.classList.add('hide');
        info.classList.add('hide');
        lose.classList.remove('hide');
        restartGame.classList.remove('hide');
        locator.innerHTML = 'Game Over!';
    }
}

function restart() {
    restartGame.classList.add('hide');
    win.classList.add('hide');
    lose.classList.add('hide');
    menubar.classList.remove('hide');
    info.classList.remove('hide');
    updateBalance(-menu.money);
    menu.dayIndex = -1;
    updateDay();
    locator.innerHTML = 'Home';
    info.innerHTML = 'You know the drill!';
}
