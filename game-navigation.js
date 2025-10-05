const softwareData = [
    {
        id: 'steam',
        name: 'Steam 客户端',
        url: 'https://store.steampowered.com/about/',
        category: 'platform',
        platform: 'Windows · macOS · Linux',
        description: 'Valve 推出的全球最大 PC 数字发行平台，支持云存档、创意工坊、社区与家庭共享。',
        tags: ['中文界面', '成就系统', '云存档'],
        icon: '🟦'
    },
    {
        id: 'epic-games',
        name: 'Epic Games Launcher',
        url: 'https://store.epicgames.com/download',
        category: 'platform',
        platform: 'Windows · macOS',
        description: 'Epic 官方启动器，提供每周限免、虚幻引擎工具链以及跨平台好友系统。',
        tags: ['限时免费', '跨平台联机'],
        icon: '🎮'
    },
    {
        id: 'gog-galaxy',
        name: 'GOG Galaxy',
        url: 'https://www.gog.com/galaxy',
        category: 'platform',
        platform: 'Windows · macOS',
        description: '无 DRM 的数字商店，整合 Steam / Epic / Xbox 等库，统一管理更新与成就。',
        tags: ['无 DRM', '跨平台整合'],
        icon: '🪐'
    },
    {
        id: 'ubisoft-connect',
        name: 'Ubisoft Connect',
        url: 'https://ubisoftconnect.com',
        category: 'platform',
        platform: 'Windows · macOS',
        description: '育碧官方平台，支持 Uplay+ 订阅、跨进度同步与 Ubisoft Connect 奖励。',
        tags: ['官方商城', '跨存档'],
        icon: '🦅'
    },
    {
        id: 'ea-app',
        name: 'EA App',
        url: 'https://www.ea.com/ea-app',
        category: 'platform',
        platform: 'Windows',
        description: 'EA 旗下 Origin 的继任者，提供 EA Play 订阅、快速更新与跨平台好友系统。',
        tags: ['EA Play', '云同步'],
        icon: '🟠'
    },
    {
        id: 'xbox-app',
        name: 'Xbox App for Windows',
        url: 'https://www.xbox.com/apps/xbox-app-for-pc',
        category: 'platform',
        platform: 'Windows',
        description: '微软官方应用，整合 PC Game Pass、Xbox Live 与远程游玩，支持云串流。',
        tags: ['Game Pass', '远程游玩'],
        icon: '🟢'
    },
    {
        id: 'battlenet',
        name: 'Battle.net',
        url: 'https://www.blizzard.com/apps/battle.net/desktop',
        category: 'platform',
        platform: 'Windows · macOS',
        description: '暴雪与动视游戏的唯一官方启动器，提供一键更新、好友系统与战网积分商城。',
        tags: ['官方平台', '战网积分'],
        icon: '❄️'
    },
    {
        id: 'riot-client',
        name: 'Riot Client',
        url: 'https://www.riotgames.com/zh-cn/riot-client',
        category: 'platform',
        platform: 'Windows · macOS',
        description: '拳头旗下英雄联盟、VALORANT 等作品的统一客户端，支持跨平台账号与反作弊。',
        tags: ['英雄联盟', 'VALORANT'],
        icon: '🛡️'
    },
    {
        id: 'rockstar-launcher',
        name: 'Rockstar Games Launcher',
        url: 'https://zh-cn.socialclub.rockstargames.com/rockstar-games-launcher',
        category: 'platform',
        platform: 'Windows',
        description: 'Rockstar 官方启动器，支持 GTA V、荒野大镖客 2 等作品的更新、云存档与 Social Club。',
        tags: ['GTA Online', 'Social Club'],
        icon: '⭐'
    },
    {
        id: 'itch-app',
        name: 'itch.io App',
        url: 'https://itch.io/app',
        category: 'platform',
        platform: 'Windows · macOS · Linux',
        description: '独立游戏聚合平台的桌面应用，支持离线安装、快速更新与开发者自定义渠道。',
        tags: ['独立游戏', '离线安装'],
        icon: '🧪'
    },
    {
        id: 'playnite',
        name: 'Playnite',
        url: 'https://playnite.link',
        category: 'utility',
        platform: 'Windows',
        description: '开源的游戏库整合工具，支持 Steam / Epic / Uplay / 模拟器一键导入与全屏客厅模式。',
        tags: ['开源', '主题皮肤'],
        icon: '🎨'
    },
    {
        id: 'heroic-launcher',
        name: 'Heroic Games Launcher',
        url: 'https://heroicgameslauncher.com',
        category: 'utility',
        platform: 'Windows · macOS · Linux',
        description: '开源的 Epic / GOG 第三方启动器，提供自定义 Wine、DXVK 与云存档同步。',
        tags: ['Linux 友好', '开源'],
        icon: '🦸'
    },
    {
        id: 'discord',
        name: 'Discord',
        url: 'https://discord.com/download',
        category: 'utility',
        platform: 'Windows · macOS · Linux · iOS · Android',
        description: '游戏玩家常用的语音与社区平台，支持高质量语音频道、活动日程与屏幕共享。',
        tags: ['语音组队', '社区'],
        icon: '💬'
    },
    {
        id: 'parsec',
        name: 'Parsec',
        url: 'https://parsec.app/downloads',
        category: 'cloud',
        platform: 'Windows · macOS · Linux · Android',
        description: '低延迟远程串流软件，适合远程局域网联机、云端办公或在移动端游玩 PC 游戏。',
        tags: ['低延迟', '远程联机'],
        icon: '⚡'
    },
    {
        id: 'geforce-now',
        name: 'GeForce NOW',
        url: 'https://www.nvidia.cn/geforce-now/',
        category: 'cloud',
        platform: 'Windows · macOS · Android · ChromeOS',
        description: 'NVIDIA 的云游戏服务，支持 RTX 光追、4K 串流以及跨设备同步进度。',
        tags: ['云游戏', 'RTX'],
        icon: '☁️'
    },
    {
        id: 'steam-link',
        name: 'Steam Link',
        url: 'https://store.steampowered.com/steamlink/about',
        category: 'cloud',
        platform: 'Windows · iOS · Android · tvOS',
        description: 'Valve 官方远程串流工具，将电脑上的 Steam 游戏串流到手机、平板或电视。',
        tags: ['家庭串流', '局域网'],
        icon: '🔗'
    },
    {
        id: 'moonlight',
        name: 'Moonlight Game Streaming',
        url: 'https://moonlight-stream.org',
        category: 'cloud',
        platform: 'Windows · macOS · Linux · iOS · Android',
        description: '开源的 NVIDIA GameStream 客户端，支持 4K60 串流、手柄直通与多种平台。',
        tags: ['开源', '手柄直通'],
        icon: '🌙'
    },
    {
        id: 'unity-hub',
        name: 'Unity Hub',
        url: 'https://unity.com/download',
        category: 'creation',
        platform: 'Windows · macOS',
        description: 'Unity 官方管理工具，支持项目版本管理、Asset Store 集成与团队协作。',
        tags: ['游戏引擎', '版本管理'],
        icon: '🧊'
    },
    {
        id: 'unreal-engine',
        name: 'Unreal Engine Launcher',
        url: 'https://www.unrealengine.com/download',
        category: 'creation',
        platform: 'Windows · macOS',
        description: '虚幻引擎启动器，提供引擎版本下载、示例项目、Marketplace 与学习资源。',
        tags: ['虚幻引擎', 'Marketplace'],
        icon: '🌀'
    },
    {
        id: 'godot',
        name: 'Godot Engine',
        url: 'https://godotengine.org/download',
        category: 'creation',
        platform: 'Windows · macOS · Linux',
        description: '轻量开源的 2D/3D 游戏引擎，支持 C#, GDScript 多语言，提供 MIT 许可自由发布。',
        tags: ['开源', '轻量'],
        icon: '🐙'
    },
    {
        id: 'blender',
        name: 'Blender',
        url: 'https://www.blender.org/download/',
        category: 'creation',
        platform: 'Windows · macOS · Linux',
        description: '功能全面的开源 3D 内容创作套件，覆盖建模、动画、渲染与视频剪辑。',
        tags: ['3D 建模', '开源'],
        icon: '🧱'
    },
    {
        id: 'retroarch',
        name: 'RetroArch',
        url: 'https://www.retroarch.com/?page=platforms',
        category: 'emulator',
        platform: 'Windows · macOS · Linux · Android · iOS',
        description: '多合一的模拟器前端，内置核心管理与联网对战，支持成就、滤镜与回放功能。',
        tags: ['多平台', '成就系统'],
        icon: '🕹️'
    },
    {
        id: 'dolphin',
        name: 'Dolphin Emulator',
        url: 'https://dolphin-emu.org/download/',
        category: 'emulator',
        platform: 'Windows · macOS · Linux · Android',
        description: '开源的 Wii / GameCube 模拟器，支持高清画面、联机与各类控制器配置。',
        tags: ['Wii', 'GameCube'],
        icon: '🐬'
    },
    {
        id: 'pcsx2',
        name: 'PCSX2',
        url: 'https://pcsx2.net/downloads',
        category: 'emulator',
        platform: 'Windows · Linux',
        description: 'PlayStation 2 模拟器，提供画面增强、存档快照与广泛的手柄映射支持。',
        tags: ['PS2', '高分辨率'],
        icon: '🎛️'
    },
    {
        id: 'cemu',
        name: 'Cemu',
        url: 'https://cemu.info',
        category: 'emulator',
        platform: 'Windows · Linux',
        description: 'Wii U 模拟器，支持高帧率补丁、图形增强与键鼠/手柄自由切换。',
        tags: ['Wii U', '60FPS'],
        icon: '🧩'
    }
];

