const armourIcons = {
	head: [
		'./icons/armour/head_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	chest: [
		'./icons/armour/chest_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	gloves: [
		'./icons/armour/gloves_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	waist: [
		'./icons/armour/waist_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	legs: [
		'./icons/armour/legs_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	charm: [
		'./icons/armour/charm_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	]
};

const weaponIcons = {
	bow: [
		'./icons/weapons/bow_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	chargeblade: [
		'./icons/weapons/chargeblade_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	dualblades: [
		'./icons/weapons/dualblades_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	greatsword: [
		'./icons/weapons/greatsword_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	gunlance: [
		'./icons/weapons/gunlance_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	hammer: [
		'./icons/weapons/hammer_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	heavybowgun: [
		'./icons/weapons/heavybowgun_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	huntinghorn: [
		'./icons/weapons/huntinghorn_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	insectglaive: [
		'./icons/weapons/insectglaive_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	lance: [
		'./icons/weapons/lance_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	lightbowgun: [
		'./icons/weapons/lightbowgun_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	longsword: [
		'./icons/weapons/longsword_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	switchaxe: [
		'./icons/weapons/switchaxe_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	],
	swordandshield: [
		'./icons/weapons/swordandshield_1.png',
		'',
		'',
		'',
		'',
		'',
		'',
		''
	]
}

const getArmourIcon = (type, rarity = 1) => {
	if (armourIcons.hasOwnProperty(type)) {
		const icons = Object.getOwnPropertyDescriptor(armourIcons, type).value;
		if (icons[rarity - 1] !== '') return icons[rarity - 1];
		return icons[0];
	}
};

const getWeaponIcon = (type, rarity = 1) => {
	const t = type.split('-').join('');
	if (weaponIcons.hasOwnProperty(t)) {
		const icons = Object.getOwnPropertyDescriptor(weaponIcons, t).value;
		if (icons[rarity - 1] !== '') return icons[rarity - 1];
		return icons[0];
	}
}

export { getArmourIcon, getWeaponIcon };
