import './style.css';

// ==============================
// Header navigation / Anchor scroll
// ==============================

const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
const internalLinks = Array.from(document.querySelectorAll('a[href^="#"]'));

const sectionIds = navLinks
  .map((link) => link.getAttribute('href'))
  .filter((href) => href && href.startsWith('#'))
  .map((href) => href.slice(1));

const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function getHeaderHeight() {
  const header = document.querySelector('#siteHeader');
  return header ? header.offsetHeight : 0;
}

function setActiveNav(id, shouldCenterNav = false) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;

    link.classList.toggle('border-ceremony-gold', isActive);
    link.classList.toggle('text-ceremony-deepgold', isActive);
    link.classList.toggle('bg-[#F9F6EF]', isActive);

    link.classList.toggle('border-transparent', !isActive);
    link.classList.toggle('text-black/65', !isActive);
    link.classList.toggle('bg-transparent', !isActive);

    // 手機版：只有「點擊」時才把橫向 Nav 滑到目前項目
    // 捲動畫面時不要一直置中，避免 Nav 抖動
    if (isActive && shouldCenterNav && window.innerWidth < 1024) {
      requestAnimationFrame(() => {
        link.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      });
    }
  });
}

function scrollToSection(id, shouldCenterNav = true) {
  const target = document.getElementById(id);
  if (!target) return;

  const headerHeight = getHeaderHeight();
  const targetTop = Math.max(target.offsetTop - headerHeight, 0);

  setActiveNav(id, shouldCenterNav);

  window.scrollTo({
    top: targetTop,
    behavior: 'smooth',
  });
}

function updateActiveNavByScroll() {
  const headerHeight = getHeaderHeight();
  const currentY = window.scrollY + headerHeight + 2;

  let currentSectionId = sections[0]?.id;

  sections.forEach((section) => {
    if (currentY >= section.offsetTop) {
      currentSectionId = section.id;
    }
  });

  if (currentSectionId) {
    setActiveNav(currentSectionId, false);
  }
}

// 讓 Nav、Logo、Hero CTA、Footer 回到頁首都走同一套錨點邏輯
internalLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');

    if (!href || href === '#') return;

    const id = href.slice(1);
    const target = document.getElementById(id);

    if (!target) return;

    event.preventDefault();
    scrollToSection(id, true);
  });
});

window.addEventListener('scroll', updateActiveNavByScroll);
window.addEventListener('resize', updateActiveNavByScroll);
window.addEventListener('load', updateActiveNavByScroll);

updateActiveNavByScroll();


