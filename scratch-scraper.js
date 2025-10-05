const API_ENDPOINT = 'https://api.scratch.mit.edu/explore/projects';
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 40;

const form = document.getElementById('scraperForm');
const queryInput = document.getElementById('queryInput');
const modeSelect = document.getElementById('modeSelect');
const limitInput = document.getElementById('limitInput');
const offsetInput = document.getElementById('offsetInput');
const statusEl = document.getElementById('scraperStatus');
const resultsBody = document.getElementById('resultsBody');

const copyFeedbackDuration = 2000;

function setStatus(message, tone = 'muted') {
  statusEl.textContent = message;
  statusEl.dataset.tone = tone;
}

function clampLimit(value) {
  if (Number.isNaN(value)) return DEFAULT_LIMIT;
  return Math.min(Math.max(value, 1), MAX_LIMIT);
}

function clampOffset(value) {
  if (Number.isNaN(value) || value < 0) return 0;
  return value;
}

async function copyToClipboard(text) {
  if (!text) return false;

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn('Clipboard API failed, fallback to execCommand.', error);
    }
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.append(textarea);
  textarea.select();

  let succeeded = false;
  try {
    succeeded = document.execCommand('copy');
  } catch (error) {
    console.warn('execCommand copy failed.', error);
  }

  textarea.remove();
  return succeeded;
}

function createLink(url, text = url) {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener';
  anchor.textContent = text;
  return anchor;
}

function createCopyButton(value) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy-button';
  button.dataset.copy = value;
  button.textContent = '复制';
  return button;
}

function renderProjects(projects, offset = 0) {
  resultsBody.innerHTML = '';

  if (!projects.length) {
    const emptyRow = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 5;
    cell.textContent = '未找到符合条件的 Scratch 项目。请尝试调整关键词或分页参数。';
    emptyRow.append(cell);
    resultsBody.append(emptyRow);
    return;
  }

  const fragment = document.createDocumentFragment();
  let rowNumber = 0;

  projects.forEach((project) => {
    const rawId = project?.id;
    if (rawId === undefined || rawId === null) {
      return;
    }

    const id = String(rawId);
    const title = project?.title ?? '未命名项目';
    const username = project?.author?.username ?? 'Scratch Creator';

    const projectUrl = `https://scratch.mit.edu/projects/${id}`;
    const iframeUrl = `${projectUrl}/embed`;
    const imageUrl = `https://cdn2.scratch.mit.edu/get_image/project/${id}_480x360.png`;

    const row = document.createElement('tr');

    const indexCell = document.createElement('td');
    rowNumber += 1;
    indexCell.textContent = String(offset + rowNumber);
    row.append(indexCell);

    const titleCell = document.createElement('td');
    const titleLink = createLink(projectUrl, title);
    titleLink.classList.add('project-title');

    const author = document.createElement('p');
    author.className = 'project-author';
    author.textContent = `by ${username}`;

    titleCell.append(titleLink, author);
    row.append(titleCell);

    const projectCell = document.createElement('td');
    projectCell.className = 'mono-cell';
    projectCell.append(createLink(projectUrl, projectUrl), createCopyButton(projectUrl));
    row.append(projectCell);

    const iframeCell = document.createElement('td');
    iframeCell.className = 'mono-cell';
    iframeCell.append(createLink(iframeUrl, iframeUrl), createCopyButton(`<iframe src="${iframeUrl}" allowfullscreen></iframe>`));
    row.append(iframeCell);

    const imageCell = document.createElement('td');
    imageCell.className = 'mono-cell';
    imageCell.append(createLink(imageUrl, imageUrl), createCopyButton(imageUrl));
    row.append(imageCell);

    fragment.append(row);
  });

  resultsBody.append(fragment);
}

async function fetchProjects(query, mode, limit, offset) {
  const params = new URLSearchParams({
    limit: String(limit),
    mode,
    offset: String(offset),
    q: query || '*'
  });

  const response = await fetch(`${API_ENDPOINT}?${params.toString()}`, {
    headers: {
      Accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`抓取失败：${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function loadProjects() {
  const query = queryInput.value.trim();
  const mode = modeSelect.value;
  const limit = clampLimit(parseInt(limitInput.value, 10));
  const offset = clampOffset(parseInt(offsetInput.value, 10));

  limitInput.value = String(limit);
  offsetInput.value = String(offset);

  setStatus('正在抓取 Scratch 项目信息，请稍候...', 'loading');

  try {
    const projects = await fetchProjects(query, mode, limit, offset);
    renderProjects(projects, offset);

    if (projects.length) {
      const rangeLabel = `${offset + 1} - ${offset + projects.length}`;
      setStatus(`抓取完成，共获得 ${projects.length} 个项目（位置 ${rangeLabel}）。`, 'success');
    } else {
      setStatus('抓取完成，但没有找到相关项目。', 'muted');
    }
  } catch (error) {
    console.error(error);
    setStatus(error.message || '抓取过程中出现问题，请稍后重试。', 'error');
    renderProjects([], offset);
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  loadProjects();
});

resultsBody.addEventListener('click', async (event) => {
  const button = event.target.closest('.copy-button');
  if (!button) return;

  const { copy: value } = button.dataset;
  const originalText = button.textContent;

  button.disabled = true;
  const success = await copyToClipboard(value);
  button.textContent = success ? '已复制' : '复制失败';
  button.classList.toggle('is-error', !success);
  button.classList.toggle('is-success', success);

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    button.classList.remove('is-error', 'is-success');
  }, copyFeedbackDuration);
});

window.addEventListener('DOMContentLoaded', () => {
  loadProjects();
});
