/* =========================================================
   栽培日記 — メインスクリプト
   ・ギャラリーの描画とフィルタリング
   ・ライトボックス（拡大表示）
   ・栽培カレンダーの切り替え
   ・スマホメニュー / スクロール演出 / トップへ戻る
   ========================================================= */
(function () {
  "use strict";

  /* ---------- ギャラリーの描画 ---------- */
  const grid = document.getElementById("gallery-grid");
  const emptyMsg = document.getElementById("gallery-empty");
  const photos = typeof GALLERY_PHOTOS !== "undefined" ? GALLERY_PHOTOS : [];
  const labels = typeof CATEGORY_LABELS !== "undefined" ? CATEGORY_LABELS : {};

  /* いま選ばれている絞り込み条件 */
  let currentFilter = "all";

  function matches(photo) {
    return currentFilter === "all" || photo.category === currentFilter;
  }

  function renderGallery() {
    if (!grid) return;
    grid.innerHTML = "";
    photos.forEach(function (photo, index) {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "gallery-item";
      item.dataset.index = String(index);
      item.setAttribute("aria-label", (photo.caption || "写真") + " を拡大表示");

      const tag = labels[photo.category] || "";
      item.innerHTML =
        (tag ? '<span class="gallery-tag">' + tag + "</span>" : "") +
        '<img src="' + photo.src + '" alt="' + (photo.caption || "栽培の写真") + '" loading="lazy" />' +
        '<span class="gallery-caption">' + (photo.caption || "") + "</span>";

      item.addEventListener("click", function () {
        openLightbox(index);
      });
      grid.appendChild(item);
    });
    applyFilters();
  }

  function applyFilters() {
    let shown = 0;
    document.querySelectorAll(".gallery-item").forEach(function (item) {
      const show = matches(photos[Number(item.dataset.index)]);
      item.style.display = show ? "" : "none";
      if (show) shown++;
    });
    if (emptyMsg) emptyMsg.hidden = shown > 0;
  }

  /* ---------- フィルタリング ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");

      currentFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  /* ---------- ライトボックス ---------- */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCaption = document.getElementById("lb-caption");
  let currentIndex = 0;

  function visibleIndexes() {
    const result = [];
    photos.forEach(function (p, i) {
      if (matches(p)) result.push(i);
    });
    return result;
  }

  function showPhoto(index) {
    const photo = photos[index];
    if (!photo || !lbImg) return;
    lbImg.src = photo.src;
    lbImg.alt = photo.caption || "栽培の写真";
    if (lbCaption) lbCaption.textContent = photo.caption || "";
    currentIndex = index;
  }

  function openLightbox(index) {
    if (!lightbox) return;
    showPhoto(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function step(dir) {
    const list = visibleIndexes();
    if (!list.length) return;
    let pos = list.indexOf(currentIndex);
    if (pos === -1) pos = 0;
    pos = (pos + dir + list.length) % list.length;
    showPhoto(list[pos]);
  }

  const lbClose = document.getElementById("lb-close");
  const lbPrev = document.getElementById("lb-prev");
  const lbNext = document.getElementById("lb-next");
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev) lbPrev.addEventListener("click", function () { step(-1); });
  if (lbNext) lbNext.addEventListener("click", function () { step(1); });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });

  /* ---------- 栽培カレンダーの切り替え ---------- */
  const calTabs = document.querySelectorAll(".cal-tab");
  const calPanels = document.querySelectorAll(".timeline[data-crop]");
  calTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      calTabs.forEach(function (t) {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", active ? "true" : "false");
      });
      calPanels.forEach(function (panel) {
        panel.hidden = panel.dataset.crop !== tab.dataset.crop;
        if (!panel.hidden) {
          panel.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
        }
      });
    });
  });

  /* ---------- スマホメニュー ---------- */
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- スクロール表示アニメ ---------- */
  const revealTargets = document.querySelectorAll(
    ".about-card, .variety-card, .fact-card, .timeline-item, .voice-card"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- トップへ戻る ---------- */
  const toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("is-visible", window.scrollY > 500);
    }, { passive: true });
  }

  /* ---------- 年号 ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 初期化 ---------- */
  renderGallery();
})();
