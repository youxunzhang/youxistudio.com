(function () {
    const games = Array.isArray(window.gamesData) ? window.gamesData : [];
    const categoryLabels = window.gameCategoryLabels || {};

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const game = games.find(item => item.id === id) || games[0];

    if (!game) {
        window.location.href = 'index.html';
        return;
    }

    document.title = `${game.title} · Shadowmilk Scratch`;

    const breadcrumbTitle = document.getElementById('breadcrumbTitle');
    const gameTitleEl = document.getElementById('gameTitle');
    const gameAuthorEl = document.getElementById('gameAuthor');
    const gameSummaryEl = document.getElementById('gameSummary');
    const gameCategoryEl = document.getElementById('gameCategory');
    const tagsContainer = document.getElementById('gameTags');
    const controlsList = document.getElementById('gameControls');
    const tipsList = document.getElementById('gameTips');
    const frame = document.getElementById('gameFrame');
    const projectLink = document.getElementById('projectLink');
    const copyLinkBtn = document.getElementById('copyLink');
    const relatedContainer = document.getElementById('relatedList');
    const anotherHotLink = document.getElementById('anotherHotLink');

    const projectUrl = `https://scratch.mit.edu/projects/${game.projectId}/`;
    const embedUrl = `https://scratch.mit.edu/projects/${game.projectId}/embed`;

    if (breadcrumbTitle) {
        breadcrumbTitle.textContent = game.title;
    }
    if (gameTitleEl) {
        gameTitleEl.textContent = game.title;
    }
    if (gameAuthorEl) {
        gameAuthorEl.textContent = game.author || 'Scratch 创作者';
    }
    if (gameSummaryEl) {
        gameSummaryEl.textContent = game.longDescription || game.description || '';
    }
    if (gameCategoryEl) {
        gameCategoryEl.textContent = categoryLabels[game.category] || game.category || 'Scratch';
    }

    if (tagsContainer) {
        tagsContainer.innerHTML = '';
        (game.tags || []).forEach(tag => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag';
            tagEl.textContent = tag;
            tagsContainer.appendChild(tagEl);
        });
        if (!tagsContainer.childElementCount) {
            const placeholder = document.createElement('span');
            placeholder.className = 'tag';
            placeholder.textContent = 'Scratch';
            tagsContainer.appendChild(placeholder);
        }
    }

    function renderList(listEl, items) {
        if (!listEl) return;
        listEl.innerHTML = '';
        if (!items || !items.length) {
            listEl.closest('.panel')?.classList.add('is-hidden');
            return;
        }
        items.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            listEl.appendChild(li);
        });
    }

    renderList(controlsList, game.controls);
    renderList(tipsList, game.tips);

    if (frame) {
        frame.src = embedUrl;
        frame.title = `${game.title} - Scratch 游戏`;
    }

    if (projectLink) {
        projectLink.href = projectUrl;
    }

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', async () => {
            const url = window.location.href;
            try {
                await navigator.clipboard.writeText(url);
                copyLinkBtn.textContent = '链接已复制';
                setTimeout(() => {
                    copyLinkBtn.textContent = '复制本站链接';
                }, 2000);
            } catch (error) {
                window.prompt('复制此链接', url);
            }
        });
    }

    function renderRelated(currentGame) {
        if (!relatedContainer) return;

        let relatedGames = [];
        if (Array.isArray(currentGame.relatedIds) && currentGame.relatedIds.length) {
            relatedGames = currentGame.relatedIds
                .map(relatedId => games.find(item => item.id === relatedId))
                .filter(Boolean);
        }

        if (!relatedGames.length) {
            relatedGames = games
                .filter(item => item.id !== currentGame.id && item.category === currentGame.category)
                .slice(0, 3);
        }

        relatedContainer.innerHTML = '';

        if (!relatedGames.length) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.textContent = '暂时没有推荐的类似游戏，稍后再来看看吧。';
            relatedContainer.appendChild(empty);
            return;
        }

        relatedGames.forEach(item => {
            const card = document.createElement('article');
            card.className = 'related-card';

            const title = document.createElement('h3');
            title.textContent = item.title;
            card.appendChild(title);

            const description = document.createElement('p');
            description.textContent = item.description;
            card.appendChild(description);

            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = '开始游玩';
            button.addEventListener('click', () => {
                window.location.href = `game-detail.html?id=${encodeURIComponent(item.id)}`;
            });
            card.appendChild(button);

            relatedContainer.appendChild(card);
        });
    }

    renderRelated(game);

    if (anotherHotLink && games.length > 1) {
        const alternative = games.find(item => item.id !== game.id) || games[0];
        anotherHotLink.href = `game-detail.html?id=${encodeURIComponent(alternative.id)}`;
    }
})();
