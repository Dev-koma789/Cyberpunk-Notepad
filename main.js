"use strict";
{
  const textarea = document.getElementById("text");
  const saveButton = document.getElementById("save");
  const deleteButton = document.getElementById("delete");
  const status = document.getElementById("status");
  const charCount = document.getElementById("char-count");
  const mainElement = document.querySelector("main"); // 揺らす用

  // 音声要素の取得
  const typeSound = document.getElementById("type-sound");
  const saveSound = document.getElementById("save-sound");
  const deleteSound = document.getElementById("delete-sound");

  const STORAGE_KEY = "cyber_memo_data";

  // --- 音の再生関数 ---
  function playSound(audio) {
    audio.currentTime = 0; // 再生位置を最初に戻す
    audio.play();
  }

  // タイピング音の連動
  textarea.addEventListener("keydown", () => {
    playSound(typeSound);
  });

  // 文字数更新
  textarea.addEventListener("input", () => {
    charCount.textContent = `CHARS: ${textarea.value.length}`;
  });

  // 読み込み
  const savedMemo = localStorage.getItem(STORAGE_KEY);
  if (savedMemo !== null) {
    textarea.value = savedMemo;
    charCount.textContent = `CHARS: ${textarea.value.length}`;
  }

  // 保存（UPLOAD）
  saveButton.addEventListener("click", () => {
    localStorage.setItem(STORAGE_KEY, textarea.value);

    // 演出：音を鳴らし、画面を揺らす
    playSound(saveSound);
    mainElement.classList.add("glitch-active");

    showStatus("保存しました");

    // 0.5秒後に揺れを止める
    setTimeout(() => {
      mainElement.classList.remove("glitch-active");
    }, 500);
  });

  // 削除（PURGE）
  deleteButton.addEventListener("click", () => {
    // playSound(deleteSound); // 警告音　※うるさいので削除
    if (confirm("⚠ WARNING: データを削除しますか?")) {
      localStorage.removeItem(STORAGE_KEY);
      textarea.value = "";
      charCount.textContent = `CHARS: 0`;
      showStatus("削除しました");
    }
  });

  function showStatus(msg) {
    status.textContent = msg;
    setTimeout(() => {
      status.textContent = "";
    }, 3000);
  }
}
