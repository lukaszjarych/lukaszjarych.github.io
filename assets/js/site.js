document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");

  if (!lightbox || !lightboxImage || !lightboxCaption) {
    return;
  }

  document.querySelectorAll("[data-lightbox-src]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      lightboxImage.src = trigger.getAttribute("data-lightbox-src") || "";
      lightboxImage.alt = trigger.getAttribute("data-lightbox-alt") || "";
      lightboxCaption.textContent = trigger.getAttribute("data-lightbox-caption") || "";
      lightbox.showModal();
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.open) {
      lightbox.close();
    }
  });
});
