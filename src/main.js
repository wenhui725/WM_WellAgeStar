import './style.css';

const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));

const sectionIds = navLinks
  .map((link) => link.getAttribute('href'))
  .filter((href) => href && href.startsWith('#'))
  .map((href) => href.replace('#', ''));

const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function setActiveNav(id) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;

    link.classList.toggle('border-ceremony-gold', isActive);
    link.classList.toggle('text-ceremony-deepgold', isActive);
    link.classList.toggle('bg-[#F9F6EF]', isActive);

    link.classList.toggle('border-transparent', !isActive);
    link.classList.toggle('text-black/65', !isActive);
    link.classList.toggle('bg-transparent', !isActive);

    if (isActive) {
      link.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  });
}

function updateActiveNavByScroll() {
  const headerOffset = window.innerWidth >= 1024 ? 90 : 120;
  const currentY = window.scrollY + headerOffset;

  let currentSectionId = sections[0]?.id;

  sections.forEach((section) => {
    if (currentY >= section.offsetTop) {
      currentSectionId = section.id;
    }
  });

  if (currentSectionId) {
    setActiveNav(currentSectionId);
  }
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const id = link.getAttribute('href')?.replace('#', '');

    if (id) {
      setActiveNav(id);
    }
  });
});

window.addEventListener('scroll', updateActiveNavByScroll);
window.addEventListener('resize', updateActiveNavByScroll);
window.addEventListener('load', updateActiveNavByScroll);

updateActiveNavByScroll();


const contestants = Array.from({ length: 57 }, (_, index) => {
      const number = index + 1;
      const group = number <= 19 ? 1 : number <= 38 ? 2 : 3;
      return {
        number: String(number).padStart(2, '0'),
        name: `參賽者 ${String(number).padStart(2, '0')}`,
        group,
        photo: '',
        tagline: '以自信姿態登上初選舞台，展現會員專屬風采。'
      };
    });

    const finalists = Array.from({ length: 12 }, (_, index) => ({
      rank: String(index + 1).padStart(2, '0'),
      name: `入圍者 ${String(index + 1).padStart(2, '0')}`,
      number: '待公布',
      photo: ''
    }));

    const schedule = [
      ['12:30-13:15', '開放進場'],
      ['13:15-13:20', '宣傳影片播放'],
      ['13:20-13:25', '主持人致詞'],
      ['13:25-13:27', '營運長致詞'],
      ['13:27-13:30', '17 聲援影片'],
      ['13:30-13:40', '第18屆參賽者登場'],
      ['13:40-14:05', '第一梯次分享'],
      ['14:10-14:35', '第二梯次分享'],
      ['14:40-15:05', '第三梯次分享'],
      ['15:10-15:25', '頒發參賽獎'],
      ['15:25-15:35', '人氣王揭曉'],
      ['15:40-15:50', '公布入圍者'],
      ['15:50-16:00', '活動結語']
    ];

    const groupMeta = {
      1: { title: '第一梯次參賽者', range: '01-19' },
      2: { title: '第二梯次參賽者', range: '20-38' },
      3: { title: '第三梯次參賽者', range: '39-57' }
    };

    const contestantGroupsEl = document.querySelector('#contestantGroups');
    const countEl = document.querySelector('#contestantCount');
    const searchEl = document.querySelector('#contestantSearch');
    const filterButtons = document.querySelectorAll('.filter-button');
    let activeGroup = 'all';

    function contestantCard(person) {
      const photoMarkup = person.photo
        ? `<img class="absolute inset-0 h-full w-full object-cover" src="${person.photo}" alt="${person.name} 參賽照片">`
        : '';

      return `
        <article class="overflow-hidden rounded-3xl border border-ceremony-deepgold/20 bg-white shadow-ceremony">
          <div class="portrait relative aspect-[4/5] overflow-hidden">
            ${photoMarkup}
            <div class="absolute left-4 top-4 z-10 rounded-full bg-black/70 px-3 py-1 text-sm font-black text-ceremony-gold ring-1 ring-ceremony-gold/35">No. ${person.number}</div>
            <div class="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/62 to-transparent p-4 pt-16">
              <p class="font-display text-2xl font-black text-white">${person.name}</p>
              <p class="mt-1 text-sm font-bold text-ceremony-rose">第 ${person.group} 梯次</p>
            </div>
          </div>
          <div class="p-4">
            <p class="min-h-12 text-sm leading-6 text-plum/62">${person.tagline}</p>
          </div>
        </article>
      `;
    }

    function renderContestants() {
      const query = searchEl.value.trim().toLowerCase();
      const filtered = contestants.filter((person) => {
        const haystack = `${person.number} ${person.name} 第${person.group}梯次 ${groupMeta[person.group].title}`.toLowerCase();
        const matchesGroup = activeGroup === 'all' || String(person.group) === activeGroup;
        return matchesGroup && (!query || haystack.includes(query));
      });

      contestantGroupsEl.innerHTML = [1, 2, 3].map((group) => {
        const members = filtered.filter((person) => person.group === group);
        if (!members.length) return '';
        return `
          <section class="scroll-mt-28" aria-label="${groupMeta[group].title}">
            <div class="mb-5 flex flex-col justify-between gap-3 border-b border-ceremony-deepgold/18 pb-4 sm:flex-row sm:items-end">
              <div>
                <p class="text-sm font-black tracking-[.22em] text-ceremony-deepgold">GROUP ${groupMeta[group].range}</p>
                <h3 class="mt-2 font-display text-3xl font-black text-plum">${groupMeta[group].title}</h3>
              </div>
              <p class="text-sm font-bold text-plum/48">${members.length} 位名單</p>
            </div>
            <div class="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              ${members.map(contestantCard).join('')}
            </div>
          </section>
        `;
      }).join('');

      countEl.textContent = `顯示 ${filtered.length} 位參賽者`;
    }

    function renderFinalists() {
      const finalistGrid = document.querySelector('#finalistGrid');
      finalistGrid.innerHTML = finalists.map((person) => {
        const photoMarkup = person.photo
          ? `<img class="absolute inset-0 h-full w-full object-cover" src="${person.photo}" alt="${person.name} 入圍照片">`
          : '';

        return `
          <article class="dark-card shine overflow-hidden rounded-3xl text-white shadow-glow">
            <div class="portrait relative aspect-[4/5]">
              ${photoMarkup}
              <div class="absolute left-4 top-4 z-10 rounded-full border border-ceremony-gold/45 bg-black/72 px-3 py-1 text-xs font-black tracking-[.18em] text-ceremony-gold">FINAL ${person.rank}</div>
            </div>
            <div class="border-t border-ceremony-gold/24 p-5">
              <p class="font-display text-2xl font-black text-white">${person.name}</p>
              <p class="mt-2 text-sm font-bold text-ceremony-rose">編號 ${person.number}</p>
            </div>
          </article>
        `;
      }).join('');
    }

    function renderSchedule() {
      const scheduleList = document.querySelector('#scheduleList');
      scheduleList.innerHTML = schedule.map(([time, title]) => `
        <li class="grid grid-cols-[112px_1fr] gap-4 rounded-2xl border border-ceremony-deepgold/14 bg-white/78 p-4 text-sm sm:grid-cols-[140px_1fr]">
          <time class="font-black tabular-nums text-ceremony-deepgold">${time}</time>
          <span class="font-bold text-plum/75">${title}</span>
        </li>
      `).join('');
    }

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeGroup = button.dataset.group;
        filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        renderContestants();
      });
    });

    searchEl.addEventListener('input', renderContestants);
    renderContestants();
    renderFinalists();
    renderSchedule();
