const STORAGE_KEY = 'heroroll-save-v1';
const LEADERBOARD_URL = 'https://raw.githubusercontent.com/dannyy-5/HeroRoll/main/data/leaderboard.json';
const GITHUB_ISSUE_URL = 'https://github.com/dannyy-5/HeroRoll/issues/new?template=score-submission.yml';

const prefixes = ['Gorgon', 'Shadow', 'Light', 'Iron', 'Storm', 'Frost', 'Flame', 'Void', 'Swift', 'Apex', 'Dusk', 'Dread', 'Ember', 'Rune', 'Wraith', 'Moon', 'Solar', 'Rift', 'Titan', 'Nova'];
const suffixes = ['Thorne', 'weaver', 'heart', 'breaker', 'fury', 'strider', 'gaze', 'bane', 'shard', 'bound', 'fall', 'fist', 'forge', 'crest', 'knight', 'seer', 'warden', 'rune', 'ghost', 'storm'];

const rarityNames = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
  sr: 'SR',
  ssr: 'SSR'
};

const variantNames = {
  sr: ['Starbound', 'Celestial', 'Voidglass', 'Divine', 'Royal'],
  ssr: ['Abyssal', 'Mythic', 'Eclipsed', 'Ascended', 'Worldbreaker']
};

const classBonuses = {
  'Knight / Paladin': { defense: 12, health: 18 },
  'Barbarian / Berserker': { attack: 18, speed: 8 },
  'Warrior / Mercenary': { attack: 10, defense: 10 },
  'Dragoon / Lancer': { speed: 16, attack: 8 },
  'Ranger / Woodsman': { speed: 14, focus: 12 },
  'Archer / Marksman': { critical: 16, attack: 10 },
  'Beastmaster': { luck: 12, focus: 10 },
  'Wizard / Sorcerer': { attack: 16, critical: 14 },
  'Cleric / Priest': { regeneration: 18, focus: 12 },
  'Druid / Shaman': { regeneration: 16, health: 12 },
  'Necromancer': { attack: 12, luck: 16 },
  'Rogue / Thief': { speed: 18, critical: 10 },
  'Bard / Minstrel': { luck: 16, focus: 14 },
  'Artificer / Engineer': { focus: 18, defense: 10 },
  'Noble / Tactician': { focus: 12, luck: 12 }
};

const weaponsData = [
  { name: 'Rusty Iron Dagger', bonus: 5 },
  { name: 'Novice Wooden Staff', bonus: 8 },
  { name: 'Vanguard Steel Halberd', bonus: 20 },
  { name: 'Rune-Carved Claymore', bonus: 25 },
  { name: 'Shadowstalker Recurve Bow', bonus: 28 },
  { name: 'Blood-Drinking Dagger', bonus: 32 },
  { name: 'Oathkeeper Sun Shield', bonus: 35 },
  { name: 'Archmage Arcane Scepter', bonus: 40 },
  { name: 'Demonic Soul Reaver', bonus: 48 },
  { name: 'Excalibur (Mythic Tier)', bonus: 60 },
  { name: 'Starforged Spear', bonus: 52 },
  { name: 'Moonlit Warhammer', bonus: 44 }
];

const elementMatrix = [
  { core: 'Fire', sr: 'Magma / Plasma', ssr: 'Sunfire / Astral Ember', special: 'High burst' },
  { core: 'Water', sr: 'Blood / Acid', ssr: 'Abyssal Tide / Primordial Ocean', special: 'Healing flow' },
  { core: 'Earth', sr: 'Metal / Gravity', ssr: 'Titanforge / Planetcore', special: 'Shielding' },
  { core: 'Air', sr: 'Sonic / Vacuum', ssr: 'Stormwake / Black Hole Winds', special: 'Mobility' },
  { core: 'Lightning', sr: 'Laser / Radiation', ssr: 'Eclipse Volt / Nova Pulse', special: 'Critical chain' },
  { core: 'Nature', sr: 'Decay / Venom', ssr: 'Elder Bloom / Worldroot', special: 'Sustain' },
  { core: 'Ice', sr: 'Absolute Zero', ssr: 'Crystal Sky / Frost Sovereign', special: 'Crowd control' },
  { core: 'Light', sr: 'Solar / Judgement', ssr: 'Phoenix Radiance / Dawn Star', special: 'Radiant burst' },
  { core: 'Dark', sr: 'Shadow / Void', ssr: 'Nocturne Rift / Chaos Eclipse', special: 'Stealth' },
  { core: 'Arcane', sr: 'Astral / Rift', ssr: 'Singularity / Godfall Lens', special: 'Mana surge' },
  { core: 'Storm', sr: 'Tempest / Thunderfall', ssr: 'Skybreaker / Celestial Tempest', special: 'AoE burst' },
  { core: 'Crystal', sr: 'Prism / Diamond Heart', ssr: 'Prism Crown / Ether Diamond', special: 'Defense spike' }
];