const contestants = [
  {
    number: '01',
    team: '合育',
    name: '胡岑莘',
    group: 1,
    photo: '/imags/57位參賽者/1合育-胡岑莘.webp',
    tagline: '從健康改善開始，重新找回生活的圓滿。'
  },
  {
    number: '02',
    team: '璽崴',
    name: '張子玲',
    group: 1,
    photo: '/imags/57位參賽者/2璽崴-張子玲.webp',
    tagline: '在台灣第三個十年，創造新目標與價值。'
  },
  {
    number: '03',
    team: '康宸',
    name: '郭莉娟',
    group: 1,
    photo: '/imags/57位參賽者/3康宸-郭莉娟.webp',
    tagline: '帶著信念與準備登場，讓努力被更多人看見。'
  },
  {
    number: '04',
    team: '仁馨',
    name: '張淑滿',
    group: 1,
    photo: '/imags/57位參賽者/4仁馨-張淑滿.webp',
    tagline: '一次體驗，開啟重新照顧自己的契機。'
  },
  {
    number: '05',
    team: '華宸',
    name: '陳潘碧珠',
    group: 1,
    photo: '/imags/57位參賽者/5華宸-陳潘碧珠.webp',
    tagline: '給自己一次機會，找回健康與快樂。'
  },
  {
    number: '06',
    team: '璽崴',
    name: '謝佩蓁',
    group: 1,
    photo: '/imags/57位參賽者/6璽崴-謝佩蓁.webp',
    tagline: '看見改變後相信，也把健康分享出去。'
  },
  {
    number: '07',
    team: '榮心',
    name: '李金澤',
    group: 1,
    photo: '/imags/57位參賽者/7榮心-李金澤.webp',
    tagline: '從不健康到能運動，感謝改變的力量。'
  },
  {
    number: '08',
    team: '環義',
    name: '林佳澐',
    group: 1,
    photo: '/imags/57位參賽者/8環義-林佳澐.webp',
    tagline: '走上舞台，是相信自己、突破自己的開始。'
  },
  {
    number: '09',
    team: '璽崴',
    name: '黃碧月',
    group: 1,
    photo: '/imags/57位參賽者/9璽崴-黃碧月.webp',
    tagline: '因見證而感動，踏上改變自己的旅程。'
  },
  {
    number: '10',
    team: '榮耀',
    name: '張美惠',
    group: 1,
    photo: '/imags/57位參賽者/10榮耀-張美惠.webp',
    tagline: '從疲憊失眠中恢復，重新拿回健康選擇權。'
  },
  {
    number: '11',
    team: '日耀',
    name: '阮詩翃',
    group: 1,
    photo: '/imags/57位參賽者/11日耀-阮詩翃.webp',
    tagline: '找回健康與快樂，也把好產品分享給家人。'
  },
  {
    number: '12',
    team: '華展',
    name: '吳哲村',
    group: 1,
    photo: '/imags/57位參賽者/12華展-吳哲村.webp',
    tagline: '從半信半疑到有感，精神體力都更好了。'
  },
  {
    number: '13',
    team: '禾芯',
    name: '葉招治',
    group: 1,
    photo: '/imags/57位參賽者/13禾芯-葉招治.webp',
    tagline: '身體穩定後，更想分享健康與富足人生。'
  },
  {
    number: '14',
    team: '華展',
    name: '劉碧禎',
    group: 1,
    photo: '/imags/57位參賽者/14華展-劉碧禎.webp',
    tagline: '長期不適逐漸改善，重新感受生活力量。'
  },
  {
    number: '15',
    team: '康宸',
    name: '陳筱鈴',
    group: 1,
    photo: '/imags/57位參賽者/15康宸-陳筱鈴.webp',
    tagline: '調整身體狀態，找回健康與自信的自己。'
  },
  {
    number: '16',
    team: '聖寶',
    name: '詹詠茹',
    group: 1,
    photo: '/imags/57位參賽者/16聖寶-詹詠茹.webp',
    tagline: '告別急診與氣喘困擾，找回生活品質。'
  },
  {
    number: '17',
    team: '萬益',
    name: '賈淑婉',
    group: 1,
    photo: '/imags/57位參賽者/17萬益-賈淑婉.webp',
    tagline: '美業人生下半場，在威力馬重新發光。'
  },
  {
    number: '18',
    team: '聖寶',
    name: '李宜蓁',
    group: 1,
    photo: '/imags/57位參賽者/18聖寶-李宜蓁.webp',
    tagline: '從疲累神經痛中恢復，找回年輕與美麗。'
  },
  {
    number: '19',
    team: '飛驊',
    name: '陳聰碧',
    group: 1,
    photo: '/imags/57位參賽者/19飛驊-陳聰碧.webp',
    tagline: '照顧好自己，才能成為家人最好的後盾。'
  },

  {
    number: '20',
    team: '康宸',
    name: '林千栩',
    group: 2,
    photo: '/imags/57位參賽者/20康宸-林千栩.webp',
    tagline: '找回健康與美麗，也願把福氣分享出去。'
  },
  {
    number: '21',
    team: '璽崴',
    name: '高昀秀',
    group: 2,
    photo: '/imags/57位參賽者/21璽崴-高昀秀.webp',
    tagline: '長年過敏改善後，精神體態都更有光。'
  },
  {
    number: '22',
    team: '康宸',
    name: '王美秀',
    group: 2,
    photo: '/imags/57位參賽者/22康宸-王美秀.webp',
    tagline: '重新投資自己，找回健康與家人的機會。'
  },
  {
    number: '23',
    team: '仁馨',
    name: '施燕珠',
    group: 2,
    photo: '/imags/57位參賽者/23仁馨-施燕珠.webp',
    tagline: '退休轉折中，看見新的希望與事業窗口。'
  },
  {
    number: '24',
    team: '華宸',
    name: '潘煥雯',
    group: 2,
    photo: '/imags/57位參賽者/24華宸-潘煥雯.webp',
    tagline: '從黑白人生翻轉，走出去都更有風。'
  },
  {
    number: '25',
    team: '璽崴',
    name: '黃孟蓁',
    group: 2,
    photo: '/imags/57位參賽者/25璽崴-黃孟蓁.webp',
    tagline: '勇敢走過生命挑戰，活出精彩與充實。'
  },
  {
    number: '26',
    team: '榮心',
    name: '楊怡婷',
    group: 2,
    photo: '/imags/57位參賽者/26榮心-楊怡婷.webp',
    tagline: '身體改善後，更想把健康帶給親朋好友。'
  },
  {
    number: '27',
    team: '璽崴',
    name: '楊雅玲',
    group: 2,
    photo: '/imags/57位參賽者/27璽崴-楊雅玲.webp',
    tagline: '體力與自信變好，是在威力馬最大的收穫。'
  },
  {
    number: '28',
    team: '榮耀',
    name: '連英琇',
    group: 2,
    photo: '/imags/57位參賽者/28榮耀-連英琇.webp',
    tagline: '健康不再成為負擔，能快樂享受生活。'
  },
  {
    number: '29',
    team: '德億',
    name: '張秀鳳',
    group: 2,
    photo: '/imags/57位參賽者/29德億-張秀鳳.webp',
    tagline: '膝蓋不再疼痛後，更想分享健康給身邊人。'
  },
  {
    number: '30',
    team: '日耀',
    name: '陳淑芳',
    group: 2,
    photo: '/imags/57位參賽者/30日耀-陳淑芳.webp',
    tagline: '用準備成就自信，讓自己也能發光。'
  },
  {
    number: '31',
    team: '華展',
    name: '胡蓉',
    group: 2,
    photo: '/imags/57位參賽者/31華展-胡蓉.webp',
    tagline: '代謝變好、體態變輕盈，也更有自信。'
  },
  {
    number: '32',
    team: '玫景',
    name: '應海珠',
    group: 2,
    photo: '/imags/57位參賽者/32玫景-應海珠.webp',
    tagline: '從虛弱低谷中，找回健康與生命光芒。'
  },
  {
    number: '33',
    team: '冠穎',
    name: '趙彩英',
    group: 2,
    photo: '/imags/57位參賽者/33冠穎-趙彩英.webp',
    tagline: '帶著準備好的心，勇敢站上初選舞台。'
  },
  {
    number: '34',
    team: '萬益',
    name: '周雅文',
    group: 2,
    photo: '/imags/57位參賽者/34萬益-周雅文.webp',
    tagline: '從照顧他人到照顧自己，迎接人生下半場。'
  },
  {
    number: '35',
    team: '玫景',
    name: '張智慧',
    group: 2,
    photo: '/imags/57位參賽者/35玫景-張智慧.webp',
    tagline: '雙腳變輕盈後，重新找回健康與自信。'
  },
  {
    number: '36',
    team: '萬益',
    name: '李中珩',
    group: 2,
    photo: '/imags/57位參賽者/36萬益-李中珩.webp',
    tagline: '用自己的故事，感謝產品帶來的支持。'
  },
  {
    number: '37',
    team: '合育',
    name: '蕭淑華',
    group: 2,
    photo: '/imags/57位參賽者/37合育-蕭淑華.webp',
    tagline: '從喘與不便中改善，重新走得更穩更輕鬆。'
  },
  {
    number: '38',
    team: '飛驊',
    name: '陳惠美',
    group: 2,
    photo: '/imags/57位參賽者/38飛驊-陳惠美.webp',
    tagline: '身體酸痛逐漸改善，精神體力也越來越好。'
  },

  {
    number: '39',
    team: '康宸',
    name: '邱聖淵',
    group: 3,
    photo: '/imags/57位參賽者/39康宸-邱聖淵.webp',
    tagline: '健康穩定後，生活品質更有活力與年輕感。'
  },
  {
    number: '40',
    team: '仁馨',
    name: '林愛呈',
    group: 3,
    photo: '/imags/57位參賽者/40仁馨-林愛呈.webp',
    tagline: '從壓力與不適中，找回彩色人生與自信。'
  },
  {
    number: '41',
    team: '璽崴',
    name: '蘇榮華',
    group: 3,
    photo: '/imags/57位參賽者/41璽崴-蘇榮華.webp',
    tagline: '從大肚男到年輕有活力，迎接退休新生活。'
  },
  {
    number: '42',
    team: '康宸',
    name: '陳諭葳',
    group: 3,
    photo: '/imags/57位參賽者/42康宸-陳諭葳.webp',
    tagline: '簡單一包，找回健康、漂亮與人生色彩。'
  },
  {
    number: '43',
    team: '環義',
    name: '李瑞香',
    group: 3,
    photo: '/imags/57位參賽者/43環義-李瑞香.webp',
    tagline: '精神變好、變漂亮，也想分享給親朋好友。'
  },
  {
    number: '44',
    team: '華宸',
    name: '朱貴蘭',
    group: 3,
    photo: '/imags/57位參賽者/44華宸-朱貴蘭.webp',
    tagline: '被真實見證打動，決定給自己一次機會。'
  },
  {
    number: '45',
    team: '璽崴',
    name: '吳昭明',
    group: 3,
    photo: '/imags/57位參賽者/45璽崴-吳昭明.webp',
    tagline: '看見家人的改變，也讓自己重新嘗試。'
  },
  {
    number: '46',
    team: '榮心',
    name: '鍾黃德娣',
    group: 3,
    photo: '/imags/57位參賽者/46榮心-鍾黃德娣.webp',
    tagline: '從頭到腳逐漸改善，退休生活更有自信。'
  },
  {
    number: '47',
    team: '王鎂',
    name: '楊阿照',
    group: 3,
    photo: '/imags/57位參賽者/47王鎂-楊阿照.webp',
    tagline: '睡得飽、精神好，皮膚也重新發亮。'
  },
  {
    number: '48',
    team: '日耀',
    name: '林茂麟',
    group: 3,
    photo: '/imags/57位參賽者/48日耀-林茂麟.webp',
    tagline: '精神飽滿、身體改善，還看見新驚喜。'
  },
  {
    number: '49',
    team: '華展',
    name: '盧秀英',
    group: 3,
    photo: '/imags/57位參賽者/49華展-盧秀英.webp',
    tagline: '從長期用藥到能安睡，找回漂亮與自信。'
  },
  {
    number: '50',
    team: '日耀',
    name: '黃秋月',
    group: 3,
    photo: '/imags/57位參賽者/50日耀-黃秋月.webp',
    tagline: '生命鬥士的日常，因三加一更有力量。'
  },
  {
    number: '51',
    team: '華展',
    name: '黃紹瑞',
    group: 3,
    photo: '/imags/57位參賽者/51華展-黃紹瑞.webp',
    tagline: '找回手腳力量，也找回生命的活力。'
  },
  {
    number: '52',
    team: '玫景',
    name: '游秀敏',
    group: 3,
    photo: '/imags/57位參賽者/52玫景-游秀敏.webp',
    tagline: '腰痛與睡眠改善後，愛漂亮的自己回來了。'
  },
  {
    number: '53',
    team: '盛麗',
    name: '楊玉華',
    group: 3,
    photo: '/imags/57位參賽者/53盛麗-楊玉華.webp',
    tagline: '從過勞警訊中恢復，延續健康與愛的循環。'
  },
  {
    number: '54',
    team: '萬益',
    name: '賈薇馨',
    group: 3,
    photo: '/imags/57位參賽者/54萬益-賈薇馨.webp',
    tagline: '找回腰身與年輕自我，遠離用藥生活。'
  },
  {
    number: '55',
    team: '聚芯',
    name: '賴慶宗',
    group: 3,
    photo: '/imags/57位參賽者/55聚芯-賴慶宗.webp',
    tagline: '從多年疼痛中恢復，更想幫助更多人健康。'
  },
  {
    number: '56',
    team: '萬益',
    name: '徐鏤瑾',
    group: 3,
    photo: '/imags/57位參賽者/56萬益-徐鏤瑾.webp',
    tagline: '陪伴先生改善生活品質，每天都有新驚喜。'
  },
  {
    number: '57',
    team: '鳳元',
    name: '王羿淇',
    group: 3,
    photo: '/imags/57位參賽者/57鳳元-王羿淇.webp',
    tagline: '抱著嘗試心態開始，卻收穫健康與美麗。'
  }
];

