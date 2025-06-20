// script.js - StackEdit 스타일 기반 기능

let editor, currentMode = 'markdown';

// CodeMirror 초기화
window.onload = function () {
  editor = CodeMirror(document.getElementById('editor'), {
    mode: 'markdown',
    lineNumbers: true,
    theme: 'default',
    lineWrapping: true
  });

  editor.on("change", updatePreview);

  // divider drag 지원
  initDivider();
};

// Preview 갱신
function updatePreview() {
  const content = editor.getValue();
  const preview = document.getElementById('preview');
  if (currentMode === 'markdown') {
    preview.innerHTML = marked.parse(content);
  } else if (currentMode === 'json') {
    try {
      const parsed = JSON.parse(content);
      preview.textContent = JSON.stringify(parsed, null, 2);
    } catch (e) {
      preview.textContent = 'Invalid JSON';
    }
  } else {
    preview.textContent = content;
  }
}

// divider drag 기능
function initDivider() {
  const divider = document.querySelector('.divider');
  const editorContainer = document.querySelector('.editor-container');
  const previewContainer = document.querySelector('.preview-container');

  let isDragging = false;

  divider.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.body.style.cursor = 'ew-resize';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const totalWidth = divider.parentElement.offsetWidth;
    const offsetX = e.clientX - divider.parentElement.offsetLeft;

    const min = totalWidth * 0.2;
    const max = totalWidth * 0.8;
    const leftWidth = Math.min(Math.max(offsetX, min), max);

    editorContainer.style.flex = `0 0 ${leftWidth}px`;
    previewContainer.style.flex = `1 1 ${totalWidth - leftWidth - 5}px`;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.cursor = 'default';
  });
}

// 파일 로드
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    editor.setValue(e.target.result);
    updatePreview();
  };
  reader.readAsText(file);

  // 확장자에 따라 모드 변경
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
