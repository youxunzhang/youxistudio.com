(() => {
  const statusEl = document.getElementById('statusMessage');
  const bodyEl = document.getElementById('gamesBody');
  const emptyStateEl = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const addBtn = document.getElementById('btnAdd');
  const fileInput = document.getElementById('fileInput');
  const downloadBtn = document.getElementById('btnDownload');
  const dialog = document.getElementById('editorDialog');
  const dialogTitle = document.getElementById('dialogTitle');
  const form = document.getElementById('gameForm');
  const cancelBtn = document.getElementById('btnCancel');

  let games = [];
  let editingIndex = null;
  let filterKeyword = '';

  init();

  function init() {
    fetch('img-newgame/youxistudio-newgames.json?_=' + Date.now())
      .then(resp => {
        if (!resp.ok) throw new Error('网络错误: ' + resp.status);
        return resp.json();
      })
      .then(data => {
        games = Array.isArray(data) ? data.slice() : [];
        render();
        setStatus(`已加载 ${games.length} 条记录。`);
      })
      .catch(err => {
        console.error(err);
        games = [];
        render();
        setStatus('加载失败：' + err.message);
      });

    searchInput.addEventListener('input', event => {
      filterKeyword = event.target.value.trim().toLowerCase();
      renderRows();
    });

    addBtn.addEventListener('click', () => openEditor());

    fileInput.addEventListener('change', handleImport);

    downloadBtn.addEventListener('click', exportJSON);

    dialog.addEventListener('click', event => {
      if (event.target.dataset.action === 'close') {
        closeEditor();
      }
    });

    cancelBtn.addEventListener('click', event => {
      event.preventDefault();
      closeEditor();
    });

    form.addEventListener('submit', handleSubmit);
  }

  function render() {
    renderRows();
    toggleEmptyState();
  }

  function renderRows() {
    const fragment = document.createDocumentFragment();
    const filtered = games.filter(game => {
      if (!filterKeyword) return true;
      return Object.values(game).some(value =>
        value && String(value).toLowerCase().includes(filterKeyword)
      );
    });

    filtered.forEach(game => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="px-4 py-3 align-top">
          <div class="font-medium text-slate-800">${escapeHTML(game.name || '')}</div>
          <div class="text-xs text-slate-400">${escapeHTML(game.image || '')}</div>
        </td>
        <td class="px-4 py-3 align-top">
          <div class="flex items-center gap-3">
            <div class="thumb-container w-20 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
              <img class="js-thumb w-full h-full object-cover" alt="${escapeAttribute(game.name || '封面预览')}" loading="lazy" />
            </div>
            <div class="min-w-0">
              <a href="${escapeAttribute(game.image)}" target="_blank" rel="noopener" class="text-blue-600 hover:underline break-all">${escapeHTML(game.image || '')}</a>
            </div>
          </div>
        </td>
        <td class="px-4 py-3 align-top">
          <a href="${escapeAttribute(game.link)}" target="_blank" rel="noopener" class="text-blue-600 hover:underline">${escapeHTML(game.link || '')}</a>
        </td>
        <td class="px-4 py-3 align-top">${escapeHTML(game.type || '')}</td>
        <td class="px-4 py-3 text-right align-top">
          <div class="inline-flex gap-2">
            <button type="button" class="px-3 py-1 text-xs rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50" data-action="edit">编辑</button>
            <button type="button" class="px-3 py-1 text-xs rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50" data-action="delete">删除</button>
          </div>
        </td>
      `;

      row.querySelector('[data-action="edit"]').addEventListener('click', () => {
        const index = games.indexOf(game);
        openEditor(game, index);
      });

      row.querySelector('[data-action="delete"]').addEventListener('click', () => {
        const index = games.indexOf(game);
        if (index > -1 && confirm('确定要删除该记录吗？')) {
          games.splice(index, 1);
          render();
          setStatus(`已删除“${game.name || '未命名'}”。`);
        }
      });

      const thumbImg = row.querySelector('.js-thumb');
      const thumbContainer = row.querySelector('.thumb-container');
      if (thumbImg && thumbContainer) {
        const renderFallback = () => {
          if (!thumbContainer.querySelector('span')) {
            thumbImg.remove();
            const fallback = document.createElement('span');
            fallback.className = 'text-xs text-slate-400';
            fallback.textContent = '无封面';
            thumbContainer.appendChild(fallback);
          }
        };

        if (game.image) {
          thumbImg.src = game.image;
          thumbImg.addEventListener('error', () => {
            renderFallback();
          }, { once: true });
        } else {
          renderFallback();
        }
      }

      fragment.appendChild(row);
    });

    bodyEl.innerHTML = '';
    bodyEl.appendChild(fragment);
    toggleEmptyState(filtered.length === 0);
  }

  function toggleEmptyState(force) {
    const isEmpty = typeof force === 'boolean' ? force : games.length === 0;
    if (isEmpty) {
      emptyStateEl.classList.remove('hidden');
    } else {
      emptyStateEl.classList.add('hidden');
    }
  }

  function openEditor(game = null, index = null) {
    editingIndex = index;
    if (game) {
      dialogTitle.textContent = '编辑游戏';
      form.fieldName.value = game.name || '';
      form.fieldImage.value = game.image || '';
      form.fieldLink.value = game.link || '';
      form.fieldType.value = game.type || 'newgame';
    } else {
      dialogTitle.textContent = '新增游戏';
      form.reset();
      form.fieldType.value = 'newgame';
    }
    dialog.classList.remove('hidden');
  }

  function closeEditor() {
    editingIndex = null;
    dialog.classList.add('hidden');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const record = Object.fromEntries(formData.entries());
    if (editingIndex !== null && editingIndex > -1) {
      games[editingIndex] = record;
      setStatus(`已更新“${record.name || '未命名'}”。`);
    } else {
      games.push(record);
      setStatus(`已新增“${record.name || '未命名'}”。`);
    }
    closeEditor();
    render();
  }

  function handleImport(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!Array.isArray(parsed)) {
          throw new Error('JSON 格式需为数组');
        }
        games = parsed;
        render();
        setStatus(`已从文件加载 ${games.length} 条记录。`);
      } catch (err) {
        console.error(err);
        alert('导入失败：' + err.message);
      } finally {
        fileInput.value = '';
      }
    };
    reader.readAsText(file, 'utf-8');
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(games, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'youxistudio-newgames.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setStatus('已导出当前 JSON，下载完成。');
  }

  function setStatus(message) {
    if (statusEl) statusEl.textContent = message;
  }

  function escapeHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttribute(str) {
    return String(str || '').replace(/"/g, '&quot;');
  }
})();
