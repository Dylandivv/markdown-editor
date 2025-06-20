let editorInstance;

window.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('editor');
  const preview = document.getElementById('preview');
  const fileInput = document.getElementById('fileInput');
  const editorContainer = document.getElementById('editor-container');
  const previewContainer = document.getElementById('preview');
  const resizer = document.getElementById('resizer');

  editorInstance = CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    mode: 'markdown',
    theme: 'default',
    lineWrapping: true,
  });

  const updatePreview = () => {
    const content = editorInstance.getValue();
    preview.innerHTML = marked.parse(content);
  };

  editorInstance.on('change', updatePreview);
  updatePreview();

  fileInput.addEventListener('change', handleFileUpload);

  // Drag-to-resize
  resizer.addEventListener('mousedown', function (e) {
    e.preventDefault();
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
  });

  function resize(e) {
    const totalWidth = editorContainer.parentNode.offsetWidth;
    let newEditorWidth = e.clientX - editorContainer.offsetLeft;
    const minWidth = totalWidth * 0.2;
    const maxWidth = totalWidth * 0.8;

    newEditorWidth = Math.max(minWidth, Math.min(maxWidth, newEditorWidth));
    const previewWidth = totalWidth - newEditorWidth - 6;

    editorContainer.style.flex = `0 0 ${newEditorWidth}px`;
    previewContainer.style.flex = `0 0 ${previewWidth}px`;
  }

  function stopResize() {
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
  }
});

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    editorInstance.setValue(reader.result);
  };
  reader.readAsText(file);
}

// Stub functions for file system (replace with actual logic if needed)
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