const softwareGrid = document.getElementById('softwareGrid');
const searchInput = document.getElementById('softwareSearch');
const resultsCount = document.getElementById('softwareResultsCount');
const filterButtons = Array.from(document.querySelectorAll('.navigation-filters .filter-button'));

let activeFilter = 'all';

const createTag = (label) => {
    const span = document.createElement('span');
    span.className = 'software-tag';
    span.textContent = label;
    return span;
};

const buildCard = (item) => {
    const card = document.createElement('article');
    card.className = 'software-card';
    card.setAttribute('role', 'listitem');
    card.dataset.category = item.category;

    const header = document.createElement('div');
    header.className = 'software-card__header';

    const icon = document.createElement('span');
    icon.className = 'software-icon';
    icon.textContent = item.icon || '🎮';
    header.appendChild(icon);

    const titleWrap = document.createElement('div');
    titleWrap.className = 'software-card__title';

    const titleLink = document.createElement('a');
    titleLink.href = item.url;
    titleLink.target = '_blank';
    titleLink.rel = 'noopener';
    titleLink.className = 'software-name';
    titleLink.textContent = item.name;
    titleWrap.appendChild(titleLink);

    const meta = document.createElement('p');
    meta.className = 'software-meta';
    meta.textContent = item.platform;
    titleWrap.appendChild(meta);

    header.appendChild(titleWrap);

    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'software-category';
    categoryBadge.textContent = getCategoryLabel(item.category);
    header.appendChild(categoryBadge);

    card.appendChild(header);

    const desc = document.createElement('p');
    desc.className = 'software-desc';
    desc.textContent = item.description;
    card.appendChild(desc);

    if (Array.isArray(item.tags) && item.tags.length > 0) {
        const tagWrap = document.createElement('div');
        tagWrap.className = 'software-tags';
        item.tags.forEach(tag => tagWrap.appendChild(createTag(tag)));
        card.appendChild(tagWrap);
    }

    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'software-link';
    link.textContent = '前往下载 / 官网';
    card.appendChild(link);

    return card;
};

