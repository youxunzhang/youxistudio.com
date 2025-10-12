const DATA_SOURCE = 'img-newgame/youxistudio-newgames.json';

const tableBody = document.querySelector('#coverTableBody');
const entryCount = document.querySelector('#entryCount');
const unsavedNotice = document.querySelector('#unsavedNotice');
const jsonPreview = document.querySelector('#jsonPreview');
const statusMessage = document.querySelector('#statusMessage');
const addEntryButton = document.querySelector('#addEntry');
const importTriggerButton = document.querySelector('#importTrigger');
const importInput = document.querySelector('#importJson');
const reloadButton = document.querySelector('#reloadData');
const downloadButton = document.querySelector('#downloadJson');

let records = [];
let baselineSnapshot = '[]';
let statusTimeoutId;

if (tableBody) {
    bindEvents();
    loadData();
}

function bindEvents() {
    addEntryButton?.addEventListener('click', handleAddEntry);
    importTriggerButton?.addEventListener('click', () => importInput?.click());
    importInput?.addEventListener('change', handleImport);
    reloadButton?.addEventListener('click', handleReload);
    downloadButton?.addEventListener('click', handleDownload);
    tableBody.addEventListener('input', handleFieldInput);
    tableBody.addEventListener('click', handleTableClick);
}

