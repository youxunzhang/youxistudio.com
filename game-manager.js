const tableBody = document.querySelector('#gamesTableBody');
const gameCount = document.querySelector('#gameCount');
const unsavedIndicator = document.querySelector('#unsavedIndicator');
const jsonPreview = document.querySelector('#jsonPreview');
const statusMessage = document.querySelector('#statusMessage');
const addForm = document.querySelector('#addGameForm');
const downloadBtn = document.querySelector('#downloadJson');
const resetBtn = document.querySelector('#resetChanges');
const uploadTriggerBtn = document.querySelector('#uploadTrigger');
const uploadInput = document.querySelector('#uploadJson');

let dataState = { games: [] };
let pristineState = { games: [] };
let payloadShape = createDefaultShape();
let pristineShape = createDefaultShape();
let editingIndex = null;
let hasChanges = false;
let statusTimeoutId;
let iframeNavigationTimer = 0;

const jsonPath = 'img-portal/game-library.json';
const DEFAULT_GAME_TYPE = 'casualgames';
const DEFAULT_IFRAME_URL = 'https://gameul.com/';
const COUNTER_KEYWORDS = new Set([
    'total',
    'count',
    'length',
    'size',
    'itemcount',
    'itemscount',
    'totalcount',
    'totalgames',
    'gamescount',
    'gamecount'
]);

function createDefaultShape() {
    return {
        type: 'object',
        gamesPath: ['games'],
        template: { games: [] },
        counters: []
    };
}

init();

async function init() {
    try {
        const response = await fetch(jsonPath, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`无法加载 ${jsonPath}，状态码：${response.status}`);
        }
        const payload = await response.json();
        const { state, shape } = normalizePayload(payload);
        dataState = state;
        payloadShape = shape;
        pristineState = clone(state);
        pristineShape = cloneShape(shape);
        render();
        setStatus('数据加载完成', 'success', 2500);
    } catch (error) {
        console.error(error);
        jsonPreview.textContent = '加载 JSON 文件时出现问题，请检查文件路径或语法。';
        setStatus(error.message || '加载数据失败', 'error', 0);
    }
}

function normalizePayload(payload) {
    const { games, shape } = extractGamesFromPayload(payload);
    const sanitizedGames = games
        .map((game) => sanitizeGame(game))
        .filter((game) => game.name || game.url || game.image);
    return {
        state: { games: sanitizedGames },
        shape
    };
}

