let editorInstance;
let selectedNode = null;
let fileCounter = 1;
let folderCounter = 1;

window.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('editor');
  const preview = document.getElementById('preview');
  const fileInput = document.getElementById('fileInput');

  editorInstance = CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    mode: 'markdown',
    theme: 'default',
    lineWrapping: true,
    gutters: ["CodeMirror-linenumbers"],
  });

  const style = document.createElement('style');
  style.textContent = `.CodeMirror-linenumber { color: white; font-weight: bold; }`;
  document.head.appendChild(style);

  editorInstance.on('change', updatePreview);
  fileInput.addEventListener('change', handleFileUpload);

  updatePreview();
  initFileTree();
});

function updatePreview() {
  const content = editorInstance.getValue();
  document.getElementById('preview').innerHTML = marked.parse(content);
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    const content = reader.result;
    if (file.name.endsWith('.json')) {
      editorInstance.setOption('mode', 'javascript');
    } else {
      editorInstance.setOption('mode', 'markdown');
    }
    editorInstance.setValue(content);
    updatePreview();
  };
  reader.readAsText(file);
}

function initFileTree() {
  const root = document.getElementById('fileTree');
  root.innerHTML = '';

  const trash = createTreeItem('Trash', true);
  const temp = createTreeItem('Temp', true);

  root.appendChild(trash);
  root.appendChild(temp);
}

function createTreeItem(name, isFolder = false, depth = 0) {
  const item = document.createElement('div');
  item.className = 'tree-item';
  item.dataset.type = isFolder ? 'folder' : 'file';
  item.dataset.depth = depth;

  item.innerHTML = `<span class="indent" style="margin-left: ${depth * 16}px;"></span>${name}`;
  item.onclick = () => {
    selectedNode = item;
  };

  return item;
}

function createFolder() {
  const newFolder = createTreeItem(`Folder_${folderCounter++}`, true, 1);
  document.getElementById('fileTree').appendChild(newFolder);
}

function createFile() {
  const newFile = createTreeItem(`File_${fileCounter++}.md`, false, 1);
  document.getElementById('fileTree').appendChild(newFile);
}

function deleteItem() {
  if (selectedNode) {
    selectedNode.remove();
    selectedNode = null;
  }
}

function renameItem() {
  if (selectedNode) {
    const newName = prompt('새 이름을 입력하세요:', selectedNode.textContent.trim());
    if (newName) {
      selectedNode.childNodes[1].textContent = newName;
    }
  }
}
