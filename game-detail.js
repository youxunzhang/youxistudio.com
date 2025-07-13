// Game Detail Page JavaScript

// Import games data (same as main page)
const gamesData = [
    // User provided games
    {
        id: 1,
        title: "Wacky Flip",
        description: "An exciting 3D platformer where you flip and jump through challenging levels",
        category: "action",
        rating: 4.5,
        players: "1",
        thumbnail: "🎮",
        iframeUrl: "https://1games.io/game/wacky-flip",
        about: "Wacky Flip is an exciting 3D platformer that challenges your reflexes and timing. Navigate through increasingly difficult levels by flipping, jumping, and avoiding obstacles.",
        instructions: ["Use arrow keys to move", "Press spacebar to flip", "Collect coins for points", "Avoid falling off platforms"],
        features: ["3D graphics", "Multiple levels", "Smooth controls", "Progressive difficulty"],
        difficulty: "Medium"
    },
    {
        id: 2,
        title: "Cheese Chompers 3D",
        description: "A fun 3D maze game where you collect cheese while avoiding obstacles",
        category: "casual",
        rating: 4.3,
        players: "1",
        thumbnail: "🧀",
        iframeUrl: "https://cheesechompers-3d.io/game/165/",
        about: "Cheese Chompers 3D is a delightful maze game where you control a hungry character collecting cheese while navigating through 3D environments.",
        instructions: ["Use WASD to move", "Collect all cheese pieces", "Avoid enemies and obstacles", "Find the exit to complete levels"],
        features: ["3D maze gameplay", "Multiple levels", "Enemy AI", "Cheese collection mechanics"],
        difficulty: "Easy"
    },
    {
        id: 3,
        title: "Snow Rush 3D",
        description: "Race down snowy slopes in this thrilling 3D snowboarding adventure",
        category: "racing",
        rating: 4.7,
        players: "1",
        thumbnail: "🏂",
        iframeUrl: "https://html5.gamedistribution.com/e1e32230bdf040d69f4e367015e1c527/?gd_sdk_referrer_url=https://crazycattle3d.com/games/snow-rush-3d&gdpr-tracking=1&gdpr-targeting=1&gdpr-third-party=1",
        about: "Snow Rush 3D is an exhilarating snowboarding game where you race down snowy mountains, perform tricks, and compete for the best time.",
        instructions: ["Use arrow keys to control", "Perform tricks for bonus points", "Avoid obstacles and trees", "Collect power-ups"],
        features: ["3D snowboarding", "Multiple tracks", "Trick system", "Time trials"],
        difficulty: "Medium"
    },
    {
        id: 4,
        title: "Tower Crash 3D",
        description: "Build and crash through towers in this addictive 3D physics game",
        category: "puzzle",
        rating: 4.4,
        players: "1",
        thumbnail: "🏗️",
        iframeUrl: "https://html5.gamedistribution.com/b375b05ea29b40abaaf3606a2ff215ad/?gd_sdk_referrer_url=https://crazycattle3d.com/games/tower-crash-3d&gdpr-tracking=1&gdpr-targeting=1&gdpr-third-party=1",
        about: "Tower Crash 3D combines building and destruction in a satisfying physics-based puzzle game. Build towers and watch them crash spectacularly.",
        instructions: ["Click to place blocks", "Build stable structures", "Trigger crashes strategically", "Achieve maximum destruction"],
        features: ["Physics-based gameplay", "Multiple tower types", "Destruction effects", "Score system"],
        difficulty: "Easy"
    },
    {
        id: 5,
        title: "Tunnel Road",
        description: "Navigate through endless tunnels in this high-speed racing game",
        category: "racing",
        rating: 4.6,
        players: "1",
        thumbnail: "🚗",
        iframeUrl: "https://html5.gamedistribution.com/14e87fab0cbf44b6b3e57ddb77af5941/?gd_sdk_referrer_url=https://crazycattle3d.com/games/tunnel-road&gdpr-tracking=1&gdpr-targeting=1&gdpr-third-party=1",
        about: "Tunnel Road is an endless runner racing game where you navigate through procedurally generated tunnels at high speeds.",
        instructions: ["Use arrow keys to steer", "Avoid tunnel walls", "Collect power-ups", "Maintain high speed"],
        features: ["Endless gameplay", "Procedural generation", "Speed mechanics", "Power-up system"],
        difficulty: "Hard"
    },
    {
        id: 6,
        title: "Merge Flowers",
        description: "Combine flowers to create beautiful gardens in this relaxing puzzle game",
        category: "puzzle",
        rating: 4.2,
        players: "1",
        thumbnail: "🌸",
        iframeUrl: "https://html5.gamedistribution.com/2e5863b7cc10444a88f72c81e74502f1/?gd_sdk_referrer_url=https://crazycattle3d.com/games/merge-flowers&gdpr-tracking=1&gdpr-targeting=1&gdpr-third-party=1",
        about: "Merge Flowers is a relaxing puzzle game where you combine flowers to create more beautiful and rare varieties in your garden.",
        instructions: ["Drag flowers to merge", "Create rare varieties", "Fill your garden", "Complete flower collections"],
        features: ["Merge mechanics", "Multiple flower types", "Garden customization", "Relaxing gameplay"],
        difficulty: "Easy"
    }
    // Add more games as needed...
];