function sanitizeGame(game, previous = null) {
    const source = (game && typeof game === 'object' && !Array.isArray(game)) ? game : {};
    const prior = (previous && typeof previous === 'object') ? previous : null;
    const fieldAliases = {
        name: ['title', 'gameName', 'gameTitle', 'label'],
        type: ['category', 'genre', 'gameType', 'tag'],
        image: [
            'imageUrl',
            'imageURL',
            'thumbnail',
            'thumbnailUrl',
            'thumbnail.src',
            'thumbnail.url',
            'cover',
            'coverUrl',
            'coverImage',
            'cover.src',
            'cover.url',
            'poster',
            'icon',
            'img',
            'artwork',
            'assets.cover',
            'assets.cover.url',
            'media.cover',
            'media.cover.url',
            'media.thumbnail',
            'media.thumbnail.url',
            'image.src'
        ],
        url: [
            'link',
            'href',
            'play',
            'playUrl',
            'playURL',
            'playLink',
            'play.url',
            'links.play',
            'links.playUrl',
            'projectUrl',
            'siteUrl',
            'pageUrl',
            'gameUrl',
            'urls.play'
        ],
        iframe: [
            'iframeUrl',
            'iframeURL',
            'iframeLink',
            'iframe.url',
            'iframe.src',
            'embed',
            'embedUrl',
            'embedURL',
            'embedLink',
            'embed.src',
            'gameIframe',
            'iframeSrc'
        ]
    };

    const sanitized = {};
    const sources = {};
    const fallbackPaths = {
        name: ['name'],
        type: ['type'],
        image: ['image'],
        url: ['url'],
        iframe: ['iframe']
    };

    for (const [field, aliases] of Object.entries(fieldAliases)) {
        const { value, path } = extractFieldValue(source, field, aliases, prior?.sources?.[field]);
        const formatted = normalizeFieldValue(value, prior?.[field]);
        sanitized[field] = formatted;
        if (Array.isArray(path) && path.length) {
            const joinedPath = path.join('>');
            const fallbackJoined = fallbackPaths[field].join('>');
            const previousPath = Array.isArray(prior?.sources?.[field]) && prior.sources[field].length
                ? prior.sources[field]
                : null;
            const previousJoined = previousPath ? previousPath.join('>') : null;
            if (previousPath && previousJoined && previousJoined !== fallbackJoined && joinedPath === fallbackJoined) {
                sources[field] = [...previousPath];
            } else {
                sources[field] = [...path];
            }
        } else if (Array.isArray(prior?.sources?.[field]) && prior.sources[field].length) {
            sources[field] = [...prior.sources[field]];
        } else {
            sources[field] = [...fallbackPaths[field]];
        }
    }

    sanitized.name = sanitized.name || (prior?.name ?? '');
    sanitized.type = sanitized.type || prior?.type || DEFAULT_GAME_TYPE;
    sanitized.image = sanitized.image || (prior?.image ?? '');
    sanitized.url = sanitized.url || (prior?.url ?? '');
    sanitized.iframe = sanitized.iframe || prior?.iframe || DEFAULT_IFRAME_URL;

    const rawTemplate = prior?.raw && typeof prior.raw === 'object' && !Array.isArray(prior.raw)
        ? clone(prior.raw)
        : clone(source);
    const safeRaw = rawTemplate && typeof rawTemplate === 'object' ? rawTemplate : {};

    for (const field of Object.keys(fallbackPaths)) {
        const targetPath = sources[field] ?? fallbackPaths[field];
        setDeep(safeRaw, targetPath, sanitized[field]);
    }

    return {
        ...sanitized,
        raw: safeRaw,
        sources
    };
}

function extractFieldValue(record, field, aliases, fallbackPath) {
    if (!record || typeof record !== 'object') {
        return { value: undefined, path: fallbackPath ?? null };
    }

    const directKey = findMatchingKey(record, field);
    if (directKey) {
        const value = record[directKey];
        if (isUsableValue(value)) {
            return { value, path: [directKey] };
        }
    }

    for (const alias of aliases) {
        if (!alias) {
            continue;
        }
        if (alias.includes('.')) {
            const segments = alias.split('.');
            const { value, path } = getNestedValueWithPath(record, segments);
            if (isUsableValue(value)) {
                return { value, path };
            }
            continue;
        }
        const key = findMatchingKey(record, alias);
        if (key) {
            const value = record[key];
            if (isUsableValue(value)) {
                return { value, path: [key] };
            }
        }
    }

    if (Array.isArray(fallbackPath) && fallbackPath.length) {
        const value = getDeep(record, fallbackPath);
        if (isUsableValue(value)) {
            return { value, path: fallbackPath };
        }
    }

    return { value: undefined, path: fallbackPath ?? null };
}

function normalizeFieldValue(value, fallback) {
    if (isUsableValue(value)) {
        return String(value).trim();
    }
    if (isUsableValue(fallback)) {
        return String(fallback).trim();
    }
    return '';
}

function findMatchingKey(record, key) {
    if (!record || typeof record !== 'object') {
        return null;
    }
    if (Object.prototype.hasOwnProperty.call(record, key)) {
        return key;
    }
    const lower = String(key).toLowerCase();
    return Object.keys(record).find((candidate) => candidate.toLowerCase() === lower) ?? null;
}

function getNestedValueWithPath(target, segments) {
    let cursor = target;
    const actualPath = [];
    for (const segment of segments) {
        if (!cursor || typeof cursor !== 'object') {
            return { value: undefined, path: null };
        }
        const key = findMatchingKey(cursor, segment);
        if (!key) {
            return { value: undefined, path: null };
        }
        actualPath.push(key);
        cursor = cursor[key];
    }
    return { value: cursor, path: actualPath };
}

function isUsableValue(value) {
    if (value === undefined || value === null) {
        return false;
    }
    const stringValue = String(value).trim();
    return stringValue.length > 0;
}

function clone(target) {
    if (target === undefined) {
        return undefined;
    }
    return JSON.parse(JSON.stringify(target));
}