async function loadData() {
    try {
        const response = await fetch(`${DATA_SOURCE}?t=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`请求失败：${response.status}`);
        }
        const data = await response.json();
        records = normaliseRecords(data);
        renderRecords();
        setBaselineFromCurrent();
        showStatus(`已加载 ${records.length} 条新游记录。`);
    } catch (error) {
        console.error('加载新游封面数据失败', error);
        records = [];
        renderRecords();
        setBaselineFromCurrent();
        showStatus('加载数据失败，请稍后重试。', 'error', 6000);
    }
}

function normaliseRecords(list) {
    if (!Array.isArray(list)) {
        return [];
    }
    return list.map((item) => ({
        name: normaliseText(item?.name),
        image: normaliseText(item?.image),
        link: normaliseText(item?.link),
        type: normaliseText(item?.type) || 'newgame'
    }));
}

function normaliseText(value) {
    return typeof value === 'string' ? value.trim() : '';
}

function renderRecords() {
    tableBody.innerHTML = '';

    if (!records.length) {
        const emptyRow = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 5;
        cell.className = 'empty-cell';
        cell.textContent = '当前没有记录，请点击“新增记录”开始添加。';
        emptyRow.appendChild(cell);
        tableBody.appendChild(emptyRow);
        entryCount.textContent = '当前条目：0';
        updateJsonPreview();
        return;
    }

    const fragment = document.createDocumentFragment();

    records.forEach((record, index) => {
        const row = document.createElement('tr');
        row.appendChild(createNameCell(record, index));
        row.appendChild(createCoverCell(record, index));
        row.appendChild(createLinkCell(record, index));
        row.appendChild(createTypeCell(record, index));
        row.appendChild(createActionsCell(index));
        fragment.appendChild(row);
    });

    tableBody.appendChild(fragment);
    entryCount.textContent = `当前条目：${records.length}`;
    updateJsonPreview();
}

function createNameCell(record, index) {
    const cell = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '游戏名称（建议英文/拼音）';
    input.value = record.name;
    input.dataset.index = String(index);
    input.dataset.field = 'name';
    cell.appendChild(input);
    return cell;
}

function createCoverCell(record, index) {
    const cell = document.createElement('td');
    cell.className = 'cover-cell';

    const preview = document.createElement('img');
    preview.className = 'cover-thumb';
    preview.loading = 'lazy';
    preview.dataset.thumbIndex = String(index);
    preview.addEventListener('error', () => handlePreviewError(preview, index));
    setPreviewSource(preview, record);

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '例如：img-newgame/example.jpg';
    input.value = record.image;
    input.dataset.index = String(index);
    input.dataset.field = 'image';

    cell.appendChild(preview);
    cell.appendChild(input);
    return cell;
}

function createLinkCell(record, index) {
    const cell = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'url';
    input.placeholder = 'https://...';
    input.value = record.link;
    input.dataset.index = String(index);
    input.dataset.field = 'link';
    cell.appendChild(input);
    return cell;
}

function createTypeCell(record, index) {
    const cell = document.createElement('td');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'newgame';
    input.value = record.type;
    input.dataset.index = String(index);
    input.dataset.field = 'type';
    cell.appendChild(input);
    return cell;
}

function createActionsCell(index) {
    const cell = document.createElement('td');
    const wrapper = document.createElement('div');
    wrapper.className = 'row-actions';

    const upButton = document.createElement('button');
    upButton.type = 'button';
    upButton.textContent = '↑';
    upButton.className = 'secondary icon-only';
    upButton.dataset.action = 'move-up';
    upButton.dataset.index = String(index);
    if (index === 0) {
        upButton.disabled = true;
    }

    const downButton = document.createElement('button');
    downButton.type = 'button';
    downButton.textContent = '↓';
    downButton.className = 'secondary icon-only';
    downButton.dataset.action = 'move-down';
    downButton.dataset.index = String(index);
    if (index === records.length - 1) {
        downButton.disabled = true;
    }

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = '删除';
    deleteButton.className = 'danger';
    deleteButton.dataset.action = 'delete';
    deleteButton.dataset.index = String(index);

    wrapper.appendChild(upButton);
    wrapper.appendChild(downButton);
    wrapper.appendChild(deleteButton);
    cell.appendChild(wrapper);
    return cell;
}

function handleFieldInput(event) {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
        return;
    }
    const field = target.dataset.field;
    if (!field) {
        return;
    }
    const index = Number.parseInt(target.dataset.index || '', 10);
    if (!Number.isInteger(index) || index < 0 || index >= records.length) {
        return;
    }

    records[index][field] = target.value;

    if (field === 'image') {
        updateThumbnail(index);
    } else if (field === 'name') {
        updateName(index);
    }

    updateJsonPreview();
    updateDirtyFlag();
}

function handleTableClick(event) {
    const button = event.target instanceof Element ? event.target.closest('button[data-action]') : null;
    if (!button) {
        return;
    }

    const action = button.dataset.action;
    const index = Number.parseInt(button.dataset.index || '', 10);
    if (!Number.isInteger(index) || index < 0 || index >= records.length) {
        return;
    }

    if (action === 'delete') {
        const removed = records.splice(index, 1);
        renderRecords();
        updateDirtyFlag();
        const name = removed[0]?.name || '记录';
        showStatus(`已删除 ${name}。`);
    } else if (action === 'move-up') {
        moveRecord(index, index - 1);
    } else if (action === 'move-down') {
        moveRecord(index, index + 1);
    }
}

function moveRecord(fromIndex, toIndex) {
    if (toIndex < 0 || toIndex >= records.length || fromIndex === toIndex) {
        return;
    }
    const [item] = records.splice(fromIndex, 1);
    records.splice(toIndex, 0, item);
    renderRecords();
    updateDirtyFlag();
    showStatus('已调整记录顺序。');
}

function handleAddEntry() {
    records.unshift({
        name: '',
        image: '',
        link: '',
        type: 'newgame'
    });
    renderRecords();
    updateDirtyFlag();
    showStatus('已新增 1 条空白记录，请填写完整信息。');
}

function handleImport(event) {
    const input = event.target;
    const file = input.files && input.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
        try {
            const text = loadEvent.target?.result;
            const parsed = typeof text === 'string' ? JSON.parse(text) : JSON.parse(new TextDecoder().decode(text));
            const nextRecords = normaliseRecords(parsed);
            records = nextRecords;
            renderRecords();
            setBaselineFromCurrent();
            showStatus(`已导入 ${records.length} 条记录。`);
        } catch (error) {
            console.error('导入 JSON 失败', error);
            showStatus('导入 JSON 失败，请确认文件格式是否正确。', 'error', 6000);
        } finally {
            input.value = '';
        }
    };
    reader.onerror = (error) => {
        console.error('读取 JSON 文件失败', error);
        showStatus('读取文件时出现问题，请重试。', 'error', 6000);
        input.value = '';
    };
    reader.readAsText(file, 'utf-8');
}

async function handleReload() {
    if (hasUnsavedChanges()) {
        const confirmed = window.confirm('当前存在未导出的更改，确定要重新加载远端数据吗？');
        if (!confirmed) {
            return;
        }
    }
    await loadData();
}

function handleDownload() {
    const exportData = getSerialisedRecords();
    if (!exportData.length) {
        showStatus('当前列表为空，无法导出。', 'error');
        return;
    }

    try {
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'youxistudio-newgames.json';
        anchor.click();
        URL.revokeObjectURL(url);
        showStatus('JSON 已生成并下载完成。');
    } catch (error) {
        console.error('导出 JSON 失败', error);
        showStatus('导出 JSON 失败，请稍后重试。', 'error', 6000);
    }
}

function updateThumbnail(index) {
    const preview = tableBody.querySelector(`img[data-thumb-index="${index}"]`);
    if (!preview) {
        return;
    }
    setPreviewSource(preview, records[index]);
}

function updateName(index) {
    const preview = tableBody.querySelector(`img[data-thumb-index="${index}"]`);
    if (!preview) {
        return;
    }
    const record = records[index];
    preview.alt = record.name ? `${record.name} 封面预览` : '封面预览';
    if (preview.dataset.placeholder === 'true') {
        preview.src = createPlaceholder(record.name);
    }
}

function setPreviewSource(preview, record) {
    const hasImage = typeof record.image === 'string' && record.image.trim() !== '';
    preview.dataset.fallback = 'false';
    preview.dataset.placeholder = hasImage ? 'false' : 'true';
    preview.alt = record.name ? `${record.name} 封面预览` : '封面预览';
    if (hasImage) {
        preview.src = normaliseImagePath(record.image);
    } else {
        preview.src = createPlaceholder(record.name);
    }
}

function handlePreviewError(preview, index) {
    if (preview.dataset.fallback === 'true') {
        return;
    }
    preview.dataset.fallback = 'true';
    preview.dataset.placeholder = 'true';
    preview.src = createPlaceholder(records[index]?.name);
}

function normaliseImagePath(rawValue) {
    const value = typeof rawValue === 'string' ? rawValue.trim() : '';
    if (!value) {
        return createPlaceholder('');
    }

    if (/^https?:\/\//i.test(value)) {
        try {
            const url = new URL(value);
            const hostname = url.hostname.replace(/^www\./i, '');
            if (hostname === 'youxistudio.com') {
                const segments = url.pathname.split('/').filter(Boolean);
                const filename = segments[segments.length - 1];
                if (filename) {
                    return `img-newgame/${filename}`;
                }
            }
        } catch (error) {
            console.warn('封面地址解析失败，使用原始链接', error);
        }
        return value;
    }

    return value;
}

function createPlaceholder(name) {
    const base = typeof name === 'string' && name.trim() ? name.trim() : 'No Cover';
    const short = base.slice(0, 12);
    const safe = short.replace(/[<>&"']/g, '') || 'No Cover';
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='160' height='120' viewBox='0 0 160 120'><rect width='160' height='120' rx='12' fill='%23f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='16' fill='%2394a3b8'>${safe}</text></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function updateJsonPreview() {
    if (!jsonPreview) {
        return;
    }
    const serialised = getSerialisedRecords();
    jsonPreview.textContent = JSON.stringify(serialised, null, 2);
}

function getSerialisedRecords() {
    return records.map((record) => ({
        name: (record.name || '').trim(),
        image: (record.image || '').trim(),
        link: (record.link || '').trim(),
        type: (record.type || '').trim() || 'newgame'
    }));
}

function setBaselineFromCurrent() {
    baselineSnapshot = JSON.stringify(getSerialisedRecords());
    updateDirtyFlag();
}

function updateDirtyFlag() {
    const hasChanges = hasUnsavedChanges();
    if (unsavedNotice) {
        unsavedNotice.hidden = !hasChanges;
    }
    return hasChanges;
}

function hasUnsavedChanges() {
    return JSON.stringify(getSerialisedRecords()) !== baselineSnapshot;
}

function showStatus(message, type = 'success', duration = 3200) {
    if (!statusMessage) {
        return;
    }
    statusMessage.textContent = message;
    statusMessage.className = `status is-visible ${type}`;
    if (statusTimeoutId) {
        window.clearTimeout(statusTimeoutId);
    }
    if (duration > 0) {
        statusTimeoutId = window.setTimeout(() => {
            statusMessage.className = 'status';
            statusMessage.textContent = '';
        }, duration);
    }
}
