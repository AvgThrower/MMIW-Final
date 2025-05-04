function resizeIframe(iframe) {
  try {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    if (doc && doc.body) {
      iframe.style.height = doc.body.scrollHeight + 'px';
    }
  } catch (e) {
    console.error('Error resizing iframe:', e);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const iframes = document.querySelectorAll('iframe');

  iframes.forEach(iframe => {
    iframe.addEventListener('load', () => {
      resizeIframe(iframe);

      // Optional: Observe changes in iframe to resize again if needed
      const observer = new MutationObserver(() => resizeIframe(iframe));
      try {
        observer.observe(iframe.contentDocument.body, { childList: true, subtree: true });
      } catch (e) {
        console.warn('Observer could not be attached to iframe:', e);
      }
    });
  });
});
