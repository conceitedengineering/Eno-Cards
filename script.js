const strategies = [
    "Abandon normal instruments",
    "Accept advice",
    "Accretion",
    "A line has two sides",
    "Allow an easement (an easement is the abandonment of a stricture)",
    "Are there sections? Consider transitions",
    "Ask people to work against their better judgment",
    "Ask your body",
    "Assemble some of the instruments in a group and treat the group",
    "Balance the consistency principle with the inconsistency principle",
    "Be dirty",
    "Breathe more deeply",
    "Bridges -build -burn",
    "Cascades",
    "Change instrument roles",
    "Change nothing and continue with immaculate consistency",
    "Children's voices -speaking -singing",
    "Cluster analysis",
    "Consider different fading systems",
    "Consult other sources -promising -unpromising",
    "Convert a melodic element into a rhythmic element",
    "Courage!",
    "Cut a vital connection",
    "Decorate, decorate",
    "Define an area as 'safe' and use it as an anchor",
    "Destroy -nothing -the most important thing",
    "Discard an axiom",
    "Disconnect from desire",
    "Discover the recipes you are using and abandon them",
    "Distorting time",
    "Do nothing for as long as possible",
    "Don't be afraid of things because they're easy to do",
    "Don't be frightened of cliches",
    "Don't be frightened to display your talents",
    "Don't break the silence",
    "Don't stress one thing more than another",
    "Do something boring",
    "Do the washing up",
    "Do the words need changing?",
    "Do we need holes?",
    "Emphasize differences",
    "Emphasize repetitions",
    "Emphasize the flaws",
    "Faced with a choice, do both (given by Dieter Roth)",
    "Feedback recordings into an acoustic situation",
    "Fill every beat with something",
    "Get your neck massaged",
    "Ghost echoes",
    "Give the game away",
    "Give way to your worst impulse",
    "Go slowly all the way round the outside",
    "Honor thy error as a hidden intention",
    "How would you have done it?",
    "Humanize something free of error",
    "Imagine the music as a moving chain or caterpillar",
    "Imagine the music as a set of disconnected events",
    "Infinitesimal gradations",
    "Intentions -credibility of -nobility of -humility of",
    "Into the impossible",
    "Is it finished?",
    "Is there something missing?",
    "Is the tuning appropriate?",
    "Just carry on",
    "Left channel, right channel, centre channel",
    "Listen in total darkness, or in a very large room, very quietly",
    "Listen to the quiet voice",
    "Look at a very small object, look at its centre",
    "Look at the order in which you do things",
    "Look closely at the most embarrassing details and amplify them",
    "Lost in useless territory",
    "Lowest common denominator check -single beat -single note -single riff",
    "Make a blank valuable by putting it in an exquisite frame",
    "Make an exhaustive list of everything you might do and do the last thing on the list",
    "Make a sudden, destructive unpredictable action; incorporate",
    "Mechanicalize something idiosyncratic",
    "Mute and continue",
    "Only one element of each kind",
    "Overtly resist change",
    "Put in earplugs",
    "Remember .those quiet evenings",
    "Remove ambiguities and convert to specifics",
    "Remove specifics and convert to ambiguities",
    "Repetition is a form of change",
    "Reverse",
    "Short circuit",
    "Shut the door and listen from outside",
    "Simple subtraction",
    "Spectrum analysis",
    "Take a break",
    "Take away the elements in order of apparent non-importance",
    "Tape your mouth (given by Ritva Saarikko)",
    "The inconsistency principle",
    "The tape is now the music",
    "Think of the radio",
    "Tidy up",
    "Trust in the you of now",
    "Turn it upside down",
    "Twist the spine",
    "Use an old idea",
    "Use an unacceptable color",
    "Use fewer notes",
    "Use filters",
    "Use \"unqualified\" people",
    "Water",
    "What are you really thinking about just now? Incorporate",
    "What is the reality of the situation?",
    "What mistakes did you make last time?",
    "What would your closest friend do?",
    "What wouldn't you do?",
    "Work at a different speed",
    "You are an engineer",
    "You can only make one dot at a time",
    "You don't have to be ashamed of using your own ideas",
    ""  // This is the blank white card
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
let lastDrawTime = 0;
let drawInterval = 0;

function getRandomStrategy() {
    return strategies[Math.floor(Math.random() * strategies.length)];
}

function displayStrategy() {
    card.classList.add('swiped');
    
    setTimeout(() => {
        strategyElement.textContent = getRandomStrategy();
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
