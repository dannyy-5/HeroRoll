const STORAGE_KEY = 'heroroll-save-v1';

const prefixes = ['Gorgon', 'Shadow', 'Light', 'Iron', 'Storm', 'Frost', 'Flame', 'Void', 'Swift', 'Apex', 'Dusk', 'Dread', 'Ember', 'Rune', 'Wraith', 'Moon', 'Solar', 'Rift', 'Titan', 'Nova'];
const suffixes = ['Thorne', 'weaver', 'heart', 'breaker', 'fury', 'strider', 'gaze', 'bane', 'shard', 'bound', 'fall', 'fist', 'forge', 'crest', 'knight', 'seer', 'warden', 'rune', 'ghost', 'storm'];

const rarityNames = {
  common: 'C',
  rare: 'R',
  superRare: 'SR',
  shinySuperRare: 'SSR',
  ultraRare: 'UR',
  hyperRare: 'HR'
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
let randomSource = Math.random;

function createSeededRandom(seed) {
  let value = Number(seed) || 0;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function formatHeroCode(seed) {
  const digits = String(Math.max(0, Math.min(999999999, Number(seed) || 0))).padStart(9, '0');
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function parseHeroCode(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length === 9 ? Number(digits) : null;
}

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
  if (power >= 900) return { label: 'HR', css: 'rarity-hyper-rare', rank: 'HR', fullName: 'Hyper Rare' };
  if (power >= 680) return { label: 'UR', css: 'rarity-ultra-rare', rank: 'UR', fullName: 'Ultra Rare' };
  if (power >= 470) return { label: 'SSR', css: 'rarity-shiny-super-rare', rank: 'SSR', fullName: 'Shiny Super Rare' };
  if (power >= 370) return { label: 'SR', css: 'rarity-super-rare', rank: 'SR', fullName: 'Super Rare' };
  if (power >= 250) return { label: 'R', css: 'rarity-rare', rank: 'R', fullName: 'Rare' };
  return { label: 'C', css: 'rarity-common', rank: 'C', fullName: 'Common' };
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
  const eqRarityBadge = document.getElementById('eq-rarity-badge');
  const state = {
    highestPowerEver,
    strongestHero: document.getElementById('eq-name').innerText !== '-' ? {
      name: document.getElementById('eq-name').innerText,
      rarityRank: eqRarityBadge ? eqRarityBadge.dataset.rank || 'C' : 'C',
      variantMarker: eqRarityBadge ? eqRarityBadge.dataset.variant || '' : '',
      className: document.getElementById('eq-class').innerText,
      element: document.getElementById('eq-element').innerText,
      weapon: document.getElementById('eq-weapon').innerText,
      age: document.getElementById('eq-age').innerText,
      health: document.getElementById('eq-health').innerText,
      attack: document.getElementById('eq-attack').innerText,
      defense: document.getElementById('eq-defense').innerText,
      regeneration: document.getElementById('eq-regeneration').innerText,
      speed: document.getElementById('eq-speed').innerText,
      critical: document.getElementById('eq-critical').innerText,
      luck: document.getElementById('eq-luck').innerText,
      focus: document.getElementById('eq-focus').innerText,
      code: document.getElementById('eq-code').innerText,
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

function getRarityClassName(powerOrTier) {
  const value = typeof powerOrTier === 'number' ? powerOrTier : Number(powerOrTier || 0);
  if (value >= 900) return 'rarity-hyper-rare';
  if (value >= 680) return 'rarity-ultra-rare';
  if (value >= 470) return 'rarity-shiny-super-rare';
  if (value >= 370) return 'rarity-super-rare';
  if (value >= 250) return 'rarity-rare';
  return 'rarity-common';
}

function getRarityInfo(powerValue) {
  const rarityClass = getRarityClassName(powerValue);
  const palette = {
    'rarity-common': { label: 'C', fullName: 'Common', color: '#d7d6d8', glow: 'rgba(215, 214, 216, 0.38)' },
    'rarity-rare': { label: 'R', fullName: 'Rare', color: '#5aa9ff', glow: 'rgba(90, 169, 255, 0.38)' },
    'rarity-super-rare': { label: 'SR', fullName: 'Super Rare', color: '#35d7a1', glow: 'rgba(53, 215, 161, 0.38)' },
    'rarity-shiny-super-rare': { label: 'SSR', fullName: 'Shiny Super Rare', color: '#b57cff', glow: 'rgba(181, 124, 255, 0.42)' },
    'rarity-ultra-rare': { label: 'UR', fullName: 'Ultra Rare', color: '#ffb347', glow: 'rgba(255, 179, 71, 0.42)' },
    'rarity-hyper-rare': { label: 'HR', fullName: 'Hyper Rare', color: '#ff5d7a', glow: 'rgba(255, 93, 122, 0.45)' }
  };

  return { ...palette[rarityClass], rarityClass };
}

function applyRarityVisuals(powerValue) {
  const info = getRarityInfo(powerValue);
  const rarityTokens = ['rarity-common', 'rarity-rare', 'rarity-super-rare', 'rarity-shiny-super-rare', 'rarity-ultra-rare', 'rarity-hyper-rare'];
  const targetEls = [
    document.querySelector('.character-card'),
    document.querySelector('.power-row'),
    document.getElementById('hero-rarity'),
    ...Array.from(document.querySelectorAll('.panel')),
    ...Array.from(document.querySelectorAll('.stat-box'))
  ].filter(Boolean);

  targetEls.forEach((el) => {
    rarityTokens.forEach((token) => el.classList.remove(token));
    el.classList.add(info.rarityClass);
  });

  document.documentElement.style.setProperty('--active-rarity-color', info.color);
  document.documentElement.style.setProperty('--active-rarity-glow', info.glow);

  const heroRarity = document.getElementById('hero-rarity');
  const tierBadge = document.getElementById('element-tier');
  const variantSuffix = tierBadge?.dataset.variant === 'ssr' ? '++' : tierBadge?.dataset.variant === 'sr' ? '+' : '';
  if (heroRarity) heroRarity.textContent = `${info.label}${variantSuffix}`;

  if (tierBadge) {
    tierBadge.textContent = `${info.label}${variantSuffix}`;
    tierBadge.dataset.rank = info.label;
    tierBadge.title = `${info.fullName} hero`;
  }
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
  const variantToken = hero.isSSR ? '++' : hero.isSR ? '+' : 'C';
  tierBadge.innerText = variantToken;
  tierBadge.dataset.rank = hero.tierRank || 'C';
  tierBadge.dataset.variant = hero.isSSR ? 'ssr' : hero.isSR ? 'sr' : 'core';
  tierBadge.classList.remove('sr-active', 'ssr-active', 'rarity-common', 'rarity-rare', 'rarity-super-rare', 'rarity-shiny-super-rare', 'rarity-ultra-rare', 'rarity-hyper-rare');
  if (hero.isSSR) {
    tierBadge.classList.add('ssr-active', 'rarity-shiny-super-rare');
  } else if (hero.isSR) {
    tierBadge.classList.add('sr-active', 'rarity-super-rare');
  } else {
    tierBadge.classList.add('rarity-common');
  }
  applyRarityVisuals(Number(hero.power) || 0);
  document.getElementById('arena-prompt').style.display = hero.arenaPromptVisible ? 'block' : 'none';
}

function renderStrongestHero(hero) {
  if (!hero || !hero.name || hero.name === '-') {
    document.getElementById('eq-empty').style.display = 'block';
    document.getElementById('eq-card').className = 'eq-card-hidden';
    document.getElementById('eq-code').innerText = '000-000-000';
    return;
  }

  const rarityRank = getTierLabel(Number(hero.power) || 0).label;
  const variantMarker = hero.variantMarker || (hero.isSSR ? '++' : hero.isSR ? '+' : '');
  const badgeText = `${rarityRank}${variantMarker}`;
  const rarityInfo = getRarityInfo(Number(hero.power) || 0);

  document.getElementById('eq-empty').style.display = 'none';
  const eqCard = document.getElementById('eq-card');
  eqCard.className = 'eq-card-visible';
  document.getElementById('eq-name').innerText = hero.name;
  const eqRarityBadge = document.getElementById('eq-rarity-badge');
  if (eqRarityBadge) {
    eqRarityBadge.textContent = badgeText;
    eqRarityBadge.dataset.rank = rarityRank;
    eqRarityBadge.dataset.variant = variantMarker;
    eqRarityBadge.className = `eq-rarity-badge ${rarityInfo.rarityClass}`;
  }
  document.getElementById('eq-class').innerText = hero.className;
  document.getElementById('eq-element').innerText = hero.element;
  document.getElementById('eq-weapon').innerText = hero.weapon;
  document.getElementById('eq-age').innerText = hero.age;
  document.getElementById('eq-health').innerText = hero.health || '-';
  document.getElementById('eq-attack').innerText = hero.attack || '-';
  document.getElementById('eq-defense').innerText = hero.defense || '-';
  document.getElementById('eq-regeneration').innerText = hero.regeneration || '-';
  document.getElementById('eq-speed').innerText = hero.speed || '-';
  document.getElementById('eq-critical').innerText = hero.critical || '-';
  document.getElementById('eq-luck').innerText = hero.luck || '-';
  document.getElementById('eq-focus').innerText = hero.focus || '-';
  document.getElementById('eq-power').innerText = hero.power;
  document.getElementById('eq-power').className = 'eq-power-value ' + rarityInfo.rarityClass;
  document.getElementById('eq-name').className = 'eq-hero-name ' + rarityInfo.rarityClass;
  document.getElementById('eq-code').innerText = hero.code || '000-000-000';
}

function resetGame() {
  if (!window.confirm('Reset your saved heroes and roll history?')) return;

  localStorage.removeItem(STORAGE_KEY);
  highestPowerEver = 0;
  historyEntries = [];
  renderHeroCard(getDefaultHeroState());
  renderStrongestHero(null);
  renderHistoryPage();
  saveGameState();
}

function toggleCodePage() {
  const appShell = document.querySelector('.app-shell');
  if (!appShell) return;
  const isCodePage = appShell.classList.toggle('code-mode');
  document.getElementById('code-page')?.setAttribute('aria-hidden', String(!isCodePage));
  if (isCodePage) document.getElementById('hero-code-input')?.focus();
}

function battleCode() {
  const input = document.getElementById('hero-code-input');
  const result = document.getElementById('battle-result');
  const seed = parseHeroCode(input?.value);
  if (seed === null) {
    if (result) result.textContent = 'Enter exactly nine digits.';
    return;
  }

  highestPowerEver = -1;
  finalizeCharacter(seed);
  const importedPower = Number(document.getElementById('eq-power').innerText) || 0;
  if (result) {
    result.textContent = `Hero summoned: ${formatHeroCode(seed)} | Power ${importedPower}`;
  }
  input.value = formatHeroCode(seed);
}

function renderHistoryList() {
  renderHistoryPage();
}

function updatePlayerHUD() {
  renderHistoryPage();
}

function renderHistoryPage() {
  const list = document.getElementById('history-panel-list') || document.getElementById('history-page-list');
  const count = document.getElementById('history-panel-count') || document.getElementById('history-page-count');
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

function setStatValue(statKey, value, maxValue) {
  const valueEl = document.getElementById(`stat-${statKey}`);
  const maxEl = document.getElementById(`stat-${statKey}-max`);

  if (valueEl) valueEl.textContent = value;
  if (maxEl) maxEl.textContent = `Max ${maxValue}`;
}

function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const state = JSON.parse(raw);
    if (typeof state.highestPowerEver === 'number') highestPowerEver = state.highestPowerEver;
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
    renderHistoryList();
  } catch (error) {
    console.warn('Failed to load saved HeroRoll data:', error);
    localStorage.removeItem(STORAGE_KEY);
  }
}

function rollRareBiasedStat(maxCap) {
  const baseAvg = (randomSource() + randomSource() + randomSource() + randomSource()) / 4;
  const curvedFactor = Math.pow(baseAvg, 1.8);
  const finalVal = Math.floor(curvedFactor * maxCap);
  return Math.max(Math.floor(maxCap * 0.08), finalVal);
}

function getRandomItem(arr) {
  return arr[Math.floor(randomSource() * arr.length)];
}

function getRandomVariantName(type) {
  const list = variantNames[type] || ['Ascended'];
  return getRandomItem(list);
}


function startRollSequence() {
  if (isRolling) return;
  isRolling = true;

  document.getElementById('arena-prompt').style.display = 'none';
  const button = document.getElementById('roll-button');
  button.disabled = true;
  button.innerText = 'ROLLING...';

  let cycle = 0;
  const totalCycles = 10;
  const previewInterval = setInterval(() => {
    const randomName = getRandomItem(prefixes) + getRandomItem(suffixes);
    const randomClass = getRandomItem(classesData);
    const randomWeapon = getRandomItem(weaponsData);
    const randomElement = getRandomItem(elementMatrix);
    const wobblePower = Math.floor(Math.random() * 550) + 140;

    document.getElementById('hero-name').innerText = randomName;
    document.getElementById('stat-Class').innerText = randomClass.name;
    document.getElementById('hero-class-desc').innerText = randomClass.desc;
    document.getElementById('stat-Weapon').innerText = randomWeapon.name;
    document.getElementById('stat-Element').innerText = randomElement.core;

    setStatValue('Age', Math.floor(Math.random() * 980) + 20, 1000);
    setStatValue('Health', Math.floor(Math.random() * 260) + 25, 300);
    setStatValue('Attack', Math.floor(Math.random() * 85) + 10, 100);
    setStatValue('Defense', Math.floor(Math.random() * 85) + 10, 100);
    setStatValue('Regeneration', Math.floor(Math.random() * 85) + 10, 100);
    setStatValue('Speed', Math.floor(Math.random() * 85) + 10, 100);
    setStatValue('Critical', Math.floor(Math.random() * 85) + 10, 100);
    setStatValue('Luck', Math.floor(Math.random() * 85) + 10, 100);
    setStatValue('Focus', Math.floor(Math.random() * 85) + 10, 100);

    const previewEntry = {
      name: randomName,
      subLabel: `${randomClass.name} • ${randomElement.core}`,
      power: wobblePower,
      isRolling: true,
      summary: `${randomWeapon.name} • ${randomElement.core}`
    };

    historyEntries = [previewEntry, ...historyEntries.filter((entry) => !entry.isRolling)].slice(0, 12);
    renderHistoryPage();

    cycle += 1;
    if (cycle >= totalCycles) {
      clearInterval(previewInterval);
      finalizeCharacter();
    }
  }, 80);
}

function finalizeCharacter(seed = Math.floor(Math.random() * 1000000000)) {
  const previousRandomSource = randomSource;
  randomSource = createSeededRandom(seed);
  const finalName = getRandomItem(prefixes) + getRandomItem(suffixes);
  const selectedClass = getRandomItem(classesData);
  const finalAge = rollRareBiasedStat(1000);
  const finalWeaponObj = getRandomItem(weaponsData);
  const targetElementPair = getRandomItem(elementMatrix);
  const variantRoll = randomSource();
  let renderRank = 'Core';
  let renderTier = 'rarity-common';
  let isSR = false;
  let isSSR = false;
  let variantName = '';
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

  const finalHeroName = variantName ? `${variantName} ${finalName}` : finalName;
  document.getElementById('hero-name').innerText = finalHeroName;
  document.getElementById('stat-Class').innerText = selectedClass.name;
  document.getElementById('hero-class-desc').innerText = selectedClass.desc;
  document.getElementById('stat-Weapon').innerText = `${finalWeaponObj.name} (+${finalWeaponObj.bonus} Power)`;
  document.getElementById('stat-Element').innerText = finalElementName;

  setStatValue('Age', finalAge, 1000);
  setStatValue('Health', hp, 300);
  setStatValue('Attack', atk, 100);
  setStatValue('Defense', def, 100);
  setStatValue('Regeneration', reg, 100);
  setStatValue('Speed', speed, 100);
  setStatValue('Critical', crit, 100);
  setStatValue('Luck', luck, 100);
  setStatValue('Focus', focus, 100);

  const tBadge = document.getElementById('element-tier');
  tBadge.dataset.rank = renderRank;
  tBadge.dataset.variant = isSSR ? 'ssr' : isSR ? 'sr' : 'core';
  tBadge.classList.remove('sr-active', 'ssr-active');
  if (isSSR) {
    tBadge.innerText = '++';
    tBadge.classList.add('ssr-active');
  } else if (isSR) {
    tBadge.innerText = '+';
    tBadge.classList.add('sr-active');
  } else {
    tBadge.innerText = 'C';
  }

  let totalCombatPower = hp + atk + def + reg + speed + crit + luck + focus;
  totalCombatPower += finalWeaponObj.bonus;
  if (isSR) totalCombatPower += 90;
  if (isSSR) totalCombatPower += 180;
  if (targetElementPair.special === 'High burst') totalCombatPower += 20;
  if (targetElementPair.special === 'Shielding') totalCombatPower += 18;
  if (targetElementPair.special === 'Healing flow') totalCombatPower += 14;

  const finalRarity = getTierLabel(totalCombatPower);
  renderRank = finalRarity.rank;
  renderTier = finalRarity.css;

  const powerEl = document.getElementById('total-power');
  powerEl.innerText = totalCombatPower;
  powerEl.className = 'power-value';
  powerEl.classList.add(renderTier);
  applyRarityVisuals(totalCombatPower);

  const strongestHero = {
    name: finalHeroName,
    code: formatHeroCode(seed),
    rarityRank: renderRank,
    variantMarker: isSSR ? '++' : isSR ? '+' : '',
    className: selectedClass.name,
    element: finalElementName,
    weapon: finalWeaponObj.name,
    age: `${finalAge} yrs`,
    health: hp,
    attack: atk,
    defense: def,
    regeneration: reg,
    speed,
    critical: crit,
    luck,
    focus,
    power: totalCombatPower,
    tierClass: renderTier
  };

  if (totalCombatPower > highestPowerEver) {
    highestPowerEver = totalCombatPower;
    renderStrongestHero(strongestHero);
  }

  addHeroToHistory(finalHeroName, selectedClass.name, finalElementName, isSR, isSSR, totalCombatPower, renderTier, finalWeaponObj.name, renderRank);

  const button = document.getElementById('roll-button');
  button.disabled = false;
  button.innerText = 'PRESS SPACE TO ROLL';
  isRolling = false;
  saveGameState();
  randomSource = previousRandomSource;
}

function addHeroToHistory(name, charClass, element, isSR, isSSR, power, rarity, weapon, rank) {
  const prefix = isSSR ? '[SSR]' : isSR ? '[SR]' : '[Core]';
  const subLabel = `${prefix} ${element}`;
  historyEntries = historyEntries.filter((entry) => !entry.isRolling);
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
  renderHistoryPage();
  saveGameState();
}

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    startRollSequence();
  }
});

document.getElementById('roll-button')?.addEventListener('click', startRollSequence);
document.getElementById('reset-button')?.addEventListener('click', resetGame);
document.getElementById('battle-button')?.addEventListener('click', battleCode);

document.getElementById('hero-code-input')?.addEventListener('input', (event) => {
  const digits = event.target.value.replace(/\D/g, '').slice(0, 9);
  event.target.value = digits.replace(/(\d{3})(?=\d)/g, '$1-');
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Tab' && !event.shiftKey) {
    event.preventDefault();
    toggleCodePage();
  }
});

window.addEventListener('load', () => {
  const loader = document.getElementById('startup-loader');
  if (loader) {
    window.setTimeout(() => {
      loader.classList.add('is-hidden');
    }, 3000);
  }
});

updatePlayerHUD();
renderHistoryPage();
loadGameState();

