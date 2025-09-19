(function () {
    const games = Array.isArray(window.gamesData) ? window.gamesData : [];
    const categoryLabels = window.gameCategoryLabels || {};

    const grid = document.getElementById('gamesGrid');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-button');
    const resultsCount = document.getElementById('resultsCount');

    if (!grid) {
        return;
    }

    let activeCategory = 'all';

    function getCategoryLabel(category) {
        return categoryLabels[category] || category || '其他';
    }

    function createGameCard(game) {
        const article = document.createElement('article');
        article.className = 'game-card';

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = game.thumbnail;
        img.alt = `${game.title} 封面`; // alt text
        img.loading = 'lazy';
        figure.appendChild(img);
        article.appendChild(figure);

        const body = document.createElement('div');
        body.className = 'game-card__body';

        const title = document.createElement('h3');
        title.textContent = game.title;
        body.appendChild(title);

        const description = document.createElement('p');
        description.textContent = game.description;
        body.appendChild(description);

        if (Array.isArray(game.tags) && game.tags.length) {
            const tagsWrapper = document.createElement('div');
            tagsWrapper.className = 'game-card__tags';
            game.tags.slice(0, 3).forEach(tag => {
                const badge = document.createElement('span');
                badge.className = 'badge';
                badge.textContent = tag;
                tagsWrapper.appendChild(badge);
            });
            body.appendChild(tagsWrapper);
        }

        article.appendChild(body);

        const footer = document.createElement('div');
        footer.className = 'game-card__footer';

        const categoryBadge = document.createElement('span');
        categoryBadge.className = 'badge';
        categoryBadge.textContent = getCategoryLabel(game.category);
        footer.appendChild(categoryBadge);

        const playButton = document.createElement('button');
        playButton.className = 'play-button';
        playButton.type = 'button';
        playButton.textContent = '开始游玩';
        playButton.addEventListener('click', () => openGame(game.id));
        footer.appendChild(playButton);

        article.appendChild(footer);

        article.addEventListener('click', (event) => {
            if (event.target !== playButton) {
                openGame(game.id);
            }
        });

        return article;
    }

    function openGame(id) {
        window.location.href = `game-detail.html?id=${encodeURIComponent(id)}`;
    }

    function renderGames() {
        const query = (searchInput?.value || '').trim().toLowerCase();

        const filteredGames = games.filter(game => {
            const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
            const tokens = [game.title, game.description, ...(game.tags || [])]
                .join(' ')
                .toLowerCase();
            const matchesQuery = !query || tokens.includes(query);
            return matchesCategory && matchesQuery;
        });

        grid.innerHTML = '';

        if (resultsCount) {
            resultsCount.textContent = `共找到 ${filteredGames.length} 款 Scratch 游戏`;
        }

        if (!filteredGames.length) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.textContent = '暂无符合条件的游戏，试着换个关键词或分类吧。';
            grid.appendChild(empty);
            return;
        }

        filteredGames.forEach(game => {
            grid.appendChild(createGameCard(game));
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', renderGames);
    }

    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.filter;
                if (!category) return;

                activeCategory = category;

                filterButtons.forEach(btn => {
                    const isActive = btn === button;
                    btn.classList.toggle('is-active', isActive);
                    btn.setAttribute('aria-selected', String(isActive));
                });

                renderGames();
            });
        });
    }

    renderGames();
})();
