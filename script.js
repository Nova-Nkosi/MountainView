document.addEventListener('DOMContentLoaded', () => {

  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const overlay = document.getElementById('overlay');

  function openMenu() {
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      }
    });
  });

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('login-email')?.value.trim();
      const pass = document.getElementById('login-password')?.value.trim();
      const err = document.getElementById('loginError');
      if (!email || !pass) { if (err) err.classList.remove('hidden'); return; }
      localStorage.setItem('mv_user', email);
      window.location.href = 'dashboard.html';
    });
  }

  const userEmailEl = document.getElementById('userEmail');
  const logoutBtn = document.getElementById('logoutBtn');
  const savedUser = localStorage.getItem('mv_user');
  if (userEmailEl && savedUser) userEmailEl.textContent = savedUser;
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('mv_user');
      window.location.href = 'login.html';
    });
  }

  const contactForm = document.querySelector('form[action*="formspree"]');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
    });
  }

  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', () => {
      chatWindow.classList.toggle('hidden');
    });
  }
  function addChatMsg(text, who) {
    if (!chatMessages) return;
    const div = document.createElement('div');
    div.className = who === 'user'
      ? 'ml-auto bg-white text-black px-4 py-2 rounded-2xl max-w-[80%] text-sm'
      : 'bg-zinc-800 px-4 py-2 rounded-2xl max-w-[80%] text-sm';
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  function botReply(msg) {
    const m = msg.toLowerCase();
    if (m.includes('account') || m.includes('book') || m.includes('tax') || m.includes('vat') || m.includes('sars')) return 'For Accounting - monthly books, SARS/VAT/PAYE, and NGO fund accounting. Go to Contact and choose Accounting, we reply within 1 business day.';
    if (m.includes('website') || m.includes('tech') || m.includes('build') || m.includes('portal')) return 'For Technologies - corporate websites, portals, and systems integration. Go to Contact and choose Technologies.';
    if (m.includes('price') || m.includes('cost') || m.includes('quote')) return 'Pricing depends on scope. Send us your details on the Contact page and we will send a tailored quote within 1 business day.';
    if (m.includes('ngo') || m.includes('npo') || m.includes('donor')) return 'For NGOs we do fund accounting, donor reporting, and NPO compliance. See SMEs & NGOs page for details.';
    if (m.includes('hello') || m.includes('hi')) return 'Hello! Welcome to MountainView Group. Are you looking for Accounting or Technologies?';
    return 'Thanks for your message. For a full answer, please use the Contact page - we reply within 1 business day. Or tell me: Accounting or Technologies?';
  }
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      addChatMsg(text, 'user');
      chatInput.value = '';
      setTimeout(() => addChatMsg(botReply(text), 'bot'), 500);
    });
  }

  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, #overlay a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('text-white');
  });

}); 