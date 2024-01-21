let angpowElementStatus = "closed";
const angpowElement = document.querySelector('.angpow');

function openAngpow() {
    if (angpowElementStatus === "closed") {
        const randomAmount = Math.floor(Math.random() * 100) + 1;

        const luckyNumbers = [0.88, 8.88, 88.88];

        // Randomly choose a lucky number with a 10% chance
        const includeLuckyNumber = Math.random() < 0.1;
        const luckyNumber = includeLuckyNumber ? luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)] : null;

        // Init angpow and inner angpow
        const angpowElement = document.querySelector('.angpow');
        const innerAngpow = document.querySelector('.inner-angpow');
        //const glow = document.querySelector('.glow');

        // Result
        const resultElement = document.getElementById('result');
        if (luckyNumber !== null) {
            resultElement.innerHTML = `You got RM${luckyNumber.toFixed(2)}!!!`;
            innerAngpow.style.backgroundColor = "rgb(255, 183, 0)";
            //glow.style.display = "block";
        } else {
            resultElement.innerHTML = `You got RM${randomAmount.toFixed(2)}!`;
            innerAngpow.style.backgroundColor = "whitesmoke";
        }

        // Disable further clicks on the angpow
        angpowElement.onclick = null;
        angpowElement.style.cursor = 'default';

        // Hide closed angpow
        const closedAngpow = document.querySelector('.angpow-closed');
        closedAngpow.style.display = "none";

        // Show opened angpow and inner angpow
        const openedAngpow = document.querySelector('.angpow-opened');
        openedAngpow.style.display = "block";

        innerAngpow.style.display = "block";

        // Set click event for result element
        resultElement.onclick = null;

        // Set angpow is opened
        angpowElementStatus = "opened";

    } else {
        // Reset the result text
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = 'Click to open Angpow!';

        // Show closed angpow
        const closedAngpow = document.querySelector('.angpow-closed');
        closedAngpow.style.display = "block";

        // Hide opened angpow and inner angpow
        const openedAngpow = document.querySelector('.angpow-opened');
        const innerAngpow = document.querySelector('.inner-angpow');
        openedAngpow.style.display = "none";
        innerAngpow.style.display = "none";

        // Enable further clicks on the angpow
        angpowElement.style.cursor = 'pointer';

        // Set angpow is closed back
        angpowElementStatus = "closed";
    }
}

angpowElement.addEventListener('click', openAngpow);