function cloneShape(shape) {
    return {
        type: shape?.type ?? 'object',
        gamesPath: Array.isArray(shape?.gamesPath) ? [...shape.gamesPath] : ['games'],
        template: shape?.template ? clone(shape.template) : { games: [] },
        counters: Array.isArray(shape?.counters) ? shape.counters.map((path) => [...path]) : []
    };
}

function render() {
    renderTable();
    updatePreview();
    updateGameCount();
    syncDirtyState();
}

function renderTable() {
    tableBody.innerHTML = '';
    dataState.games.forEach((game, index) => {
        const isEditing = editingIndex === index;
        const row = document.createElement('tr');
        row.dataset.index = String(index);

        row.appendChild(createCell(isEditing ? createInput('name', game.name) : createTextDisplay(game.name), 'name'));
        row.appendChild(createCell(isEditing ? createInput('type', game.type) : createTextDisplay(game.type), 'type'));
        row.appendChild(createCell(isEditing ? createInput('image', game.image) : createLinkPreview(game.image), 'image'));
        row.appendChild(createCell(isEditing ? createInput('url', game.url) : createLink(game.url), 'url'));
        row.appendChild(createCell(isEditing ? createInput('iframe', game.iframe) : createLink(game.iframe), 'iframe'));
        row.appendChild(createActionsCell(index, isEditing));

        tableBody.appendChild(row);
    });

    if (!dataState.games.length) {
        const emptyRow = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 6;
        cell.textContent = '当前没有记录，请使用下方表单添加新游戏。';
        cell.style.textAlign = 'center';
        cell.style.color = 'var(--text-secondary)';
        emptyRow.appendChild(cell);
        tableBody.appendChild(emptyRow);
    }
}

function createCell(content, field) {
    const cell = document.createElement('td');
    if (field) {
        cell.dataset.field = field;
    }
    if (content instanceof Node) {
        cell.appendChild(content);
    } else {
        cell.textContent = content;
    }
    return cell;
}

function createTextDisplay(value) {
    if (value) {
        const span = document.createElement('span');
        span.textContent = value;
        return span;
    }
    const placeholder = document.createElement('span');
    placeholder.textContent = '—';
    placeholder.style.color = 'var(--text-muted)';
    return placeholder;
}

function createInput(name, value) {
    const input = document.createElement('input');
    input.type = name === 'name' || name === 'type' ? 'text' : 'url';
    input.name = name;
    input.required = ['name', 'image', 'url'].includes(name);
    input.value = value;
    const placeholders = {
        name: '请输入内容',
        type: '例如：平台跳跃',
        image: 'https://...',
        url: 'https://...',
        iframe: 'https://...'
    };
    input.placeholder = placeholders[name] ?? '请输入内容';
    return input;
}

function createLink(url) {
    if (!url) {
        const span = document.createElement('span');
        span.textContent = '—';
        span.style.color = 'var(--text-muted)';
        return span;
    }
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener';
    anchor.textContent = url;
    anchor.style.color = 'var(--brand)';
    return anchor;
}

function createLinkPreview(url) {
    if (!url) {
        const span = document.createElement('span');
        span.textContent = '—';
        span.style.color = 'var(--text-muted)';
        return span;
    }
    const fragment = document.createDocumentFragment();
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = url;
    link.style.display = 'block';
    link.style.color = 'var(--brand)';

    const preview = document.createElement('img');
    preview.src = url;
    preview.alt = '封面预览';
    preview.style.maxWidth = '80px';
    preview.style.marginTop = '0.35rem';
    preview.style.borderRadius = 'var(--radius-sm)';
    preview.loading = 'lazy';

    fragment.appendChild(link);
    fragment.appendChild(preview);
    return fragment;
}

function createActionsCell(index, isEditing) {
    const cell = document.createElement('td');
    cell.dataset.field = 'actions';
    const actions = document.createElement('div');
    actions.className = 'actions';

    if (isEditing) {
        actions.appendChild(createActionButton('保存', 'primary', 'save', index));
        actions.appendChild(createActionButton('取消', 'secondary', 'cancel', index));
    } else {
        actions.appendChild(createActionButton('编辑', 'secondary', 'edit', index));
        actions.appendChild(createActionButton('删除', 'danger', 'delete', index));
    }

    cell.appendChild(actions);
    return cell;
}

