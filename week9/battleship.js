let location1 = Math.floor(Math.random()*5);
let location2 = location1 + 1;
let location3 = location1 + 2;
let guessCount = 0;
let hits = 0;
let guess;
let isSunk = false;

while (isSunk == false) {
    guess = prompt("Fire a shot! (enter a number from 0-6):");
    if (guess >= 0 && guess <= 6) {
        guessCount += 1;
        if (guess == location1 || guess == location2 || guess == location3) {
            alert("Hit!");
            hits += 1;
            if (hits == 3) {
                isSunk = true;
                alert("Sunk!");
            }
        } 
        else {
            alert("Miss!");
        }  
    }
    else {
        alert("Please enter a valid cell number!");
    }
}

alert("You took " + guessCount + " guesses to sink the battleship!");