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
let editingIndex = null;
let hasChanges = false;
let statusTimeoutId;
let iframeNavigationTimer = 0;

const jsonPath = 'img-portal/game-library.json';

init();

async function init() {
    try {
        const response = await fetch(jsonPath, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`无法加载 ${jsonPath}，状态码：${response.status}`);
        }
        const payload = await response.json();
        dataState = normalizePayload(payload);
        pristineState = clone(dataState);
        render();
        setStatus('数据加载完成', 'success', 2500);
    } catch (error) {
        console.error(error);
        jsonPreview.textContent = '加载 JSON 文件时出现问题，请检查文件路径或语法。';
        setStatus(error.message || '加载数据失败', 'error', 0);
    }
}

function normalizePayload(payload) {
    const isObject = payload !== null && typeof payload === 'object';
    const base = isObject && Array.isArray(payload.games) ? payload : { games: [] };
    return {
        ...(isObject ? payload : {}),
        games: base.games.map((game) => sanitizeGame(game)).filter((game) => game.name || game.url)
    };
}

function sanitizeGame(game) {
    return {
        name: String(game?.name ?? '').trim(),
        type: String(game?.type ?? game?.category ?? '').trim(),
        image: String(game?.image ?? '').trim(),
        url: String(game?.url ?? '').trim(),
        iframe: String(game?.iframe ?? game?.iframeUrl ?? '').trim()
    };
}

function clone(target) {
    return JSON.parse(JSON.stringify(target));
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
    jsonPreview.textContent = JSON.stringify(dataState, null, 2);
}

function updateGameCount() {
    gameCount.textContent = `当前游戏：${dataState.games.length}`;
}

function syncDirtyState() {
    const current = JSON.stringify(dataState);
    const pristine = JSON.stringify(pristineState);
    hasChanges = current !== pristine;
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
    const game = sanitizeGame({
        name: nameInput.value,
        type: typeInput.value,
        image: imageInput.value,
        url: urlInput.value,
        iframe: iframeInput.value
    });

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
    const blob = new Blob([JSON.stringify(dataState, null, 2)], { type: 'application/json' });
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
        const normalized = normalizePayload(payload);
        normalized.games.forEach(validateGame);
        dataState = normalized;
        pristineState = clone(normalized);
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
