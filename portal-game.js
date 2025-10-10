const featuredContainer = document.getElementById('portalFeatured');
const gridContainer = document.getElementById('portalGrid');
const statusElement = document.getElementById('portalStatus');

async function loadPortalGames() {
    try {
        const response = await fetch('img-portal/game-library.json', { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`网络请求失败：${response.status}`);
        }

        const data = await response.json();
        const games = Array.isArray(data?.games) ? data.games : [];

        if (!games.length) {
            renderEmptyState('未从数据文件中获取到任何游戏。');
            return;
        }

        renderFeaturedSection(games);
        renderLibrarySection(games);
        statusElement.textContent = `共收录 ${games.length} 款游戏。`;
    } catch (error) {
        console.error(error);
        renderEmptyState('加载游戏数据时出错，请稍后重试。');
    }
}

function renderFeaturedSection(games) {
    featuredContainer.innerHTML = '';

    const [primary, ...rest] = games;
    if (!primary) {
        return;
    }

    const primaryCard = createFeaturedPrimaryCard(primary);
    featuredContainer.appendChild(primaryCard);

    const secondaryWrapper = document.createElement('div');
    secondaryWrapper.className = 'portal-featured__secondary';

    rest.slice(0, 3).forEach((game, index) => {
        const secondaryCard = createFeaturedSecondaryCard(game, index + 2);
        secondaryWrapper.appendChild(secondaryCard);
    });

    if (secondaryWrapper.childElementCount > 0) {
        featuredContainer.appendChild(secondaryWrapper);
    }
}

function renderLibrarySection(games) {
    gridContainer.innerHTML = '';

    games.forEach((game, index) => {
        const card = createLibraryCard(game, index + 1);
        gridContainer.appendChild(card);
    });
}

function createFeaturedPrimaryCard(game) {
    const article = document.createElement('article');
    article.className = 'portal-card portal-card--primary';

    article.innerHTML = `
        <div class="portal-card__media">
            <img src="${game.image}" alt="${game.name}">
        </div>
        <div class="portal-card__body">
            <p class="portal-card__badge">今日推荐</p>
            <h2 class="portal-card__title">${game.name}</h2>
            <a class="portal-card__link" href="${game.url}" target="_blank" rel="noopener">立即游玩</a>
        </div>
    `;

    return article;
}

function createFeaturedSecondaryCard(game, position) {
    const article = document.createElement('article');
    article.className = 'portal-card portal-card--secondary';

    article.innerHTML = `
        <div class="portal-card__media">
            <img src="${game.image}" alt="${game.name}">
        </div>
        <div class="portal-card__body">
            <p class="portal-card__badge">#${position.toString().padStart(2, '0')}</p>
            <h3 class="portal-card__title">${game.name}</h3>
            <a class="portal-card__link" href="${game.url}" target="_blank" rel="noopener">开始游戏</a>
        </div>
    `;

    return article;
}

function createLibraryCard(game, position) {
    const article = document.createElement('article');
    article.className = 'portal-card portal-card--compact';
    article.setAttribute('role', 'listitem');

    article.innerHTML = `
        <div class="portal-card__media">
            <img src="${game.image}" alt="${game.name}">
        </div>
        <div class="portal-card__body">
            <p class="portal-card__badge">#${position.toString().padStart(2, '0')}</p>
            <h3 class="portal-card__title">${game.name}</h3>
            <a class="portal-card__link" href="${game.url}" target="_blank" rel="noopener">打开游戏</a>
        </div>
    `;

    return article;
}

function renderEmptyState(message) {
    featuredContainer.innerHTML = '';
    gridContainer.innerHTML = '';
    statusElement.textContent = message;
}

loadPortalGames();
