const API_ENDPOINT = 'https://api.scratch.mit.edu/explore/projects';
const PAGE_SIZE = 40;
const MAX_PAGES = 50;

const refreshButton = document.getElementById('refreshButton');
const statusEl = document.getElementById('scraperStatus');
const resultsBody = document.getElementById('resultsBody');

if (!refreshButton || !statusEl || !resultsBody) {
  throw new Error('Scratch 抓取页面缺少必要的 DOM 元素。');
}

const copyFeedbackDuration = 2000;

function setStatus(message, tone = 'muted') {
  statusEl.textContent = message;
  statusEl.dataset.tone = tone;
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

function appendLinkOrEmpty(cell, url, copyValue = url) {
  if (!url) {
    cell.textContent = '';
    return;
  }

  const link = createLink(url);
  cell.append(link);

  if (copyValue) {
    cell.append(createCopyButton(copyValue));
  }
}

function renderProjects(projects) {
  resultsBody.innerHTML = '';

  if (!projects.length) {
    const emptyRow = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 5;
    cell.textContent = '未找到任何 Scratch 项目。';
    emptyRow.append(cell);
    resultsBody.append(emptyRow);
    return;
  }

  const fragment = document.createDocumentFragment();

  projects.forEach((project, index) => {
    const rawId = project?.id;
    const id = rawId === undefined || rawId === null ? '' : String(rawId);
    const title = project?.title ?? '';
    const username = project?.author?.username ?? '';

    const projectUrl = id ? `https://scratch.mit.edu/projects/${id}` : '';
    const iframeUrl = projectUrl ? `${projectUrl}/embed` : '';
    const imageUrl = id ? `https://cdn2.scratch.mit.edu/get_image/project/${id}_480x360.png` : '';

    const row = document.createElement('tr');

    const indexCell = document.createElement('td');
    indexCell.textContent = String(index + 1);
    row.append(indexCell);

    const titleCell = document.createElement('td');
    if (projectUrl) {
      const titleLink = createLink(projectUrl, title || '未命名项目');
      titleLink.classList.add('project-title');
      titleCell.append(titleLink);
    } else {
      titleCell.textContent = title || '未命名项目';
    }

    if (username) {
      const author = document.createElement('p');
      author.className = 'project-author';
      author.textContent = `by ${username}`;
      titleCell.append(author);
    }

    row.append(titleCell);

    const projectCell = document.createElement('td');
    projectCell.className = 'mono-cell';
    appendLinkOrEmpty(projectCell, projectUrl);
    row.append(projectCell);

    const iframeCell = document.createElement('td');
    iframeCell.className = 'mono-cell';
    appendLinkOrEmpty(iframeCell, iframeUrl, iframeUrl ? `<iframe src="${iframeUrl}" allowfullscreen></iframe>` : '');
    row.append(iframeCell);

    const imageCell = document.createElement('td');
    imageCell.className = 'mono-cell';
    appendLinkOrEmpty(imageCell, imageUrl);
    row.append(imageCell);

    fragment.append(row);
  });

  resultsBody.append(fragment);
}

async function fetchProjects(offset) {
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    mode: 'trending',
    offset: String(offset),
    q: '*'
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

async function loadAllProjects() {
  resultsBody.innerHTML = '';
  setStatus('正在自动抓取 Scratch 项目信息，请稍候...', 'loading');
  refreshButton.disabled = true;

  const allProjects = [];
  const seenIds = new Set();

  try {
    for (let page = 0; page < MAX_PAGES; page += 1) {
      const offset = page * PAGE_SIZE;
      const batch = await fetchProjects(offset);

      if (!Array.isArray(batch) || !batch.length) {
        break;
      }

      const uniqueBatch = batch.filter((project) => {
        const id = project?.id;
        if (id === undefined || id === null) {
          return true;
        }
        if (seenIds.has(id)) {
          return false;
        }
        seenIds.add(id);
        return true;
      });

      allProjects.push(...uniqueBatch);
      renderProjects(allProjects);
      setStatus(`已抓取 ${allProjects.length} 个项目，正在继续加载更多……`, 'loading');

      if (batch.length < PAGE_SIZE) {
        break;
      }
    }

    if (!allProjects.length) {
      setStatus('未抓取到任何项目，请稍后重试。', 'muted');
      renderProjects([]);
      return;
    }

    setStatus(`抓取完成，共获得 ${allProjects.length} 个项目。`, 'success');
  } catch (error) {
    console.error(error);
    setStatus(error.message || '抓取过程中出现问题，请稍后重试。', 'error');
    if (!allProjects.length) {
      renderProjects([]);
    }
  } finally {
    refreshButton.disabled = false;
  }
}

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

refreshButton.addEventListener('click', () => {
  loadAllProjects();
});

window.addEventListener('DOMContentLoaded', () => {
  loadAllProjects();
});
