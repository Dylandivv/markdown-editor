let editorInstance;

window.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('editor');
  const preview = document.getElementById('preview');
  const fileInput = document.getElementById('fileInput');
  const darkToggle = document.getElementById('darkModeToggle');

  editorInstance = CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    mode: 'markdown',
    theme: 'default'
  });

  editorInstance.on('change', updatePreview);
  updatePreview();

  fileInput.addEventListener('change', handleFileUpload);
  darkToggle.addEventListener('click', toggleDarkMode);
});

function updatePreview() {
  const content = editorInstance.getValue();
  const mode = editorInstance.getOption('mode');

  if (mode === 'markdown') {
    document.getElementById('preview').innerHTML = marked.parse(content);
  } else {
    document.getElementById('preview').innerHTML = `<pre>${escapeHtml(content)}</pre>`;
  }
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const content = e.target.result;
    editorInstance.setValue(content);

    if (file.name.endsWith('.json')) {
      editorInstance.setOption('mode', 'javascript');
    } else if (file.name.endsWith('.md') || file.name.endsWith('.markdown')) {
      editorInstance.setOption('mode', 'markdown');
    } else {
      editorInstance.setOption('mode', 'text/plain');
    }

    updatePreview();
  };
  reader.readAsText(file);
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, m =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m])
  );
}