const classesData = [
  { name: 'Knight / Paladin', desc: 'Heavily armored defenders who soak damage, protect allies, and use sacred vows to hold points.' },
  { name: 'Barbarian / Berserker', desc: 'Unarmored high-damage powerhouses relying on rage and raw physical force.' },
  { name: 'Warrior / Mercenary', desc: 'Balanced melee fighters proficient in various arms with reliable baseline damage.' },
  { name: 'Dragoon / Lancer', desc: 'Elite mobile shock troopers specializing in polearms and leaping charges.' },
  { name: 'Ranger / Woodsman', desc: 'Hybrid scouts tracking targets, utilizing bows, and managing terrain.' },
  { name: 'Archer / Marksman', desc: 'Long-range physical damage dealers focused on high precision volleys.' },
  { name: 'Beastmaster', desc: 'Tamers who deploy wolves, eagles, or armored mounts to control space.' },
  { name: 'Wizard / Sorcerer', desc: 'Academic or innate wielders of heavy elemental or arcane destruction.' },
  { name: 'Cleric / Priest', desc: 'Devoted servants channeling divine energy for targeted healing and party buffs.' },
  { name: 'Druid / Shaman', desc: 'Nature spellcasters summoning thorny vines or ancestral spirits.' },
  { name: 'Necromancer', desc: 'Dark practitioners raising fallen enemies as temporary undead soldiers.' },
  { name: 'Rogue / Thief', desc: 'Stealth experts specializing in sudden ambushes and acquiring hidden resources.' },
  { name: 'Bard / Minstrel', desc: 'Support specialists using inspirational music to boost regional morale.' },
  { name: 'Artificer / Engineer', desc: 'Innovators who construct automated turrets or functional contraptions.' },
  { name: 'Noble / Tactician', desc: 'Command leaders who boost nearby unit effectiveness and manage diplomacy.' }
];

let isRolling = false;
let highestPowerEver = 0;
let historyEntries = [];
let playerLevel = 1;
let playerWins = 0;
let currentEnemy = null;
let currentBattleLog = [];
let heroCollection = [];

const canvas = document.getElementById('diceCanvas');
const ctx = canvas.getContext('2d');
let diceArray = [];
let animationId = null;

function getDefaultHeroState() {
  return {
    name: 'Ready to Roll',
    classTitle: '-',
    description: 'Press Space to roll a random fantasy champion.',
    element: '-',
    weapon: '-',
    age: '-',
    health: '-',
    attack: '-',
    defense: '-',
    regeneration: '-',
    speed: '-',
    critical: '-',
    luck: '-',
    focus: '-',
    power: '-',
    tierClass: 'rarity-common',
    tierLabel: 'Common',
    tierRank: 'Core',
    variantName: 'None',
    level: 1,
    isEx: false,
    isSR: false,
    isSSR: false,
    arenaPromptVisible: true
  };
}

function getTierLabel(power) {
  if (power >= 900) return { label: 'SSR', css: 'rarity-ssr', rank: 'SSR' };
  if (power >= 680) return { label: 'SR', css: 'rarity-sr', rank: 'SR' };
  if (power >= 470) return { label: 'Legendary', css: 'rarity-legendary', rank: 'Legendary' };
  if (power >= 370) return { label: 'Epic', css: 'rarity-epic', rank: 'Epic' };
  if (power >= 250) return { label: 'Rare', css: 'rarity-rare', rank: 'Rare' };
  return { label: 'Common', css: 'rarity-common', rank: 'Core' };
}

function applyClassBonuses(baseStats, className) {
  const bonuses = classBonuses[className] || {};
  const out = { ...baseStats };
  Object.entries(bonuses).forEach(([stat, amount]) => {
    out[stat] = (out[stat] || 0) + amount;
  });
  return out;
}

