"use strict";
{
  const textarea = document.getElementById("text");
  const saveButton = document.getElementById("save");
  const deleteButton = document.getElementById("delete");
  const status = document.getElementById("status");
  const charCount = document.getElementById("char-count");

  const STORAGE_KEY = "cyber_memo_data";

  // 読み込み時
  const savedMemo = localStorage.getItem(STORAGE_KEY);
  if (savedMemo !== null) {
    textarea.value = savedMemo;
    updateInfo();
  }

  // 文字数カウント更新
  function updateInfo() {
    charCount.textContent = `CHARS: ${textarea.value.length}`;
  }

  textarea.addEventListener("input", updateInfo);

  // 保存（UPLOAD）
  saveButton.addEventListener("click", () => {
    localStorage.setItem(STORAGE_KEY, textarea.value);
    showStatus("DATA_UPLOAD_SUCCESSFUL...");
  });

  // 削除（PURGE）
  deleteButton.addEventListener("click", () => {
    if (confirm("ARE YOU SURE YOU WANT TO PURGE DATA?")) {
      localStorage.removeItem(STORAGE_KEY);
      textarea.value = "";
      updateInfo();
      showStatus("MEMORY_PURGED.");
    }
  });

  function showStatus(msg) {
    status.textContent = msg;
    status.style.opacity = 1;
    setTimeout(() => {
      status.textContent = "";
    }, 3000);
  }
}
