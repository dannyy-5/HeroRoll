const STORAGE_KEY = 'heroroll-save-v1';

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

function finalizeCharacter() {
  const finalName = getRandomItem(prefixes) + getRandomItem(suffixes);
  const selectedClass = getRandomItem(classesData);
  const finalAge = rollRareBiasedStat(1000);
  const finalWeaponObj = getRandomItem(weaponsData);
  const targetElementPair = getRandomItem(elementMatrix);
  const variantRoll = Math.random();
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

  let totalCombatPower = hp + atk + def + reg + speed + crit + luck + focus;
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
    name: finalHeroName,
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

  addHeroToHistory(finalHeroName, selectedClass.name, finalElementName, isSR, isSSR, totalCombatPower, renderTier, finalWeaponObj.name, renderRank);

  const button = document.getElementById('roll-button');
  button.disabled = false;
  button.innerText = 'PRESS SPACE TO ROLL';
  isRolling = false;
  saveGameState();
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

window.addEventListener('load', () => {
  const loader = document.getElementById('startup-loader');
  if (loader) {
    window.setTimeout(() => {
      loader.classList.add('is-hidden');
    }, 1200);
  }
});

updatePlayerHUD();
renderHistoryPage();
loadGameState();

