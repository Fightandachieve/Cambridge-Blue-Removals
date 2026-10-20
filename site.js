(() => {
  const c = window.SITE_CONFIG;
  if (!c) return;

  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
const navItems = [
  ['index.html', 'Home'],
  ['services.html', 'Services'],
  ['reviews.html', 'Reviews'],
  ['discounts.html', 'Discounts'],
  ['contact.html', 'Contact']
];

  const header = document.querySelector('[data-site-header]');
  if (header) {
    header.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="${c.business.name} home"><img src="logo.png" alt="${c.business.name} logo"></a>
          <button class="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">☰ Menu</button>
          <nav class="site-nav" aria-label="Main navigation">
            ${navItems.map(([href,label]) => `<a href="${href}" ${current===href?'aria-current="page"':''}>${label}</a>`).join('')}
            <a href="tracking.html">Track Your Move</a>
          </nav>
          <a class="btn btn-primary header-cta" href="${current === 'index.html' ? '#instant-quote' : 'quote.html'}">Get an Instant Quote <span aria-hidden="true">→</span></a>
        </div>
      </header>`;
    const toggle = header.querySelector('.menu-toggle');
    const nav = header.querySelector('.site-nav');
    toggle?.addEventListener('click', () => { const isOpen = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(isOpen)); });
  }

  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer"><div class="container">
        <div class="footer-grid">
          <div><h3>${c.business.name}</h3><p>Cambridge removals, packing, storage options and move tracking.</p><p><strong>Phone:</strong> <a href="tel:${c.business.phone}">${c.business.phoneDisplay}</a><br><strong>Email:</strong> <a href="mailto:${c.business.email}">${c.business.email}</a></p></div>
          <div><h3>Quick links</h3><p><a href="quote.html">Instant Quote</a><br><a href="tracking.html">Track Your Move</a><br><a href="services.html">Services</a><br><a href="reviews.html">Reviews</a></p></div>
          <div><h3>Information</h3><p><a href="moving-checklist.html">Moving Checklist</a><br><a href="faqs.html">FAQs</a><br><a href="terms.html">Terms & Conditions</a><br><a href="privacy.html">Privacy</a><br><a href="cookies.html">Cookies</a></p></div>
          <div><h3>Reach out</h3><p>${c.business.address}<br><br>Mon–Sat: ${c.business.openingHours.monSat}<br>Sun: ${c.business.openingHours.sun}</p></div>
        </div>
        <div class="footer-bottom">© ${new Date().getFullYear()} ${c.business.name}. Website content and prices are editable before launch.</div>
      </div></footer>`;
  }

  const setText = (sel, val) => document.querySelectorAll(sel).forEach(el => el.textContent = val);
  setText('[data-phone]', c.business.phoneDisplay);
  setText('[data-email]', c.business.email);
  setText('[data-address]', c.business.address);
  setText('[data-hours-monsat]', c.business.openingHours.monSat);
  setText('[data-hours-sun]', c.business.openingHours.sun);
  setText('[data-move-discount]', `Save up to £${c.discounts.moveDiscountMax} on your move`);
  document.querySelectorAll('[data-phone-link]').forEach(el => el.href = `tel:${c.business.phone}`);
  document.querySelectorAll('[data-email-link]').forEach(el => el.href = `mailto:${c.business.email}`);
  document.querySelectorAll('[data-deposit-policy]').forEach(el => el.textContent = c.booking.depositPolicy);
  document.querySelectorAll('[data-cancellation-policy]').forEach(el => el.textContent = c.booking.cancellationPolicy);
  document.querySelectorAll('[data-rescheduling-policy]').forEach(el => el.textContent = c.booking.reschedulingPolicy);

  document.querySelectorAll('.faq button').forEach(btn => btn.addEventListener('click', () => btn.closest('.faq')?.classList.toggle('open')));

  const wa = document.createElement('a');
  wa.className = 'whatsapp-float';
  wa.href = `https://wa.me/${c.business.whatsapp}`;
  wa.target = '_blank'; wa.rel='noopener'; wa.title='WhatsApp'; wa.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M9 8.5c-.3-.5-.6-.5-.9-.5-.4 0-.8.4-1 1-.3 1.4.7 3.3 2.3 4.9 1.6 1.6 3.5 2.6 4.9 2.3.6-.2 1-.6 1-1 0-.3 0-.6-.5-.9l-1.6-.7c-.3-.1-.5 0-.7.3l-.6.7c-.2.2-.5.2-.8 0a9 9 0 0 1-2.8-2.8c-.2-.3-.2-.6 0-.8l.7-.6c.3-.2.4-.4.3-.7z"/></svg>';
  document.body.appendChild(wa);

  const cookieKey = 'cbr_cookie_consent';

if (!localStorage.getItem(cookieKey)) {
  const cookie = document.createElement('div');
  cookie.className = 'cookie-banner show';

  cookie.innerHTML = `
    <p>
      <strong>We value your privacy.</strong>
      We use essential storage to make the website work. With your permission,
      we also use Google Analytics to understand how visitors use our website.
      <a href="cookies.html">Learn more</a>.
    </p>
    <div class="cookie-actions">
      <button class="btn btn-primary accept-analytics" type="button">Accept Analytics</button>
      <button class="btn btn-outline reject-analytics" type="button">Reject Analytics</button>
    </div>
  `;

 cookie.querySelector('.accept-analytics').addEventListener('click', () => {
  localStorage.setItem(cookieKey, 'accepted');

  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }

  cookie.remove();
});

 cookie.querySelector('.reject-analytics').addEventListener('click', () => {
  localStorage.setItem(cookieKey, 'rejected');

  if (typeof gtag === 'function') {
    gtag('consent', 'update', {
      'analytics_storage': 'denied'
    });
  }

  cookie.remove();
});

  document.body.appendChild(cookie);
}
})();