function saveGameState() {
  const strongestPower = document.getElementById('eq-power');
  const totalPower = document.getElementById('total-power');
  const state = {
    highestPowerEver,
    playerLevel,
    playerWins,
    heroCollection,
    strongestHero: document.getElementById('eq-name').innerText !== '-' ? {
      name: document.getElementById('eq-name').innerText,
      className: document.getElementById('eq-class').innerText,
      element: document.getElementById('eq-element').innerText,
      weapon: document.getElementById('eq-weapon').innerText,
      age: document.getElementById('eq-age').innerText,
      power: strongestPower ? strongestPower.innerText : '',
      tierClass: strongestPower ? strongestPower.classList.value.replace('eq-power-value', '').trim() || 'rarity-common' : 'rarity-common'
    } : null,
    currentHero: {
      name: document.getElementById('hero-name').innerText,
      classTitle: document.getElementById('stat-Class').innerText,
      description: document.getElementById('hero-class-desc').innerText,
      element: document.getElementById('stat-Element').innerText,
      weapon: document.getElementById('stat-Weapon').innerText,
      age: document.getElementById('stat-Age').innerText,
      health: document.getElementById('stat-Health').innerText,
      attack: document.getElementById('stat-Attack').innerText,
      defense: document.getElementById('stat-Defense').innerText,
      regeneration: document.getElementById('stat-Regeneration').innerText,
      speed: document.getElementById('stat-Speed').innerText,
      critical: document.getElementById('stat-Critical').innerText,
      luck: document.getElementById('stat-Luck').innerText,
      focus: document.getElementById('stat-Focus').innerText,
      power: totalPower ? totalPower.innerText : '',
      tierClass: totalPower ? totalPower.classList.value.replace('power-value', '').trim() || 'rarity-common' : 'rarity-common',
      tierLabel: document.getElementById('element-tier').innerText,
      tierRank: document.getElementById('element-tier').dataset.rank || 'Core',
      variantName: document.getElementById('element-tier').dataset.variant || 'None',
      isEx: document.getElementById('element-tier').classList.contains('sr-active') || document.getElementById('element-tier').classList.contains('ssr-active'),
      isSR: document.getElementById('element-tier').classList.contains('sr-active'),
      isSSR: document.getElementById('element-tier').classList.contains('ssr-active'),
      arenaPromptVisible: getComputedStyle(document.getElementById('arena-prompt')).display !== 'none'
    },
    history: historyEntries
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderHeroCard(hero) {
  document.getElementById('hero-name').innerText = hero.name;
  document.getElementById('hero-class-desc').innerText = hero.description;
  document.getElementById('stat-Class').innerText = hero.classTitle;
  document.getElementById('stat-Element').innerText = hero.element;
  document.getElementById('stat-Weapon').innerText = hero.weapon;
  document.getElementById('stat-Age').innerText = hero.age;
  document.getElementById('stat-Health').innerText = hero.health;
  document.getElementById('stat-Attack').innerText = hero.attack;
  document.getElementById('stat-Defense').innerText = hero.defense;
  document.getElementById('stat-Regeneration').innerText = hero.regeneration;
  document.getElementById('stat-Speed').innerText = hero.speed;
  document.getElementById('stat-Critical').innerText = hero.critical;
  document.getElementById('stat-Luck').innerText = hero.luck;
  document.getElementById('stat-Focus').innerText = hero.focus;
  document.getElementById('total-power').innerText = hero.power;
  document.getElementById('total-power').className = 'power-value ' + hero.tierClass;

  const tierBadge = document.getElementById('element-tier');
  tierBadge.innerText = hero.tierLabel || (hero.isSSR ? 'SSR' : hero.isSR ? 'SR' : 'Core');
  tierBadge.dataset.rank = hero.tierRank || 'Core';
  tierBadge.dataset.variant = hero.variantName || 'None';
  tierBadge.classList.remove('sr-active', 'ssr-active');
  if (hero.isSSR) tierBadge.classList.add('ssr-active');
  else if (hero.isSR) tierBadge.classList.add('sr-active');
  document.getElementById('arena-prompt').style.display = hero.arenaPromptVisible ? 'block' : 'none';
}

function renderStrongestHero(hero) {
  if (!hero || !hero.name || hero.name === '-') {
    document.getElementById('eq-empty').style.display = 'block';
    document.getElementById('eq-card').className = 'eq-card-hidden';
    return;
  }

  document.getElementById('eq-empty').style.display = 'none';
  const eqCard = document.getElementById('eq-card');
  eqCard.className = 'eq-card-visible';
  document.getElementById('eq-name').innerText = hero.name;
  document.getElementById('eq-class').innerText = hero.className;
  document.getElementById('eq-element').innerText = hero.element;
  document.getElementById('eq-weapon').innerText = hero.weapon;
  document.getElementById('eq-age').innerText = hero.age;
  document.getElementById('eq-power').innerText = hero.power;
  document.getElementById('eq-power').className = 'eq-power-value ' + (hero.tierClass || 'rarity-common');
  document.getElementById('eq-name').className = 'eq-hero-name ' + (hero.tierClass || 'rarity-common');
}

function renderCollection() {
  const collectionList = document.getElementById('collection-list');
  if (!collectionList) return;
  collectionList.innerHTML = '';

  const topHeroes = heroCollection.slice(0, 5);
  if (!topHeroes.length) {
    collectionList.innerHTML = '<div class="collection-item"><strong>No heroes yet</strong><span>Roll to start</span></div>';
    return;
  }

  topHeroes.forEach((hero) => {
    const item = document.createElement('div');
    item.className = 'collection-item';
    item.innerHTML = `
      <strong>${hero.name}</strong>
      <span>${hero.rank}</span>
    `;
    collectionList.appendChild(item);
  });
}

function renderHistoryList() {
  const list = document.getElementById('history-list');
  if (list) {
    list.innerHTML = '';
    if (!historyEntries.length) {
      list.innerHTML = '<div class="history-empty">No local heroes rolled yet...</div>';
      return;
    }
    historyEntries.forEach((entry) => {
      const item = document.createElement('div');
      item.className = 'history-item';
      item.innerHTML = `
        <div class="hist-name">${entry.name}</div>
        <div class="hist-sub">${entry.subLabel}</div>
        <div class="hist-power ${entry.rarity}">${entry.power}</div>
      `;
      list.appendChild(item);
    });
  }
}

function updatePlayerHUD() {
  const rankText = playerLevel >= 5 ? 'Adept' : playerLevel >= 3 ? 'Rising' : 'Fresh';
  document.getElementById('player-level').textContent = playerLevel;
  document.getElementById('player-wins').textContent = playerWins;
  document.getElementById('player-rank').textContent = rankText;

  const dashboardLevel = document.getElementById('dashboard-level');
  if (dashboardLevel) dashboardLevel.textContent = playerLevel;
  const dashboardWins = document.getElementById('dashboard-wins');
  if (dashboardWins) dashboardWins.textContent = playerWins;
  const dashboardRank = document.getElementById('dashboard-rank');
  if (dashboardRank) dashboardRank.textContent = rankText;
  const dashboardCollection = document.getElementById('dashboard-collection');
  if (dashboardCollection) dashboardCollection.textContent = heroCollection.length;

  renderDashboardPage();
  renderHistoryPage();
  renderFavoritesPage();
}

function setupPageTabs() {
  document.querySelectorAll('.page-tab').forEach((button) => {
    button.addEventListener('click', () => {
      const pageName = button.dataset.page;
      document.querySelectorAll('.page-tab').forEach((tab) => tab.classList.toggle('active', tab === button));
      document.querySelectorAll('.page').forEach((page) => {
        page.classList.toggle('active', page.id === `page-${pageName}`);
      });
    });
  });
}

function renderDashboardPage() {
  const bestName = document.getElementById('eq-name')?.innerText || 'No hero summoned yet';
  const bestPower = document.getElementById('eq-power')?.innerText || '0';
  const battleLabel = currentEnemy ? `${currentEnemy.name} • ${currentEnemy.power} power` : 'No battle started yet.';

  const bestHeroNode = document.getElementById('dashboard-best-hero');
  if (bestHeroNode) {
    bestHeroNode.textContent = bestName === '-' ? 'No hero summoned yet.' : `${bestName} • ${bestPower} power`;
  }

  const battleNode = document.getElementById('dashboard-battle');
  if (battleNode) battleNode.textContent = battleLabel;
}

function renderHistoryPage() {
  const list = document.getElementById('history-page-list');
  const count = document.getElementById('history-page-count');
  if (count) count.textContent = `${historyEntries.length} entries`;
  if (!list) return;

  list.innerHTML = '';

  if (!historyEntries.length) {
    list.innerHTML = '<div class="history-entry"><div class="history-entry-main"><strong>No history yet</strong><small>Roll a hero to create your first record.</small></div></div>';
    return;
  }

  historyEntries.forEach((entry) => {
    const item = document.createElement('div');
    item.className = 'history-entry';
    item.innerHTML = `
      <div class="history-entry-main">
        <strong>${entry.name}</strong>
        <small>${entry.subLabel || entry.summary || 'Hero record'}</small>
      </div>
      <div class="history-entry-power">${entry.power}</div>
    `;
    list.appendChild(item);
  });
}

function renderFavoritesPage() {
  const favoriteList = document.getElementById('favorites-page-list');
  const bestCardName = document.getElementById('favorites-best-name');
  const bestCardMeta = document.getElementById('favorites-best-meta');
  const count = document.getElementById('favorites-page-count');

  if (count) count.textContent = `${heroCollection.length} saved`;
  if (bestCardName) {
    const strongestName = document.getElementById('eq-name')?.innerText || 'No hero yet';
    const strongestPower = document.getElementById('eq-power')?.innerText || '0';
    bestCardName.textContent = strongestName === '-' ? 'No hero yet' : strongestName;
    bestCardMeta.textContent = strongestName === '-' ? 'Roll a champion to begin' : `${strongestPower} power`;
  }

  if (!favoriteList) return;
  favoriteList.innerHTML = '';

  if (!heroCollection.length) {
    favoriteList.innerHTML = '<div class="favorite-card"><div class="favorite-card-main"><strong>No favorites yet</strong><small>Your saved heroes will appear here.</small></div></div>';
    return;
  }

  heroCollection.forEach((hero) => {
    const item = document.createElement('div');
    item.className = 'favorite-card';
    item.innerHTML = `
      <div class="favorite-card-main">
        <strong>${hero.name}</strong>
        <small>${hero.rank || 'Hero'}</small>
      </div>
      <div class="favorite-card-rank">${hero.rank || 'Core'}</div>
    `;
    favoriteList.appendChild(item);
  });
}

function renderPageLeaderboard() {
  const sideStatus = document.getElementById('leaderboard-status');
  const sideList = document.getElementById('leaderboard-list');
  const pageStatus = document.getElementById('page-leaderboard-status');
  const pageList = document.getElementById('page-leaderboard-list');

  const listTargets = [sideList, pageList].filter(Boolean);
  const statusTargets = [sideStatus, pageStatus].filter(Boolean);

  if (!listTargets.length && !statusTargets.length) return;

  statusTargets.forEach((status) => {
    status.textContent = 'Loading leaderboard...';
  });

  listTargets.forEach((list) => {
    list.innerHTML = '<div class="leaderboard-entry"><div class="leaderboard-name">Loading...</div></div>';
  });
}

function renderLeaderboardRows(entries, list, status) {
  list.innerHTML = '';

  if (!entries.length) {
    list.innerHTML = '<div class="leaderboard-entry"><div class="leaderboard-name">No scores yet</div></div>';
    status.textContent = 'Waiting for hourly sync';
    return;
  }

  entries.slice(0, 10).forEach((entry, index) => {
    const row = document.createElement('div');
    row.className = 'leaderboard-entry';
    row.innerHTML = `
      <div class="rank-badge">${index + 1}</div>
      <div>
        <div class="leaderboard-name">${entry.name}</div>
        <div class="leaderboard-meta">${entry.hero} · ${entry.date}</div>
      </div>
      <div class="leaderboard-score">${entry.score}</div>
    `;
    list.appendChild(row);
  });

  status.textContent = `Updated ${new Date().toISOString()}`;
}

function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const state = JSON.parse(raw);
    if (typeof state.highestPowerEver === 'number') highestPowerEver = state.highestPowerEver;
    if (typeof state.playerLevel === 'number') playerLevel = state.playerLevel;
    if (typeof state.playerWins === 'number') playerWins = state.playerWins;
    if (Array.isArray(state.heroCollection)) heroCollection = state.heroCollection;
    if (Array.isArray(state.history)) historyEntries = state.history;

    if (state.currentHero) {
      renderHeroCard({ ...getDefaultHeroState(), ...state.currentHero, tierClass: state.currentHero.tierClass || 'rarity-common', isEx: Boolean(state.currentHero.isEx), isSR: Boolean(state.currentHero.isSR), isSSR: Boolean(state.currentHero.isSSR), arenaPromptVisible: state.currentHero.arenaPromptVisible !== false });
    }

    if (state.strongestHero) {
      renderStrongestHero(state.strongestHero);
    } else {
      renderStrongestHero(null);
    }

    updatePlayerHUD();
    renderCollection();
    renderHistoryList();
  } catch (error) {
    console.warn('Failed to load saved HeroRoll data:', error);
    localStorage.removeItem(STORAGE_KEY);
  }
}

