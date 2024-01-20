let angpowElementStatus = "closed";
const angpowElement = document.querySelector('.angpow');

function openAngpow() {
    if (angpowElementStatus === "closed") {
        const randomAmount = Math.floor(Math.random() * 100) + 1;

        const luckyNumbers = [0.88, 8.88, 88.88];

        // Randomly choose a lucky number with a 10% chance
        const includeLuckyNumber = Math.random() < 0.1;
        const luckyNumber = includeLuckyNumber ? luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)] : null;

        // Init angpow and inner triangle
        const angpowElement = document.querySelector('.angpow');
        const innerTriangle = document.querySelector('.inner-triangle');
        //const glow = document.querySelector('.glow');

        // Result
        const resultElement = document.getElementById('result');
        if (luckyNumber !== null) {
            resultElement.innerHTML = `You got RM${luckyNumber.toFixed(2)}!!!`;
            innerTriangle.style.borderTopColor = "rgb(255, 183, 0)";
            //glow.style.display = "block";
        } else {
            resultElement.innerHTML = `You got RM${randomAmount.toFixed(2)}!`;
            innerTriangle.style.borderTopColor = "rgb(112, 33, 33)";
        }

        // Disable further clicks on the angpow
        angpowElement.onclick = null;
        angpowElement.style.cursor = 'default';

        // Hide closed triangle
        const closedTriangle = document.querySelector('.triangle-closed');
        closedTriangle.style.display = "none";

        // Show opened triangle and inner triangle
        const openedTriangle = document.querySelector('.triangle-opened');
        openedTriangle.style.display = "block";

        innerTriangle.style.display = "block";

        // Set click event for result element
        resultElement.onclick = null;

        // Set angpow is opened
        angpowElementStatus = "opened";

    } else {
        // Reset the result text
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = 'Click to open Angpow!';

        // Show closed triangle
        const closedTriangle = document.querySelector('.triangle-closed');
        closedTriangle.style.display = "block";

        // Hide opened triangle and inner triangle
        const openedTriangle = document.querySelector('.triangle-opened');
        const innerTriangle = document.querySelector('.inner-triangle');
        openedTriangle.style.display = "none";
        innerTriangle.style.display = "none";

        // Enable further clicks on the angpow
        angpowElement.style.cursor = 'pointer';

        // Set angpow is closed back
        angpowElementStatus = "closed";
    }
}

angpowElement.addEventListener('click', openAngpow);