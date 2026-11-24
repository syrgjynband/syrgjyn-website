(() => {
  const dialog = document.querySelector("#gallery-viewer");
  const links = [...document.querySelectorAll("[data-gallery-item]")];
  if (!dialog || !links.length || typeof dialog.showModal !== "function") return;
  const image = dialog.querySelector(".viewer-image");
  const caption = dialog.querySelector(".viewer-caption");
  const credit = dialog.querySelector(".viewer-credit");
  const count = dialog.querySelector(".viewer-count");
  const error = dialog.querySelector(".viewer-error");
  const close = dialog.querySelector(".viewer-close");
  let current = 0;
  let returnFocus = null;

  function display(index) {
    current = (index + links.length) % links.length;
    const link = links[current];
    const thumb = link.querySelector("img");
    const figure = link.closest("figure");
    error.hidden = true;
    image.hidden = false;
    image.alt = thumb.alt;
    image.width = thumb.width;
    image.height = thumb.height;
    image.src = link.href;
    caption.textContent = figure.querySelector("figcaption span").textContent;
    credit.textContent = figure.querySelector("figcaption small")?.textContent || "";
    credit.hidden = !credit.textContent;
    count.textContent = `${current + 1} / ${links.length}`;
    history.replaceState(null, "", `${location.pathname}${location.search}#photo-${link.dataset.photoId}`);
  }

  function open(index) {
    returnFocus = links[index];
    display(index);
    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add("gallery-open");
    close.focus();
  }

  links.forEach((link, index) => link.addEventListener("click", event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    open(index);
  }));
  close.addEventListener("click", () => dialog.close());
  dialog.querySelector(".viewer-previous").addEventListener("click", () => display(current - 1));
  dialog.querySelector(".viewer-next").addEventListener("click", () => display(current + 1));
  dialog.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      const controls = [...dialog.querySelectorAll("button, a[href]")]
        .filter(control => control.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      display(current + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("gallery-open");
    if (location.hash.startsWith("#photo-")) history.replaceState(null, "", location.pathname + location.search);
    returnFocus?.focus({ preventScroll: true });
  });
  image.addEventListener("error", () => { image.hidden = true; error.hidden = false; });

  function openHash() {
    const index = links.findIndex(link => location.hash === `#photo-${link.dataset.photoId}`);
    if (index >= 0) open(index);
    else if (dialog.open) dialog.close();
  }
  window.addEventListener("hashchange", openHash);
  openHash();
})();
