(() => {
    const htmlInput = document.getElementById('htmlInput');
    const parseButton = document.getElementById('parseButton');
    const fillSampleButton = document.getElementById('fillSampleButton');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsSummary = document.getElementById('resultsSummary');
    const statusMessage = document.getElementById('statusMessage');
    const downloadAllButton = document.getElementById('downloadAllButton');
    const reportTableBody = document.getElementById('reportTableBody');
    const copyReportButton = document.getElementById('copyReportButton');

    const sampleHtml = `
<div class="allgames"> 
       <div class="thumb" id='game-1722'><a href="/Papers-Grade-Please" aria-label="Papers Grade Please"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Papers-Grade-Please.jpg' alt="Papers Grade Please" /><div class='GameName'>Papers Grade Please</div></a></div>  
       <div class="thumb" id='game-1435'><a href="/2048-Ball-Buster" aria-label="2048 Ball Buster"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/2048-Ball-Buster.jpg' alt="2048 Ball Buster" /><div class='GameName'>2048 Ball Buster</div></a></div>  
       <div class="thumb" id='game-986'><a href="/Chain-Cube-2048-3d" aria-label="Chain Cube 2048 3D"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Chain-Cube-2048-3d.jpg' alt="Chain Cube 2048 3D" /><div class='GameName'>Chain Cube 2048 3D</div></a></div>  
       <div class="thumb" id='game-2774'><a href="/Jelly-Run-2048" aria-label="Jelly Run 2048"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Jelly-Run-2048.jpg' alt="Jelly Run 2048" /><div class='GameName'>Jelly Run 2048</div></a></div>  
       <div class="thumb" id='game-2314'><a href="/Bro-Race-Count" aria-label="Bro Race Count"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Bro-Race-Count.jpg' alt="Bro Race Count" /><div class='GameName'>Bro Race Count</div></a></div>  
       <div class="thumb" id='game-2112'><a href="/Number-Gestures" aria-label="Number Gestures"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Number-Gestures.jpg' alt="Number Gestures" /><div class='GameName'>Number Gestures</div></a></div>  
       <div class="thumb" id='game-1015'><a href="/Split-Balls" aria-label="Split Balls"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Split-Balls.jpg' alt="Split Balls" /><div class='GameName'>Split Balls</div></a></div>  
       <div class="thumb" id='game-1317'><a href="/Count-Master-3d" aria-label="Count Master 3D"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Count-Master-3d.jpg' alt="Count Master 3D" /><div class='GameName'>Count Master 3D</div></a></div>  
       <div class="thumb" id='game-1378'><a href="/Coffee-Stack" aria-label="Coffee Stack"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Coffee-Stack.jpg' alt="Coffee Stack" /><div class='GameName'>Coffee Stack</div></a></div>  
       <div class="thumb" id='game-980'><a href="/2048-Merge-Block" aria-label="2048 Merge Block"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/2048-Merge-Block.jpg' alt="2048 Merge Block" /><div class='GameName'>2048 Merge Block</div></a></div>  
       <div class="thumb" id='game-1393'><a href="/Multi-Maze-3d" aria-label="Multi Maze 3D"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Multi-Maze-3d.jpg' alt="Multi Maze 3D" /><div class='GameName'>Multi Maze 3D</div></a></div>  
       <div class="thumb" id='game-1259'><a href="/Count-Masters-Crowd-Runner-3d" aria-label="Count Masters: Crowd Runner 3D"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Count-Masters-Crowd-Runner-3d.jpg' alt="Count Masters: Crowd Runner 3D" /><div class='GameName'>Count Masters: Crowd Runner 3D</div></a></div>  
       <div class="thumb" id='game-2008'><a href="/Math-Matchsticks" aria-label="Math Matchsticks"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Math-Matchsticks.jpg' alt="Math Matchsticks" /><div class='GameName'>Math Matchsticks</div></a></div>  
       <div class="thumb" id='game-141'><a href="/Number-Puzzle" aria-label="Number Puzzle"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Number-Puzzle.jpg' alt="Number Puzzle" /><div class='GameName'>Number Puzzle</div></a></div>  
       <div class="thumb" id='game-2856'><a href="/Merge-Coin" aria-label="Merge Coin"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Merge-Coin.jpg' alt="Merge Coin" /><div class='GameName'>Merge Coin</div></a></div>  
       <div class="thumb" id='game-920'><a href="/Drop-The-Number" aria-label="Drop The Number"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Drop-The-Number.jpg' alt="Drop The Number" /><div class='GameName'>Drop The Number</div></a></div>  
       <div class="thumb" id='game-1842'><a href="/Cannon-Ball-Shoot" aria-label="Cannon Ball Shoot"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Cannon-Ball-Shoot.jpg' alt="Cannon Ball Shoot" /><div class='GameName'>Cannon Ball Shoot</div></a></div>  
       <div class="thumb" id='game-1823'><a href="/Solitaire-2048" aria-label="Solitaire 2048"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Solitaire-2048.jpg' alt="Solitaire 2048" /><div class='GameName'>Solitaire 2048</div></a></div>  
       <div class="thumb" id='game-1097'><a href="/Drop-N-Merge" aria-label="Drop N Merge"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Drop-N-Merge.jpg' alt="Drop N Merge" /><div class='GameName'>Drop N Merge</div></a></div>  
       <div class="thumb" id='game-74'><a href="/Math-Word-Search" aria-label="Math Word Search"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Math-Word-Search.jpg' alt="Math Word Search" /><div class='GameName'>Math Word Search</div></a></div>  
       <div class="thumb" id='game-179'><a href="/2048-Physics" aria-label="2048 Physics"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/2048-Physics.jpg' alt="2048 Physics" /><div class='GameName'>2048 Physics</div></a></div>  
       <div class="thumb" id='game-1783'><a href="/Jelly-Runner-3d" aria-label="Jelly Runner 3D"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Jelly-Runner-3d.jpg' alt="Jelly Runner 3D" /><div class='GameName'>Jelly Runner 3D</div></a></div>  
       <div class="thumb" id='game-2004'><a href="/Math-Quiz" aria-label="Math Quiz"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Math-Quiz.jpg' alt="Math Quiz" /><div class='GameName'>Math Quiz</div></a></div>  
       <div class="thumb" id='game-933'><a href="/2048-3d" aria-label="2048 3D"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/2048-3d.jpg' alt="2048 3D" /><div class='GameName'>2048 3D</div></a></div>  
       <div class="thumb" id='game-2312'><a href="/Pomni-Math-Game" aria-label="Pomni Math Game"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Pomni-Math-Game.jpg' alt="Pomni Math Game" /><div class='GameName'>Pomni Math Game</div></a></div>  
       <div class="thumb" id='game-640'><a href="/Feed-Math" aria-label="Feed Math"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Feed-Math.jpg' alt="Feed Math" /><div class='GameName'>Feed Math</div></a></div>  
       <div class="thumb" id='game-923'><a href="/Dop-2-Delete-One-Part" aria-label="Dop 2: Delete One Part"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Dop-2-Delete-One-Part.jpg' alt="Dop 2: Delete One Part" /><div class='GameName'>Dop 2: Delete One Part</div></a></div>  
       <div class="thumb" id='game-2950'><a href="/Stickman-Hero-Skibidi-Tower-Defense" aria-label="Stickman Hero Skibidi Tower Defense"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Stickman-Hero-Skibidi-Tower-Defense.jpg' alt="Stickman Hero Skibidi Tower Defense" /><div class='GameName'>Stickman Hero Skibidi Tower Defense</div></a></div>  
       <div class="thumb" id='game-438'><a href="/Math-Freak" aria-label="Math Freak"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Math-Freak.jpg' alt="Math Freak" /><div class='GameName'>Math Freak</div></a></div>  
       <div class="thumb" id='game-965'><a href="/Join-Pusher-3d" aria-label="Join Pusher 3D"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Join-Pusher-3d.jpg' alt="Join Pusher 3D" /><div class='GameName'>Join Pusher 3D</div></a></div>  
       <div class="thumb" id='game-117'><a href="/Shape-Projection" aria-label="Shape Projection"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Shape-Projection.jpg' alt="Shape Projection" /><div class='GameName'>Shape Projection</div></a></div>  
       <div class="thumb" id='game-1616'><a href="/Join-Numbers" aria-label="Join Numbers"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Join-Numbers.jpg' alt="Join Numbers" /><div class='GameName'>Join Numbers</div></a></div>  
       <div class="thumb" id='game-967'><a href="/Arrow-Fest" aria-label="Arrow Fest"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Arrow-Fest.jpg' alt="Arrow Fest" /><div class='GameName'>Arrow Fest</div></a></div>  
       <div class="thumb" id='game-107'><a href="/Number-Treasure" aria-label="Number Treasure"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Number-Treasure.jpg' alt="Number Treasure" /><div class='GameName'>Number Treasure</div></a></div>  
       <div class="thumb" id='game-76'><a href="/Free-Educational-Games" aria-label="Free Educational Games"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Free-Educational-Games.jpg' alt="Free Educational Games" /><div class='GameName'>Free Educational Games</div></a></div>  
       <div class="thumb" id='game-2338'><a href="/Unicorn-Math" aria-label="Unicorn Math"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Unicorn-Math.jpg' alt="Unicorn Math" /><div class='GameName'>Unicorn Math</div></a></div>  
       <div class="thumb" id='game-84'><a href="/Cards-2048" aria-label="Cards 2048"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Cards-2048.jpg' alt="Cards 2048" /><div class='GameName'>Cards 2048</div></a></div>  
       <div class="thumb" id='game-592'><a href="/Elementary-Arithmetic-Game" aria-label="Elementary Arithmetic Game"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Elementary-Arithmetic-Game.jpg' alt="Elementary Arithmetic Game" /><div class='GameName'>Elementary Arithmetic Game</div></a></div>  
       <div class="thumb" id='game-86'><a href="/Brain-Test" aria-label="Brain Test"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Brain-Test.jpg' alt="Brain Test" /><div class='GameName'>Brain Test</div></a></div>  
       <div class="thumb" id='game-272'><a href="/Connect-Merge" aria-label="Connect Merge"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Connect-Merge.jpg' alt="Connect Merge" /><div class='GameName'>Connect Merge</div></a></div>  
       <div class="thumb" id='game-177'><a href="/Claw-Pets-Math" aria-label="Claw Pets Math"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Claw-Pets-Math.jpg' alt="Claw Pets Math" /><div class='GameName'>Claw Pets Math</div></a></div>  
       <div class="thumb" id='game-1460'><a href="/Force-Master-3d" aria-label="Force Master 3D"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Force-Master-3d.jpg' alt="Force Master 3D" /><div class='GameName'>Force Master 3D</div></a></div>  
       <div class="thumb" id='game-360'><a href="/Arithmetic-Line" aria-label="Arithmetic Line"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Arithmetic-Line.jpg' alt="Arithmetic Line" /><div class='GameName'>Arithmetic Line</div></a></div>  
       <div class="thumb" id='game-140'><a href="/Make-24" aria-label="Make 24"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Make-24.jpg' alt="Make 24" /><div class='GameName'>Make 24</div></a></div>  
       <div class="thumb" id='game-135'><a href="/Sum-Square" aria-label="Sum Square"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Sum-Square.jpg' alt="Sum Square" /><div class='GameName'>Sum Square</div></a></div>  
       <div class="thumb" id='game-861'><a href="/Yet-Another-2048" aria-label="Yet Another 2048"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Yet-Another-2048.jpg' alt="Yet Another 2048" /><div class='GameName'>Yet Another 2048</div></a></div>  
       <div class="thumb" id='game-121'><a href="/Sudoku" aria-label="Sudoku"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Sudoku.jpg' alt="Sudoku" /><div class='GameName'>Sudoku</div></a></div>  
       <div class="thumb" id='game-1873'><a href="/Weapon-Evolution" aria-label="Weapon Evolution"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Weapon-Evolution.jpg' alt="Weapon Evolution" /><div class='GameName'>Weapon Evolution</div></a></div>  
       <div class="thumb" id='game-608'><a href="/2048" aria-label="2048"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/2048.jpg' alt="2048" /><div class='GameName'>2048</div></a></div>  
       <div class="thumb" id='game-3214'><a href="/Cool-Math-For-Kids-Color-Recognition" aria-label="Cool Math For Kids: Color Recognition"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Cool-Math-For-Kids-Color-Recognition.jpg' alt="Cool Math For Kids: Color Recognition" /><div class='GameName'>Cool Math For Kids: Color Recognition</div></a></div>  
       <div class="thumb" id='game-415'><a href="/Kids-Math" aria-label="Kids Math"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Kids-Math.jpg' alt="Kids Math" /><div class='GameName'>Kids Math</div></a></div>  
       <div class="thumb" id='game-1768'><a href="/Number-Run-3d" aria-label="Number Run 3D"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Number-Run-3d.jpg' alt="Number Run 3D" /><div class='GameName'>Number Run 3D</div></a></div>  
       <div class="thumb" id='game-799'><a href="/Freaking-Math" aria-label="Freaking Math"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Freaking-Math.jpg' alt="Freaking Math" /><div class='GameName'>Freaking Math</div></a></div>  
       <div class="thumb" id='game-703'><a href="/The-Operators" aria-label="The Operators"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/The-Operators.jpg' alt="The Operators" /><div class='GameName'>The Operators</div></a></div>  
       <div class="thumb" id='game-185'><a href="/Brain-Out" aria-label="Brain Out"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Brain-Out.jpg' alt="Brain Out" /><div class='GameName'>Brain Out</div></a></div>  
       <div class="thumb" id='game-124'><a href="/Math-Battle" aria-label="Math Battle"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Math-Battle.jpg' alt="Math Battle" /><div class='GameName'>Math Battle</div></a></div>  
       <div class="thumb" id='game-614'><a href="/Grocery-Cashier" aria-label="Grocery Cashier"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Grocery-Cashier.jpg' alt="Grocery Cashier" /><div class='GameName'>Grocery Cashier</div></a></div>  
       <div class="thumb" id='game-917'><a href="/Zero-Numbers" aria-label="Zero Numbers"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Zero-Numbers.jpg' alt="Zero Numbers" /><div class='GameName'>Zero Numbers</div></a></div>  
       <div class="thumb" id='game-176'><a href="/Dinosaur-Math" aria-label="Dinosaur Math"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Dinosaur-Math.jpg' alt="Dinosaur Math" /><div class='GameName'>Dinosaur Math</div></a></div>  
       <div class="thumb" id='game-37'><a href="/Space-Balls" aria-label="Space Balls"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Space-Balls.jpg' alt="Space Balls" /><div class='GameName'>Space Balls</div></a></div>  
       <div class="thumb" id='game-2877'><a href="/Physics-Balls" aria-label="Physics Balls"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Physics-Balls.jpg' alt="Physics Balls" /><div class='GameName'>Physics Balls</div></a></div>  
       <div class="thumb" id='game-760'><a href="/1-2-3" aria-label="1+2=3"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/1-2-3.jpg' alt="1+2=3" /><div class='GameName'>1+2=3</div></a></div>  
       <div class="thumb" id='game-378'><a href="/Math-For-Kids" aria-label="Math For Kids"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Math-For-Kids.jpg' alt="Math For Kids" /><div class='GameName'>Math For Kids</div></a></div>  
       <div class="thumb" id='game-15'><a href="/Zero21-Solitaire" aria-label="Zero21 Solitaire"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Zero21-Solitaire.jpg' alt="Zero21 Solitaire" /><div class='GameName'>Zero21 Solitaire</div></a></div>  
       <div class="thumb" id='game-976'><a href="/Crazy-Shooter-Of-Math" aria-label="Crazy Shooter Of Math"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Crazy-Shooter-Of-Math.jpg' alt="Crazy Shooter Of Math" /><div class='GameName'>Crazy Shooter Of Math</div></a></div>  
       <div class="thumb" id='game-2322'><a href="/Escalator-Rush-3d" aria-label="Escalator Rush 3D"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Escalator-Rush-3d.jpg' alt="Escalator Rush 3D" /><div class='GameName'>Escalator Rush 3D</div></a></div>  
       <div class="thumb" id='game-122'><a href="/Bridges" aria-label="Bridges"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Bridges.jpg' alt="Bridges" /><div class='GameName'>Bridges</div></a></div>  
       <div class="thumb" id='game-112'><a href="/Math-Fun-Solarize" aria-label="Math Fun Solarize"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Math-Fun-Solarize.jpg' alt="Math Fun Solarize" /><div class='GameName'>Math Fun Solarize</div></a></div>  
       <div class="thumb" id='game-138'><a href="/Master-Sudoku" aria-label="Master Sudoku"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Master-Sudoku.jpg' alt="Master Sudoku" /><div class='GameName'>Master Sudoku</div></a></div>  
       <div class="thumb" id='game-178'><a href="/Puzzle-Math" aria-label="Puzzle Math"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Puzzle-Math.jpg' alt="Puzzle Math" /><div class='GameName'>Puzzle Math</div></a></div>  
       <div class="thumb" id='game-454'><a href="/Defense-Math" aria-label="Defense Math"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Defense-Math.jpg' alt="Defense Math" /><div class='GameName'>Defense Math</div></a></div>  
       <div class="thumb" id='game-748'><a href="/Just-Get-10" aria-label="Just Get 10"><img src='https://www.puzzlegame.com/cdn-cgi/image/quality=78,format=auto/thumb/Just-Get-10.jpg' alt="Just Get 10" /><div class='GameName'>Just Get 10</div></a></div>  
  </div>`;

    let parsedGames = [];

    const fallbackCopyText = (text) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        const selection = document.getSelection();
        const selectedRange = selection?.rangeCount > 0 ? selection.getRangeAt(0) : null;
        textarea.select();
        const succeeded = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (selectedRange) {
            selection?.removeAllRanges();
            selection?.addRange(selectedRange);
        }
        if (!succeeded) {
            throw new Error('document.execCommand("copy") 返回 false');
        }
    };

    const copyText = async (text, label) => {
        if (!text) return;
        try {
            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                fallbackCopyText(text);
            }
            const isMultiLine = text.includes('\n');
            if (isMultiLine) {
                const total = text.split('\n').filter((line) => line.trim().length > 0).length;
                statusMessage.textContent = `${label} 已复制（共 ${total || 1} 条）`;
            } else {
                const preview = text.length > 40 ? `${text.slice(0, 37)}…` : text;
                statusMessage.textContent = `${label} 已复制：${preview}`;
            }
        } catch (error) {
            console.error('复制失败', error);
            statusMessage.textContent = `${label} 复制失败，请手动复制。`;
        }
    };

    const sanitizeFileName = (name) => {
        return name
            .replace(/[\\/:*?"<>|]/g, '_')
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/\s/g, '-');
    };

    const getExtensionFromType = (type) => {
        if (!type) return '';
        if (type.includes('jpeg')) return 'jpg';
        if (type.includes('png')) return 'png';
        if (type.includes('webp')) return 'webp';
        if (type.includes('gif')) return 'gif';
        return '';
    };

    const getExtensionFromUrl = (url) => {
        try {
            const cleanUrl = url.split('?')[0];
            const parts = cleanUrl.split('.');
            if (parts.length > 1) {
                return parts.pop().trim();
            }
        } catch (error) {
            console.warn('无法从 URL 中解析后缀:', error);
        }
        return 'jpg';
    };

    const createGameCard = (game, index) => {
        const card = document.createElement('article');
        card.className = 'download-card';
        card.innerHTML = `
            <div class="download-card__image">
                <img src="${game.imageUrl}" alt="${game.name}" loading="lazy">
            </div>
            <div class="download-card__body">
                <h3>${game.name}</h3>
                <div class="download-card__actions">
                    <button type="button" class="primary-button download-single" data-index="${index}">下载图片</button>
                </div>
            </div>
        `;
        return card;
    };

    const renderReport = (games) => {
        reportTableBody.innerHTML = '';

        if (!games.length) {
            const emptyRow = document.createElement('tr');
            emptyRow.className = 'report-empty';
            emptyRow.innerHTML = '<td colspan="2">暂无解析数据，请先粘贴代码并点击解析。</td>';
            reportTableBody.appendChild(emptyRow);
            copyReportButton.disabled = true;
            return;
        }

        const fragment = document.createDocumentFragment();
        games.forEach((game) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="report-name">${game.name}</td>
                <td class="report-file">${game.fileName}</td>
            `;
            fragment.appendChild(row);
        });
        reportTableBody.appendChild(fragment);
        copyReportButton.disabled = false;
    };

    const renderGames = (games) => {
        resultsContainer.innerHTML = '';
        if (!games.length) {
            resultsSummary.textContent = '暂无数据，请先解析代码。';
            downloadAllButton.disabled = true;
            renderReport([]);
            return;
        }

        const fragment = document.createDocumentFragment();
        games.forEach((game, index) => {
            fragment.appendChild(createGameCard(game, index));
        });
        resultsContainer.appendChild(fragment);

        resultsSummary.textContent = `共解析到 ${games.length} 款游戏，支持逐个或批量下载封面图。`;
        downloadAllButton.disabled = false;
        downloadAllButton.textContent = '下载全部';
        renderReport(games);
    };

    const parseHtml = () => {
        const inputHtml = htmlInput.value.trim();
        if (!inputHtml) {
            statusMessage.textContent = '请输入需要解析的 HTML 代码。';
            renderGames([]);
            return;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(inputHtml, 'text/html');
        const nodes = Array.from(doc.querySelectorAll('.allgames .thumb'));

        if (!nodes.length) {
            statusMessage.textContent = '未在代码中找到 .allgames .thumb 结构，请确认粘贴内容是否正确。';
            renderGames([]);
            return;
        }

        parsedGames = nodes.map((node, index) => {
            const name = (node.querySelector('.GameName')?.textContent ||
                node.querySelector('a')?.getAttribute('aria-label') ||
                node.querySelector('img')?.getAttribute('alt') ||
                `游戏 ${index + 1}`
            ).trim();

            const imgElement = node.querySelector('img');
            const imageUrl = imgElement?.getAttribute('src') || imgElement?.getAttribute('data-src') || '';
            const extension = getExtensionFromUrl(imageUrl);
            const sanitizedBaseName = sanitizeFileName(name || `游戏 ${index + 1}`);
            const fileName = extension ? `${sanitizedBaseName}.${extension}` : sanitizedBaseName;

            return {
                name: name || `游戏 ${index + 1}`,
                imageUrl,
                fileName,
                sanitizedBaseName,
                extension,
            };
        }).filter(game => Boolean(game.imageUrl));

        if (!parsedGames.length) {
            statusMessage.textContent = '解析完成，但没有有效的图片链接。';
            renderGames([]);
            return;
        }

        statusMessage.textContent = '解析完成，可以开始下载图片。';
        renderGames(parsedGames);
    };

    const triggerDownload = (blob, filename) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
    };

    const downloadImage = async (game, button) => {
        const targetButton = button;
        targetButton.disabled = true;
        targetButton.textContent = '下载中…';
        statusMessage.textContent = `正在下载 ${game.name}…`;

        try {
            const response = await fetch(game.imageUrl, { mode: 'cors' });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const blob = await response.blob();
            const sanitizedBaseName = game.sanitizedBaseName || sanitizeFileName(game.name);
            const extensionFromType = getExtensionFromType(blob.type);
            const fallbackExtension = game.extension || getExtensionFromUrl(game.imageUrl);
            const effectiveExtension = extensionFromType || fallbackExtension;
            const filename = effectiveExtension ? `${sanitizedBaseName}.${effectiveExtension}` : sanitizedBaseName;

            triggerDownload(blob, filename);

            targetButton.disabled = false;
            targetButton.textContent = '重新下载';
            statusMessage.textContent = `${game.name} 下载完成。`;
        } catch (error) {
            console.error('下载失败', error);
            targetButton.disabled = false;
            targetButton.textContent = '重新下载';
            statusMessage.textContent = `${game.name} 下载失败：${error.message}`;
        }
    };

    const downloadAllImages = async () => {
        if (!parsedGames.length) return;

        downloadAllButton.disabled = true;
        downloadAllButton.textContent = '批量下载中…';

        for (let i = 0; i < parsedGames.length; i++) {
            const game = parsedGames[i];
            const button = resultsContainer.querySelector(`.download-single[data-index="${i}"]`);
            if (button) {
                // eslint-disable-next-line no-await-in-loop
                await downloadImage(game, button);
            }
        }

        downloadAllButton.textContent = '重新批量下载';
        downloadAllButton.disabled = false;
        statusMessage.textContent = '所有图片已尝试下载完成。';
    };

    parseButton.addEventListener('click', parseHtml);
    downloadAllButton.addEventListener('click', downloadAllImages);

    resultsContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof HTMLButtonElement)) {
            return;
        }

        if (target.classList.contains('download-single')) {
            const index = Number.parseInt(target.dataset.index ?? '-1', 10);
            const game = parsedGames[index];
            if (game) {
                downloadImage(game, target);
            }
            return;
        }

    });

    fillSampleButton.addEventListener('click', () => {
        htmlInput.value = sampleHtml.trim();
        htmlInput.focus();
    });

    copyReportButton.addEventListener('click', () => {
        if (!parsedGames.length) return;
        const reportText = parsedGames
            .map((game) => `${game.name} - ${game.fileName}`)
            .join('\n');
        copyText(reportText, 'Report');
    });
})();