function createActionButton(label, style, action, index) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.classList.add(style);
    button.dataset.action = action;
    button.dataset.index = String(index);
    return button;
}

function updatePreview() {
    jsonPreview.textContent = JSON.stringify(serializeState(dataState, payloadShape), null, 2);
}

function updateGameCount() {
    gameCount.textContent = `当前游戏：${dataState.games.length}`;
}

function syncDirtyState() {
    try {
        const current = JSON.stringify(serializeState(dataState, payloadShape));
        const pristine = JSON.stringify(serializeState(pristineState, pristineShape));
        hasChanges = current !== pristine;
    } catch (error) {
        console.error(error);
        hasChanges = true;
    }
    unsavedIndicator.hidden = !hasChanges;
}

function setStatus(message, type = 'success', duration = 4000) {
    if (!message) {
        statusMessage.className = 'status';
        statusMessage.textContent = '';
        return;
    }
    statusMessage.textContent = message;
    statusMessage.className = `status is-visible ${type}`;
    if (statusTimeoutId) {
        clearTimeout(statusTimeoutId);
    }
    if (duration > 0) {
        statusTimeoutId = window.setTimeout(() => {
            statusMessage.className = 'status';
            statusMessage.textContent = '';
        }, duration);
    }
}

function validateGame(game) {
    if (!game.name) {
        throw new Error('请填写游戏名称');
    }
    if (!game.image) {
        throw new Error('请填写封面图片地址');
    }
    if (!game.url) {
        throw new Error('请填写游戏链接');
    }
    try {
        new URL(game.image);
    } catch (error) {
        throw new Error('封面图片地址不是有效的 URL');
    }
    try {
        new URL(game.url);
    } catch (error) {
        throw new Error('游戏链接不是有效的 URL');
    }
    if (game.iframe) {
        try {
            new URL(game.iframe);
        } catch (error) {
            throw new Error('IFRAME 地址不是有效的 URL');
        }
    }
}

tableBody.addEventListener('click', (event) => {
    const target = event.target;
    const button = target instanceof Element ? target.closest('button') : null;
    if (button instanceof HTMLButtonElement) {
        handleTableAction(button);
        return;
    }
    const anchor = target instanceof Element ? target.closest('a') : null;
    if (!anchor) {
        return;
    }
    const cell = anchor.closest('td');
    if (!cell || cell.dataset.field !== 'iframe') {
        return;
    }
    if (event.defaultPrevented) {
        return;
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        cancelPendingIframeNavigation();
        return;
    }
    const href = anchor.href;
    if (!href) {
        return;
    }

    cancelPendingIframeNavigation();
    if (event.detail === 0) {
        window.open(href, '_blank', 'noopener');
        return;
    }
    if (event.detail > 1) {
        event.preventDefault();
        return;
    }

    event.preventDefault();
    iframeNavigationTimer = window.setTimeout(() => {
        window.open(href, '_blank', 'noopener');
        cancelPendingIframeNavigation();
    }, 200);
});

function handleTableAction(button) {
    cancelPendingIframeNavigation();
    const { action, index } = button.dataset;
    if (index === undefined) {
        return;
    }
    const rowIndex = Number.parseInt(index, 10);
    if (Number.isNaN(rowIndex)) {
        return;
    }

    switch (action) {
        case 'edit':
            enterEditMode(rowIndex);
            break;
        case 'cancel':
            editingIndex = null;
            render();
            setStatus('已取消编辑', 'success', 2000);
            break;
        case 'save':
            handleSave(rowIndex);
            break;
        case 'delete':
            handleDelete(rowIndex);
            break;
        default:
            break;
    }
}

tableBody.addEventListener('dblclick', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
        return;
    }
    const cell = target.closest('td');
    if (!cell) {
        return;
    }
    const { field } = cell.dataset;
    if (!field || !['name', 'type', 'iframe'].includes(field)) {
        return;
    }
    const row = cell.closest('tr');
    const indexValue = row?.dataset.index;
    if (!indexValue) {
        return;
    }
    const index = Number.parseInt(indexValue, 10);
    if (Number.isNaN(index)) {
        return;
    }
    cancelPendingIframeNavigation();
    event.preventDefault();
    enterEditMode(index, field);
});

