// Game Data - 50 games including the 6 provided iframe games
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
    },
    // Additional games to reach 50 total
    {
        id: 7,
        title: "Space Invaders",
        description: "Classic arcade space shooter with modern graphics",
        category: "action",
        rating: 4.8,
        players: "1",
        thumbnail: "🚀",
        iframeUrl: "https://example.com/space-invaders",
        about: "Defend Earth from alien invaders in this classic arcade game with modern graphics and enhanced gameplay.",
        instructions: ["Move left/right with arrow keys", "Press spacebar to shoot", "Avoid enemy bullets", "Destroy all aliens"],
        features: ["Classic gameplay", "Modern graphics", "Multiple levels", "Power-ups"],
        difficulty: "Medium"
    },
    {
        id: 8,
        title: "Tetris Classic",
        description: "The timeless puzzle game that started it all",
        category: "puzzle",
        rating: 4.9,
        players: "1",
        thumbnail: "🧩",
        iframeUrl: "https://example.com/tetris",
        about: "Arrange falling blocks to create complete lines in this timeless puzzle classic.",
        instructions: ["Rotate blocks with arrow keys", "Move blocks left/right", "Complete lines to clear", "Avoid reaching the top"],
        features: ["Classic Tetris", "Multiple speeds", "Score tracking", "Line clearing"],
        difficulty: "Medium"
    },
    {
        id: 9,
        title: "Racing Legends",
        description: "High-speed racing with stunning 3D graphics",
        category: "racing",
        rating: 4.6,
        players: "1-4",
        thumbnail: "🏎️",
        iframeUrl: "https://example.com/racing-legends",
        about: "Experience the thrill of high-speed racing with stunning 3D graphics and realistic physics.",
        instructions: ["Use arrow keys to steer", "Press spacebar for nitro", "Avoid obstacles", "Finish first"],
        features: ["3D graphics", "Multiple tracks", "Car customization", "Multiplayer support"],
        difficulty: "Hard"
    },
    {
        id: 10,
        title: "Chess Master",
        description: "Strategic chess game with AI opponents",
        category: "strategy",
        rating: 4.7,
        players: "1-2",
        thumbnail: "♟️",
        iframeUrl: "https://example.com/chess-master",
        about: "Challenge yourself with strategic chess gameplay against AI opponents of varying difficulty levels.",
        instructions: ["Click to select pieces", "Click to move pieces", "Capture opponent pieces", "Checkmate to win"],
        features: ["Multiple AI levels", "Move hints", "Game analysis", "Tutorial mode"],
        difficulty: "Hard"
    },
    // Continue with more games...
    {
        id: 11,
        title: "Bubble Pop",
        description: "Pop colorful bubbles in this addictive casual game",
        category: "casual",
        rating: 4.1,
        players: "1",
        thumbnail: "🫧",
        iframeUrl: "https://example.com/bubble-pop",
        about: "Pop bubbles of the same color to clear the board in this relaxing casual game.",
        instructions: ["Click bubbles to pop", "Match colors", "Clear the board", "Beat the timer"],
        features: ["Color matching", "Multiple levels", "Time challenges", "Relaxing gameplay"],
        difficulty: "Easy"
    },
    {
        id: 12,
        title: "Zombie Survival",
        description: "Survive the zombie apocalypse in this action-packed game",
        category: "action",
        rating: 4.4,
        players: "1",
        thumbnail: "🧟",
        iframeUrl: "https://example.com/zombie-survival",
        about: "Fight off waves of zombies in this intense survival action game.",
        instructions: ["Use WASD to move", "Click to shoot", "Collect ammo", "Survive as long as possible"],
        features: ["Wave-based gameplay", "Multiple weapons", "Upgrade system", "Endless survival"],
        difficulty: "Medium"
    },
    // Add more games to reach 50...
    {
        id: 13,
        title: "Puzzle Quest",
        description: "Match-3 puzzle game with RPG elements",
        category: "puzzle",
        rating: 4.3,
        players: "1",
        thumbnail: "⚔️",
        iframeUrl: "https://example.com/puzzle-quest",
        about: "Combine puzzle matching with RPG progression in this unique hybrid game.",
        instructions: ["Match 3 or more gems", "Use special combinations", "Defeat enemies", "Level up your character"],
        features: ["RPG elements", "Character progression", "Special abilities", "Story mode"],
        difficulty: "Medium"
    },
    {
        id: 14,
        title: "Drift Racing",
        description: "Master the art of drifting in this racing simulator",
        category: "racing",
        rating: 4.5,
        players: "1",
        thumbnail: "🏁",
        iframeUrl: "https://example.com/drift-racing",
        about: "Perfect your drifting technique in this realistic racing simulator.",
        instructions: ["Use arrow keys to steer", "Master drifting angles", "Complete time trials", "Unlock new cars"],
        features: ["Realistic physics", "Multiple tracks", "Car customization", "Drift scoring"],
        difficulty: "Hard"
    },
    {
        id: 15,
        title: "Kingdom Builder",
        description: "Build and manage your medieval kingdom",
        category: "strategy",
        rating: 4.2,
        players: "1",
        thumbnail: "🏰",
        iframeUrl: "https://example.com/kingdom-builder",
        about: "Build and expand your medieval kingdom while managing resources and defending against threats.",
        instructions: ["Build structures", "Manage resources", "Train armies", "Defend your kingdom"],
        features: ["Resource management", "Building system", "Combat mechanics", "Kingdom expansion"],
        difficulty: "Medium"
    },
    // Continue adding games to reach 50 total...
    {
        id: 16,
        title: "Candy Crush",
        description: "Sweet match-3 puzzle game",
        category: "casual",
        rating: 4.0,
        players: "1",
        thumbnail: "🍬",
        iframeUrl: "https://example.com/candy-crush",
        about: "Match colorful candies in this sweet puzzle adventure.",
        instructions: ["Swap candies to match", "Create special combinations", "Clear objectives", "Progress through levels"],
        features: ["Multiple levels", "Special candies", "Boosters", "Social features"],
        difficulty: "Easy"
    },
    {
        id: 17,
        title: "Ninja Warrior",
        description: "Fast-paced ninja action game",
        category: "action",
        rating: 4.6,
        players: "1",
        thumbnail: "🥷",
        iframeUrl: "https://example.com/ninja-warrior",
        about: "Become a skilled ninja warrior in this fast-paced action game.",
        instructions: ["Use arrow keys to move", "Press spacebar to jump", "Attack enemies", "Collect power-ups"],
        features: ["Ninja abilities", "Multiple levels", "Boss battles", "Character upgrades"],
        difficulty: "Medium"
    },
    {
        id: 18,
        title: "Sudoku Master",
        description: "Classic number puzzle game",
        category: "puzzle",
        rating: 4.4,
        players: "1",
        thumbnail: "🔢",
        iframeUrl: "https://example.com/sudoku-master",
        about: "Solve challenging Sudoku puzzles with multiple difficulty levels.",
        instructions: ["Fill in numbers 1-9", "No repeats in rows/columns", "No repeats in 3x3 boxes", "Complete the grid"],
        features: ["Multiple difficulties", "Hint system", "Timer", "Puzzle generator"],
        difficulty: "Medium"
    },
    {
        id: 19,
        title: "Formula Racing",
        description: "Professional formula racing simulation",
        category: "racing",
        rating: 4.7,
        players: "1",
        thumbnail: "🏎️",
        iframeUrl: "https://example.com/formula-racing",
        about: "Experience the thrill of professional formula racing with realistic physics.",
        instructions: ["Use arrow keys to steer", "Manage tire wear", "Optimize racing line", "Win championships"],
        features: ["Realistic physics", "Multiple circuits", "Car setup", "Championship mode"],
        difficulty: "Hard"
    },
    {
        id: 20,
        title: "Civilization Lite",
        description: "Build your civilization from scratch",
        category: "strategy",
        rating: 4.5,
        players: "1",
        thumbnail: "🌍",
        iframeUrl: "https://example.com/civilization-lite",
        about: "Build and expand your civilization through the ages.",
        instructions: ["Build cities", "Research technologies", "Manage resources", "Win through various means"],
        features: ["Multiple victory conditions", "Technology tree", "Diplomacy", "Historical accuracy"],
        difficulty: "Hard"
    },
    // Continue with remaining games...
    {
        id: 21,
        title: "Farmville",
        description: "Manage your virtual farm",
        category: "casual",
        rating: 4.1,
        players: "1",
        thumbnail: "🚜",
        iframeUrl: "https://example.com/farmville",
        about: "Build and manage your dream farm with crops and animals.",
        instructions: ["Plant crops", "Harvest when ready", "Raise animals", "Expand your farm"],
        features: ["Crop management", "Animal husbandry", "Farm expansion", "Social features"],
        difficulty: "Easy"
    },
    {
        id: 22,
        title: "Street Fighter",
        description: "Classic fighting game",
        category: "action",
        rating: 4.8,
        players: "1-2",
        thumbnail: "🥊",
        iframeUrl: "https://example.com/street-fighter",
        about: "Fight your way to the top in this classic fighting game.",
        instructions: ["Use arrow keys to move", "Press buttons to attack", "Learn special moves", "Defeat opponents"],
        features: ["Multiple characters", "Special moves", "Combo system", "Tournament mode"],
        difficulty: "Medium"
    },
    {
        id: 23,
        title: "Crossword Puzzle",
        description: "Daily crossword challenges",
        category: "puzzle",
        rating: 4.2,
        players: "1",
        thumbnail: "📝",
        iframeUrl: "https://example.com/crossword",
        about: "Solve daily crossword puzzles with varying difficulty levels.",
        instructions: ["Click squares to type", "Use clues to solve", "Check your answers", "Complete the puzzle"],
        features: ["Daily puzzles", "Multiple difficulties", "Hint system", "Timer"],
        difficulty: "Medium"
    },
    {
        id: 24,
        title: "Rally Racing",
        description: "Off-road rally racing adventure",
        category: "racing",
        rating: 4.4,
        players: "1",
        thumbnail: "🏔️",
        iframeUrl: "https://example.com/rally-racing",
        about: "Navigate challenging off-road tracks in this rally racing game.",
        instructions: ["Use arrow keys to steer", "Navigate rough terrain", "Complete stages", "Beat time limits"],
        features: ["Off-road physics", "Multiple stages", "Weather effects", "Car damage system"],
        difficulty: "Medium"
    },
    {
        id: 25,
        title: "Risk Online",
        description: "Classic strategy board game",
        category: "strategy",
        rating: 4.3,
        players: "2-6",
        thumbnail: "🗺️",
        iframeUrl: "https://example.com/risk-online",
        about: "Conquer the world in this classic strategy board game.",
        instructions: ["Deploy troops", "Attack territories", "Defend your lands", "Conquer the world"],
        features: ["Multiple maps", "AI opponents", "Online multiplayer", "Alliance system"],
        difficulty: "Medium"
    },
    // Continue with remaining games to reach 50...
    {
        id: 26,
        title: "Bejeweled",
        description: "Sparkling gem matching game",
        category: "casual",
        rating: 4.0,
        players: "1",
        thumbnail: "💎",
        iframeUrl: "https://example.com/bejeweled",
        about: "Match sparkling gems in this classic puzzle game.",
        instructions: ["Swap gems to match", "Create special combinations", "Clear objectives", "Progress through levels"],
        features: ["Multiple modes", "Special gems", "Power-ups", "Relaxing gameplay"],
        difficulty: "Easy"
    },
    {
        id: 27,
        title: "Metal Slug",
        description: "Run and gun action game",
        category: "action",
        rating: 4.7,
        players: "1-2",
        thumbnail: "🔫",
        iframeUrl: "https://example.com/metal-slug",
        about: "Fight through enemy lines in this classic run and gun game.",
        instructions: ["Use arrow keys to move", "Press spacebar to shoot", "Collect weapons", "Defeat bosses"],
        features: ["Multiple weapons", "Boss battles", "Co-op mode", "Arcade action"],
        difficulty: "Medium"
    },
    {
        id: 28,
        title: "Mahjong",
        description: "Traditional tile matching game",
        category: "puzzle",
        rating: 4.1,
        players: "1",
        thumbnail: "🀄",
        iframeUrl: "https://example.com/mahjong",
        about: "Match traditional Mahjong tiles in this relaxing puzzle game.",
        instructions: ["Click matching tiles", "Remove all tiles", "Use hints if needed", "Complete the board"],
        features: ["Traditional tiles", "Multiple layouts", "Hint system", "Timer"],
        difficulty: "Easy"
    },
    {
        id: 29,
        title: "NASCAR Racing",
        description: "Professional stock car racing",
        category: "racing",
        rating: 4.5,
        players: "1",
        thumbnail: "🏁",
        iframeUrl: "https://example.com/nascar-racing",
        about: "Experience the excitement of NASCAR stock car racing.",
        instructions: ["Use arrow keys to steer", "Draft behind cars", "Pit for fuel", "Win races"],
        features: ["Realistic physics", "Multiple tracks", "Pit strategy", "Championship mode"],
        difficulty: "Hard"
    },
    {
        id: 30,
        title: "Age of Empires",
        description: "Historical real-time strategy",
        category: "strategy",
        rating: 4.6,
        players: "1-8",
        thumbnail: "⚔️",
        iframeUrl: "https://example.com/age-of-empires",
        about: "Build your empire through the ages in this historical strategy game.",
        instructions: ["Gather resources", "Build armies", "Research technologies", "Conquer enemies"],
        features: ["Multiple civilizations", "Historical accuracy", "Campaign mode", "Multiplayer"],
        difficulty: "Hard"
    },
    // Continue with remaining games...
    {
        id: 31,
        title: "Angry Birds",
        description: "Slingshot physics puzzle",
        category: "casual",
        rating: 4.3,
        players: "1",
        thumbnail: "🐦",
        iframeUrl: "https://example.com/angry-birds",
        about: "Launch birds to destroy structures and defeat pigs.",
        instructions: ["Pull back to aim", "Release to launch", "Hit targets", "Destroy structures"],
        features: ["Physics-based", "Multiple birds", "Level progression", "Star rating"],
        difficulty: "Easy"
    },
    {
        id: 32,
        title: "Mortal Kombat",
        description: "Fighting game with fatalities",
        category: "action",
        rating: 4.8,
        players: "1-2",
        thumbnail: "⚔️",
        iframeUrl: "https://example.com/mortal-kombat",
        about: "Fight to the death in this brutal fighting game.",
        instructions: ["Use arrow keys to move", "Press buttons to attack", "Learn fatalities", "Win tournaments"],
        features: ["Multiple characters", "Fatalities", "Combo system", "Story mode"],
        difficulty: "Medium"
    },
    {
        id: 33,
        title: "Word Search",
        description: "Find hidden words in letter grids",
        category: "puzzle",
        rating: 4.0,
        players: "1",
        thumbnail: "🔍",
        iframeUrl: "https://example.com/word-search",
        about: "Find hidden words in letter grids with various themes.",
        instructions: ["Click and drag to select", "Find all words", "Use hints if needed", "Complete the puzzle"],
        features: ["Multiple themes", "Hint system", "Timer", "Word lists"],
        difficulty: "Easy"
    },
    {
        id: 34,
        title: "F1 Racing",
        description: "Formula 1 racing simulation",
        category: "racing",
        rating: 4.7,
        players: "1",
        thumbnail: "🏎️",
        iframeUrl: "https://example.com/f1-racing",
        about: "Experience the pinnacle of motorsport in this F1 racing simulation.",
        instructions: ["Use arrow keys to steer", "Manage tire strategy", "Optimize lap times", "Win championships"],
        features: ["Realistic physics", "Official tracks", "Car setup", "Season mode"],
        difficulty: "Hard"
    },
    {
        id: 35,
        title: "StarCraft",
        description: "Space strategy game",
        category: "strategy",
        rating: 4.9,
        players: "1-8",
        thumbnail: "🚀",
        iframeUrl: "https://example.com/starcraft",
        about: "Command armies in this epic space strategy game.",
        instructions: ["Build bases", "Train units", "Gather resources", "Defeat enemies"],
        features: ["Multiple races", "Campaign mode", "Multiplayer", "Esports ready"],
        difficulty: "Hard"
    },
    // Continue with remaining games...
    {
        id: 36,
        title: "Plants vs Zombies",
        description: "Tower defense with plants",
        category: "casual",
        rating: 4.4,
        players: "1",
        thumbnail: "🌱",
        iframeUrl: "https://example.com/plants-vs-zombies",
        about: "Defend your home with plants against zombie invaders.",
        instructions: ["Place plants strategically", "Collect sunlight", "Defend your house", "Survive all waves"],
        features: ["Multiple plants", "Different zombies", "Level progression", "Puzzle elements"],
        difficulty: "Easy"
    },
    {
        id: 37,
        title: "Call of Duty",
        description: "First-person shooter action",
        category: "action",
        rating: 4.6,
        players: "1-16",
        thumbnail: "🔫",
        iframeUrl: "https://example.com/call-of-duty",
        about: "Experience intense first-person combat in this action game.",
        instructions: ["Use WASD to move", "Click to shoot", "Reload when needed", "Complete objectives"],
        features: ["Multiple weapons", "Campaign mode", "Multiplayer", "Realistic graphics"],
        difficulty: "Medium"
    },
    {
        id: 38,
        title: "Jigsaw Puzzle",
        description: "Classic picture puzzle game",
        category: "puzzle",
        rating: 4.2,
        players: "1",
        thumbnail: "🧩",
        iframeUrl: "https://example.com/jigsaw-puzzle",
        about: "Assemble beautiful pictures piece by piece.",
        instructions: ["Drag pieces to fit", "Complete the picture", "Use hints if needed", "Choose difficulty"],
        features: ["Multiple pictures", "Different piece counts", "Hint system", "Timer"],
        difficulty: "Easy"
    },
    {
        id: 39,
        title: "Mario Kart",
        description: "Fun kart racing game",
        category: "racing",
        rating: 4.8,
        players: "1-4",
        thumbnail: "🏁",
        iframeUrl: "https://example.com/mario-kart",
        about: "Race with friends in this fun kart racing game.",
        instructions: ["Use arrow keys to steer", "Collect power-ups", "Use items strategically", "Win races"],
        features: ["Multiple characters", "Power-up system", "Multiplayer", "Fun tracks"],
        difficulty: "Easy"
    },
    {
        id: 40,
        title: "Monopoly",
        description: "Classic board game online",
        category: "strategy",
        rating: 4.1,
        players: "2-8",
        thumbnail: "🏠",
        iframeUrl: "https://example.com/monopoly",
        about: "Buy, sell, and trade properties in this classic board game.",
        instructions: ["Roll dice to move", "Buy properties", "Collect rent", "Bankrupt opponents"],
        features: ["Multiple boards", "AI opponents", "Online multiplayer", "Classic rules"],
        difficulty: "Easy"
    },
    // Final games to reach 50...
    {
        id: 41,
        title: "Candy Land",
        description: "Sweet adventure board game",
        category: "casual",
        rating: 4.0,
        players: "2-4",
        thumbnail: "🍭",
        iframeUrl: "https://example.com/candy-land",
        about: "Journey through a magical candy world in this sweet board game.",
        instructions: ["Draw cards to move", "Follow the path", "Avoid obstacles", "Reach the end first"],
        features: ["Colorful graphics", "Simple rules", "Family friendly", "Multiple players"],
        difficulty: "Easy"
    },
    {
        id: 42,
        title: "Street Fighter II",
        description: "Classic arcade fighting game",
        category: "action",
        rating: 4.7,
        players: "1-2",
        thumbnail: "🥊",
        iframeUrl: "https://example.com/street-fighter-ii",
        about: "Fight your way through the world warrior tournament.",
        instructions: ["Use arrow keys to move", "Press buttons to attack", "Learn special moves", "Defeat all opponents"],
        features: ["Multiple characters", "Special moves", "Arcade mode", "Tournament mode"],
        difficulty: "Medium"
    },
    {
        id: 43,
        title: "Rubik's Cube",
        description: "3D puzzle cube solver",
        category: "puzzle",
        rating: 4.5,
        players: "1",
        thumbnail: "🧊",
        iframeUrl: "https://example.com/rubiks-cube",
        about: "Solve the iconic Rubik's Cube puzzle in 3D.",
        instructions: ["Click to rotate faces", "Match colors on each side", "Use algorithms", "Complete the cube"],
        features: ["3D graphics", "Multiple sizes", "Solution hints", "Timer"],
        difficulty: "Hard"
    },
    {
        id: 44,
        title: "Gran Turismo",
        description: "Realistic racing simulation",
        category: "racing",
        rating: 4.8,
        players: "1",
        thumbnail: "🏎️",
        iframeUrl: "https://example.com/gran-turismo",
        about: "Experience realistic racing with authentic cars and tracks.",
        instructions: ["Use arrow keys to steer", "Master racing lines", "Upgrade your cars", "Win championships"],
        features: ["Realistic physics", "Authentic cars", "Multiple tracks", "Career mode"],
        difficulty: "Hard"
    },
    {
        id: 45,
        title: "Chess Titans",
        description: "Advanced chess game",
        category: "strategy",
        rating: 4.6,
        players: "1-2",
        thumbnail: "♟️",
        iframeUrl: "https://example.com/chess-titans",
        about: "Master the game of chess with advanced AI opponents.",
        instructions: ["Move pieces strategically", "Plan several moves ahead", "Use opening theory", "Checkmate to win"],
        features: ["Advanced AI", "Opening database", "Game analysis", "Multiple time controls"],
        difficulty: "Hard"
    },
    {
        id: 46,
        title: "Solitaire",
        description: "Classic card game",
        category: "casual",
        rating: 4.1,
        players: "1",
        thumbnail: "🃏",
        iframeUrl: "https://example.com/solitaire",
        about: "Play the classic Klondike solitaire card game.",
        instructions: ["Move cards to build suits", "Use stock pile", "Clear all cards", "Win the game"],
        features: ["Classic rules", "Undo function", "Hint system", "Statistics"],
        difficulty: "Easy"
    },
    {
        id: 47,
        title: "Pac-Man",
        description: "Classic arcade maze game",
        category: "action",
        rating: 4.9,
        players: "1",
        thumbnail: "👻",
        iframeUrl: "https://example.com/pac-man",
        about: "Navigate mazes while eating dots and avoiding ghosts.",
        instructions: ["Use arrow keys to move", "Eat all dots", "Avoid ghosts", "Use power pellets"],
        features: ["Classic gameplay", "Multiple levels", "High score tracking", "Arcade feel"],
        difficulty: "Medium"
    },
    {
        id: 48,
        title: "Scrabble",
        description: "Word building board game",
        category: "puzzle",
        rating: 4.3,
        players: "2-4",
        thumbnail: "📝",
        iframeUrl: "https://example.com/scrabble",
        about: "Build words and score points in this classic word game.",
        instructions: ["Place tiles to form words", "Use bonus squares", "Score points", "Win with highest score"],
        features: ["Word validation", "Score tracking", "Multiple players", "Dictionary support"],
        difficulty: "Medium"
    },
    {
        id: 49,
        title: "Need for Speed",
        description: "High-speed racing action",
        category: "racing",
        rating: 4.7,
        players: "1",
        thumbnail: "🏁",
        iframeUrl: "https://example.com/need-for-speed",
        about: "Race at high speeds in exotic cars through urban environments.",
        instructions: ["Use arrow keys to steer", "Avoid police", "Upgrade your car", "Win races"],
        features: ["Exotic cars", "Police chases", "Car customization", "Open world"],
        difficulty: "Medium"
    },
    {
        id: 50,
        title: "Settlers of Catan",
        description: "Resource management strategy",
        category: "strategy",
        rating: 4.4,
        players: "3-4",
        thumbnail: "🏘️",
        iframeUrl: "https://example.com/settlers-of-catan",
        about: "Build settlements and trade resources in this strategic board game.",
        instructions: ["Build settlements", "Trade resources", "Expand your territory", "Reach 10 victory points"],
        features: ["Resource management", "Trading system", "Multiple players", "Strategic gameplay"],
        difficulty: "Medium"
    }
];

