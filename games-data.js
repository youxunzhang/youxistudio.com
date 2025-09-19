window.gameCategoryLabels = {
    all: '全部类型',
    adventure: '冒险',
    arcade: '街机',
    platformer: '平台跳跃',
    puzzle: '益智',
    creative: '创意'
};

window.gamesData = [
    {
        id: 'paper-minecraft',
        title: 'Paper Minecraft',
        author: 'griffpatch',
        category: 'adventure',
        description: '经典的 2D Minecraft 生存体验，收集资源、建造房屋、抵御夜晚的怪物。',
        longDescription: 'Paper Minecraft 是 Scratch 社区中最受欢迎的像素沙盒之一。你可以像在 Minecraft 中一样采集资源、制作工具、建造自己的基地，并在夜晚保护自己免受怪物袭击。',
        projectId: '25438625',
        thumbnail: 'https://uploads.scratch.mit.edu/get_image/project/25438625_480x360.png',
        tags: ['沙盒', 'Minecraft', '生存'],
        controls: ['WASD 或方向键：移动角色', '空格：跳跃/飞行', '左键：挖掘或攻击', 'E：打开背包与合成', 'Shift：潜行'],
        tips: ['尽快制作木质工具并寻找食物，夜间更安全。', '试着在地面附近挖矿，铁矿和煤矿很常用。', '用床来记录重生点，探索前请带好食物。'],
        relatedIds: ['scratcharia', 'getting-over-it']
    },
    {
        id: 'geometry-dash',
        title: 'Geometry Dash Scratch Edition',
        author: 'griffpatch',
        category: 'platformer',
        description: '操作方块穿越充满陷阱的音乐节奏关卡，体验手速与反应力的极限挑战。',
        longDescription: 'Geometry Dash Scratch Edition 忠实还原了原作的节奏闯关体验。跟随音乐节奏跳跃、翻转与飞行，避开尖刺、锯齿和悬浮平台，享受流畅又紧张的闯关过程。',
        projectId: '22427811',
        thumbnail: 'https://uploads.scratch.mit.edu/get_image/project/22427811_480x360.png',
        tags: ['节奏', '闯关', '手速'],
        controls: ['空格或鼠标左键：跳跃/切换形态', '长按：持续飞行或滑翔'],
        tips: ['熟悉节奏，多次练习可以记住障碍出现的位置。', '按住键可以稳定飞行路线，松开即可快速下落。'],
        relatedIds: ['paper-minecraft', 'getting-over-it']
    },
    {
        id: 'scratcharia',
        title: 'Scratcharia',
        author: 'griffpatch',
        category: 'adventure',
        description: '向 Terraria 致敬的横版探索游戏，挖矿、打怪、制作装备一应俱全。',
        longDescription: 'Scratcharia 拥有随机生成的地形与丰富的道具系统。探索地下世界，收集矿石与宝藏，制作更强的武器与护甲，并挑战逐渐变强的敌人。',
        projectId: '166531929',
        thumbnail: 'https://uploads.scratch.mit.edu/get_image/project/166531929_480x360.png',
        tags: ['探索', '战斗', '随机地图'],
        controls: ['WASD 或方向键：移动与跳跃', '鼠标左键：挥动武器或使用物品', 'E：打开物品栏'],
        tips: ['优先制作更好的镐与护甲，保证探索安全。', '地表夜晚较危险，探索地下可以获得更多资源。'],
        relatedIds: ['paper-minecraft', 'tower-platformer']
    },
    {
        id: 'getting-over-it',
        title: 'Getting Over It Scratch 版',
        author: 'griffpatch',
        category: 'arcade',
        description: '挥舞锤子爬上高山，体验跌落与重来的极限意志考验。',
        longDescription: 'Scratch 版 Getting Over It 将知名独立游戏移植到浏览器中。通过鼠标拖拽控制锤子，精确地借力攀爬，通过一系列稀奇古怪的地形，磨炼耐心与操作。',
        projectId: '389464290',
        thumbnail: 'https://uploads.scratch.mit.edu/get_image/project/389464290_480x360.png',
        tags: ['物理', '挑战', '耐心'],
        controls: ['鼠标移动：调整锤子方向', '鼠标左键按住：发力推动角色'],
        tips: ['慢慢蓄力，注意角度比速度更重要。', '跌落时不要气馁，积累经验才能爬得更高。'],
        relatedIds: ['geometry-dash', 'tower-platformer']
    },
    {
        id: 'tower-platformer',
        title: 'Tower Platformer Engine',
        author: 'griffpatch',
        category: 'platformer',
        description: '流畅的云端平台跳跃引擎，挑战连续跳跃与速度控制。',
        longDescription: 'Tower Platformer Engine 展示了 Scratch 中优秀的平台跳跃物理。利用二段跳、墙跳等技巧向上攀登，探索不同的关卡布局。',
        projectId: '96302119',
        thumbnail: 'https://uploads.scratch.mit.edu/get_image/project/96302119_480x360.png',
        tags: ['平台', '速度', '技巧'],
        controls: ['方向键或 WASD：移动', '空格：跳跃（支持墙跳/二段跳）'],
        tips: ['观察平台的移动节奏，提前规划落脚点。', '连续墙跳可以快速提升高度。'],
        relatedIds: ['geometry-dash', 'creative-art']
    },
    {
        id: 'creative-art',
        title: 'Multi-Pen Art Creator',
        author: 'griffpatch',
        category: 'creative',
        description: '使用多色画笔实时绘制炫酷图案，感受 Scratch 的创意艺术。',
        longDescription: 'Multi-Pen Art Creator 允许你自定义颜色、笔刷数量与旋转速度，创作出充满几何美感的轨迹图案。无须编程即可体验 Scratch 的艺术魅力。',
        projectId: '10127407',
        thumbnail: 'https://uploads.scratch.mit.edu/get_image/project/10127407_480x360.png',
        tags: ['绘画', '创意', '视觉'],
        controls: ['点击屏幕：开始或停止绘制', '数字键 1-9：切换不同笔刷方案'],
        tips: ['尝试调整笔刷数量与旋转速度，会出现不同的花纹。', '利用暂停再继续的方式，可以叠加多层色彩。'],
        relatedIds: ['tower-platformer']
    }
];