function rollRareBiasedStat(maxCap) {
  const baseAvg = (Math.random() + Math.random() + Math.random() + Math.random()) / 4;
  const curvedFactor = Math.pow(baseAvg, 1.8);
  const finalVal = Math.floor(curvedFactor * maxCap);
  return Math.max(Math.floor(maxCap * 0.08), finalVal);
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomVariantName(type) {
  const list = variantNames[type] || ['Ascended'];
  return getRandomItem(list);
}

class BirdEyeDice {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.vx = (Math.random() * 8) - 4;
    this.vy = (Math.random() * 6) - 3;
    this.angle = Math.random() * Math.PI * 2;
    this.spinSpeed = (Math.random() * 0.4) - 0.2;
    this.height3D = 35;
    this.gravity = 1.8;
    this.currentValue = Math.floor(Math.random() * 6) + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.spinSpeed;

    if (this.x < this.size) { this.x = this.size; this.vx *= -0.6; }
    if (this.x > canvas.width - this.size) { this.x = canvas.width - this.size; this.vx *= -0.6; }
    if (this.y < this.size) { this.y = this.size; this.vy *= -0.6; }
    if (this.y > canvas.height - this.size) { this.y = canvas.height - this.size; this.vy *= -0.6; }

    if (this.height3D > 0) {
      this.height3D -= this.gravity;
      this.currentValue = Math.floor(Math.random() * 6) + 1;
    } else {
      this.height3D = 0;
      this.vx *= 0.85;
      this.vy *= 0.85;
      this.spinSpeed *= 0.85;
    }
  }

  draw() {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(this.x + 2, this.y + 2, this.size, this.size);
    ctx.translate(this.x, this.y - this.height3D);
    ctx.rotate(this.angle);
    ctx.fillStyle = '#8f1d1d';
    ctx.fillRect(-this.size / 2 + 2, -this.size / 2 + 2, this.size, this.size);
    ctx.fillStyle = '#d93838';
    ctx.strokeStyle = '#5c1010';
    ctx.lineWidth = 1.5;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.fillStyle = '#ffffff';

    const offset = this.size / 4;
    const val = this.currentValue;

    if (val === 1 || val === 3 || val === 5) drawPip(0, 0);
    if (val === 2 || val === 3 || val === 4 || val === 5 || val === 6) {
      drawPip(-offset, -offset);
      drawPip(offset, offset);
    }
    if (val === 4 || val === 5 || val === 6) {
      drawPip(offset, -offset);
      drawPip(-offset, offset);
    }
    if (val === 6) {
      drawPip(-offset, 0);
      drawPip(offset, 0);
    }
    ctx.restore();
  }
}

