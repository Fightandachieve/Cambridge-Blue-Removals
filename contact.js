(() => {
  const c = window.SITE_CONFIG;
  const map = document.getElementById('contactMap');
  if (map && c.contact.googleMapsEmbedUrl) {
    map.innerHTML = `<iframe src="${c.contact.googleMapsEmbedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Cambridge Blue Removals map"></iframe>`;
  }
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('contactMessage');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Website enquiry — Cambridge Blue Removals');
    const body = encodeURIComponent([...data.entries()].map(([k,v]) => `${k}: ${v}`).join('\n'));
    window.location.href = `mailto:${c.business.email}?subject=${subject}&body=${body}`;
    if (msg) msg.textContent='Your email app should open with the enquiry details. A form backend can be connected before launch.';
  });
})();
