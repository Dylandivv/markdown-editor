body {
  margin: 0;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #fff;
  color: #000;
  transition: background 0.3s, color 0.3s;
}

body.dark {
  background: #1e1e1e;
  color: #ccc;
}

.toolbar {
  padding: 10px;
  display: flex;
  gap: 10px;
  background: #eee;
}

body.dark .toolbar {
  background: #2e2e2e;
}

.container {
  display: flex;
  flex: 1;
  height: calc(100vh - 50px); /* 툴바 제외 전체 높이 */
  overflow: hidden;
}

/* 좌측 에디터 */
#editor,
.CodeMirror {
  width: 50%;
  height: 100%;
  font-size: 16px;
}

/* 다크모드에서도 에디터 색상 반전 */
body.dark .CodeMirror {
  background: #1e1e1e !important;
  color: #eee;
}
body.dark .CodeMirror-lines {
  background: #1e1e1e;
  color: #eee;
}
.CodeMirror {
  height: 100% !important;
}

/* 중앙 구분선 (회색, 10px) */
.divider {
  width: 10px;
  background: #ccc;
  cursor: col-resize;
}

/* Preview 창 */
#preview {
  width: 50%;
  padding: 20px;
  overflow-y: auto;
  border-left: 1px solid #ccc;
}

body.dark #preview {
  background: #222;
  color: #eee;
}