function drawPip(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 1.5, 0, Math.PI * 2);
  ctx.fill();
}

function updateDiceEngine() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let motion = false;

  diceArray.forEach((die) => {
    die.update();
    die.draw();
    if (Math.abs(die.vx) > 0.08 || die.height3D > 0) motion = true;
  });

  if (motion) animationId = requestAnimationFrame(updateDiceEngine);
}

function startRollSequence() {
  if (isRolling) return;
  isRolling = true;

  document.getElementById('arena-prompt').style.display = 'none';
  const button = document.getElementById('roll-button');
  button.disabled = true;
  button.innerText = 'ROLLING...';

  const card = document.querySelector('.character-card');
  if (card) {
    card.classList.remove('is-rolling');
    void card.offsetWidth;
    card.classList.add('is-rolling');
  }

  diceArray = [];
  for (let i = 0; i < 4; i++) {
    diceArray.push(new BirdEyeDice(80 + (i * 80), 35 + (Math.random() * 25)));
  }

  if (animationId) cancelAnimationFrame(animationId);
  updateDiceEngine();

  let cycles = 0;
  const maxCycles = 20;
  const shuffleInterval = setInterval(() => {
    const randomName = getRandomItem(prefixes) + getRandomItem(suffixes);
    const randomClass = getRandomItem(classesData);
    const randomWeapon = getRandomItem(weaponsData);
    const randomElement = getRandomItem(elementMatrix);

    document.getElementById('hero-name').innerText = randomName;
    document.getElementById('stat-Class').innerText = randomClass.name;
    document.getElementById('hero-class-desc').innerText = randomClass.desc;
    document.getElementById('stat-Weapon').innerText = randomWeapon.name;
    document.getElementById('stat-Age').innerText = Math.floor(Math.random() * 950) + 10;
    document.getElementById('stat-Element').innerText = Math.random() > 0.8 ? randomElement.sr : randomElement.core;
    document.getElementById('stat-Health').innerText = Math.floor(Math.random() * 250) + 20;
    document.getElementById('stat-Attack').innerText = Math.floor(Math.random() * 80) + 10;
    document.getElementById('stat-Defense').innerText = Math.floor(Math.random() * 80) + 10;
    document.getElementById('stat-Regeneration').innerText = Math.floor(Math.random() * 80) + 10;
    document.getElementById('stat-Speed').innerText = Math.floor(Math.random() * 80) + 10;
    document.getElementById('stat-Critical').innerText = Math.floor(Math.random() * 80) + 10;
    document.getElementById('stat-Luck').innerText = Math.floor(Math.random() * 80) + 10;
    document.getElementById('stat-Focus').innerText = Math.floor(Math.random() * 80) + 10;

    cycles += 1;
    if (cycles >= maxCycles) {
      clearInterval(shuffleInterval);
      finalizeCharacter();
    }
  }, 60);
}

