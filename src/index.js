import Phaser from 'phaser';
import GameScene from './game';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: GameScene,
};

const game = new Phaser.Game(config);