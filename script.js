// Game variables
const words = ["ability", "absence", "academy", "account", "achieve", "action", "advance", 
    "advice", "affect", "agency", "airline", "airport", "alcohol", "alleged", 
    "alliance", "analyst", "analyze", "anxiety", "apology", "appeal", "arrival", 
    "article", "artwork", "aspect", "assault", "attempt", "attract", "auction", 
    "average", "balance", "barrier", "battery", "believe", "benefit", "biology", 
    "biscuit", "blanket", "boundary", "bravery", "brother", "builder", "cabinet", 
    "capital", "capture", "careful", "carrier", "cartoon", "catalog", "celebrate", 
    "ceramic", "chamber", "charity", "charter", "chicken", "citizen", "climate", 
    "clothes", "coastal", "collage", "collect", "college", "combine", "comfort", 
    "command", "comment", "company", "compare", "compete", "concept", "concern", 
    "confirm", "connect", "consent", "contact", "content", "contest", "control", 
    "convert", "council", "counter", "country", "cricket", "crucial", "current", 
    "curtain", "custody", "dancing", "daytime", "declare", "decline", "deliver", 
    "density", "deposit", "desktop", "destroy", "develop", "diamond", "dietary", 
    "digital", "discuss", "disease", "display", "dispose", "distort", "diverse", 
    "donation", "drawing", "dynamic", "edition", "educate", "efforts", "eighteen", 
    "elastic", "elderly", "element", "embrace", "emotion", "emperor", "enforce", 
    "enhance", "enquiry", "episode", "eternal", "evening", "exactly", "example", 
    "excerpt", "exclude", "execute", "exhibit", "explore", "exposed", "exterior", 
    "factory", "faculty", "failure", "fashion", "feature", "federal", "festival", 
    "fiction", "finance", "forever", "forgive", "freedom", "freight", "friend", 
    "further", "gallery", "general", "genetic", "genuine", "glimpse", "grammar", 
    "graphic", "gravity", "grocery", "guarantee", "harmony", "healthy", "hearing", 
    "highway", "holiday", "horizon", "hospital", "hostile", "housing", "hundred", 
    "husband", "illegal", "illness", "imagine", "impress", "include", "incomes", 
    "indicate", "infinite", "insight", "inspire", "intense", "intimate", "inverse", 
    "investor", "isolate", "jewelry", "journal", "justice", "juvenile", "keyboard", 
    "kingdom", "kitchen", "laborer", "landlord", "language", "laughter", "lecture", 
    "leisure", "liberal", "library", "license", "lighten", "lightly", "logical", 
    "loyalty", "luxury", "magazine", "manager", "manhunt", "mankind", "mansion", 
    "marriage", "material", "maximize", "medicine", "melody", "message", "million", 
    "minister", "mission", "mixture", "momentum", "monitor", "monster", "morning", 
    "natural", "needing", "network", "neutral", "ninety", "nominee", "northern", 
    "notable", "nothing", "nuclear", "numeric", "observe", "obstacle", "offense", 
    "officer", "operate", "opinion", "organic", "outcome", "outlook", "outward", 
    "overall", "overlap", "oversee", "package", "painting", "palace", "partial", 
    "patient", "pattern", "payment", "peaceful", "perfect", "perform", "persuade", 
    "petition", "picture", "pirates", "platform", "pleased", "pocket", "popular", 
    "portray", "portion", "postage", "posture", "pottery", "poverty", "practical", 
    "precise", "predict", "premiere", "prepare", "presence", "prestige", "pretend", 
    "prevent", "primary", "princess", "printer", "privacy", "probable", "proceed", 
    "product", "program", "propose", "protest", "provide", "purpose", "pursuit", 
    "qualify", "quality", "quarter", "quickly", "radical", "railway", "readily", 
    "realize", "receipt", "recover", "regular", "relieve", "resolve", "resonate", 
    "reunion", "reverse", "rhetoric", "romance", "rooftop", "routine", "sailor", 
    "satisfy", "scenario", "schedule", "science", "scratch", "seaside", "section", 
    "secular", "segment", "sensitive", "sentence", "separate", "sequence", "service", 
    "setting", "shallow", "shorten", "shortly", "silence", "similar", "simplify", 
    "skeptic", "slogan", "smuggle", "society", "software", "solidify", "solution", 
    "someone", "sophist", "speaker", "special", "sponsor", "squeeze", "stadium", 
    "station", "stealth", "storage", "strange", "strategy", "streamline", "struggle", 
    "subject", "subside", "success", "suggest", "summit", "sunshine", "superior", 
    "surprise", "surgery", "survive", "suspend", "sympathy", "tactics", "taxpayer"
];
let selectedWord = '';
let guessedLetters = [];
let wrongGuesses = 0;

const maxWrongGuesses = 6;

// DOM elements
const wordElement = document.getElementById('word');
const messageElement = document.getElementById('message');
const lettersElement = document.getElementById('letters');
const restartButton = document.getElementById('restart');
const canvas = document.getElementById('hangman-canvas');
const ctx = canvas.getContext('2d');

// Select a random word
function selectRandomWord() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
}

// Update the word display
function updateWordDisplay() {
    wordElement.textContent = selectedWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
}

// Create letter buttons
function createLetterButtons() {
    lettersElement.innerHTML = '';
    for (let i = 0; i < 26; i++) {
        const letter = String.fromCharCode(97 + i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter, button));
        lettersElement.appendChild(button);
    }
}

// Handle guesses
function handleGuess(letter, button) {
    button.disabled = true; // Disable the guessed button
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        updateWordDisplay();

        // Check for win
        if (selectedWord.split('').every(l => guessedLetters.includes(l))) {
            messageElement.textContent = '🎉 You Win!';
            disableButtons();
        }
    } else {
        wrongGuesses++;
        drawHangman(wrongGuesses);

        // Check for loss
        if (wrongGuesses === maxWrongGuesses) {
            messageElement.textContent = `Game Over! The word was "${selectedWord}".`;
            disableButtons();
        }
    }
}

// Disable all letter buttons
function disableButtons() {
    const buttons = document.querySelectorAll('#letters button');
    buttons.forEach(button => (button.disabled = true));
}

// Draw the hangman step by step
function drawHangman(step) {
    const parts = [
        () => ctx.fillRect(10, 240, 120, 10), // Base
        () => ctx.fillRect(50, 10, 10, 230), // Pole
        () => ctx.fillRect(50, 10, 100, 10), // Top bar
        () => ctx.fillRect(140, 20, 10, 30), // Rope
        () => { ctx.beginPath(); ctx.arc(145, 70, 20, 0, Math.PI * 2); ctx.stroke(); }, // Head
        () => ctx.fillRect(140, 90, 10, 50), // Body
        () => { ctx.fillRect(130, 140, 10, 50); ctx.fillRect(150, 140, 10, 50); }, // Legs
    ];
    parts[step - 1]?.();
}

// Reset the game
function resetGame() {
    guessedLetters = [];
    wrongGuesses = 0;
    messageElement.textContent = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    selectRandomWord();
    updateWordDisplay();
    createLetterButtons();
}

// Event listener for restart button
restartButton.addEventListener('click', resetGame);

// Initialize the game
resetGame();