const siteCategories = {
    news: "资讯",
    reviews: "评测",
    community: "社区",
    esports: "电竞",
    indie: "独立游戏"
};

const gameSites = [
    {
        rank: 1,
        name: "IGN",
        domain: "ign.com",
        description: "全球最具影响力的游戏与娱乐媒体之一，提供实时游戏新闻、深度评测与热门视频节目。",
        monthlyVisits: 118000000,
        categories: ["news", "reviews"],
        highlights: ["多语言内容", "跨平台测评", "独家采访"]
    },
    {
        rank: 2,
        name: "GameSpot",
        domain: "gamespot.com",
        description: "以详实的图文攻略和客观评分著称，覆盖主机、PC 与移动平台的最新大作与经典游戏。",
        monthlyVisits: 79000000,
        categories: ["news", "reviews"],
        highlights: ["视频评测", "发售日历", "社区讨论"]
    },
    {
        rank: 3,
        name: "PC Gamer",
        domain: "pcgamer.com",
        description: "专注 PC 平台的老牌媒体，从硬件测试到独立游戏推荐，应有尽有。",
        monthlyVisits: 56000000,
        categories: ["news", "reviews", "indie"],
        highlights: ["硬件指南", "Steam 优惠情报", "编辑推荐"]
    },
    {
        rank: 4,
        name: "Metacritic - Games",
        domain: "metacritic.com/game",
        description: "聚合全球媒体与玩家评分的权威指数，快速了解一款游戏的口碑走向。",
        monthlyVisits: 52000000,
        categories: ["reviews"],
        highlights: ["综合评分", "历史数据", "榜单检索"]
    },
    {
        rank: 5,
        name: "Steam",
        domain: "store.steampowered.com",
        description: "全球最大的 PC 数字发行平台，拥有庞大的游戏库、创意工坊与社区功能。",
        monthlyVisits: 450000000,
        categories: ["community", "indie"],
        highlights: ["创意工坊", "限时特惠", "玩家评测"]
    },
    {
        rank: 6,
        name: "Kotaku",
        domain: "kotaku.com",
        description: "以深入报道与文化视角闻名，关注游戏产业、玩家社区与相关亚文化。",
        monthlyVisits: 29000000,
        categories: ["news", "community"],
        highlights: ["行业洞察", "专栏评论", "生活方式"]
    },
    {
        rank: 7,
        name: "Game Rant",
        domain: "gamerant.com",
        description: "快速掌握热门话题、更新内容与技巧攻略的资讯站，适合跟进每日热点。",
        monthlyVisits: 41000000,
        categories: ["news", "reviews"],
        highlights: ["热点追踪", "攻略合集", "内容速递"]
    },
    {
        rank: 8,
        name: "MMO Champion",
        domain: "mmo-champion.com",
        description: "专注大型多人在线游戏的资讯社区，魔兽世界板块尤其活跃。",
        monthlyVisits: 16000000,
        categories: ["community", "news"],
        highlights: ["版本前瞻", "数据挖掘", "论坛交流"]
    },
    {
        rank: 9,
        name: "Dexerto",
        domain: "dexerto.com",
        description: "聚焦电竞、主播与直播文化的综合媒体，覆盖英雄联盟、Valorant 等热门项目。",
        monthlyVisits: 32000000,
        categories: ["esports", "news"],
        highlights: ["战队报道", "赛事解读", "主播访谈"]
    },
    {
        rank: 10,
        name: "Itch.io",
        domain: "itch.io",
        description: "独立开发者首选的平台，收录海量创意游戏与 Game Jam 作品，支持随心定价。",
        monthlyVisits: 26000000,
        categories: ["indie", "community"],
        highlights: ["独立创作", "社区打包", "开发者工具"]
    }
];

const siteListElement = document.getElementById('siteList');
const siteSearchInput = document.getElementById('siteSearchInput');
const siteResultsCount = document.getElementById('siteResultsCount');
const filterButtons = document.querySelectorAll('.site-filters .filter-button');

let activeFilter = 'all';

function formatVisits(visits) {
    if (visits >= 100000000) {
        const formatted = (visits / 100000000).toFixed(1);
        return `${Number(formatted)} 亿次/月`;
    }
    if (visits >= 10000) {
        const formatted = (visits / 10000).toFixed(1);
        return `${Number(formatted)} 万次/月`;
    }
    return `${visits.toLocaleString()} 次/月`;
}

function renderSite(site) {
    const categoriesHtml = site.categories
        .map((category) => `<span class="site-chip">${siteCategories[category] || category}</span>`)
        .join('');

    const highlightsHtml = site.highlights
        .map((item) => `<li>${item}</li>`)
        .join('');

    return `
        <article class="site-card">
            <div class="site-rank" aria-hidden="true">#${site.rank}</div>
            <div class="site-content">
                <header class="site-header-row">
                    <div>
                        <h2 class="site-title">${site.name}</h2>
                        <a class="site-domain" href="https://${site.domain}" target="_blank" rel="noopener">${site.domain}</a>
                    </div>
                    <div class="site-visits" aria-label="月访问量">${formatVisits(site.monthlyVisits)}</div>
                </header>
                <p class="site-description">${site.description}</p>
                <div class="site-meta">
                    <div class="site-tags" aria-label="站点类别">${categoriesHtml}</div>
                    <ul class="site-highlights" aria-label="站点亮点">${highlightsHtml}</ul>
                </div>
            </div>
            <a class="site-visit-button" href="https://${site.domain}" target="_blank" rel="noopener" aria-label="访问 ${site.name}">访问站点</a>
        </article>
    `;
}

function applyFilters() {
    const query = siteSearchInput.value.trim().toLowerCase();

    const filtered = gameSites.filter((site) => {
        const matchesFilter = activeFilter === 'all' || site.categories.includes(activeFilter);
        const haystack = `${site.name} ${site.domain} ${site.description} ${site.highlights.join(' ')}`.toLowerCase();
        const matchesQuery = !query || haystack.includes(query);
        return matchesFilter && matchesQuery;
    });

    siteListElement.innerHTML = filtered.map(renderSite).join('');

    if (filtered.length === 0) {
        siteResultsCount.textContent = '没有找到符合条件的站点。';
    } else {
        siteResultsCount.textContent = `共找到 ${filtered.length} 个站点。`;
    }
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.dataset.filter === activeFilter) {
            return;
        }

        activeFilter = button.dataset.filter;
        filterButtons.forEach((btn) => {
            btn.classList.toggle('is-active', btn === button);
            btn.setAttribute('aria-selected', btn === button ? 'true' : 'false');
        });
        applyFilters();
    });
});

siteSearchInput.addEventListener('input', applyFilters);

applyFilters();