const getCategoryLabel = (category) => {
    switch (category) {
        case 'platform':
            return '发行平台';
        case 'cloud':
            return '云游戏 / 串流';
        case 'creation':
            return '创作工具';
        case 'emulator':
            return '模拟器';
        case 'utility':
            return '工具 / 管理';
        default:
            return '其他';
    }
};

const renderSoftware = (items) => {
    softwareGrid.innerHTML = '';

    if (items.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'software-empty';
        empty.textContent = '未找到匹配的软件，尝试更换关键词或筛选条件。';
        softwareGrid.appendChild(empty);
        resultsCount.textContent = '0 款软件';
        return;
    }

    const fragment = document.createDocumentFragment();
    items.forEach(item => fragment.appendChild(buildCard(item)));
    softwareGrid.appendChild(fragment);

    resultsCount.textContent = `${items.length} 款软件`;
};

const filterSoftware = () => {
    const keyword = searchInput.value.trim().toLowerCase();

    const filtered = softwareData.filter(item => {
        const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
        if (!matchesFilter) return false;

        if (!keyword) return true;

        const combined = [
            item.name,
            item.description,
            item.platform,
            ...(item.tags || [])
        ].join(' ').toLowerCase();

        return combined.includes(keyword);
    });

    renderSoftware(filtered);
};

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetFilter = button.dataset.filter;
        if (activeFilter === targetFilter) return;

        activeFilter = targetFilter;
        filterButtons.forEach(btn => {
            const isActive = btn === button;
            btn.classList.toggle('is-active', isActive);
            btn.setAttribute('aria-selected', String(isActive));
        });

        filterSoftware();
    });
});

searchInput.addEventListener('input', () => {
    filterSoftware();
});

renderSoftware(softwareData);
filterSoftware();
