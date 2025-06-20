const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// 기본 마크다운 변환기 (간단 버전)
function renderMarkdown(text) {
  return text
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*?)\*/gim, '<i>$1</i>')
    .replace(/\n$/gim, '<br />');
}

editor.addEventListener('input', () => {
  const markdownText = editor.value;
  preview.innerHTML = renderMarkdown(markdownText);
});
