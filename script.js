// script.js - StackEdit 스타일 기반 기능 구현

let editor, currentMode = 'markdown';

window.onload = function () {
  editor = CodeMirror(document.getElementById('editor'), {
    mode: 'markdown',
    lineNumbers: true,
    lineWrapping: true,
    theme: 'default',
  });

  editor.on('change', updatePreview);
  document.getElementById('fileInput').addEventListener('change', handleFileUpload);
  initDivider();
};

function updatePreview() {
  const content = editor.getValue();
  const preview = document.getElementById('preview');

  if (currentMode === 'json') {
    try {
      const parsed = JSON.parse(content);
      preview.textContent = JSON.stringify(parsed, null, 2);
    } catch (e) {
      preview.textContent = 'Invalid JSON';
    }
  } else {
    preview.innerHTML = marked.parse(content);
  }
}

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    editor.setValue(e.target.result);
    updatePreview();
  };
  reader.readAsText(file);

  const ext = file.name.split('.').pop();
  if (ext === 'json') {
    currentMode = 'json';
    editor.setOption('mode', 'application/json');
  } else if (ext === 'txt') {
    currentMode = 'text';
    editor.setOption('mode', 'text/plain');
  } else {
    currentMode = 'markdown';
    editor.setOption('mode', 'markdown');
  }
}

function initDivider() {
  const divider = document.querySelector('.divider');
  const editorContainer = document.querySelector('.editor-container');
  const previewContainer = document.querySelector('.preview-container');

  let isDragging = false;

  divider.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.body.style.cursor = 'col-resize';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const totalWidth = divider.parentElement.offsetWidth;
    const offsetX = e.clientX - divider.parentElement.offsetLeft;

    const min = totalWidth * 0.2;
    const max = totalWidth * 0.8;
    const leftWidth = Math.min(Math.max(offsetX, min), max);

    editorContainer.style.width = `${leftWidth}px`;
    previewContainer.style.width = `${totalWidth - leftWidth - 6}px`;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
  });
}

// Dummy implementations for menu buttons
function createFolder() {
  alert('📁 폴더 생성 기능은 아직 구현되지 않았습니다.');
}
function createFile() {
  alert('📄 파일 생성 기능은 아직 구현되지 않았습니다.');
}
function renameItem() {
  alert('✏ 이름변경 기능은 아직 구현되지 않았습니다.');
}
function deleteItem() {
  alert('🗑 삭제 기능은 아직 구현되지 않았습니다.');
}
