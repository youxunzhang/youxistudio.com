(function () {
    const grid = document.getElementById('newGamesGrid');
    const status = document.getElementById('newGamesStatus');
    if (!grid || !status) {
        return;
    }

    const DATA_SOURCE = 'img-newgame/youxistudio-newgames.json';

    function formatGameName(rawName) {
        if (typeof rawName !== 'string' || rawName.trim() === '') {
            return '未命名游戏';
        }
        return rawName
            .replace(/[-_]+/g, ' ')
            .replace(/\b([a-zA-Z])/g, (match) => match.toUpperCase());
    }

    function resolveImage(game) {
        if (game && typeof game.image === 'string' && game.image.trim() !== '') {
            const trimmed = game.image.trim();
            if (/^https?:\/\//i.test(trimmed)) {
                try {
                    const url = new URL(trimmed);
                    if (url.hostname.replace(/^www\./, '') === 'youxistudio.com') {
                        const segments = url.pathname.split('/').filter(Boolean);
                        const filename = segments[segments.length - 1];
                        if (filename) {
                            return `img-newgame/${filename}`;
                        }
                    }
                } catch (error) {
                    console.warn('图片地址解析失败，使用原始链接', error);
                }
            }
            return trimmed;
        }
        if (game && typeof game.name === 'string' && game.name.trim() !== '') {
            const safeName = game.name.trim();
            return `https://via.placeholder.com/400x300?text=${encodeURIComponent(safeName)}`;
        }
        return 'https://via.placeholder.com/400x300?text=New+Game';
    }

    function createGameCard(game) {
        const card = document.createElement('a');
        card.className = 'game-card';

        if (game && typeof game.link === 'string' && game.link.trim() !== '') {
            const link = game.link.trim();
            card.href = link;
            if (/^https?:\/\//i.test(link)) {
                card.target = '_blank';
                card.rel = 'noopener';
            }
        } else {
            card.href = '#';
        }

        const displayName = formatGameName(game?.name);
        card.setAttribute('aria-label', `前往 ${displayName}`);

        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.src = resolveImage(game);
        image.alt = `${displayName} 游戏封面`;
        image.loading = 'lazy';
        figure.appendChild(image);

        const body = document.createElement('div');
        body.className = 'game-card__body';

        const title = document.createElement('h3');
        title.textContent = displayName;
        body.appendChild(title);

        card.appendChild(figure);
        card.appendChild(body);

        return card;
    }

    async function loadGames() {
        try {
            const response = await fetch(`${DATA_SOURCE}?v=${Date.now()}`, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`请求失败：${response.status}`);
            }
            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) {
                status.textContent = '暂无可展示的新游戏，稍后再来看看吧。';
                grid.setAttribute('aria-busy', 'false');
                return;
            }

            const fragment = document.createDocumentFragment();
            data.forEach((game) => {
                const card = createGameCard(game);
                fragment.appendChild(card);
            });

            grid.innerHTML = '';
            grid.appendChild(fragment);
            status.textContent = `共收录 ${data.length} 款最新小游戏，持续更新中。`;
            grid.setAttribute('aria-busy', 'false');
        } catch (error) {
            console.error('加载新游数据失败', error);
            status.textContent = '加载数据时出现问题，请稍后重试。';
            grid.setAttribute('aria-busy', 'false');
        }
    }

    loadGames();
})();
