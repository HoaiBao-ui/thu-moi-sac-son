(() => {
  "use strict";
  const c = window.INVITATION_CONFIG || {};
  const $ = id => document.getElementById(id);
  const welcome = $("welcome"), reader = $("reader"), book = $("book"), audio = $("background-music");
  let flip = null, count = 0, musicOn = false, loading = false;

  $("event-title").textContent = c.eventTitle || "THƯ MỜI";
  $("welcome-title").textContent = c.welcomeTitle || c.eventTitle || "Thư mời";
  $("welcome-subtitle").textContent = c.subtitle || "";
  $("welcome-kicker").textContent = c.kicker || "TRÂN TRỌNG KÍNH MỜI";
  $("reader-kicker").textContent = c.kicker || "TRÂN TRỌNG KÍNH MỜI";
  $("reader-title").textContent = c.welcomeTitle || c.eventTitle || "Thư mời";
  $("reader-description").textContent = c.description || "Lật trang để xem thư mời.";
  $("footer-note").textContent = c.footerNote || "";
  audio.src = c.music || "assets/audio/nhac-nen.mp3";

  const cover = $("cover-image"), coverPlaceholder = $("cover-placeholder");
  if (c.showCoverImage && c.coverImage) {
    cover.src = c.coverImage;
    cover.style.display = "block";
    coverPlaceholder.style.display = "none";
    cover.onerror = () => { cover.style.display = "none"; coverPlaceholder.style.display = "flex"; };
  }

  function status(msg) { $("status-message").textContent = msg || ""; }
  function updateControls() {
    if (!flip || !count) return;
    const n = flip.getCurrentPageIndex();
    $("page-counter").textContent = `Trang ${n + 1} / ${count}`;
    $("prev-page").disabled = n <= 0;
    $("next-page").disabled = n >= count - 1;
  }
  function addPages(srcs) {
    book.innerHTML = "";
    srcs.forEach((src, i) => {
      const p = document.createElement("div");
      p.className = "page";
      if (i === 0 || i === srcs.length - 1) p.dataset.density = "hard";
      const img = document.createElement("img");
      img.alt = `Trang thư mời ${i + 1}`;
      img.src = src;
      img.onerror = () => { p.innerHTML = `<div style="padding:20px;text-align:center;color:#701c28">Không tìm thấy ảnh<br><small>${src}</small><br><small>Kiểm tra tên file trong config.js</small></div>`; };
      p.appendChild(img);
      book.appendChild(p);
    });
    initializeBook();
  }
  function initializeBook() {
    if (!window.St || !window.St.PageFlip) {
      status("Không tải được hiệu ứng lật sách. Hãy kiểm tra Internet rồi tải lại trang.");
      return;
    }
    if (flip) { try { flip.destroy(); } catch (_) {} flip = null; }
    flip = new St.PageFlip(book, {
      width: Number(c.pageWidth) || 420,
      height: Number(c.pageHeight) || 594,
      size: "stretch", minWidth: 260, maxWidth: 540, minHeight: 360, maxHeight: 760,
      maxShadowOpacity: .45, showCover: true, mobileScrollSupport: true,
      usePortrait: true, drawShadow: true, flippingTime: 850, startPage: 0, autoSize: true
    });
    flip.loadFromHTML(book.querySelectorAll(".page"));
    flip.on("flip", updateControls);
    count = book.querySelectorAll(".page").length;
    setTimeout(updateControls, 300);
    status("");
  }
  async function loadPdf(path) {
    if (!window.pdfjsLib) { status("Không tải được bộ đọc PDF. Hãy kiểm tra Internet."); return; }
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    try {
      const pdf = await pdfjsLib.getDocument(path).promise, imgs = [];
      for (let n = 1; n <= pdf.numPages; n++) {
        status(`Đang xử lý PDF: trang ${n}/${pdf.numPages}…`);
        const page = await pdf.getPage(n), viewport = page.getViewport({scale: 1.35});
        const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
        canvas.width = Math.ceil(viewport.width); canvas.height = Math.ceil(viewport.height);
        await page.render({canvasContext:ctx, viewport}).promise;
        imgs.push(canvas.toDataURL("image/jpeg", .9));
      }
      addPages(imgs);
    } catch (e) {
      console.error(e);
      status("Không đọc được PDF. Kiểm tra đường dẫn và mở website qua máy chủ hoặc hosting.");
    }
  }

  $("open-invitation").addEventListener("click", async () => {
    if (loading) return;
    loading = true;
    welcome.classList.add("hidden"); reader.classList.remove("hidden");
    window.scrollTo({top:0, behavior:"smooth"});
    if (c.pdf && c.pdf.trim()) await loadPdf(c.pdf.trim());
    else {
      const paths = Array.isArray(c.pages) ? c.pages.slice(0, 6).filter(Boolean) : [];
      if (paths.length !== 6) status(`Cấu hình hiện có ${paths.length}/6 ảnh. Hãy khai báo đủ 6 đường dẫn trong config.js.`);
      if (paths.length) addPages(paths);
      else status("Chưa khai báo ảnh. Hãy sửa danh sách pages trong config.js.");
    }
    loading = false;
    try { await audio.play(); setMusic(true); } catch (_) {}
  });
  function setMusic(on) {
    musicOn = on; $("sound-label").textContent = on ? "Tắt nhạc" : "Bật nhạc";
    $("sound-toggle").setAttribute("aria-pressed", String(on));
  }
  $("prev-page").addEventListener("click", () => { if (flip) flip.flipPrev(); });
  $("next-page").addEventListener("click", () => { if (flip) flip.flipNext(); });
  $("back-to-cover").addEventListener("click", () => {
    reader.classList.add("hidden"); welcome.classList.remove("hidden");
    window.scrollTo({top:0, behavior:"smooth"});
  });
  $("sound-toggle").addEventListener("click", async () => {
    if (musicOn) { audio.pause(); setMusic(false); }
    else {
      try { await audio.play(); setMusic(true); }
      catch (_) { status("Chưa phát được nhạc. Hãy kiểm tra file MP3 trong assets/audio."); }
    }
  });
  audio.addEventListener("pause", () => { if (musicOn) setMusic(false); });
})();
