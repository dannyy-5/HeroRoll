# HeroRoll Data Index

This repository’s game data is driven by the current roll system. The sections below list every weapon, class, elemental variant, stat cap, and power calculation used by the game.

## Power Tiers

- HR: Hyper Rare — 900+
- UR: Ultra Rare — 680+
- SSR: Shiny Super Rare — 470+
- SR: Super Rare — 370+
- R: Rare — 250+
- C: Common — below 250

## Stat Caps and Power Formula

Base stats are rolled within these caps before class bonuses are applied:

- Age: 1000
- Health: 300
- Attack: 100
- Defense: 100
- Regeneration: 100
- Speed: 100
- Critical: 100
- Luck: 100
- Focus: 100

Final power is calculated as:

Power = Health + Attack + Defense + Regeneration + Speed + Critical + Luck + Focus + Weapon Bonus + Element Bonus + Variant Bonus

Bonus rules:

- Weapon bonus: listed in the weapon table below
- SR variant: +90 power
- SSR variant: +180 power
- Element special bonuses:
  - High burst: +20
  - Shielding: +18
  - Healing flow: +14
  - Mobility: listed as a trait but currently no extra formula bonus in this build
  - Critical chain: listed as a trait but currently no extra formula bonus in this build
  - Sustain: listed as a trait but currently no extra formula bonus in this build

## Class List and Bonuses

| Class | Description | Stat Bonus |
| --- | --- | --- |
| Knight / Paladin | Heavily armored defenders who soak damage, protect allies, and use sacred vows to hold points. | +18 Health, +12 Defense |
| Barbarian / Berserker | Unarmored high-damage powerhouses relying on rage and raw physical force. | +18 Attack, +8 Speed |
| Warrior / Mercenary | Balanced melee fighters proficient in various arms with reliable baseline damage. | +10 Attack, +10 Defense |
| Dragoon / Lancer | Elite mobile shock troopers specializing in polearms and leaping charges. | +16 Speed, +8 Attack |
| Ranger / Woodsman | Hybrid scouts tracking targets, utilizing bows, and managing terrain. | +14 Speed, +12 Focus |
| Archer / Marksman | Long-range physical damage dealers focused on high precision volleys. | +16 Critical, +10 Attack |
| Beastmaster | Tamers who deploy wolves, eagles, or armored mounts to control space. | +12 Luck, +10 Focus |
| Wizard / Sorcerer | Academic or innate wielders of heavy elemental or arcane destruction. | +16 Attack, +14 Critical |
| Cleric / Priest | Devoted servants channeling divine energy for targeted healing and party buffs. | +18 Regeneration, +12 Focus |
| Druid / Shaman | Nature spellcasters summoning thorny vines or ancestral spirits. | +16 Regeneration, +12 Health |
| Necromancer | Dark practitioners raising fallen enemies as temporary undead soldiers. | +12 Attack, +16 Luck |
| Rogue / Thief | Stealth experts specializing in sudden ambushes and acquiring hidden resources. | +18 Speed, +10 Critical |
| Bard / Minstrel | Support specialists using inspirational music to boost regional morale. | +16 Luck, +14 Focus |
| Artificer / Engineer | Innovators who construct automated turrets or functional contraptions. | +18 Focus, +10 Defense |
| Noble / Tactician | Command leaders who boost nearby unit effectiveness and manage diplomacy. | +12 Focus, +12 Luck |

## Weapon Index

| Weapon | Power Bonus |
| --- | ---: |
| Rusty Iron Dagger | 5 |
| Novice Wooden Staff | 8 |
| Vanguard Steel Halberd | 20 |
| Rune-Carved Claymore | 25 |
| Shadowstalker Recurve Bow | 28 |
| Blood-Drinking Dagger | 32 |
| Oathkeeper Sun Shield | 35 |
| Archmage Arcane Scepter | 40 |
| Demonic Soul Reaver | 48 |
| Excalibur (Mythic Tier) | 60 |
| Starforged Spear | 52 |
| Moonlit Warhammer | 44 |

## Element Matrix

| Core Element | SR Variant | SSR Variant | Special Effect |
| --- | --- | --- | --- |
| Fire | Magma / Plasma | Sunfire / Astral Ember | High burst |
| Water | Blood / Acid | Abyssal Tide / Primordial Ocean | Healing flow |
| Earth | Metal / Gravity | Titanforge / Planetcore | Shielding |
| Air | Sonic / Vacuum | Stormwake / Black Hole Winds | Mobility |
| Lightning | Laser / Radiation | Eclipse Volt / Nova Pulse | Critical chain |
| Nature | Decay / Venom | Elder Bloom / Worldroot | Sustain |
| Ice | Absolute Zero | Crystal Sky / Frost Sovereign | Crowd control |
| Light | Solar / Judgement | Phoenix Radiance / Dawn Star | Radiant burst |
| Dark | Shadow / Void | Nocturne Rift / Chaos Eclipse | Stealth |
| Arcane | Astral / Rift | Singularity / Godfall Lens | Mana surge |
| Storm | Tempest / Thunderfall | Skybreaker / Celestial Tempest | AoE burst |
| Crystal | Prism / Diamond Heart | Prism Crown / Ether Diamond | Defense spike |

## Variant Names

### SR Variant Names

- Starbound
- Celestial
- Voidglass
- Divine
- Royal

### SSR Variant Names

- Abyssal
- Mythic
- Eclipsed
- Ascended
- Worldbreaker

## Rarity and Variant Rules

- HR: Hyper Rare — 900+ power, maximum tier glow and prestige
- UR: Ultra Rare — 680+ power, elite tier
- SSR: Shiny Super Rare — 470+ power
- SR: Super Rare — 370+ power
- R: Rare — 250+ power
- C: Common — below 250 power

Element variants use the + and ++ markers instead of the older SR/SSR naming, so the small status badge reads + or ++ while the overall character rarity remains C / R / SR / SSR / UR / HR.

## Full Roll Summary

Each hero is generated by:

1. Picking a random name prefix and suffix
2. Picking a random class and weapon
3. Picking a random core element
4. Rolling base stats for each attribute
5. Applying class bonuses
6. Adding weapon power
7. Applying SR or SSR variant bonuses
8. Applying element-based power modifiers
9. Finalizing the total power score and rarity badge

## Quick Reference

- C: Common — 0-249 power
- R: Rare — 250-369 power
- SR: Super Rare — 370-469 power
- SSR: Shiny Super Rare — 470-679 power
- UR: Ultra Rare — 680-899 power
- HR: Hyper Rare — 900+ power

This file is the master reference for the current HeroRoll data set and reflects the values used in the app logic.