// Global variables
let currentGame = null;
let isFullscreen = false;

// DOM elements
const gameFrame = document.getElementById('gameFrame');
const gameLoading = document.getElementById('gameLoading');
const gameTitle = document.getElementById('gameTitle');
const gameTitleHeader = document.getElementById('gameTitleHeader');
const gameRating = document.getElementById('gameRating');
const gameCategory = document.getElementById('gameCategory');
const gamePlayers = document.getElementById('gamePlayers');
const gameDifficulty = document.getElementById('gameDifficulty');
const gameDuration = document.getElementById('gameDuration');
const gameDescription = document.getElementById('gameDescription');
const gameInstructions = document.getElementById('gameInstructions');
const gameFeatures = document.getElementById('gameFeatures');
const playBtn = document.getElementById('playBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const relatedGames = document.getElementById('relatedGames');
const backToTopBtn = document.getElementById('backToTop');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadGameData();
    setupEventListeners();
    loadRelatedGames();
});

// Load game data based on URL parameter
function loadGameData() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = parseInt(urlParams.get('id'));
    
    currentGame = gamesData.find(game => game.id === gameId);
    
    if (!currentGame) {
        // Redirect to home if game not found
        window.location.href = 'index.html';
        return;
    }
    
    // Update page content
    updateGameInfo();
    loadGameIframe();
}

// Update game information on the page
function updateGameInfo() {
    // Update titles
    document.title = `${currentGame.title} - GameHub`;
    gameTitle.textContent = currentGame.title;
    gameTitleHeader.textContent = currentGame.title;
    
    // Update meta information
    gameRating.textContent = currentGame.rating;
    gameCategory.textContent = currentGame.category.charAt(0).toUpperCase() + currentGame.category.slice(1);
    gamePlayers.textContent = currentGame.players;
    gameDifficulty.textContent = currentGame.difficulty;
    gameDuration.textContent = "5-10 min"; // Default duration
    
    // Update description
    gameDescription.textContent = currentGame.about;
    
    // Update instructions
    gameInstructions.innerHTML = '';
    currentGame.instructions.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        gameInstructions.appendChild(li);
    });
    
    // Update features
    gameFeatures.innerHTML = '';
    currentGame.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        gameFeatures.appendChild(li);
    });
    
    // Update star rating
    updateStarRating(currentGame.rating);
}

