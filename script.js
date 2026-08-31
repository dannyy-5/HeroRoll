// CONFIGURATION MATRICES & ARRAYS
const prefixes = ["Gorgon", "Shadow", "Light", "Iron", "Storm", "Frost", "Flame", "Void", "Swift", "Apex", "Dusk", "Dread", "Ember", "Rune", "Wraith"];
const suffixes = ["Thorne", "weaver", "heart", "breaker", "fury", "strider", "gaze", "bane", "shard", "bound", "fall", "fist", "forge", "crest"];

// Expanded Weapon Catalog with Unique Power Contributions
const weaponsData = [
    { name: "Rusty Iron Dagger", bonus: 5 },
    { name: "Novice Wooden Staff", bonus: 8 },
    { name: "Vanguard Steel Halberd", bonus: 20 },
    { name: "Rune-Carved Claymore", bonus: 25 },
    { name: "Shadowstalker Recurve Bow", bonus: 28 },
    { name: "Blood-Drinking Dagger", bonus: 32 },
    { name: "Oathkeeper Sun Shield", bonus: 35 },
    { name: "Archmage Arcane Scepter", bonus: 40 },
    { name: "Demonic Soul Reaver", bonus: 48 },
    { name: "Excalibur (Mythic Tier)", bonus: 60 }
];

const elementMatrix = [
    { core: "Fire", ex: "Magma / Plasma" },
    { core: "Water", ex: "Blood / Acid" },
    { core: "Earth", ex: "Metal / Gravity" },
    { core: "Air", ex: "Sonic / Vacuum" },
    { core: "Lightning", ex: "Laser / Radiation" },
    { core: "Nature", ex: "Decay / Venom" },
    { core: "Ice", ex: "Absolute Zero" },
    { core: "Light", ex: "Solar / Judgement" },
    { core: "Dark", ex: "Shadow / Void" }
];

const classesData = [
    { name: "Knight / Paladin", desc: "Heavily armored defenders who soak damage, protect allies, and use sacred vows to hold points." },
    { name: "Barbarian / Berserker", desc: "Unarmored high-damage powerhouses relying on rage and raw physical force." },
    { name: "Warrior / Mercenary", desc: "Balanced melee fighters proficient in various arms with reliable baseline damage." },
    { name: "Dragoon / Lancer", desc: "Elite mobile shock troopers specializing in polearms and leaping charges." },
    { name: "Ranger / Woodsman", desc: "Hybrid scouts tracking targets, utilizing bows, and managing terrain." },
    { name: "Archer / Marksman", desc: "Long-range physical damage dealers focused on high precision volleys." },
    { name: "Beastmaster", desc: "Tamers who deploy wolves, eagles, or armored mounts to control space." },
    { name: "Wizard / Sorcerer", desc: "Academic or innate wielders of heavy elemental or arcane destruction." },
    { name: "Cleric / Priest", desc: "Devoted servants channeling divine energy for targeted healing and party buffs." },
    { name: "Druid / Shaman", desc: "Nature spellcasters summoning thorny vines or ancestral spirits." },
    { name: "Necromancer", desc: "Dark practitioners raising fallen enemies as temporary undead soldiers." },
    { name: "Rogue / Thief", desc: "Stealth experts specializing in sudden ambushes and acquiring hidden resources." },
    { name: "Bard / Minstrel", desc: "Support specialists using inspirational music to boost regional morale." },
    { name: "Artificer / Engineer", desc: "Innovators who construct automated turrets or functional contraptions." },
    { name: "Noble / Tactician", desc: "Command leaders who boost nearby unit effectiveness and manage diplomacy." }
];

const STORAGE_KEY = 'heroroll-save-v1';

let isRolling = false;
let highestPowerEver = 0;
let historyEntries = [];

const canvas = document.getElementById('diceCanvas');
const ctx = canvas.getContext('2d');
let diceArray = [];
let animationId = null;