const finalistNumbers = ['11', '12', '13', '19', '25', '32', '39', '40', '41', '42', '53', '57'];

const finalistPhotos = {
  '11': '/imags/入圍者/阮詩翃.webp',
  '12': '/imags/入圍者/吳哲村.webp',
  '13': '/imags/入圍者/葉招治.webp',
  '19': '/imags/入圍者/陳聰碧.webp',
  '25': '/imags/入圍者/黃孟蓁.webp',
  '32': '/imags/入圍者/應海珠.webp',
  '39': '/imags/入圍者/邱聖淵.webp',
  '40': '/imags/入圍者/林愛呈.webp',
  '41': '/imags/入圍者/蘇榮華.webp',
  '42': '/imags/入圍者/陳諭葳.webp',
  '53': '/imags/入圍者/楊玉華.webp',
  '57': '/imags/入圍者/王羿淇.webp'
};
const finalistFocus = {
  '11': { x: '8%', y: '0%', zoom: '1.12' },
  '12': { x: '0%', y: '0%', zoom: '1.04' },
  '13': { x: '0%', y: '0%', zoom: '1.04' },
  '19': { x: '0%', y: '2%', zoom: '1.04' },

  '25': { x: '0%', y: '12%', zoom: '1.18' },
  '32': { x: '8%', y: '-7%', zoom: '1.16' },
  '39': { x: '0%', y: '10%', zoom: '1.14' },
  '40': { x: '0%', y: '12%', zoom: '1.16' },

  '41': { x: '0%', y: '2%', zoom: '1.02' },
  '42': { x: '0%', y: '0%', zoom: '1.04' },
  '53': { x: '0%', y: '0%', zoom: '1.04' },
  '57': { x: '0%', y: '-9%', zoom: '1.12' }
};
const finalists = finalistNumbers
  .map((number, index) => {
    const contestant = contestants.find((person) => person.number === number);
    const focus = finalistFocus[number] || { x: '0%', y: '0%', zoom: '1' };

    if (!contestant) return null;

    return {
      ...contestant,
      rank: String(index + 1).padStart(2, '0'),
      photo: finalistPhotos[number] || contestant.photo,
      focusX: focus.x,
      focusY: focus.y,
      zoom: focus.zoom
    };
  })
  .filter(Boolean);

