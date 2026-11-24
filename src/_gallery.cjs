const { escapeHtml: e } = require("./_cards.cjs");

function galleryGrid(photos, { preview = false } = {}) {
  return `<div class="gallery-grid${preview ? " gallery-preview" : ""}">${photos.map((photo, index) => {
    const href = preview ? `/gallery/#photo-${photo.id}` : photo.large;
    const label = preview ? `View ${photo.caption} in the gallery` : `Open photo: ${photo.caption}`;
    const loading = !preview && index < 3 ? "eager" : "lazy";
    return `<figure class="gallery-photo"${preview ? "" : ` id="photo-${e(photo.id)}"`}><a href="${e(href)}" aria-label="${e(label)}"${preview ? "" : ` data-gallery-item data-photo-id="${e(photo.id)}"`}><img src="${e(photo.small)}" srcset="${e(photo.small)} 480w, ${e(photo.medium)} 960w" sizes="${preview ? "(max-width: 480px) calc(100vw - 36px), (max-width: 800px) calc((100vw - 54px) / 2), 350px" : "(max-width: 480px) calc(100vw - 36px), (max-width: 800px) calc((100vw - 54px) / 2), 355px"}" width="${photo.width}" height="${photo.height}"${preview ? "" : ` style="aspect-ratio:${photo.width}/${photo.height}"`} loading="${loading}" decoding="async" alt="${e(photo.alt)}"></a><figcaption><span>${e(photo.caption)}</span>${photo.credit ? `<small>${e(photo.credit)}</small>` : ""}</figcaption></figure>`;
  }).join("\n")}</div>`;
}

function galleryViewer() {
  return `<dialog id="gallery-viewer" aria-label="Full-size gallery photo"><div class="viewer-panel"><div class="viewer-top"><span class="post-meta">SYRGJYN / LIVE ARCHIVE</span><button type="button" class="viewer-button viewer-close" aria-label="Close full-size photo" autofocus>Close ×</button></div><div class="viewer-image-wrap"><img class="viewer-image" alt="" width="2000" height="1333"><p class="viewer-error" hidden>Photo could not load. <a href="/gallery/">Return to the gallery</a>.</p></div><div class="viewer-bottom"><button type="button" class="viewer-button viewer-previous" aria-label="Previous photo">← Previous</button><div class="viewer-copy" aria-live="polite"><p class="viewer-caption"></p><p class="viewer-credit" hidden></p><p class="viewer-count"></p></div><button type="button" class="viewer-button viewer-next" aria-label="Next photo">Next →</button></div></div></dialog>`;
}

module.exports = { galleryGrid, galleryViewer };