function getDefaultHeroState() {
    return {
        name: 'Ready to Roll',
        className: 'Press Space to roll a random fantasy champion.',
        classTitle: '-',
        description: 'Press Space to roll a random fantasy champion.',
        element: '-',
        weapon: '-',
        age: '-',
        health: '-',
        attack: '-',
        defense: '-',
        regeneration: '-',
        power: '-',
        tierClass: 'rarity-common',
        isEx: false,
        arenaPromptVisible: true
    };
}

function saveGameState() {
    const state = {
        highestPowerEver,
        strongestHero: document.getElementById('eq-name').innerText !== '-' ? {
            name: document.getElementById('eq-name').innerText,
            className: document.getElementById('eq-class').innerText,
            element: document.getElementById('eq-element').innerText,
            weapon: document.getElementById('eq-weapon').innerText,
            age: document.getElementById('eq-age').innerText,
            power: document.getElementById('eq-power').innerText,
            tierClass: document.getElementById('eq-power').classList.contains('rarity-legendary') ? 'rarity-legendary' :
                document.getElementById('eq-power').classList.contains('rarity-epic') ? 'rarity-epic' :
                document.getElementById('eq-power').classList.contains('rarity-rare') ? 'rarity-rare' : 'rarity-common'
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
            power: document.getElementById('total-power').innerText,
            tierClass: document.getElementById('total-power').classList.value.replace('power-value', '').trim() || 'rarity-common',
            isEx: document.getElementById('element-tier').classList.contains('ex-active'),
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
    document.getElementById('total-power').innerText = hero.power;
    document.getElementById('total-power').className = 'power-value ' + hero.tierClass;

    const tierBadge = document.getElementById('element-tier');
    tierBadge.innerText = hero.isEx ? 'EX' : 'Core';
    tierBadge.classList.toggle('ex-active', hero.isEx);
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
    const list = document.getElementById('history-list');
    list.innerHTML = '';

    if (!historyEntries.length) {
        list.innerHTML = '<div class="history-empty">No heroes rolled yet...</div>';
        return;
    }

    historyEntries.forEach((entry) => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
            <div class="hist-meta">
                <div class="hist-name">${entry.name}</div>
                <div class="hist-sub">${entry.subLabel} · ${entry.className}</div>
            </div>
            <div class="hist-power ${entry.rarity}">${entry.power}</div>
        `;
        list.appendChild(item);
    });
}

function loadGameState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        const state = JSON.parse(raw);
        if (typeof state.highestPowerEver === 'number') highestPowerEver = state.highestPowerEver;
        if (Array.isArray(state.history)) historyEntries = state.history;

        if (state.currentHero) {
            renderHeroCard({
                ...getDefaultHeroState(),
                ...state.currentHero,
                tierClass: state.currentHero.tierClass || 'rarity-common',
                isEx: Boolean(state.currentHero.isEx),
                arenaPromptVisible: state.currentHero.arenaPromptVisible !== false
            });
        }

        if (state.strongestHero) {
            renderStrongestHero(state.strongestHero);
        } else {
            renderStrongestHero(null);
        }

        renderHistoryList();
    } catch (error) {
        console.warn('Failed to load saved HeroRoll data:', error);
        localStorage.removeItem(STORAGE_KEY);
    }
}

window.addEventListener('keydown', (e) => {
    if (e.code === "Space") {
        e.preventDefault(); 
        startRollSequence();
    }
});
// CANVAS DICE RENDER MECHANICS
class BirdEyeDice {
    constructor(x, y) {
        this.x = x; this.y = y; this.size = 20;
        this.vx = (Math.random() * 8) - 4; this.vy = (Math.random() * 6) - 3;
        this.angle = Math.random() * Math.PI * 2; this.spinSpeed = (Math.random() * 0.4) - 0.2;
        this.height3D = 35; this.gravity = 1.8;
        this.currentValue = Math.floor(Math.random() * 6) + 1;
    }
    update() {
        this.x += this.vx; this.y += this.vy; this.angle += this.spinSpeed;
        if (this.x < this.size) { this.x = this.size; this.vx *= -0.6; }
        if (this.x > canvas.width - this.size) { this.x = canvas.width - this.size; this.vx *= -0.6; }
        if (this.y < this.size) { this.y = this.size; this.vy *= -0.6; }
        if (this.y > canvas.height - this.size) { this.y = canvas.height - this.size; this.vy *= -0.6; }
        if (this.height3D > 0) {
            this.height3D -= this.gravity; this.currentValue = Math.floor(Math.random() * 6) + 1;
        } else {
            this.height3D = 0; this.vx *= 0.85; this.vy *= 0.85; this.spinSpeed *= 0.85;
        }
    }
    draw() {
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(this.x + 2, this.y + 2, this.size, this.size);
        ctx.translate(this.x, this.y - this.height3D);
        ctx.rotate(this.angle);
        ctx.fillStyle = '#8f1d1d'; ctx.fillRect(-this.size/2 + 2, -this.size/2 + 2, this.size, this.size);
        ctx.fillStyle = '#d93838'; ctx.strokeStyle = '#5c1010'; ctx.lineWidth = 1.5;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size); ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.fillStyle = '#ffffff';
        const offset = this.size / 4; const val = this.currentValue;
        if (val === 1 || val === 3 || val === 5) drawPip(0, 0);
        if (val === 2 || val === 3 || val === 4 || val === 5 || val === 6) { drawPip(-offset, -offset); drawPip(offset, offset); }
        if (val === 4 || val === 5 || val === 6) { drawPip(offset, -offset); drawPip(-offset, offset); }
        if (val === 6) { drawPip(-offset, 0); drawPip(offset, 0); }
        ctx.restore();
    }
}

function drawPip(x, y) {
    ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
}

function updateDiceEngine() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let motion = false;
    diceArray.forEach(d => {
        d.update(); d.draw();
        if (Math.abs(d.vx) > 0.08 || d.height3D > 0) motion = true;
    });
    if (motion) animationId = requestAnimationFrame(updateDiceEngine);
}
// GACHA MATH CURVES & ACTIVE LEADERBOARD SYNC
function rollRareBiasedStat(maxCap) {
    let baseAvg = (Math.random() + Math.random() + Math.random() + Math.random()) / 4;
    let curvedFactor = Math.pow(baseAvg, 1.8);
    let finalVal = Math.floor(curvedFactor * maxCap);
    return Math.max(Math.floor(maxCap * 0.08), finalVal);
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function startRollSequence() {
    if (isRolling) return;
    isRolling = true;
    
    document.getElementById("arena-prompt").style.display = "none";
    const button = document.getElementById("roll-button");
    button.disabled = true; button.innerText = "ROLLING...";

    diceArray = [];
    for(let i=0; i<4; i++) {
        diceArray.push(new BirdEyeDice(80 + (i * 80), 35 + (Math.random() * 25)));
    }
    if (animationId) cancelAnimationFrame(animationId);
    updateDiceEngine();

    let cycles = 0; const maxCycles = 20;
    const shuffleInterval = setInterval(() => {
        document.getElementById("hero-name").innerText = getRandomItem(prefixes) + getRandomItem(suffixes);
        let randomClass = getRandomItem(classesData);
        document.getElementById("stat-Class").innerText = randomClass.name;
        document.getElementById("hero-class-desc").innerText = randomClass.desc;
        document.getElementById("stat-Weapon").innerText = getRandomItem(weaponsData).name;
        document.getElementById("stat-Age").innerText = Math.floor(Math.random() * 950) + 10;
        
        let randElem = getRandomItem(elementMatrix);
        document.getElementById("stat-Element").innerText = Math.random() > 0.8 ? randElem.ex : randElem.core;
        
        document.getElementById("stat-Health").innerText = Math.floor(Math.random() * 250) + 20;
        document.getElementById("stat-Attack").innerText = Math.floor(Math.random() * 80) + 10;
        document.getElementById("stat-Defense").innerText = Math.floor(Math.random() * 80) + 10;
        document.getElementById("stat-Regeneration").innerText = Math.floor(Math.random() * 80) + 10;

        cycles++;
        if (cycles >= maxCycles) {
            clearInterval(shuffleInterval);
            finalizeCharacter();
        }
    }, 60);
}

function finalizeCharacter() {
    const finalName = getRandomItem(prefixes) + getRandomItem(suffixes);
    const selectedClass = getRandomItem(classesData);
    const finalAge = rollRareBiasedStat(1000); // Rare exponential distribution up to 1000 years
    const finalWeaponObj = getRandomItem(weaponsData);
    
    let targetElementPair = getRandomItem(elementMatrix);
    let isEXMode = Math.random() < 0.20; 
    let finalElementName = isEXMode ? targetElementPair.ex : targetElementPair.core;

    document.getElementById("hero-name").innerText = finalName;
    document.getElementById("stat-Class").innerText = selectedClass.name;
    document.getElementById("hero-class-desc").innerText = selectedClass.desc;
    document.getElementById("stat-Age").innerText = finalAge;
    document.getElementById("stat-Weapon").innerText = `${finalWeaponObj.name} (+${finalWeaponObj.bonus} Power)`;
    document.getElementById("stat-Element").innerText = finalElementName;

    const tBadge = document.getElementById("element-tier");
    if(isEXMode) {
        tBadge.innerText = "EX"; tBadge.classList.add("ex-active");
    } else {
        tBadge.innerText = "Core"; tBadge.classList.remove("ex-active");
    }

    const hp = rollRareBiasedStat(300);
    const atk = rollRareBiasedStat(100);
    const def = rollRareBiasedStat(100);
    const reg = rollRareBiasedStat(100);

    document.getElementById("stat-Health").innerText = hp;
    document.getElementById("stat-Attack").innerText = atk;
    document.getElementById("stat-Defense").innerText = def;
    document.getElementById("stat-Regeneration").innerText = reg;

    // SCALING COMBAT CEILING CALCULATIONS
    let totalCombatPower = hp + atk + def + reg;
    totalCombatPower += finalWeaponObj.bonus; // Direct weapon score addition
    if(isEXMode) totalCombatPower += 50; 

    const powerEl = document.getElementById("total-power");
    powerEl.innerText = totalCombatPower;

    powerEl.className = "power-value"; 
    let tierClass = "rarity-common";

    if (totalCombatPower >= 470) tierClass = "rarity-legendary";
    else if (totalCombatPower >= 370) tierClass = "rarity-epic";
    else if (totalCombatPower >= 250) tierClass = "rarity-rare";
    
    powerEl.classList.add(tierClass);

    const strongestHero = {
        name: finalName,
        className: selectedClass.name,
        element: finalElementName,
        weapon: finalWeaponObj.name,
        age: `${finalAge} yrs`,
        power: totalCombatPower,
        tierClass
    };

    // CHECK HALL OF FAME LEADERBOARD (Equipped Panel Update)
    if (totalCombatPower > highestPowerEver) {
        highestPowerEver = totalCombatPower;
        renderStrongestHero(strongestHero);
    }

    addHeroToHistory(finalName, selectedClass.name, finalElementName, isEXMode, totalCombatPower, tierClass);

    const button = document.getElementById("roll-button");
    button.disabled = false; button.innerText = "PRESS SPACE TO ROLL";
    isRolling = false;
    saveGameState();
}

function addHeroToHistory(name, charClass, element, isEX, power, rarity) {
    const subLabel = isEX ? `[EX] ${element}` : element;
    historyEntries.unshift({
        name,
        className: charClass,
        subLabel,
        power,
        rarity
    });
    historyEntries = historyEntries.slice(0, 12);
    renderHistoryList();
    saveGameState();
}

loadGameState();
