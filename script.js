(function () {
    const games = Array.isArray(window.gamesData) ? window.gamesData : [];
    const grid = document.getElementById('gamesGrid');

    if (!grid || !games.length) {
        if (grid) {
            const empty = document.createElement('p');
            empty.className = 'icon-wall__empty';
            empty.textContent = '暂时没有可用的游戏，稍后再来看看吧。';
            grid.appendChild(empty);
        }
        return;
    }

    const fragment = document.createDocumentFragment();

    games.forEach(game => {
        const link = document.createElement('a');
        link.className = 'game-icon';
        link.href = `game-detail.html?id=${encodeURIComponent(game.id)}`;
        link.setAttribute('aria-label', `${game.title}，点击开始游戏`);

        const imageWrapper = document.createElement('span');
        imageWrapper.className = 'game-icon__image';

        const img = document.createElement('img');
        img.src = game.thumbnail;
        img.alt = `${game.title} 游戏图标`;
        img.loading = 'lazy';

        imageWrapper.appendChild(img);
        link.appendChild(imageWrapper);

        const title = document.createElement('span');
        title.className = 'game-icon__title';
        title.textContent = game.title;
        link.appendChild(title);

        fragment.appendChild(link);
    });

    grid.appendChild(fragment);
})();