function finalizeCharacter() {
  const finalName = getRandomItem(prefixes) + getRandomItem(suffixes);
  const selectedClass = getRandomItem(classesData);
  const finalAge = rollRareBiasedStat(1000);
  const finalWeaponObj = getRandomItem(weaponsData);
  const targetElementPair = getRandomItem(elementMatrix);
  const variantRoll = Math.random();
  const levelBonus = playerLevel * 15;

  let renderRank = 'Core';
  let renderTier = 'rarity-common';
  let isSR = false;
  let isSSR = false;
  let variantName = 'None';
  let finalElementName = targetElementPair.core;

  if (variantRoll > 0.92) {
    isSSR = true;
    finalElementName = targetElementPair.ssr;
    renderRank = 'SSR';
    renderTier = 'rarity-ssr';
    variantName = getRandomVariantName('ssr');
  } else if (variantRoll > 0.68) {
    isSR = true;
    finalElementName = targetElementPair.sr;
    renderRank = 'SR';
    renderTier = 'rarity-sr';
    variantName = getRandomVariantName('sr');
  } else if (variantRoll > 0.34) {
    finalElementName = targetElementPair.core;
  }

  let baseStats = {
    health: rollRareBiasedStat(300),
    attack: rollRareBiasedStat(100),
    defense: rollRareBiasedStat(100),
    regeneration: rollRareBiasedStat(100),
    speed: rollRareBiasedStat(100),
    critical: rollRareBiasedStat(100),
    luck: rollRareBiasedStat(100),
    focus: rollRareBiasedStat(100)
  };

  const classBoostedStats = applyClassBonuses(baseStats, selectedClass.name);
  const hp = classBoostedStats.health;
  const atk = classBoostedStats.attack;
  const def = classBoostedStats.defense;
  const reg = classBoostedStats.regeneration;
  const speed = classBoostedStats.speed;
  const crit = classBoostedStats.critical;
  const luck = classBoostedStats.luck;
  const focus = classBoostedStats.focus;

  document.getElementById('hero-name').innerText = `${variantName} ${finalName}`;
  document.getElementById('stat-Class').innerText = selectedClass.name;
  document.getElementById('hero-class-desc').innerText = selectedClass.desc;
  document.getElementById('stat-Age').innerText = finalAge;
  document.getElementById('stat-Weapon').innerText = `${finalWeaponObj.name} (+${finalWeaponObj.bonus} Power)`;
  document.getElementById('stat-Element').innerText = finalElementName;
  document.getElementById('stat-Health').innerText = hp;
  document.getElementById('stat-Attack').innerText = atk;
  document.getElementById('stat-Defense').innerText = def;
  document.getElementById('stat-Regeneration').innerText = reg;
  document.getElementById('stat-Speed').innerText = speed;
  document.getElementById('stat-Critical').innerText = crit;
  document.getElementById('stat-Luck').innerText = luck;
  document.getElementById('stat-Focus').innerText = focus;

  const tBadge = document.getElementById('element-tier');
  tBadge.dataset.rank = renderRank;
  tBadge.dataset.variant = variantName;
  tBadge.classList.remove('sr-active', 'ssr-active');
  if (isSSR) {
    tBadge.innerText = 'SSR';
    tBadge.classList.add('ssr-active');
  } else if (isSR) {
    tBadge.innerText = 'SR';
    tBadge.classList.add('sr-active');
  } else {
    tBadge.innerText = 'Core';
  }

  let totalCombatPower = hp + atk + def + reg + speed + crit + luck + focus + levelBonus;
  totalCombatPower += finalWeaponObj.bonus;
  if (isSR) totalCombatPower += 90;
  if (isSSR) totalCombatPower += 180;
  if (targetElementPair.special === 'High burst') totalCombatPower += 20;
  if (targetElementPair.special === 'Shielding') totalCombatPower += 18;
  if (targetElementPair.special === 'Healing flow') totalCombatPower += 14;

  const powerEl = document.getElementById('total-power');
  powerEl.innerText = totalCombatPower;
  powerEl.className = 'power-value';
  powerEl.classList.add(renderTier);

  const strongestHero = {
    name: `${variantName} ${finalName}`,
    className: selectedClass.name,
    element: finalElementName,
    weapon: finalWeaponObj.name,
    age: `${finalAge} yrs`,
    power: totalCombatPower,
    tierClass: renderTier
  };

  if (totalCombatPower > highestPowerEver) {
    highestPowerEver = totalCombatPower;
    renderStrongestHero(strongestHero);
  }

  addHeroToHistory(`${variantName} ${finalName}`, selectedClass.name, finalElementName, isSR, isSSR, totalCombatPower, renderTier, finalWeaponObj.name, renderRank);

  if (!heroCollection.some((hero) => hero.name === `${variantName} ${finalName}`)) {
    heroCollection.unshift({ name: `${variantName} ${finalName}`, rank: renderRank });
    heroCollection = heroCollection.slice(0, 8);
  }

  const button = document.getElementById('roll-button');
  button.disabled = false;
  button.innerText = 'PRESS SPACE TO ROLL';
  isRolling = false;
  const card = document.querySelector('.character-card');
  if (card) card.classList.remove('is-rolling');
  renderCollection();
  saveGameState();
}

