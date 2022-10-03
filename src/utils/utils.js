import layer1 from '../assets/layer1.png';
import layer2 from '../assets/layer2.png';
import layer3 from '../assets/layer3.png';
import layer4 from '../assets/layer4.png';
import player from '../assets/player.png';

import projectile from '../assets/projectile.png';
import gears from '../assets/gears.png';

import angler1 from '../assets/angler1.png';
import angler2 from '../assets/angler2.png';
import lucky from '../assets/lucky.png';
import hiveWhale from '../assets/hivewhale.png';
import drone from '../assets/drone.png';

import fireExplosion from '../assets/fireExplosion.png';
import smokeExplosion from '../assets/smokeExplosion.png';

export const playerData = {
    path: player,
};

export const backgroundLayers = [
    {
        name: 'layer1',
        path: layer1,
        speed: 0.1,
    },
    {
        name: 'layer2',
        path: layer2,
        speed: 0.3,
    },
    {
        name: 'layer3',
        path: layer3,
        speed: 0.5,
    },
    {
        name: 'frontLayer',
        path: layer4,
        speed: 1,
    },
];

export const enemyData = [
    {
        name: 'angler1',
        path: angler1,
        width: 228,
        height: 169,
        lives: 5,
        score: 5,
        speed: -0.5,
        addSpead: -0.25,
        maxFrame: 37,
        rows: 3,
        type: 'enemy',
    },
    {
        name: 'angler2',
        path: angler2,
        width: 213,
        height: 165,
        lives: 6,
        score: 6,
        speed: -0.6,
        addSpead: -0.3,
        maxFrame: 37,
        rows: 2,
        type: 'enemy',
    },
    {
        name: 'lucky',
        path: lucky,
        width: 99,
        height: 95,
        lives: 5,
        score: 15,
        speed: -2.65,
        addSpead: -0.75,
        maxFrame: 37,
        rows: 2,
        type: 'lucky',
    },
    {
        name: 'hiveWhale',
        path: hiveWhale,
        width: 400,
        height: 227,
        lives: 20,
        score: 20,
        speed: -1.2,
        addSpead: -0.2,
        maxFrame: 37,
        rows: 1,
        type: 'hive',
    },
    {
        name: 'drone',
        path: drone,
        width: 115,
        height: 95,
        lives: 3,
        score: 3,
        speed: -3.2,
        addSpead: -0.5,
        maxFrame: 37,
        rows: 2,
        type: 'drone',
    },
];

export const projectileData = {
    path: projectile,
};

export const gearsData = {
    path: gears,
    rows: 3,
    columns: 3,
    size: 50,
    sizeModifier: 0.5,
    addSizeModifier: 0.5,
};

export const explosionData = [
    {
        name: 'fireExplosion',
        path: fireExplosion,
        maxFrame: 8,
        width: 200,
        height: 200,
    },
    {
        name: 'smokeExplosion',
        path: smokeExplosion,
        maxFrame: 8,
        width: 200,
        height: 200,
    },
];
