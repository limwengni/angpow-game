let angpowElementStatus = "closed";
const angpowElement = document.querySelector('.angpow');

// Number of yuanbao elements
const numberOfYuanbao = 100;
const rainContainer = document.getElementById('rain-container');
let yuanbaoInterval;

function createYuanbao() {
    const yuanbao = document.createElement('div');
    yuanbao.classList.add('yuanbao');

    // Create yuanbao-top and yuanbao-bottom elements
    const yuanbaoTop = document.createElement('div');
    yuanbaoTop.classList.add('yuanbao-top');

    const yuanbaoBottom = document.createElement('div');
    yuanbaoBottom.classList.add('yuanbao-bottom');

    // Append yuanbao-top and yuanbao-bottom to yuanbao
    yuanbao.appendChild(yuanbaoTop);
    yuanbao.appendChild(yuanbaoBottom);

    // Calculate random left position, top position, and animation delay
    const leftPosition = Math.random() * 100;
    const topPosition = -Math.random() * 200; // Adjust this value
    const animationDelay = -Math.random() * 2000;

    // Set styles for yuanbao and its children
    yuanbao.style.left = `${leftPosition}vw`;
    yuanbao.style.top = `${topPosition}px`; // Adjust this value
    yuanbao.style.animation = `fallAnimation 2s linear ${animationDelay}ms`;

    // Append yuanbao to the rain container
    rainContainer.appendChild(yuanbao);

    // Remove the yuanbao element after the animation ends
    yuanbao.addEventListener('animationend', function handleAnimationEnd() {
        // Remove the specific yuanbao that triggered the event
        rainContainer.removeChild(this);
        // Remove the event listener to prevent memory leaks
        this.removeEventListener('animationend', handleAnimationEnd);
    });

    // Ensure yuanbao is displayed
    yuanbao.style.display = 'block';
}

function startRain() {
    yuanbaoInterval = setInterval(createYuanbao, 500); // Adjust the interval as needed
}

function stopRain() {
    clearInterval(yuanbaoInterval);
    // Remove existing yuanbao elements
    const existingYuanbaos = document.querySelectorAll('.yuanbao');
    existingYuanbaos.forEach((yuanbao) => yuanbao.remove());
}

function openAngpow() {
    if (angpowElementStatus === "closed") {
        const randomAmount = Math.floor(Math.random() * 100) + 1;

        const luckyNumbers = [0.88, 8.88, 88.88];

        // Randomly choose a lucky number with a 10% chance
        const includeLuckyNumber = Math.random() < 0.1;
        const luckyNumber = includeLuckyNumber ? luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)] : null;

        // Init angpow and inner angpow
        const innerAngpow = document.querySelector('.inner-angpow');
        const rainContainer = document.getElementById('rain-container');

        // Result
        const resultElement = document.getElementById('result');
        if (luckyNumber !== null) {
            resultElement.innerHTML = `You got RM${luckyNumber.toFixed(2)}!!!`;
            innerAngpow.style.backgroundColor = "rgb(255, 183, 0)";
            rainContainer.style.display = "block";

            startRain();

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
        stopRain();

        const rainContainer = document.getElementById('rain-container');
        rainContainer.style.display = "none";

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
