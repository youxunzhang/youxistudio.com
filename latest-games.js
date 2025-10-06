(function () {
    const sources = [
        {
            id: '1games',
            name: '1Games.io',
            description: '默认使用 1Games 的总站点地图，可按需替换为更具体的分类地图。',
            url: 'https://1games.io/sitemap.xml',
            format: 'xml-sitemap',
            limit: 12,
            filter: (loc) => /\/game\//.test(loc) || /1games\.io\//.test(loc)
        },
        {
            id: 'crazygames',
            name: 'CrazyGames',
            description: 'CrazyGames 官方 sitemap，建议保留 https 协议以获得最新的游戏列表。',
            url: 'https://www.crazygames.com/sitemap.xml',
            format: 'xml-sitemap',
            limit: 12,
            filter: (loc) => /\/game\//.test(loc)
        },
        {
            id: 'gamemonetize',
            name: 'GameMonetize',
            description: 'GameMonetize 按字母拆分 sitemap，可自定义为具体分段，例如 sitemap-A.xml。',
            url: 'https://gamemonetize.com/sitemap.xml',
            format: 'xml-sitemap',
            limit: 12,
            filter: (loc) => /gamemonetize\.com\//.test(loc)
        },
        {
            id: 'gamedistribution',
            name: 'GameDistribution',
            description: 'GameDistribution 使用 CDN sitemap，可填写 sitemap-index 或具体的 sitemap-0.xml。',
            url: 'https://sitemap.cdn.gamedistribution.com/sitemap-index.xml',
            format: 'xml-sitemap',
            limit: 12,
            filter: (loc) => /gamedistribution\.com\//.test(loc)
        },
        {
            id: 'scratch',
            name: 'Scratch',
            description: '默认抓取 Scratch 官方 sitemap，可搭配项目 API 获取更丰富的信息。',
            url: 'https://scratch.mit.edu/sitemap.xml',
            format: 'xml-sitemap',
            limit: 12,
            filter: (loc) => /scratch\.mit\.edu\/projects\//.test(loc)
        }
    ];

    const state = new Map();

    const sourcesGrid = document.getElementById('sourcesGrid');
    const refreshButton = document.getElementById('refreshButton');
    const resultsSummary = document.getElementById('resultsSummary');
    const resultsContainer = document.getElementById('resultsContainer');

    if (!sourcesGrid || !refreshButton) {
        return;
    }

    function ensureProxy(url) {
        if (!url) return '';
        if (url.startsWith('https://r.jina.ai/')) {
            return url;
        }
        const sanitized = url.replace(/^https?:\/\//, '');
        const isHttps = /^https:/.test(url);
        return `https://r.jina.ai/${isHttps ? 'https://' : 'http://'}${sanitized}`;
    }

    function humanizeSlug(url) {
        if (!url) {
            return '未知游戏';
        }
        try {
            const { pathname } = new URL(url);
            const segment = pathname.split('/').filter(Boolean).pop() || pathname;
            return segment
                .replace(/[?#].*$/, '')
                .replace(/[-_]+/g, ' ')
                .replace(/\b\w/g, (match) => match.toUpperCase());
        } catch (error) {
            return url;
        }
    }

    function formatDate(value) {
        if (!value) return '';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            return '';
        }
        return new Intl.DateTimeFormat('zh-Hans', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date);
    }

    function parseSitemap(xmlText, source) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlText, 'application/xml');
        const errors = doc.getElementsByTagName('parsererror');
        if (errors.length) {
            throw new Error('站点地图解析失败');
        }

        const entries = [];
        const urlNodes = Array.from(doc.getElementsByTagName('url'));
        if (urlNodes.length) {
            urlNodes.forEach((node) => {
                const locNode = node.getElementsByTagName('loc')[0];
                if (!locNode) return;
                const loc = locNode.textContent?.trim();
                if (!loc) return;
                if (typeof source.filter === 'function' && !source.filter(loc)) {
                    return;
                }
                const lastmodNode = node.getElementsByTagName('lastmod')[0];
                entries.push({
                    url: loc,
                    title: humanizeSlug(loc),
                    lastmod: lastmodNode?.textContent?.trim() || ''
                });
            });
        }

        if (!entries.length) {
            const sitemapNodes = Array.from(doc.getElementsByTagName('sitemap'));
            sitemapNodes.forEach((node) => {
                const locNode = node.getElementsByTagName('loc')[0];
                if (!locNode) return;
                const loc = locNode.textContent?.trim();
                if (!loc) return;
                entries.push({
                    url: loc,
                    title: humanizeSlug(loc),
                    lastmod: node.getElementsByTagName('lastmod')[0]?.textContent?.trim() || ''
                });
            });
        }

        return entries;
    }

    async function fetchSource(source) {
        const targetUrl = state.get(source.id)?.url || source.url;
        if (!targetUrl) {
            throw new Error('未设置有效的站点地图地址');
        }
        const response = await fetch(ensureProxy(targetUrl), {
            headers: {
                'Accept': 'application/xml,text/xml,text/plain,*/*'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const text = await response.text();
        if (!text.trim()) {
            throw new Error('站点地图返回为空');
        }
        const entries = parseSitemap(text, source);
        if (!entries.length) {
            throw new Error('未在站点地图中找到可用条目');
        }
        const limit = state.get(source.id)?.limit ?? source.limit ?? 10;
        return entries.slice(0, Math.max(1, Number(limit) || 10));
    }

    function createSourceCard(source) {
        const wrapper = document.createElement('article');
        wrapper.className = 'source-card';
        wrapper.dataset.sourceId = source.id;

        const header = document.createElement('header');
        header.className = 'source-card__header';

        const label = document.createElement('label');
        label.className = 'source-card__toggle';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.setAttribute('aria-label', `启用 ${source.name} 数据源`);
        const nameSpan = document.createElement('span');
        nameSpan.textContent = source.name;
        label.append(checkbox, nameSpan);

        const status = document.createElement('span');
        status.className = 'source-status';
        status.dataset.status = 'idle';
        status.dataset.sourceStatusFor = source.id;
        status.textContent = '等待抓取';

        header.append(label, status);

        const body = document.createElement('div');
        body.className = 'source-card__body';

        const description = document.createElement('p');
        description.className = 'source-card__description';
        description.textContent = source.description;

        const urlLabel = document.createElement('label');
        urlLabel.className = 'source-card__field';
        urlLabel.textContent = '站点地图 / 数据源 URL';
        const urlInput = document.createElement('input');
        urlInput.type = 'url';
        urlInput.value = source.url;
        urlInput.placeholder = 'https://example.com/sitemap.xml';
        urlInput.autocomplete = 'off';
        urlInput.required = true;
        urlInput.addEventListener('change', () => {
            const data = state.get(source.id) || {};
            data.url = urlInput.value.trim();
            state.set(source.id, data);
        });
        urlLabel.appendChild(urlInput);

        const limitLabel = document.createElement('label');
        limitLabel.className = 'source-card__field source-card__field--inline';
        limitLabel.textContent = '抓取条数';
        const limitInput = document.createElement('input');
        limitInput.type = 'number';
        limitInput.min = '1';
        limitInput.max = '100';
        limitInput.value = String(source.limit ?? 12);
        limitInput.addEventListener('change', () => {
            const value = Math.max(1, Math.min(100, Number(limitInput.value) || 10));
            limitInput.value = String(value);
            const data = state.get(source.id) || {};
            data.limit = value;
            state.set(source.id, data);
        });
        limitLabel.appendChild(limitInput);

        body.append(description, urlLabel, limitLabel);

        wrapper.append(header, body);

        state.set(source.id, {
            url: source.url,
            limit: source.limit,
            enabled: true
        });

        checkbox.addEventListener('change', () => {
            const data = state.get(source.id) || {};
            data.enabled = checkbox.checked;
            state.set(source.id, data);
            wrapper.classList.toggle('source-card--disabled', !checkbox.checked);
            if (!checkbox.checked) {
                setStatus(source.id, 'idle', '已停用');
            } else {
                setStatus(source.id, 'idle', '等待抓取');
            }
        });

        return wrapper;
    }

    function setStatus(id, status, message) {
        const badge = sourcesGrid.querySelector(`[data-source-status-for="${id}"]`);
        if (!badge) return;
        badge.dataset.status = status;
        badge.textContent = message;
    }

    function renderResults(results) {
        resultsContainer.innerHTML = '';
        if (!results.length) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            empty.textContent = '没有获取到任何结果，请检查站点地图设置或更换代理服务。';
            resultsContainer.appendChild(empty);
            resultsSummary.textContent = '未成功获取任何平台的游戏列表。';
            return;
        }

        const total = results.reduce((sum, group) => sum + group.items.length, 0);
        resultsSummary.textContent = `成功获取 ${results.length} 个平台，共 ${total} 条游戏记录。`;

        results.forEach((group) => {
            const section = document.createElement('section');
            section.className = 'results-block';

            const heading = document.createElement('header');
            heading.className = 'results-block__header';
            const title = document.createElement('h3');
            title.textContent = group.name;
            const count = document.createElement('span');
            count.className = 'results-block__count';
            count.textContent = `${group.items.length} 条`;
            heading.append(title, count);

            const list = document.createElement('ol');
            list.className = 'results-block__list';

            group.items.forEach((item) => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = item.url;
                link.target = '_blank';
                link.rel = 'noopener';
                link.textContent = item.title || item.url;
                const meta = document.createElement('span');
                meta.className = 'results-block__meta';
                const dateText = formatDate(item.lastmod);
                meta.textContent = dateText ? `更新：${dateText}` : '无更新时间信息';
                li.append(link, meta);
                list.appendChild(li);
            });

            section.append(heading, list);
            resultsContainer.appendChild(section);
        });
    }

    async function handleRefresh() {
        const enabledSources = sources.filter((source) => {
            const data = state.get(source.id);
            return data?.enabled !== false;
        });

        if (!enabledSources.length) {
            resultsSummary.textContent = '请至少启用一个数据源再进行刷新。';
            resultsContainer.innerHTML = '';
            return;
        }

        refreshButton.disabled = true;
        refreshButton.textContent = '抓取中...';

        const promises = enabledSources.map(async (source) => {
            setStatus(source.id, 'loading', '抓取中...');
            try {
                const items = await fetchSource(source);
                setStatus(source.id, 'success', `成功 ${items.length} 条`);
                return { id: source.id, name: source.name, items };
            } catch (error) {
                console.error(error);
                setStatus(source.id, 'error', error.message || '抓取失败');
                return null;
            }
        });

        const settled = await Promise.all(promises);
        const validResults = settled.filter(Boolean);
        renderResults(validResults);

        refreshButton.disabled = false;
        refreshButton.textContent = '立即刷新';
    }

    sources.forEach((source) => {
        const card = createSourceCard(source);
        sourcesGrid.appendChild(card);
    });

    refreshButton.addEventListener('click', handleRefresh);
    handleRefresh();
})();