const schedule = [
  {
    time: '12:30 – 13:15',
    title: '開放進場'
  },
  {
    time: '13:15 – 13:20',
    title: '宣傳影片播放'
  },
  {
    time: '13:20 – 13:25',
    title: '主持人致詞'
  },
  {
    time: '13:25 – 13:27',
    title: '營運長致詞'
  },
  {
    time: '13:27 – 13:30',
    title: '17 聲援影片'
  },
  {
    time: '13:30 – 13:40',
    title: '第18屆參賽者登場'
  },
  {
    time: '13:40 – 14:05',
    title: '第一梯次分享'
  },
  {
    time: '14:05 – 14:10',
    title: '第一階段摸彩'
  },
  {
    time: '14:10 – 14:35',
    title: '第二梯次分享'
  },
  {
    time: '14:35 – 14:40',
    title: '第二階段摸彩'
  },
  {
    time: '14:40 – 15:05',
    title: '第三梯次分享'
  },
  {
    time: '15:05 – 15:10',
    title: '第三階段摸彩'
  },
  {
    time: '15:10 – 15:25',
    title: '頒發參賽獎'
  },
  {
    time: '15:25 – 15:35',
    title: '人氣王揭曉與摸彩'
  },
  {
    time: '15:35 – 15:40',
    title: '第四階段摸彩'
  },
  {
    time: '15:40 – 15:50',
    title: '公布入圍者'
  },
  {
    time: '15:50 – 16:00',
    title: '活動結語'
  }
];