// Update star rating display
function updateStarRating(rating) {
    const starsContainer = document.querySelector('.stars');
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    starsContainer.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('i');
        if (i < fullStars) {
            star.className = 'fas fa-star';
        } else if (hasHalfStar && i === fullStars) {
            star.className = 'fas fa-star-half-alt';
        } else {
            star.className = 'far fa-star';
        }
        starsContainer.appendChild(star);
    }
}

// Load game iframe
function loadGameIframe() {
    if (currentGame.iframeUrl) {
        gameFrame.src = currentGame.iframeUrl;
        
        // Show loading initially
        gameLoading.style.display = 'flex';
        
        // Hide loading when iframe loads
        gameFrame.onload = function() {
            gameLoading.style.display = 'none';
        };
        
        // Handle iframe load errors
        gameFrame.onerror = function() {
            gameLoading.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Failed to load game. Please try again later.</p>
                    <button onclick="loadGameIframe()" class="btn btn-primary">Retry</button>
                </div>
            `;
        };
    }
}

// Load related games
function loadRelatedGames() {
    if (!currentGame) return;
    
    // Get games from the same category (excluding current game)
    const related = gamesData.filter(game => 
        game.category === currentGame.category && game.id !== currentGame.id
    ).slice(0, 4); // Show max 4 related games
    
    relatedGames.innerHTML = '';
    
    related.forEach(game => {
        const gameCard = createRelatedGameCard(game);
        relatedGames.appendChild(gameCard);
    });
}

// Create related game card
function createRelatedGameCard(game) {
    const card = document.createElement('a');
    card.className = 'related-game-card';
    card.href = `game-detail.html?id=${game.id}`;
    
    card.innerHTML = `
        <div class="related-game-thumbnail">
            ${game.thumbnail}
        </div>
        <div class="related-game-info">
            <h3 class="related-game-title">${game.title}</h3>
            <span class="related-game-category">${game.category}</span>
        </div>
    `;
    
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Play button
    playBtn.addEventListener('click', () => {
        gameFrame.focus();
    });
    
    // Fullscreen button
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Favorite button
    favoriteBtn.addEventListener('click', toggleFavorite);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Mobile navigation
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Toggle fullscreen mode
function toggleFullscreen() {
    const gameFrameWrapper = document.querySelector('.game-frame-wrapper');
    
    if (!isFullscreen) {
        gameFrameWrapper.classList.add('fullscreen');
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i> Exit Fullscreen';
        isFullscreen = true;
    } else {
        gameFrameWrapper.classList.remove('fullscreen');
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
        isFullscreen = false;
    }
}

// Toggle favorite
function toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('gamehub_favorites') || '[]');
    const gameId = currentGame.id;
    
    if (favorites.includes(gameId)) {
        // Remove from favorites
        const index = favorites.indexOf(gameId);
        favorites.splice(index, 1);
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i> Favorite';
        favoriteBtn.classList.remove('favorited');
    } else {
        // Add to favorites
        favorites.push(gameId);
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favorited';
        favoriteBtn.classList.add('favorited');
    }
    
    localStorage.setItem('gamehub_favorites', JSON.stringify(favorites));
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // F11 for fullscreen
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
    
    // ESC to exit fullscreen
    if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
    }
    
    // Spacebar to focus game
    if (e.key === ' ' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        gameFrame.focus();
    }
}

// Share game functions
function shareGame(platform) {
    const url = window.location.href;
    const title = currentGame.title;
    const text = `Check out ${title} on GameHub!`;
    
    let shareUrl = '';
    
    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Copy game link
function copyGameLink() {
    const url = window.location.href;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link copied to clipboard!');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Check if game is favorited on page load
function checkFavoriteStatus() {
    const favorites = JSON.parse(localStorage.getItem('gamehub_favorites') || '[]');
    const gameId = currentGame.id;
    
    if (favorites.includes(gameId)) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favorited';
        favoriteBtn.classList.add('favorited');
    }
}

// Initialize favorite status
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkFavoriteStatus, 100); // Small delay to ensure currentGame is loaded
}); 