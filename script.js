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

        const luckyNumbers = [0.88, 8.88, 16.88, 18.88, 26.88, 28.88, 66.88, 68.88, 88.88];

        // Randomly choose a lucky number with a 20% chance
        const includeLuckyNumber = Math.random() < 0.2;
        const luckyNumber = includeLuckyNumber ? luckyNumbers[Math.floor(Math.random() * luckyNumbers.length)] : null;

        // Init angpow and inner angpow
        const innerAngpow = document.querySelector('.inner-angpow');
        const rainContainer = document.getElementById('rain-container');

        // Set the background color based on the random amount
        let moneyColor;
        if (randomAmount >= 1 && randomAmount <= 4) {
            // Blue color
            moneyColor = '#1cb6d9';
        } else if (randomAmount >= 5 && randomAmount <= 9) {
            // Light green color
            moneyColor = '#5ed91c';
        } else if (randomAmount >= 10 && randomAmount <= 19) {
            // Red color
            moneyColor = '#d61818';
        } else if (randomAmount >= 20 && randomAmount <= 49) {
            // Orange color
            moneyColor = 'orange';
        } else if (randomAmount >= 50 && randomAmount <= 99) {
            // Dark green color
            moneyColor = '#0f6e12';
        } else if (randomAmount === 100) {
            // Purple color
            moneyColor = '#660f6e';
        }

        const money = document.querySelector('.money');

        // Result
        const resultElement = document.getElementById('result');
        if (luckyNumber !== null) {
            resultElement.innerHTML = `You got RM${luckyNumber.toFixed(2)}!!!`;
            innerAngpow.style.backgroundColor = "rgb(255, 183, 0)";
            rainContainer.style.display = "block";

            if (luckyNumber >= 1 && luckyNumber <= 4) {
                // Blue color
                moneyColor = '#1cb6d9';
            } else if (luckyNumber >= 5 && luckyNumber <= 9) {
                // Light green color
                moneyColor = '#5ed91c';
            } else if (luckyNumber >= 10 && luckyNumber <= 19) {
                // Red color
                moneyColor = '#d61818';
            } else if (luckyNumber >= 20 && luckyNumber <= 49) {
                // Orange color
                moneyColor = 'orange';
            } else if (luckyNumber >= 50 && luckyNumber <= 99) {
                // Dark green color
                moneyColor = '#0f6e12';
            } else if (luckyNumber === 100) {
                // Purple color
                moneyColor = '#660f6e';
            }

            money.style.backgroundColor = moneyColor;
            money.style.display = "block";

            angpowElement.style.animation = 'shakeAnimation 0.5s ease-in-out infinite';
            playLuckyNumberMusic(0, 15);

            startRain();

        } else {
            resultElement.innerHTML = `You got RM${randomAmount.toFixed(2)}!`;
            innerAngpow.style.backgroundColor = "whitesmoke";

            money.style.backgroundColor = moneyColor;
            money.style.display = "block";

            angpowElement.style.animation = 'none';
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
        stopLuckyNumberMusic();

        const money = document.querySelector('.money');
        money.style.display = "none";

        const rainContainer = document.getElementById('rain-container');
        rainContainer.style.display = "none";

        angpowElement.style.animation = 'none';

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

let luckyNumberAudio;  // Declare a variable to store the audio element

function playLuckyNumberMusic(startTime, endTime) {
    // Replace 'path/to/lucky_number_music.mp3' with the actual path to your music file
    const musicPath = 'sounds/lucky_number_music.m4a';

    // Create an audio element
    luckyNumberAudio = new Audio(musicPath);

    // Set the starting time
    luckyNumberAudio.currentTime = startTime;

    // Play the audio
    luckyNumberAudio.play();

    // Stop the audio at the specified end time
    luckyNumberAudio.addEventListener('timeupdate', function handleTimeUpdate() {
        if (luckyNumberAudio.currentTime >= endTime) {
            // Pause the audio
            luckyNumberAudio.pause();

            // Remove the event listener to prevent memory leaks
            luckyNumberAudio.removeEventListener('timeupdate', handleTimeUpdate);
        }
    });
}

function stopLuckyNumberMusic() {
    if (luckyNumberAudio) {
        // Pause the audio
        luckyNumberAudio.pause();
    }
}

angpowElement.addEventListener('click', openAngpow);
