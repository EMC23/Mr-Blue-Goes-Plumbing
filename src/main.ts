import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import GameUI from './scenes/GameUI'

export default new Phaser.Game({
	type: Phaser.AUTO,
	width: 640,
	height: 500,
	physics: {
		default: 'arcade',
		arcade: {
					debug: true
		}
	},
	scene: [Preloader, Game, GameUI],
	scale: {
		zoom: 1
	}
})