function enterEditMode(index, focusField = 'name') {
    if (!Number.isInteger(index) || index < 0 || index >= dataState.games.length) {
        return;
    }
    const alreadyEditing = editingIndex === index;
    editingIndex = index;
    if (!alreadyEditing) {
        render();
        setStatus('正在编辑所选游戏', 'success', 2000);
    }
    focusFieldInput(index, focusField);
}

function focusFieldInput(index, field) {
    const schedule = window.requestAnimationFrame ?? ((callback) => window.setTimeout(callback, 0));
    schedule(() => {
        const row = tableBody.querySelector(`tr[data-index="${index}"]`);
        if (!row) {
            return;
        }
        const input = row.querySelector(`input[name="${field}"]`);
        if (input instanceof HTMLInputElement) {
            input.focus();
            input.select();
        }
    });
}

function cancelPendingIframeNavigation() {
    if (iframeNavigationTimer) {
        window.clearTimeout(iframeNavigationTimer);
        iframeNavigationTimer = 0;
    }
}

function handleSave(index) {
    const row = tableBody.querySelector(`tr[data-index="${index}"]`);
    if (!row) {
        return;
    }
    const nameInput = row.querySelector('input[name="name"]');
    const typeInput = row.querySelector('input[name="type"]');
    const imageInput = row.querySelector('input[name="image"]');
    const urlInput = row.querySelector('input[name="url"]');
    const iframeInput = row.querySelector('input[name="iframe"]');
    if (!nameInput || !typeInput || !imageInput || !urlInput || !iframeInput) {
        return;
    }
    const previous = dataState.games[index];
    const game = sanitizeGame({
        name: nameInput.value,
        type: typeInput.value,
        image: imageInput.value,
        url: urlInput.value,
        iframe: iframeInput.value
    }, previous);

    try {
        validateGame(game);
        dataState.games[index] = game;
        editingIndex = null;
        render();
        setStatus('游戏信息已更新', 'success', 2500);
    } catch (error) {
        setStatus(error.message, 'error', 0);
    }
}

function handleDelete(index) {
    const game = dataState.games[index];
    if (!game) {
        return;
    }
    const confirmed = window.confirm(`确定要删除“${game.name || '未命名游戏'}”吗？`);
    if (!confirmed) {
        return;
    }
    dataState.games.splice(index, 1);
    editingIndex = null;
    render();
    setStatus('已删除所选游戏', 'success', 2500);
}

addForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(addForm);
    const game = sanitizeGame({
        name: String(formData.get('name') ?? ''),
        type: String(formData.get('type') ?? ''),
        image: String(formData.get('image') ?? ''),
        url: String(formData.get('url') ?? ''),
        iframe: String(formData.get('iframe') ?? '')
    });
    try {
        validateGame(game);
        dataState.games.push(game);
        addForm.reset();
        render();
        setStatus('已成功添加新游戏', 'success', 2500);
    } catch (error) {
        setStatus(error.message, 'error', 0);
    }
});

downloadBtn.addEventListener('click', () => {
    const serialized = serializeState(dataState, payloadShape);
    const blob = new Blob([JSON.stringify(serialized, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'game-library.json';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    setStatus('JSON 文件已下载', 'success', 2500);
});

resetBtn.addEventListener('click', () => {
    dataState = clone(pristineState);
    payloadShape = cloneShape(pristineShape);
    editingIndex = null;
    render();
    setStatus('数据已还原至初始状态', 'success', 2500);
});

uploadTriggerBtn.addEventListener('click', () => {
    uploadInput.click();
});

uploadInput.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
        return;
    }
    try {
        const text = await file.text();
        const payload = JSON.parse(text);
        const { state, shape } = normalizePayload(payload);
        state.games.forEach(validateGame);
        dataState = state;
        payloadShape = shape;
        pristineState = clone(state);
        pristineShape = cloneShape(shape);
        editingIndex = null;
        render();
        setStatus(`已导入 ${file.name}`, 'success', 2500);
    } catch (error) {
        console.error(error);
        setStatus(`导入失败：${error.message || '请检查文件内容'}`, 'error', 0);
    } finally {
        uploadInput.value = '';
    }
});