const groupMeta = {
  1: { title: '第一梯次分享', range: '01-19' },
  2: { title: '第二梯次分享', range: '20-38' },
  3: { title: '第三梯次分享', range: '39-57' }
};

function getGroupLabel(group) {
  const labels = {
    1: '第一梯次',
    2: '第二梯次',
    3: '第三梯次'
  };

  return labels[group] || `第 ${group} 梯次`;
}
const contestantGroupsEl = document.querySelector('#contestantGroups');
const countEl = document.querySelector('#contestantCount');
const searchEl = document.querySelector('#contestantSearch');
const filterButtons = document.querySelectorAll('.filter-button');
let activeGroup = 'all';

function contestantCard(person) {
  const photoMarkup = person.photo
    ? `<img
      class="absolute inset-0 h-full w-full object-cover"
      src="${person.photo}"
      alt="${person.name} 參賽照片"
      loading="lazy"
      decoding="async"
    >`
    : '';

  return `
        <article class="overflow-hidden rounded-3xl border border-ceremony-deepgold/20 bg-white shadow-ceremony">
          <div class="portrait relative aspect-4/5 overflow-hidden">
            ${photoMarkup}
<div class="absolute left-3 top-3 z-10 rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-ceremony-gold ring-1 ring-ceremony-gold/35 sm:left-4 sm:top-4 sm:text-sm">參賽 ${person.number} 號</div>            <div class="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-black via-black/62 to-transparent p-4 pt-16">
              <p class="font-display text-2xl font-black text-white">${person.name}</p>
<p class="mt-1 text-sm font-medium text-ceremony-rose">
  ${getGroupLabel(person.group)}${person.team ? `・${person.team}` : ''}
</p> </div> </div>
          <div class="p-4">
            <p class="min-h-12 text-sm leading-6 text-plum/62">${person.tagline}</p>
          </div>
        </article>
      `;
}

