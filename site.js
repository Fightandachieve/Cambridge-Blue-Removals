(() => {
  const c = window.SITE_CONFIG;
  if (!c) return;

  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const navItems = [
    ['index.html','Home'],['services.html','Services'],['about.html','About'],['faqs.html','FAQs'],
    ['reviews.html','Reviews'],['discounts.html','Discounts'],['blog.html','Blog'],['contact.html','Contact']
  ];

  const header = document.querySelector('[data-site-header]');
  if (header) {
    header.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="${c.business.name} home"><img src="logo.png" alt="${c.business.name} logo"></a>
          <button class="menu-toggle" type="button" aria-label="Open menu">Menu</button>
          <nav class="site-nav" aria-label="Main navigation">
            ${navItems.map(([href,label]) => `<a href="${href}" ${current===href?'aria-current="page"':''}>${label}</a>`).join('')}
            <a href="tracking.html">Track Your Move</a>
          </nav>
          <a class="btn btn-primary header-cta" href="quote.html">Instant Quote</a>
        </div>
      </header>`;
    const toggle = header.querySelector('.menu-toggle');
    const nav = header.querySelector('.site-nav');
    toggle?.addEventListener('click', () => nav.classList.toggle('open'));
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
  wa.target = '_blank'; wa.rel='noopener'; wa.title='WhatsApp'; wa.textContent='WA';
  document.body.appendChild(wa);

  const cookieKey='cbr_cookie_notice';
  if (!localStorage.getItem(cookieKey)) {
    const cookie = document.createElement('div');
    cookie.className='cookie-banner show';
    cookie.innerHTML=`<p><strong>Cookies:</strong> this starter site uses essential browser storage for basic preferences. Review the final cookie setup before launch. <a href="cookies.html">Learn more</a>.</p><button class="btn btn-primary" type="button">OK</button>`;
    cookie.querySelector('button').addEventListener('click',()=>{localStorage.setItem(cookieKey,'accepted');cookie.remove();});
    document.body.appendChild(cookie);
  }
})();