window.addEventListener('beforeunload', (event) => {
    if (!hasChanges) {
        return;
    }
    event.preventDefault();
    event.returnValue = '';
});

function extractGamesFromPayload(payload) {
    if (Array.isArray(payload)) {
        return {
            games: payload,
            shape: {
                type: 'array',
                gamesPath: [],
                template: [],
                counters: []
            }
        };
    }

    if (!payload || typeof payload !== 'object') {
        return {
            games: [],
            shape: createDefaultShape()
        };
    }

    const candidate = locateGamesArray(payload);
    if (!candidate) {
        throw new Error('无法在 JSON 文件中找到游戏列表，请确认文件结构。');
    }

    const template = clone(payload);
    setDeep(template, candidate.path, []);
    const counters = findCounterPaths(payload, Array.isArray(candidate.array) ? candidate.array.length : 0);

    return {
        games: Array.isArray(candidate.array) ? candidate.array : [],
        shape: {
            type: 'object',
            gamesPath: candidate.path,
            template,
            counters
        }
    };
}

function locateGamesArray(payload) {
    const preferredPaths = [
        ['games'],
        ['list'],
        ['items'],
        ['data', 'games'],
        ['data', 'list'],
        ['data', 'items'],
        ['data', 'results'],
        ['data', 'records'],
        ['library'],
        ['response', 'games'],
        ['payload', 'games'],
        ['payload', 'items'],
        ['results'],
        ['records'],
        ['entries']
    ];

    for (const path of preferredPaths) {
        const value = getDeep(payload, path);
        if (Array.isArray(value)) {
            return { path, array: value };
        }
    }

    return findBestArrayMatch(payload);
}

function findBestArrayMatch(payload) {
    const queue = [{ node: payload, path: [], depth: 0 }];
    let best = null;

    while (queue.length) {
        const { node, path, depth } = queue.shift();
        if (Array.isArray(node)) {
            const score = scoreArrayCandidate(node, path, depth);
            if (score < 0) {
                continue;
            }
            if (!best || score > best.score) {
                best = { path, array: node, score };
            }
            continue;
        }
        if (!node || typeof node !== 'object' || depth > 6) {
            continue;
        }
        for (const [key, value] of Object.entries(node)) {
            queue.push({ node: value, path: [...path, key], depth: depth + 1 });
        }
    }

    return best;
}

function scoreArrayCandidate(array, path, depth) {
    if (!Array.isArray(array)) {
        return -1;
    }
    const pathScore = path.reduce((score, segment, index) => {
        const lower = String(segment).toLowerCase();
        if (index === path.length - 1 && ['games', 'items', 'list', 'entries', 'records', 'results'].includes(lower)) {
            return score + 6;
        }
        if (['data', 'payload', 'response'].includes(lower)) {
            return score + 2;
        }
        return score + 1;
    }, 0);
    let contentScore = 0;
    for (const item of array) {
        if (item && typeof item === 'object') {
            const accessor = createAccessor(item);
            if (accessor.get(['name', 'title', 'gameName', 'gameTitle'])) {
                contentScore += 4;
            }
            if (accessor.get(['image', 'thumbnail', 'cover'])) {
                contentScore += 2;
            }
            if (accessor.get(['url', 'link', 'playUrl'])) {
                contentScore += 2;
            }
        }
        if (contentScore >= 8) {
            break;
        }
    }
    const depthPenalty = depth * 0.5;
    return pathScore + contentScore - depthPenalty;
}

function findCounterPaths(target, length) {
    if (!target || typeof target !== 'object') {
        return [];
    }
    const paths = [];
    const stack = [{ node: target, path: [] }];
    while (stack.length) {
        const { node, path } = stack.pop();
        if (!node || typeof node !== 'object') {
            continue;
        }
        for (const [key, value] of Object.entries(node)) {
            const nextPath = [...path, key];
            if (typeof value === 'number') {
                const keyword = key.toLowerCase();
                if (COUNTER_KEYWORDS.has(keyword) && (value === length || value === 0)) {
                    paths.push(nextPath);
                }
            } else if (value && typeof value === 'object' && !Array.isArray(value)) {
                stack.push({ node: value, path: nextPath });
            }
        }
    }
    return paths;
}