function addHeroToHistory(name, charClass, element, isSR, isSSR, power, rarity, weapon, rank) {
  const prefix = isSSR ? '[SSR]' : isSR ? '[SR]' : '[Core]';
  const subLabel = `${prefix} ${element}`;
  historyEntries.unshift({
    name,
    className: charClass,
    subLabel,
    power,
    rarity,
    weapon,
    rank,
    summary: `${weapon} • ${subLabel}`
  });
  historyEntries = historyEntries.slice(0, 12);
  renderHistoryList();
  saveGameState();
}

function startBattle() {
  const currentHeroName = document.getElementById('hero-name')?.innerText || 'Hero';
  const currentHeroPower = Number(document.getElementById('total-power')?.innerText || 0);

  if (!currentHeroPower || currentHeroPower <= 0) {
    document.getElementById('battle-log').textContent = 'Roll a hero before starting a battle.';
    return;
  }

  const enemyName = getRandomItem(['Goblin Warlord', 'Frost Drake', 'Bone Titan', 'Ember Seraph', 'Wraith King']);
  const enemyPower = Math.max(80, Math.floor(currentHeroPower * (0.7 + Math.random() * 0.8)));
  currentEnemy = { name: enemyName, power: enemyPower };

  const heroWins = currentHeroPower >= enemyPower;
  const log = document.getElementById('battle-log');
  document.getElementById('enemy-name').textContent = enemyName;
  document.getElementById('enemy-power').textContent = enemyPower;

  if (heroWins) {
    playerWins += 1;
    playerLevel += 1;
    log.textContent = `${currentHeroName} defeats ${enemyName} and gains a level!`;
  } else {
    log.textContent = `${currentHeroName} loses to ${enemyName}. The next hero will rise stronger.`;
  }

  updatePlayerHUD();
  saveGameState();
}