function renderContestants() {
  const query = searchEl.value.trim().toLowerCase();
  const filtered = contestants.filter((person) => {
    const haystack = `${person.number} ${person.name} ${person.team || ''} 第${person.group}梯次 ${groupMeta[person.group].title}`.toLowerCase(); const matchesGroup = activeGroup === 'all' || String(person.group) === activeGroup;
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
  const finalistNameList = document.querySelector('#finalistNameList');

  if (finalistNameList) {
    finalistNameList.innerHTML = finalists.map((person) => `
      <li class="finalist-name-item">
        <span class="finalist-name-item__number">${person.number} 號</span>
        <span class="finalist-name-item__name">${person.name}</span>
      </li>
    `).join('');
  }

  finalistGrid.innerHTML = finalists.map((person) => `
  <article
    class="finalist-card shine"
    style="--x:${person.focusX}; --y:${person.focusY}; --z:${person.zoom};"
  >
    <div class="finalist-card__photo-wrap">
      <img
        class="finalist-card__photo"
        src="${person.photo}"
        alt="${person.name} 入圍者照片"
        loading="lazy"
        decoding="async"
      >

      <div class="finalist-card__badge">
        ${person.number} 號
      </div>

      <div class="finalist-card__overlay">
        <p class="font-display text-2xl font-black text-white">${person.name}</p>
        <p class="mt-1 text-sm font-medium text-ceremony-rose">
          ${person.team ? `${person.team}・` : ''}${getGroupLabel(person.group)}
        </p>
      </div>
    </div>
  </article>
`).join('');
}

function renderSchedule() {
  const scheduleList = document.querySelector('#scheduleList');

  scheduleList.innerHTML = schedule.map((item) => {
    const isKey =
      item.title === '第18屆參賽者登場' ||
      item.title === '人氣王揭曉與摸彩' ||
      item.title === '公布入圍者';

    return `
      <li class="schedule-row-refined ${isKey ? 'is-key' : ''}">
        <time class="schedule-row-refined__time">${item.time}</time>

        <div class="schedule-row-refined__body">
          <h4 class="schedule-row-refined__title">${item.title}</h4>
        </div>
      </li>
    `;
  }).join('');
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