function getDeep(target, path) {
    return path.reduce((current, segment) => {
        if (!current || typeof current !== 'object') {
            return undefined;
        }
        if (Object.prototype.hasOwnProperty.call(current, segment)) {
            return current[segment];
        }
        const lowerSegment = String(segment).toLowerCase();
        const matchedKey = Object.keys(current).find((key) => key.toLowerCase() === lowerSegment);
        return matchedKey ? current[matchedKey] : undefined;
    }, target);
}

function setDeep(target, path, value) {
    if (!path.length) {
        return;
    }
    let cursor = target;
    for (let index = 0; index < path.length - 1; index += 1) {
        const segment = path[index];
        if (!cursor[segment] || typeof cursor[segment] !== 'object') {
            cursor[segment] = {};
        }
        cursor = cursor[segment];
    }
    cursor[path[path.length - 1]] = value;
}

function serializeState(state, shape = payloadShape) {
    const safeShape = shape ?? createDefaultShape();
    const fallbackPaths = {
        name: ['name'],
        type: ['type'],
        image: ['image'],
        url: ['url'],
        iframe: ['iframe']
    };
    const games = state.games.map((game) => {
        const record = game && typeof game === 'object' ? game : {};
        const base = record.raw && typeof record.raw === 'object' && !Array.isArray(record.raw)
            ? clone(record.raw)
            : {};
        const sources = record.sources ?? {};
        const merged = base && typeof base === 'object' ? base : {};

        setDeep(merged, Array.isArray(sources.name) && sources.name.length ? sources.name : fallbackPaths.name, record.name ?? '');
        setDeep(merged, Array.isArray(sources.type) && sources.type.length ? sources.type : fallbackPaths.type, record.type || DEFAULT_GAME_TYPE);
        setDeep(merged, Array.isArray(sources.image) && sources.image.length ? sources.image : fallbackPaths.image, record.image ?? '');
        setDeep(merged, Array.isArray(sources.url) && sources.url.length ? sources.url : fallbackPaths.url, record.url ?? '');
        setDeep(merged, Array.isArray(sources.iframe) && sources.iframe.length ? sources.iframe : fallbackPaths.iframe, record.iframe || DEFAULT_IFRAME_URL);

        return merged;
    });

    if (safeShape.type === 'array') {
        return games;
    }

    const output = safeShape.template ? clone(safeShape.template) : { games: [] };
    setDeep(output, safeShape.gamesPath ?? ['games'], games);
    if (Array.isArray(safeShape.counters)) {
        for (const counterPath of safeShape.counters) {
            setDeep(output, counterPath, games.length);
        }
    }
    return output;
}

function createAccessor(record) {
    const source = (record && typeof record === 'object') ? record : {};
    const lookup = new Map();
    Object.keys(source).forEach((key) => {
        lookup.set(key.toLowerCase(), source[key]);
    });

    function getNested(path) {
        const segments = path.split('.');
        let cursor = source;
        for (const segment of segments) {
            if (!cursor || typeof cursor !== 'object') {
                return undefined;
            }
            if (Object.prototype.hasOwnProperty.call(cursor, segment)) {
                cursor = cursor[segment];
            } else {
                const matchedKey = Object.keys(cursor).find((key) => key.toLowerCase() === segment.toLowerCase());
                cursor = matchedKey ? cursor[matchedKey] : undefined;
            }
        }
        return cursor;
    }

    return {
        get(aliases) {
            for (const alias of aliases) {
                if (!alias) {
                    continue;
                }
                if (alias.includes('.')) {
                    const nested = getNested(alias);
                    if (nested !== undefined && nested !== null && String(nested).trim() !== '') {
                        return nested;
                    }
                    continue;
                }
                if (Object.prototype.hasOwnProperty.call(source, alias)) {
                    const value = source[alias];
                    if (value !== undefined && value !== null && String(value).trim() !== '') {
                        return value;
                    }
                }
                const lowerAlias = alias.toLowerCase();
                if (lookup.has(lowerAlias)) {
                    const value = lookup.get(lowerAlias);
                    if (value !== undefined && value !== null && String(value).trim() !== '') {
                        return value;
                    }
                }
            }
            return '';
        }
    };
}
