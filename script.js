// Game Data - 50 games including the new provided iframe games
const gamesData = [
    // New user provided games
    {
        id: 1,
        title: "Memoji",
        description: "Create and customize your own animated emoji character",
        category: "casual",
        rating: 4.3,
        players: "1",
        thumbnail: "😊",
        iframeUrl: "https://html5.gamedistribution.com/50c56858d355416ba84e18c68321a69b/?gd_sdk_referrer_url=https://游戏工作室.com/games/memoji",
        about: "Memoji is a fun character creation game where you can design and customize your own animated emoji. Express yourself with unique facial features, hairstyles, and accessories.",
        instructions: ["Click to customize features", "Choose from various options", "Create your unique character", "Save and share your creation"],
        features: ["Character customization", "Multiple options", "Animated expressions", "Share functionality"],
        difficulty: "Easy"
    },
    {
        id: 2,
        title: "Cityquest",
        description: "Explore and build your own city in this strategic simulation game",
        category: "strategy",
        rating: 4.5,
        players: "1",
        thumbnail: "🏙️",
        iframeUrl: "https://html5.gamedistribution.com/31068f4a88af4d3da31feeeddaeb44c8/?gd_sdk_referrer_url=https://游戏工作室.com/games/cityquest",
        about: "Cityquest is a city-building simulation game where you plan, construct, and manage your own urban paradise. Balance resources, population needs, and city development.",
        instructions: ["Plan city layout", "Build essential structures", "Manage resources", "Grow your population"],
        features: ["City building", "Resource management", "Strategic planning", "Progressive development"],
        difficulty: "Medium"
    },
    {
        id: 3,
        title: "10K",
        description: "Reach 10,000 points in this addictive number puzzle game",
        category: "puzzle",
        rating: 4.6,
        players: "1",
        thumbnail: "🔢",
        iframeUrl: "https://html5.gamedistribution.com/3acc054600054896b62bda751eaef869/?gd_sdk_referrer_url=https://游戏工作室.com/games/10k",
        about: "10K is a challenging number puzzle game where you combine tiles to reach the ultimate goal of 10,000 points. Test your strategic thinking and planning skills.",
        instructions: ["Swipe to move tiles", "Combine same numbers", "Plan your moves", "Reach 10,000 points"],
        features: ["Number combining", "Strategic gameplay", "Progressive difficulty", "Score tracking"],
        difficulty: "Hard"
    },
    {
        id: 4,
        title: "Phrasle Master",
        description: "Solve word puzzles by guessing phrases letter by letter",
        category: "puzzle",
        rating: 4.4,
        players: "1",
        thumbnail: "📝",
        iframeUrl: "https://html5.gamedistribution.com/1adf969783854409b65b5ccb0873ea8a/?gd_sdk_referrer_url=https://游戏工作室.com/games/phrasle-master",
        about: "Phrasle Master challenges your vocabulary and deduction skills. Guess phrases one letter at a time and solve daily word puzzles.",
        instructions: ["Guess letters one by one", "Use hints strategically", "Solve the phrase", "Complete daily challenges"],
        features: ["Daily puzzles", "Letter guessing", "Hint system", "Vocabulary building"],
        difficulty: "Medium"
    },
    {
        id: 5,
        title: "Word Search",
        description: "Find hidden words in letter grids with various themes",
        category: "puzzle",
        rating: 4.2,
        players: "1",
        thumbnail: "🔍",
        iframeUrl: "https://html5.gamedistribution.com/c13ee9c06edc4f0a8d7f6f291a7c13d8/?gd_sdk_referrer_url=https://游戏工作室.com/games/word-search",
        about: "Word Search is a classic puzzle game where you find hidden words in letter grids. Perfect for improving vocabulary and pattern recognition.",
        instructions: ["Click and drag to select", "Find all hidden words", "Use hints if needed", "Complete the grid"],
        features: ["Multiple themes", "Hint system", "Timer", "Word lists"],
        difficulty: "Easy"
    },
    {
        id: 6,
        title: "Kitty Scramble",
        description: "Help adorable kittens find their way home in this cute puzzle game",
        category: "puzzle",
        rating: 4.1,
        players: "1",
        thumbnail: "🐱",
        iframeUrl: "https://html5.gamedistribution.com/944186abe50e452dac7f0e8d3e0a8814/?gd_sdk_referrer_url=https://游戏工作室.com/games/kitty-scramble",
        about: "Kitty Scramble is a delightful puzzle game featuring cute kittens. Help them navigate through obstacles and find their way home.",
        instructions: ["Guide kittens safely", "Avoid obstacles", "Collect treats", "Reach the goal"],
        features: ["Cute characters", "Multiple levels", "Puzzle elements", "Family friendly"],
        difficulty: "Easy"
    },
    {
        id: 7,
        title: "Daily Crossword",
        description: "Solve daily crossword puzzles with varying difficulty levels",
        category: "puzzle",
        rating: 4.3,
        players: "1",
        thumbnail: "📋",
        iframeUrl: "https://html5.gamedistribution.com/e74d9a4123fb4880bc5e3d7664c9dcc9/?gd_sdk_referrer_url=https://游戏工作室.com/games/daily-crossword",
        about: "Daily Crossword offers fresh crossword puzzles every day. Test your vocabulary and knowledge with clues ranging from easy to challenging.",
        instructions: ["Click squares to type", "Use clues to solve", "Check your answers", "Complete the puzzle"],
        features: ["Daily puzzles", "Multiple difficulties", "Hint system", "Timer"],
        difficulty: "Medium"
    },
    {
        id: 8,
        title: "Hexa",
        description: "Connect hexagons in this strategic puzzle game",
        category: "puzzle",
        rating: 4.4,
        players: "1",
        thumbnail: "⬡",
        iframeUrl: "https://html5.gamedistribution.com/ab1984b4b1314e1dab545a34b62bce47/?gd_sdk_referrer_url=https://游戏工作室.com/games/hexa",
        about: "Hexa is a unique puzzle game using hexagonal tiles. Connect matching colors and clear the board in this strategic challenge.",
        instructions: ["Connect matching hexagons", "Clear the board", "Plan your moves", "Beat the timer"],
        features: ["Hexagonal gameplay", "Color matching", "Strategic thinking", "Time pressure"],
        difficulty: "Medium"
    },
    {
        id: 9,
        title: "Daily Sudoku",
        description: "Solve daily Sudoku puzzles with multiple difficulty levels",
        category: "puzzle",
        rating: 4.5,
        players: "1",
        thumbnail: "🔢",
        iframeUrl: "https://html5.gamedistribution.com/dd9701cd84da40699cdc404645f29c1f/?gd_sdk_referrer_url=https://游戏工作室.com/games/daily-sudoku",
        about: "Daily Sudoku provides fresh number puzzles every day. Fill in the grid so that every row, column, and 3x3 box contains numbers 1-9.",
        instructions: ["Fill numbers 1-9", "No repeats in rows/columns", "No repeats in 3x3 boxes", "Complete the grid"],
        features: ["Daily puzzles", "Multiple difficulties", "Hint system", "Timer"],
        difficulty: "Medium"
    },
    {
        id: 10,
        title: "Crocword Crossword Puzzle",
        description: "Classic crossword puzzle game with modern interface",
        category: "puzzle",
        rating: 4.2,
        players: "1",
        thumbnail: "📝",
        iframeUrl: "https://html5.gamedistribution.com/3e314ff40f40472f9aefed5b046f6dcc/?gd_sdk_referrer_url=https://游戏工作室.com/games/crocword-crossword",
        about: "Crocword Crossword Puzzle brings the classic crossword experience to your screen with a modern, user-friendly interface and challenging puzzles.",
        instructions: ["Click squares to type", "Use across and down clues", "Check your answers", "Complete the puzzle"],
        features: ["Classic crossword", "Modern interface", "Multiple puzzles", "Hint system"],
        difficulty: "Medium"
    },
    {
        id: 11,
        title: "Daily Jigsaw",
        description: "Assemble beautiful pictures piece by piece",
        category: "puzzle",
        rating: 4.1,
        players: "1",
        thumbnail: "🧩",
        iframeUrl: "https://html5.gamedistribution.com/5eebb19f0fcd43849721b95ecf53a700/?gd_sdk_referrer_url=https://游戏工作室.com/games/daily-jigsaw",
        about: "Daily Jigsaw offers beautiful pictures to assemble piece by piece. Relax and enjoy the satisfaction of completing stunning images.",
        instructions: ["Drag pieces to fit", "Complete the picture", "Use hints if needed", "Choose difficulty"],
        features: ["Daily pictures", "Different piece counts", "Hint system", "Relaxing gameplay"],
        difficulty: "Easy"
    },
    {
        id: 12,
        title: "Word Swipe",
        description: "Swipe to connect letters and form words",
        category: "puzzle",
        rating: 4.3,
        players: "1",
        thumbnail: "📱",
        iframeUrl: "https://html5.gamedistribution.com/ef4b392680554564abe1a3d3917a754b/?gd_sdk_referrer_url=https://游戏工作室.com/games/word-swipe",
        about: "Word Swipe is a modern word puzzle game where you swipe through letters to form words. Perfect for quick brain training sessions.",
        instructions: ["Swipe through letters", "Form valid words", "Complete levels", "Beat the timer"],
        features: ["Swipe mechanics", "Word formation", "Multiple levels", "Time challenges"],
        difficulty: "Easy"
    },
    {
        id: 13,
        title: "Word Sauce",
        description: "Mix letters to create delicious word combinations",
        category: "puzzle",
        rating: 4.0,
        players: "1",
        thumbnail: "🍲",
        iframeUrl: "https://html5.gamedistribution.com/8d8965a1f1af4d2b884e0bc48737925d/?gd_sdk_referrer_url=https://游戏工作室.com/games/word-sauce",
        about: "Word Sauce is a creative word puzzle game where you mix and match letters to create words. Add some spice to your vocabulary!",
        instructions: ["Mix letters", "Create words", "Use hints", "Complete challenges"],
        features: ["Letter mixing", "Word creation", "Hint system", "Creative gameplay"],
        difficulty: "Easy"
    },
    {
        id: 14,
        title: "4 Pix Word Quiz",
        description: "Guess words based on four related pictures",
        category: "puzzle",
        rating: 4.4,
        players: "1",
        thumbnail: "🖼️",
        iframeUrl: "https://html5.gamedistribution.com/992bf414c2fd4a7d8160bcbafd99b6f3/?gd_sdk_referrer_url=https://游戏工作室.com/games/4-pix-word-quiz",
        about: "4 Pix Word Quiz challenges your observation and deduction skills. Look at four related pictures and guess the common word they represent.",
        instructions: ["Look at the four pictures", "Find the common theme", "Guess the word", "Use hints if needed"],
        features: ["Picture-based clues", "Multiple categories", "Hint system", "Progressive difficulty"],
        difficulty: "Medium"
    },
    {
        id: 15,
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
    // Additional games to reach 50 total
    {
        id: 16,
        title: "Space Invaders",
        description: "Classic arcade space shooter with modern graphics",
        category: "action",
        rating: 4.8,
        players: "1",
        thumbnail: "🚀",
        iframeUrl: "https://游戏工作室.com/games/space-invaders",
        about: "Defend Earth from alien invaders in this classic arcade game with modern graphics and enhanced gameplay.",
        instructions: ["Move left/right with arrow keys", "Press spacebar to shoot", "Avoid enemy bullets", "Destroy all aliens"],
        features: ["Classic gameplay", "Modern graphics", "Multiple levels", "Power-ups"],
        difficulty: "Medium"
    },
    {
        id: 17,
        title: "Tetris Classic",
        description: "The timeless puzzle game that started it all",
        category: "puzzle",
        rating: 4.9,
        players: "1",
        thumbnail: "🧩",
        iframeUrl: "https://游戏工作室.com/games/tetris",
        about: "Arrange falling blocks to create complete lines in this timeless puzzle classic.",
        instructions: ["Rotate blocks with arrow keys", "Move blocks left/right", "Complete lines to clear", "Avoid reaching the top"],
        features: ["Classic Tetris", "Multiple speeds", "Score tracking", "Line clearing"],
        difficulty: "Medium"
    },
    {
        id: 18,
        title: "Racing Legends",
        description: "High-speed racing with stunning 3D graphics",
        category: "racing",
        rating: 4.6,
        players: "1-4",
        thumbnail: "🏎️",
        iframeUrl: "https://游戏工作室.com/games/racing-legends",
        about: "Experience the thrill of high-speed racing with stunning 3D graphics and realistic physics.",
        instructions: ["Use arrow keys to steer", "Press spacebar for nitro", "Avoid obstacles", "Finish first"],
        features: ["3D graphics", "Multiple tracks", "Car customization", "Multiplayer support"],
        difficulty: "Hard"
    },
    {
        id: 19,
        title: "Chess Master",
        description: "Strategic chess game with AI opponents",
        category: "strategy",
        rating: 4.7,
        players: "1-2",
        thumbnail: "♟️",
        iframeUrl: "https://游戏工作室.com/games/chess-master",
        about: "Challenge yourself with strategic chess gameplay against AI opponents of varying difficulty levels.",
        instructions: ["Click to select pieces", "Click to move pieces", "Capture opponent pieces", "Checkmate to win"],
        features: ["Multiple AI levels", "Move hints", "Game analysis", "Tutorial mode"],
        difficulty: "Hard"
    },
    // Continue with more games...
    {
        id: 20,
        title: "Bubble Pop",
        description: "Pop colorful bubbles in this addictive casual game",
        category: "casual",
        rating: 4.1,
        players: "1",
        thumbnail: "🫧",
        iframeUrl: "https://游戏工作室.com/games/bubble-pop",
        about: "Pop bubbles of the same color to clear the board in this relaxing casual game.",
        instructions: ["Click bubbles to pop", "Match colors", "Clear the board", "Beat the timer"],
        features: ["Color matching", "Multiple levels", "Time challenges", "Relaxing gameplay"],
        difficulty: "Easy"
    },
    {
        id: 21,
        title: "Zombie Survival",
        description: "Survive the zombie apocalypse in this action-packed game",
        category: "action",
        rating: 4.4,
        players: "1",
        thumbnail: "🧟",
        iframeUrl: "https://游戏工作室.com/games/zombie-survival",
        about: "Fight off waves of zombies in this intense survival action game.",
        instructions: ["Use WASD to move", "Click to shoot", "Collect ammo", "Survive as long as possible"],
        features: ["Wave-based gameplay", "Multiple weapons", "Upgrade system", "Endless survival"],
        difficulty: "Medium"
    },
    // Add more games to reach 50...
    {
        id: 22,
        title: "Puzzle Quest",
        description: "Match-3 puzzle game with RPG elements",
        category: "puzzle",
        rating: 4.3,
        players: "1",
        thumbnail: "⚔️",
        iframeUrl: "https://游戏工作室.com/games/puzzle-quest",
        about: "Combine puzzle matching with RPG progression in this unique hybrid game.",
        instructions: ["Match 3 or more gems", "Use special combinations", "Defeat enemies", "Level up your character"],
        features: ["RPG elements", "Character progression", "Special abilities", "Story mode"],
        difficulty: "Medium"
    },
    {
        id: 23,
        title: "Drift Racing",
        description: "Master the art of drifting in this racing simulator",
        category: "racing",
        rating: 4.5,
        players: "1",
        thumbnail: "🏁",
        iframeUrl: "https://游戏工作室.com/games/drift-racing",
        about: "Perfect your drifting technique in this realistic racing simulator.",
        instructions: ["Use arrow keys to steer", "Master drifting angles", "Complete time trials", "Unlock new cars"],
        features: ["Realistic physics", "Multiple tracks", "Car customization", "Drift scoring"],
        difficulty: "Hard"
    },
    {
        id: 24,
        title: "Kingdom Builder",
        description: "Build and manage your medieval kingdom",
        category: "strategy",
        rating: 4.2,
        players: "1",
        thumbnail: "🏰",
        iframeUrl: "https://游戏工作室.com/games/kingdom-builder",
        about: "Build and expand your medieval kingdom while managing resources and defending against threats.",
        instructions: ["Build structures", "Manage resources", "Train armies", "Defend your kingdom"],
        features: ["Resource management", "Building system", "Combat mechanics", "Kingdom expansion"],
        difficulty: "Medium"
    },
    // Continue adding games to reach 50 total...
    {
        id: 25,
        title: "Candy Crush",
        description: "Sweet match-3 puzzle game",
        category: "casual",
        rating: 4.0,
        players: "1",
        thumbnail: "🍬",
        iframeUrl: "https://游戏工作室.com/games/candy-crush",
        about: "Match colorful candies in this sweet puzzle adventure.",
        instructions: ["Swap candies to match", "Create special combinations", "Clear objectives", "Progress through levels"],
        features: ["Multiple levels", "Special candies", "Boosters", "Social features"],
        difficulty: "Easy"
    },
    {
        id: 26,
        title: "Ninja Warrior",
        description: "Fast-paced ninja action game",
        category: "action",
        rating: 4.6,
        players: "1",
        thumbnail: "🥷",
        iframeUrl: "https://游戏工作室.com/games/ninja-warrior",
        about: "Become a skilled ninja warrior in this fast-paced action game.",
        instructions: ["Use arrow keys to move", "Press spacebar to jump", "Attack enemies", "Collect power-ups"],
        features: ["Ninja abilities", "Multiple levels", "Boss battles", "Character upgrades"],
        difficulty: "Medium"
    },
    {
        id: 27,
        title: "Sudoku Master",
        description: "Classic number puzzle game",
        category: "puzzle",
        rating: 4.4,
        players: "1",
        thumbnail: "🔢",
        iframeUrl: "https://游戏工作室.com/games/sudoku-master",
        about: "Solve challenging Sudoku puzzles with multiple difficulty levels.",
        instructions: ["Fill in numbers 1-9", "No repeats in rows/columns", "No repeats in 3x3 boxes", "Complete the grid"],
        features: ["Multiple difficulties", "Hint system", "Timer", "Puzzle generator"],
        difficulty: "Medium"
    },
    {
        id: 28,
        title: "Formula Racing",
        description: "Professional formula racing simulation",
        category: "racing",
        rating: 4.7,
        players: "1",
        thumbnail: "🏎️",
        iframeUrl: "https://游戏工作室.com/games/formula-racing",
        about: "Experience the thrill of professional formula racing with realistic physics.",
        instructions: ["Use arrow keys to steer", "Manage tire wear", "Optimize racing line", "Win championships"],
        features: ["Realistic physics", "Multiple circuits", "Car setup", "Championship mode"],
        difficulty: "Hard"
    },
    {
        id: 29,
        title: "Civilization Lite",
        description: "Build your civilization from scratch",
        category: "strategy",
        rating: 4.5,
        players: "1",
        thumbnail: "🌍",
        iframeUrl: "https://游戏工作室.com/games/civilization-lite",
        about: "Build and expand your civilization through the ages.",
        instructions: ["Build cities", "Research technologies", "Manage resources", "Win through various means"],
        features: ["Multiple victory conditions", "Technology tree", "Diplomacy", "Historical accuracy"],
        difficulty: "Hard"
    },
    // Continue with remaining games...
    {
        id: 30,
        title: "Farmville",
        description: "Manage your virtual farm",
        category: "casual",
        rating: 4.1,
        players: "1",
        thumbnail: "🚜",
        iframeUrl: "https://游戏工作室.com/games/farmville",
        about: "Build and manage your dream farm with crops and animals.",
        instructions: ["Plant crops", "Harvest when ready", "Raise animals", "Expand your farm"],
        features: ["Crop management", "Animal husbandry", "Farm expansion", "Social features"],
        difficulty: "Easy"
    },
    {
        id: 31,
        title: "Street Fighter",
        description: "Classic fighting game",
        category: "action",
        rating: 4.8,
        players: "1-2",
        thumbnail: "🥊",
        iframeUrl: "https://游戏工作室.com/games/street-fighter",
        about: "Fight your way to the top in this classic fighting game.",
        instructions: ["Use arrow keys to move", "Press buttons to attack", "Learn special moves", "Defeat opponents"],
        features: ["Multiple characters", "Special moves", "Combo system", "Tournament mode"],
        difficulty: "Medium"
    },
    {
        id: 32,
        title: "Crossword Puzzle",
        description: "Daily crossword challenges",
        category: "puzzle",
        rating: 4.2,
        players: "1",
        thumbnail: "📝",
        iframeUrl: "https://游戏工作室.com/games/crossword",
        about: "Solve daily crossword puzzles with varying difficulty levels.",
        instructions: ["Click squares to type", "Use clues to solve", "Check your answers", "Complete the puzzle"],
        features: ["Daily puzzles", "Multiple difficulties", "Hint system", "Timer"],
        difficulty: "Medium"
    },
    {
        id: 33,
        title: "Rally Racing",
        description: "Off-road rally racing adventure",
        category: "racing",
        rating: 4.4,
        players: "1",
        thumbnail: "🏔️",
        iframeUrl: "https://游戏工作室.com/games/rally-racing",
        about: "Navigate challenging off-road tracks in this rally racing game.",
        instructions: ["Use arrow keys to steer", "Navigate rough terrain", "Complete stages", "Beat time limits"],
        features: ["Off-road physics", "Multiple stages", "Weather effects", "Car damage system"],
        difficulty: "Medium"
    },
    {
        id: 34,
        title: "Risk Online",
        description: "Classic strategy board game",
        category: "strategy",
        rating: 4.3,
        players: "2-6",
        thumbnail: "🗺️",
        iframeUrl: "https://游戏工作室.com/games/risk-online",
        about: "Conquer the world in this classic strategy board game.",
        instructions: ["Deploy troops", "Attack territories", "Defend your lands", "Conquer the world"],
        features: ["Multiple maps", "AI opponents", "Online multiplayer", "Alliance system"],
        difficulty: "Medium"
    },
    // Continue with remaining games to reach 50...
    {
        id: 35,
        title: "Bejeweled",
        description: "Sparkling gem matching game",
        category: "casual",
        rating: 4.0,
        players: "1",
        thumbnail: "💎",
        iframeUrl: "https://游戏工作室.com/games/bejeweled",
        about: "Match sparkling gems in this classic puzzle game.",
        instructions: ["Swap gems to match", "Create special combinations", "Clear objectives", "Progress through levels"],
        features: ["Multiple modes", "Special gems", "Power-ups", "Relaxing gameplay"],
        difficulty: "Easy"
    },
    {
        id: 36,
        title: "Metal Slug",
        description: "Run and gun action game",
        category: "action",
        rating: 4.7,
        players: "1-2",
        thumbnail: "🔫",
        iframeUrl: "https://游戏工作室.com/games/metal-slug",
        about: "Fight through enemy lines in this classic run and gun game.",
        instructions: ["Use arrow keys to move", "Press spacebar to shoot", "Collect weapons", "Defeat bosses"],
        features: ["Multiple weapons", "Boss battles", "Co-op mode", "Arcade action"],
        difficulty: "Medium"
    },
    {
        id: 37,
        title: "Mahjong",
        description: "Traditional tile matching game",
        category: "puzzle",
        rating: 4.1,
        players: "1",
        thumbnail: "🀄",
        iframeUrl: "https://游戏工作室.com/games/mahjong",
        about: "Match traditional Mahjong tiles in this relaxing puzzle game.",
        instructions: ["Click matching tiles", "Remove all tiles", "Use hints if needed", "Complete the board"],
        features: ["Traditional tiles", "Multiple layouts", "Hint system", "Timer"],
        difficulty: "Easy"
    },
    {
        id: 38,
        title: "NASCAR Racing",
        description: "Professional stock car racing",
        category: "racing",
        rating: 4.5,
        players: "1",
        thumbnail: "🏁",
        iframeUrl: "https://游戏工作室.com/games/nascar-racing",
        about: "Experience the excitement of NASCAR stock car racing.",
        instructions: ["Use arrow keys to steer", "Draft behind cars", "Pit for fuel", "Win races"],
        features: ["Realistic physics", "Multiple tracks", "Pit strategy", "Championship mode"],
        difficulty: "Hard"
    },
    {
        id: 39,
        title: "Age of Empires",
        description: "Historical real-time strategy",
        category: "strategy",
        rating: 4.6,
        players: "1-8",
        thumbnail: "⚔️",
        iframeUrl: "https://游戏工作室.com/games/age-of-empires",
        about: "Build your empire through the ages in this historical strategy game.",
        instructions: ["Gather resources", "Build armies", "Research technologies", "Conquer enemies"],
        features: ["Multiple civilizations", "Historical accuracy", "Campaign mode", "Multiplayer"],
        difficulty: "Hard"
    },
    // Continue with remaining games...
    {
        id: 40,
        title: "Angry Birds",
        description: "Slingshot physics puzzle",
        category: "casual",
        rating: 4.3,
        players: "1",
        thumbnail: "🐦",
        iframeUrl: "https://游戏工作室.com/games/angry-birds",
        about: "Launch birds to destroy structures and defeat pigs.",
        instructions: ["Pull back to aim", "Release to launch", "Hit targets", "Destroy structures"],
        features: ["Physics-based", "Multiple birds", "Level progression", "Star rating"],
        difficulty: "Easy"
    },
    {
        id: 41,
        title: "Mortal Kombat",
        description: "Fighting game with fatalities",
        category: "action",
        rating: 4.8,
        players: "1-2",
        thumbnail: "⚔️",
        iframeUrl: "https://游戏工作室.com/games/mortal-kombat",
        about: "Fight to the death in this brutal fighting game.",
        instructions: ["Use arrow keys to move", "Press buttons to attack", "Learn fatalities", "Win tournaments"],
        features: ["Multiple characters", "Fatalities", "Combo system", "Story mode"],
        difficulty: "Medium"
    },
    {
        id: 42,
        title: "Word Search Classic",
        description: "Find hidden words in letter grids",
        category: "puzzle",
        rating: 4.0,
        players: "1",
        thumbnail: "🔍",
        iframeUrl: "https://游戏工作室.com/games/word-search-classic",
        about: "Find hidden words in letter grids with various themes.",
        instructions: ["Click and drag to select", "Find all words", "Use hints if needed", "Complete the puzzle"],
        features: ["Multiple themes", "Hint system", "Timer", "Word lists"],
        difficulty: "Easy"
    },
    {
        id: 43,
        title: "F1 Racing",
        description: "Formula 1 racing simulation",
        category: "racing",
        rating: 4.7,
        players: "1",
        thumbnail: "🏎️",
        iframeUrl: "https://游戏工作室.com/games/f1-racing",
        about: "Experience the pinnacle of motorsport in this F1 racing simulation.",
        instructions: ["Use arrow keys to steer", "Manage tire strategy", "Optimize lap times", "Win championships"],
        features: ["Realistic physics", "Official tracks", "Car setup", "Season mode"],
        difficulty: "Hard"
    },
    {
        id: 44,
        title: "StarCraft",
        description: "Space strategy game",
        category: "strategy",
        rating: 4.9,
        players: "1-8",
        thumbnail: "🚀",
        iframeUrl: "https://游戏工作室.com/games/starcraft",
        about: "Command armies in this epic space strategy game.",
        instructions: ["Build bases", "Train units", "Gather resources", "Defeat enemies"],
        features: ["Multiple races", "Campaign mode", "Multiplayer", "Esports ready"],
        difficulty: "Hard"
    },
    // Continue with remaining games...
    {
        id: 45,
        title: "Plants vs Zombies",
        description: "Tower defense with plants",
        category: "casual",
        rating: 4.4,
        players: "1",
        thumbnail: "🌱",
        iframeUrl: "https://游戏工作室.com/games/plants-vs-zombies",
        about: "Defend your home with plants against zombie invaders.",
        instructions: ["Place plants strategically", "Collect sunlight", "Defend your house", "Survive all waves"],
        features: ["Multiple plants", "Different zombies", "Level progression", "Puzzle elements"],
        difficulty: "Easy"
    },
    {
        id: 46,
        title: "Call of Duty",
        description: "First-person shooter action",
        category: "action",
        rating: 4.6,
        players: "1-16",
        thumbnail: "🔫",
        iframeUrl: "https://游戏工作室.com/games/call-of-duty",
        about: "Experience intense first-person combat in this action game.",
        instructions: ["Use WASD to move", "Click to shoot", "Reload when needed", "Complete objectives"],
        features: ["Multiple weapons", "Campaign mode", "Multiplayer", "Realistic graphics"],
        difficulty: "Medium"
    },
    {
        id: 47,
        title: "Jigsaw Puzzle Classic",
        description: "Classic picture puzzle game",
        category: "puzzle",
        rating: 4.2,
        players: "1",
        thumbnail: "🧩",
        iframeUrl: "https://游戏工作室.com/games/jigsaw-puzzle-classic",
        about: "Assemble beautiful pictures piece by piece.",
        instructions: ["Drag pieces to fit", "Complete the picture", "Use hints if needed", "Choose difficulty"],
        features: ["Multiple pictures", "Different piece counts", "Hint system", "Timer"],
        difficulty: "Easy"
    },
    {
        id: 48,
        title: "Mario Kart",
        description: "Fun kart racing game",
        category: "racing",
        rating: 4.8,
        players: "1-4",
        thumbnail: "🏁",
        iframeUrl: "https://游戏工作室.com/games/mario-kart",
        about: "Race with friends in this fun kart racing game.",
        instructions: ["Use arrow keys to steer", "Collect power-ups", "Use items strategically", "Win races"],
        features: ["Multiple characters", "Power-up system", "Multiplayer", "Fun tracks"],
        difficulty: "Easy"
    },
    {
        id: 49,
        title: "Monopoly",
        description: "Classic board game online",
        category: "strategy",
        rating: 4.1,
        players: "2-8",
        thumbnail: "🏠",
        iframeUrl: "https://游戏工作室.com/games/monopoly",
        about: "Buy, sell, and trade properties in this classic board game.",
        instructions: ["Roll dice to move", "Buy properties", "Collect rent", "Bankrupt opponents"],
        features: ["Multiple boards", "AI opponents", "Online multiplayer", "Classic rules"],
        difficulty: "Easy"
    },
    // Final games to reach 50...
    {
        id: 50,
        title: "Candy Land",
        description: "Sweet adventure board game",
        category: "casual",
        rating: 4.0,
        players: "2-4",
        thumbnail: "🍭",
        iframeUrl: "https://游戏工作室.com/games/candy-land",
        about: "Journey through a magical candy world in this sweet board game.",
        instructions: ["Draw cards to move", "Follow the path", "Avoid obstacles", "Reach the end first"],
        features: ["Colorful graphics", "Simple rules", "Family friendly", "Multiple players"],
        difficulty: "Easy"
    },
    {
        id: 51,
        title: "Street Fighter II",
        description: "Classic arcade fighting game",
        category: "action",
        rating: 4.7,
        players: "1-2",
        thumbnail: "🥊",
        iframeUrl: "https://游戏工作室.com/games/street-fighter-ii",
        about: "Fight your way through the world warrior tournament.",
        instructions: ["Use arrow keys to move", "Press buttons to attack", "Learn special moves", "Defeat all opponents"],
        features: ["Multiple characters", "Special moves", "Arcade mode", "Tournament mode"],
        difficulty: "Medium"
    },
    {
        id: 52,
        title: "Rubik's Cube",
        description: "3D puzzle cube solver",
        category: "puzzle",
        rating: 4.5,
        players: "1",
        thumbnail: "🧊",
        iframeUrl: "https://游戏工作室.com/games/rubiks-cube",
        about: "Solve the iconic Rubik's Cube puzzle in 3D.",
        instructions: ["Click to rotate faces", "Match colors on each side", "Use algorithms", "Complete the cube"],
        features: ["3D graphics", "Multiple sizes", "Solution hints", "Timer"],
        difficulty: "Hard"
    },
    {
        id: 53,
        title: "Gran Turismo",
        description: "Realistic racing simulation",
        category: "racing",
        rating: 4.8,
        players: "1",
        thumbnail: "🏎️",
        iframeUrl: "https://游戏工作室.com/games/gran-turismo",
        about: "Experience realistic racing with authentic cars and tracks.",
        instructions: ["Use arrow keys to steer", "Master racing lines", "Upgrade your cars", "Win championships"],
        features: ["Realistic physics", "Authentic cars", "Multiple tracks", "Career mode"],
        difficulty: "Hard"
    },
    {
        id: 54,
        title: "Chess Titans",
        description: "Advanced chess game",
        category: "strategy",
        rating: 4.6,
        players: "1-2",
        thumbnail: "♟️",
        iframeUrl: "https://游戏工作室.com/games/chess-titans",
        about: "Master the game of chess with advanced AI opponents.",
        instructions: ["Move pieces strategically", "Plan several moves ahead", "Use opening theory", "Checkmate to win"],
        features: ["Advanced AI", "Opening database", "Game analysis", "Multiple time controls"],
        difficulty: "Hard"
    },
    {
        id: 55,
        title: "Solitaire",
        description: "Classic card game",
        category: "casual",
        rating: 4.1,
        players: "1",
        thumbnail: "🃏",
        iframeUrl: "https://游戏工作室.com/games/solitaire",
        about: "Play the classic Klondike solitaire card game.",
        instructions: ["Move cards to build suits", "Use stock pile", "Clear all cards", "Win the game"],
        features: ["Classic rules", "Undo function", "Hint system", "Statistics"],
        difficulty: "Easy"
    },
    {
        id: 56,
        title: "Pac-Man",
        description: "Classic arcade maze game",
        category: "action",
        rating: 4.9,
        players: "1",
        thumbnail: "👻",
        iframeUrl: "https://游戏工作室.com/games/pac-man",
        about: "Navigate mazes while eating dots and avoiding ghosts.",
        instructions: ["Use arrow keys to move", "Eat all dots", "Avoid ghosts", "Use power pellets"],
        features: ["Classic gameplay", "Multiple levels", "High score tracking", "Arcade feel"],
        difficulty: "Medium"
    },
    {
        id: 57,
        title: "Scrabble",
        description: "Word building board game",
        category: "puzzle",
        rating: 4.3,
        players: "2-4",
        thumbnail: "📝",
        iframeUrl: "https://游戏工作室.com/games/scrabble",
        about: "Build words and score points in this classic word game.",
        instructions: ["Place tiles to form words", "Use bonus squares", "Score points", "Win with highest score"],
        features: ["Word validation", "Score tracking", "Multiple players", "Dictionary support"],
        difficulty: "Medium"
    },
    {
        id: 58,
        title: "Need for Speed",
        description: "High-speed racing action",
        category: "racing",
        rating: 4.7,
        players: "1",
        thumbnail: "🏁",
        iframeUrl: "https://游戏工作室.com/games/need-for-speed",
        about: "Race at high speeds in exotic cars through urban environments.",
        instructions: ["Use arrow keys to steer", "Avoid police", "Upgrade your car", "Win races"],
        features: ["Exotic cars", "Police chases", "Car customization", "Open world"],
        difficulty: "Medium"
    },
    {
        id: 59,
        title: "Settlers of Catan",
        description: "Resource management strategy",
        category: "strategy",
        rating: 4.4,
        players: "3-4",
        thumbnail: "🏘️",
        iframeUrl: "https://游戏工作室.com/games/settlers-of-catan",
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