// Global variables
let currentCategory = 'all';
let filteredGames = [...gamesData];

// DOM elements
const gamesGrid = document.getElementById('gamesGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryCards = document.querySelectorAll('.category-card');
const backToTopBtn = document.getElementById('backToTop');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadGames();
    setupEventListeners();
    updateCategoryCounts();
});

// Load games into the grid
function loadGames() {
    gamesGrid.innerHTML = '';
    
    filteredGames.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

// Create a game card element
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
        <div class="game-thumbnail">
            ${game.thumbnail}
        </div>
        <div class="game-info">
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.description}</p>
            <div class="game-meta">
                <div class="game-rating">
                    <div class="stars">
                        ${generateStars(game.rating)}
                    </div>
                    <span>${game.rating}</span>
                </div>
                <span class="game-category">${game.category}</span>
            </div>
        </div>
    `;
    
    // Add click event to navigate to game detail page
    card.addEventListener('click', () => {
        window.location.href = `game-detail.html?id=${game.id}`;
    });
    
    return card;
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (hasHalfStar && i === fullStars) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    
    return starsHTML;
}

// Filter games by category
function filterByCategory(category) {
    currentCategory = category;
    
    if (category === 'all') {
        filteredGames = [...gamesData];
    } else {
        filteredGames = gamesData.filter(game => game.category === category);
    }
    
    loadGames();
    updateActiveCategory();
}

// Update active category styling
function updateActiveCategory() {
    categoryCards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.category === currentCategory) {
            card.classList.add('active');
        }
    });
}

// Search games
function searchGames() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredGames = currentCategory === 'all' ? [...gamesData] : gamesData.filter(game => game.category === currentCategory);
    } else {
        filteredGames = gamesData.filter(game => 
            (currentCategory === 'all' || game.category === currentCategory) &&
            (game.title.toLowerCase().includes(searchTerm) ||
             game.description.toLowerCase().includes(searchTerm) ||
             game.category.toLowerCase().includes(searchTerm))
        );
    }
    
    loadGames();
}

// Update category counts
function updateCategoryCounts() {
    const categories = ['action', 'puzzle', 'racing', 'strategy', 'casual'];
    
    categories.forEach(category => {
        const count = gamesData.filter(game => game.category === category).length;
        const categoryCard = document.querySelector(`[data-category="${category}"] .category-count`);
        if (categoryCard) {
            categoryCard.textContent = count;
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Category filter
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            filterByCategory(card.dataset.category);
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', searchGames);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchGames();
        }
    });
    
    // Mobile navigation
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
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

// Add smooth scrolling for all internal links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 