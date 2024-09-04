const strategies = [
    "Use an old idea",
    "State the problem in words as clearly as possible",
    "Only one element of each kind",
    "What would your closest friend do?",
    "What to increase? What to reduce?",
    "Are there sections? Consider transitions",
    "Try faking it!",
    "Honour thy error as a hidden intention",
    "Ask your body",
    "Work at a different speed",
    // Add more strategies here
];

const card = document.getElementById('card');
const strategyElement = document.getElementById('strategy');
const instruction = document.getElementById('instruction');
const instructionMessage = document.getElementById('instructionMessage');
const settingsIcon = document.getElementById('settingsIcon');
const settingsModal = document.getElementById('settingsModal');
const closeBtn = document.getElementsByClassName('close')[0];
const darkModeToggle = document.getElementById('darkModeToggle');
const drawIntervalSlider = document.getElementById('drawIntervalSlider');
const drawIntervalValue = document.getElementById('drawIntervalValue');
const toast = document.getElementById('toast');

let isFirstClick = true;
let currentIndex = -1; // Initialize to -1 so the first strategy is at index 0
let lastDrawTime = 0;
let drawInterval = 0;

function displayStrategy() {
    card.classList.add('swiped');
    
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % strategies.length;
        strategyElement.textContent = strategies[currentIndex];
        card.classList.remove('swiped');
    }, 250);

    if (isFirstClick) {
        isFirstClick = false;
        instruction.style.opacity = '0';
        instructionMessage.style.opacity = '0';
        setTimeout(() => {
            instruction.style.display = 'none';
            instructionMessage.style.display = 'none';
        }, 300);
    }
}

function handleInteraction() {
    const currentTime = Date.now();
    if (drawInterval === 0 || currentTime - lastDrawTime >= drawInterval) {
        displayStrategy();
        lastDrawTime = currentTime;
    } else {
        const timeLeft = Math.ceil((drawInterval - (currentTime - lastDrawTime)) / (24 * 60 * 60 * 1000));
        showToast(`You can draw another card in ${timeLeft} day${timeLeft > 1 ? 's' : ''}.`);
    }
}

function showSettings() {
    settingsModal.style.display = 'block';
}

function closeSettings() {
    settingsModal.style.display = 'none';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function updateDrawInterval() {
    drawInterval = parseInt(drawIntervalSlider.value) * 24 * 60 * 60 * 1000; // Convert days to milliseconds
    drawIntervalValue.textContent = drawIntervalSlider.value;
}

function showToast(message) {
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

settingsIcon.addEventListener('click', showSettings);
closeBtn.addEventListener('click', closeSettings);
window.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        closeSettings();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeSettings();
    }
});

darkModeToggle.addEventListener('change', toggleDarkMode);
drawIntervalSlider.addEventListener('input', updateDrawInterval);

card.addEventListener('click', handleInteraction);

let touchStartX = 0;
let touchEndX = 0;

card.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

card.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
        handleInteraction();
    }
});

// Initial strategy display
displayStrategy();

// Add this line at the end of your script to set the initial dark mode state
document.documentElement.classList.toggle('dark', darkModeToggle.checked);