function levelUpHero() {
  const currentPower = Number(document.getElementById('total-power')?.innerText || 0);
  if (!currentPower || currentPower <= 0) {
    document.getElementById('battle-log').textContent = 'No hero to level up yet.';
    return;
  }

  playerLevel += 1;
  const powerNode = document.getElementById('total-power');
  const upgraded = currentPower + 30 + playerLevel * 5;
  powerNode.innerText = upgraded;
  updatePlayerHUD();
  document.getElementById('battle-log').textContent = `Level up! ${powerNode.innerText} total power.`;
  saveGameState();
}

async function loadLeaderboard() {
  const statusTargets = [
    document.getElementById('leaderboard-status'),
    document.getElementById('page-leaderboard-status')
  ].filter(Boolean);

  const listTargets = [
    document.getElementById('leaderboard-list'),
    document.getElementById('page-leaderboard-list')
  ].filter(Boolean);

  if (!statusTargets.length || !listTargets.length) return;

  try {
    statusTargets.forEach((status) => {
      status.textContent = 'Loading leaderboard...';
    });

    const response = await fetch(`${LEADERBOARD_URL}?cache=${Date.now()}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const entries = Array.isArray(data.entries) ? data.entries : [];

    statusTargets.forEach((status) => {
      status.textContent = `Updated ${data.updatedAt || 'recently'}`;
    });

    listTargets.forEach((list) => {
      list.innerHTML = '';
      if (!entries.length) {
        list.innerHTML = '<div class="leaderboard-entry"><div class="leaderboard-name">No scores yet</div></div>';
        return;
      }

      entries.slice(0, 10).forEach((entry, index) => {
        const row = document.createElement('div');
        row.className = 'leaderboard-entry';
        row.innerHTML = `
          <div class="rank-badge">${index + 1}</div>
          <div>
            <div class="leaderboard-name">${entry.name}</div>
            <div class="leaderboard-meta">${entry.hero} · ${entry.date}</div>
          </div>
          <div class="leaderboard-score">${entry.score}</div>
        `;
        list.appendChild(row);
      });
    });
  } catch (error) {
    console.warn('Leaderboard failed to load:', error);
    statusTargets.forEach((status) => {
      status.textContent = 'Leaderboard offline';
    });
    listTargets.forEach((list) => {
      list.innerHTML = '<div class="leaderboard-entry"><div class="leaderboard-name">Sync will update hourly</div></div>';
    });
  }
}

function submitCurrentScore() {
  const currentName = document.getElementById('hero-name')?.innerText || 'Hero';
  const currentPower = document.getElementById('total-power')?.innerText || '0';
  const currentClass = document.getElementById('stat-Class')?.innerText || 'Unknown';

  const params = new URLSearchParams({
    title: `HeroRoll score: ${currentName}`,
    body: `### Player Name\nAnonymous Player\n\n### Hero Name\n${currentName}\n\n### Class\n${currentClass}\n\n### Score\n${currentPower}\n\n### Notes\nSubmitted from the live game.`
  });

  window.open(`${GITHUB_ISSUE_URL}&${params.toString()}`, '_blank', 'noopener,noreferrer');
}

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    startRollSequence();
  }
});

document.getElementById('roll-button')?.addEventListener('click', startRollSequence);
document.getElementById('battle-button')?.addEventListener('click', startBattle);
document.getElementById('level-button')?.addEventListener('click', levelUpHero);
document.getElementById('submit-score-btn')?.addEventListener('click', submitCurrentScore);
setupPageTabs();

updatePlayerHUD();
renderCollection();
renderDashboardPage();
renderHistoryPage();
renderFavoritesPage();
loadGameState();
loadLeaderboard();

