let editorInstance;

window.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('editor');
  const preview = document.getElementById('preview');
  const fileInput = document.getElementById('fileInput');

  // CodeMirror 초기화
  editorInstance = CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    mode: 'markdown',
    lineWrapping: true,
    theme: 'default'
  });

  // 미리보기 업데이트
  function updatePreview() {
    const content = editorInstance.getValue();
    document.getElementById('preview').innerHTML = marked.parse(content);
  }

  editorInstance.on('change', updatePreview);
  updatePreview();

  // 파일 업로드
  fileInput.addEventListener('change', handleFileUpload);

  // 리사이저 바 기능
  const resizer = document.getElementById('resizer');
  const leftPane = document.getElementById('editor-container');
  const rightPane = document.getElementById('preview');

  let isResizing = false;

  resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;
    const containerWidth = resizer.parentElement.offsetWidth;
    let leftWidth = e.clientX - resizer.parentElement.offsetLeft;
    let rightWidth = containerWidth - leftWidth - resizer.offsetWidth;

    const minWidth = containerWidth * 0.2;
    if (leftWidth < minWidth) {
      leftWidth = minWidth;
      rightWidth = containerWidth - leftWidth - resizer.offsetWidth;
    }
    if (rightWidth < minWidth) {
      rightWidth = minWidth;
      leftWidth = containerWidth - rightWidth - resizer.offsetWidth;
    }

    leftPane.style.flex = `0 0 ${leftWidth}px`;
    rightPane.style.flex = `0 0 ${rightWidth}px`;
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = 'default';
  });
});

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    editorInstance.setValue(event.target.result);
  };
  reader.readAsText(file);
}

// 폴더/파일 구조
const fileTree = document.getElementById('fileTree');
let selectedNode = null;

function createFolder() {
  const name = prompt("폴더 이름:", "Folder_1");
  if (name) {
    const div = document.createElement('div');
    div.textContent = name;
    div.className = 'folder';
    div.onclick = () => selectNode(div);
    fileTree.appendChild(div);
  }
}

function createFile() {
  const name = prompt("파일 이름:", "NewFile.md");
  if (name) {
    const div = document.createElement('div');
    div.textContent = name;
    div.className = 'file';
    div.onclick = () => {
      selectNode(div);
      editorInstance.setValue(`# ${name}\n`);
    };
    fileTree.appendChild(div);
  }
}

function renameItem() {
  if (!selectedNode) return;
  const newName = prompt("새 이름:", selectedNode.textContent);
  if (newName) {
    selectedNode.textContent = newName;
  }
}

function deleteItem() {
  if (!selectedNode) return;
  if (confirm("정말 삭제하시겠습니까?")) {
    selectedNode.remove();
    selectedNode = null;
  }
}

function selectNode(node) {
  if (selectedNode) {
    selectedNode.style.background = '';
  }
  selectedNode = node;
  selectedNode.style.background = '#444';
}
