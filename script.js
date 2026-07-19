(function() {
  "use strict";

  /* CLOCK */
  function updateClock() {
    var el = document.getElementById('clock');
    if (el) el.textContent = new Date().toLocaleTimeString('en-GB');
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* PROMPT */
  function P() {
    return '<span class="tl-p">'
      + '<span class="u">vaibhav</span>'
      + '<span class="s">@</span>'
      + '<span class="h">portfolio</span> '
      + '<span class="d">~</span> $&nbsp;'
      + '</span>';
  }

  /* NEOFETCH ASCII */
  var ASCII = [
    '\u2588\u2588\u2557   \u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557',
    '\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557',
    '\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D',
    '\u255A\u2588\u2588\u2557 \u2588\u2588\u2554\u255D\u2588\u2588\u2554\u2550\u2550\u2550\u255D',
    ' \u255A\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551',
    '  \u255A\u2550\u2550\u2550\u255D  \u255A\u2550\u255D'
  ];

  var NEO = [
    { k: '', v: '<span class="cm" style="font-weight:700">vaibhav</span><span class="cd">@</span><span class="cm" style="font-weight:700">portfolio</span>' },
    { k: '', v: '<span class="cd">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>' },
    { k: 'OS', v: 'Fedora Linux' },
    { k: 'Shell', v: 'zsh' },
    { k: 'Uptime', v: '<span id="uptime">calculating...</span>' },
    { k: 'Focus', v: 'Backend Dev \u2192 DevOps' },
    { k: 'Status', v: '<span class="cg">open to opportunities</span>' },
    { k: 'Theme', v: 'Catppuccin Mocha 🐱' },
    { k: '', v: '<span style="color:var(--red)">\u2b24</span> <span style="color:var(--peach)">\u2b24</span> <span style="color:var(--yellow)">\u2b24</span> <span style="color:var(--green)">\u2b24</span> <span style="color:var(--teal)">\u2b24</span> <span style="color:var(--blue)">\u2b24</span> <span style="color:var(--mauve)">\u2b24</span> <span style="color:var(--pink)">\u2b24</span>' }
  ];

  function buildNeofetch() {
    var asciiHtml = '';
    for (var i = 0; i < Math.max(ASCII.length, NEO.length); i++) {
      asciiHtml += (ASCII[i] || '') + '\n';
    }
    var infoHtml = '';
    for (var j = 0; j < NEO.length; j++) {
      var r = NEO[j];
      if (!r.k) {
        infoHtml += '<div class="ni-row"><span class="ni-v">' + r.v + '</span></div>';
      } else {
        infoHtml += '<div class="ni-row">'
          + '<span class="ni-k">' + r.k + '</span>'
          + '<span class="ni-sep">:</span>&nbsp;'
          + '<span class="ni-v">' + r.v + '</span>'
          + '</div>';
      }
    }
    return '<div class="neo-grid">'
      + '<div class="neo-ascii-sm">' + asciiHtml + '</div>'
      + '<div class="neo-info-sm">' + infoHtml + '</div>'
      + '</div>';
  }

  /* TYPEWRITER INTRO */
  var twBody = document.getElementById('tw-body');
  var INTRO = [
    { type: 'cmd', text: 'vaibhav --info' },
    { type: 'neo' }
  ];
  var introIdx = 0;

  function runIntro() {
    if (introIdx >= INTRO.length) return;
    var item = INTRO[introIdx++];
    if (item.type === 'neo') {
      var el = document.createElement('div');
      el.className = 'tl-out';
      el.innerHTML = buildNeofetch();
      twBody.appendChild(el);
      return;
    }
    if (item.type === 'cmd') {
      var row = document.createElement('div');
      row.className = 'tl';
      row.innerHTML = P();
      var span = document.createElement('span');
      span.className = 'tl-cmd';
      row.appendChild(span);
      twBody.appendChild(row);
      typeChar(item.text, span, 0);
    }
  }

  function typeChar(text, el, i) {
    if (i < text.length) {
      el.textContent += text[i];
      setTimeout(function() { typeChar(text, el, i + 1); }, 45);
    } else {
      setTimeout(runIntro, 200);
    }
  }

  setTimeout(runIntro, 400);

  /* PROJECT DATA */
  var PROJECTS = {
    'dotfiles': {
      name: 'dotfiles',
      desc: 'Personal Fedora setup &mdash; bash scripts, Lua configs, and tooling to keep my environment reproducible across machines.',
      tags: ['Bash', 'Lua', 'Fedora', 'Shell', 'Linux']
    },
    'lazylinux': {
      name: 'LazyLinux',
      desc: 'Universal CLI unifying DNF, APT, Pacman &amp; Flatpak across all Linux distros.',
      tags: ['Go', 'DNF', 'APT', 'Pacman', 'Flatpak']
    },
    'steamally': {
      name: 'SteamAlly',
      desc: 'GTK4 app for managing non-Steam games on Linux. Setup time: 10min \u2192 &lt;1min.',
      tags: ['Python', 'GTK4', 'Wine', 'Bash']
    },
    'meshtalk': {
      name: 'MeshTalk',
      desc: 'Offline P2P chat over BLE mesh on ESP32. No internet required.',
      tags: ['C', 'ESP-IDF', 'BLE Mesh', 'FreeRTOS']
    }
  };

  function projectCard(p) {
    var tags = p.tags.map(function(t) {
      return '<span style="color:var(--peach)">[' + t + ']</span>';
    }).join(' ');
    return '<span class="cm" style="font-weight:700">' + p.name + '</span><br>'
      + '<span class="cd">' + p.desc + '</span><br>'
      + tags;
  }

  /* COMMANDS */
  var CMDS = {
    'help': function() {
      return '<pre style="font-family:inherit;font-size:inherit;line-height:2">'
        + '<span class="cm">available commands:</span>\n\n'
        + '<span class="cb">vaibhav --info</span>             show system info\n'
        + '<span class="cb">sudo hire-me</span>               requires root privileges (recruiter only)\n'
        + '<span class="cb">ls projects</span>                list all projects\n'
        + '<span class="cb">cat &lt;project name&gt;</span>         project details\n'
        + '<span class="cb">skills</span>                     show tech stack\n'
        + '<span class="cb">github</span>                     open GitHub profile\n'
        + '<span class="cb">resume</span>                     open resume\n'
        + '<span class="cb">contact</span>                    show contact info\n'
        + '<span class="cb">clear</span>                      clear terminal\n'
        + '<span class="cb">help</span>                       show this help'
        + '</pre>';
    },
    'vaibhav --info': function() { return buildNeofetch(); },
    'ls projects': function() {
      return '<span class="cy">dotfiles</span><br>'
        + '<span class="cp">lazylinux</span><br>'
        + '<span class="cb">steamally</span><br>'
        + '<span class="cg">meshtalk</span><br>'
        + '<span class="cd">use cat &lt;name&gt; to read more</span>';
    },
    'cat dotfiles': function() { return projectCard(PROJECTS['dotfiles']); },
    'cat lazylinux': function() { return projectCard(PROJECTS['lazylinux']); },
    'cat steamally': function() { return projectCard(PROJECTS['steamally']); },
    'cat meshtalk': function() { return projectCard(PROJECTS['meshtalk']); },
    'skills': function() {
      return '<span class="cm">Languages :</span> Python \u00b7 Go \u00b7 Bash \u00b7 JavaScript \u00b7 C/C++ \u00b7 Java<br>'
        + '<span class="cm">DevOps    :</span> Docker \u00b7 Kubernetes \u00b7 GitHub Actions \u00b7 Git<br>'
        + '<span class="cm">Backend   :</span> FastAPI \u00b7 Node.js \u00b7 Express \u00b7 REST APIs<br>'
        + '<span class="cm">Systems   :</span> Linux \u00b7 ESP-IDF \u00b7 FreeRTOS \u00b7 BLE Mesh';
    },
    'github': function() {
      setTimeout(() => {
        window.open('https://github.com/vaibhav-prk', '_blank');
      }, 1000);
      return '<span class="cg">opening github.com/vaibhav-prk ...</span>';
    },
    'resume': function() {
      setTimeout(() => {
        window.open('https://drive.google.com/file/d/1FKeQXJeCJCmDj59rgeGs92UIW6t6mgjU/view?usp=drive_link', '_blank');
      }, 1000);
      return '<span class="cg">opening resume.pdf ...</span>';
    },
    'contact': function() {
      return '<span class="cm">email   </span>: vaibhav.prk05@gmail.com<br>'
        + '<span class="cm">github  </span>: github.com/vaibhav-prk<br>'
        + '<span class="cm">linkedin</span>: linkedin.com/in/vaibhav-prk/<br>'
    },
    'sudo hire-me': function() {
      const steps = [
        'Authenticating recruiter...',
        'Checking qualifications...',
        'Verifying linux knowledge...',
        'Compiling candidate profile...',
        'Access granted. Opening resume...'
      ];
      steps.forEach((step, i) => {
        setTimeout(() => {
          const el = document.createElement('div');
          el.className = 'tl-out';
          el.innerHTML = `<span class="c-dim">[${i + 1}/5]</span> <span class="c-green">${step}</span>`;
          twBody.appendChild(el);
          twBody.scrollTop = twBody.scrollHeight;
        }, i * 600);
      });
      setTimeout(() => {
        window.open('https://drive.google.com/file/d/1FKeQXJeCJCmDj59rgeGs92UIW6t6mgjU/view?usp=drive_link', '_blank'); // 🔗 your resume link
      }, 3500);
      return '[sudo] password for recruiter: <span class="c-dim">••••••••</span>';
    },
  };

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* COMMAND HISTORY */
  var history = [];
  var histIdx = -1;

  var input = document.getElementById('term-input');
  input.addEventListener('keydown', function(e) {

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      histIdx = Math.min(histIdx + 1, history.length - 1);
      this.value = history[histIdx];
      var l = this.value.length;
      this.setSelectionRange(l, l);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx <= 0) { histIdx = -1; this.value = ''; return; }
      histIdx--;
      this.value = history[histIdx];
      var l2 = this.value.length;
      this.setSelectionRange(l2, l2);
      return;
    }

    if (e.key !== 'Enter') return;

    var raw = this.value.trim();
    this.value = '';
    if (!raw) return;

    if (!history.length || history[0] !== raw) history.unshift(raw);
    histIdx = -1;

    /* echo */
    var echo = document.createElement('div');
    echo.className = 'tl';
    echo.innerHTML = P() + '<span class="tl-cmd">' + esc(raw) + '</span>';
    twBody.appendChild(echo);

    if (raw.toLowerCase() === 'clear') {
      twBody.innerHTML = '';
      return;
    }

    var handler = CMDS[raw.toLowerCase()];
    var out = document.createElement('div');
    out.className = 'tl-out';
    out.innerHTML = handler
      ? handler()
      : '<span class="cd">zsh: command not found: </span><span class="cr">'
      + esc(raw) + '</span>  <span class="cd">(type <span class="cb">help</span>)</span>';

    twBody.appendChild(out);
    twBody.scrollTop = twBody.scrollHeight;
  });

  /* ACTIVE NAV TAB */
  var tabMap = {
    'hero': 'hero',
    'about-section': 'about-section',
    'skills-section': 'skills-section',
    'projects-section': 'projects-section',
    'certs-section': 'certs-section',
    'contact-section': 'contact-section'
  };
  var navTabs = document.querySelectorAll('.tb-tab');

  window.addEventListener('scroll', function() {
    var cur = 'hero';
    document.querySelectorAll('section, #hero').forEach(function(s) {
      if (window.scrollY >= s.offsetTop - 90) cur = s.id;
    });
    navTabs.forEach(function(t) {
      var key = t.getAttribute('href').replace('#', '');
      t.classList.toggle('active', tabMap[key] === cur);
    });
  }, { passive: true });

  const start = Date.now();

  setInterval(() => {
    const el = document.getElementById('uptime');
    if (!el) return;
    const s = Math.floor((Date.now() - start) / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    el.textContent = h > 0 ? `${h}h ${m % 60}m ${s % 60}s` : m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
  }, 1000);
  var aboutAscii = document.querySelector('.ascii-big');
  if (aboutAscii) aboutAscii.textContent = ASCII.join('\n');

  /* SCROLL REVEAL */
  var revealEls = document.querySelectorAll('.reveal');
  var revealObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(function(el) { revealObs.observe(el); });
})();
