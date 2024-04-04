import Phaser from 'phaser'

import { debugDraw } from '../utils/debug'
import { createLizardAnims } from '../anims/EnemyAnims'
import { createCharacterAnims, createCharAnims } from '../anims/CharacterAnims'
import { createChestAnims } from '../anims/TreasureAnims'

import Lizard from '../enemies/Lizard'

//import '../characters/Faune'
import '../characters/MrBlue'

//import Faune from '../characters/Faune'
import MrBlue from '../characters/MrBlue'
import { sceneEvents } from '../events/EventsCenter'
import Chest from '../items/Chest'

export default class Game extends Phaser.Scene {
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	//private faune!: Faune
	private mrBlue!: MrBlue

	private knives!: Phaser.Physics.Arcade.Group
	private lizards!: Phaser.Physics.Arcade.Group

	private playerLizardsCollider?: Phaser.Physics.Arcade.Collider
	tileset: string[]
	wallsLayer: Phaser.Tilemaps.TilemapLayer

	constructor() {
		super('game')
	}

	preload() {
		this.cursors = this.input.keyboard.createCursorKeys()
	}

	create() {
		this.scene.run('game-ui')
		this.physics.world.gravity.y = 3000;

		//createCharacterAnims(this.anims)
		createCharAnims(this.anims, 'mrBlue')
		createLizardAnims(this.anims)
		createChestAnims(this.anims)

		this.tileset = [
			'3ca3ff0a-8fa9-46f6-8fb7-ced9dc94c8ce',
			'4bac9297-431b-4e3b-b855-bf463b385aa5',
			'b2e9a9db-610c-43f6-9d6f-712319d1da84',
			'bb66d4f1-02d1-466d-b0cb-14e231bfce93'
		]

		const map = this.make.tilemap({ key: 'Level001' })
		map.addTilesetImage('3ca3ff0a-8fa9-46f6-8fb7-ced9dc94c8ce')
		map.addTilesetImage('4bac9297-431b-4e3b-b855-bf463b385aa5')
		map.addTilesetImage('b2e9a9db-610c-43f6-9d6f-712319d1da84')
		map.addTilesetImage('bb66d4f1-02d1-466d-b0cb-14e231bfce93')

		this.knives = this.physics.add.group({
			classType: Phaser.Physics.Arcade.Image,
			maxSize: 3
		})

		//this.faune  = this.add.faune(128, 128, 'faune')
		this.mrBlue = this.add.mrBlue(128, 128, 'mrBlue', 100).setDepth(6)
		//this.faune.setKnives(this.knives)
		this.mrBlue.setKnives(this.knives)

		map.createLayer('Background', this.tileset)
		const wallsLayer = map.createLayer('Ground', this.tileset)
		wallsLayer.setCollisionByProperty({ collides: true })
		map.createLayer('Tile Layer 2', this.tileset)
		map.createLayer('Tile Layer 3', this.tileset)

		const chests = this.physics.add.staticGroup({
			classType: Chest
		})
/* 		const chestsLayer = map.getObjectLayer('Chests')
		chestsLayer.objects.forEach(chestObj => {
			chests.get(chestObj.x! + chestObj.width! * 0.5, chestObj.y! - chestObj.height! * 0.5, 'treasure')
		}) */

		//this.cameras.main.startFollow(this.faune, true)
		this.cameras.main.startFollow(this.mrBlue, true)

		this.lizards = this.physics.add.group({
			classType: Lizard,
			createCallback: (go) => {
				const lizGo = go as Lizard
				lizGo.body.onCollide = true
			}
		})

/* 		const lizardsLayer = map.getObjectLayer('Lizards')

		lizardsLayer.objects.forEach(lizObj => {
			this.lizards.get(lizObj.x! + lizObj.width! * 0.5, lizObj.y! - lizObj.height! * 0.5, 'lizard')
		}) */

		//	this.physics.add.collider(this.faune, wallsLayer)
		this.physics.add.collider(this.mrBlue, wallsLayer)

		this.physics.add.collider(this.lizards, wallsLayer)

		//	this.physics.add.collider(this.faune, chests, this.handlePlayerChestCollision, undefined, this)

		this.physics.add.collider(this.knives, this.wallsLayer, this.handleKnifeWallCollision, undefined, this)
		this.physics.add.collider(this.knives, this.lizards, this.handleKnifeLizardCollision, undefined, this)

		//this.playerLizardsCollider = this.physics.add.collider(this.lizards, this.faune, this.handlePlayerLizardCollision, undefined, this)
	}

	private handlePlayerChestCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
		const chest = obj2 as Chest
		//	this.faune.setChest(chest)
		this.mrBlue.setChest(chest)
	}

	private handleKnifeWallCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
		this.knives.killAndHide(obj1)
	}

	private handleKnifeLizardCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
		this.knives.killAndHide(obj1)
		this.lizards.killAndHide(obj2)
	}

	private handlePlayerLizardCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
		const lizard = obj2 as Lizard

		//const dx = this.faune.x - lizard.x
		//const dy = this.faune.y - lizard.y

		const dx = this.mrBlue.x - lizard.x
		const dy = this.mrBlue.y - lizard.y
		const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

		//	this.faune.handleDamage(dir)
		this.mrBlue.handleDamage(dir)

		//	sceneEvents.emit('player-health-changed', this.faune.health)
		sceneEvents.emit('player-health-changed', this.mrBlue.health)

		/* 		if (this.faune.health <= 0)
				{
					this.playerLizardsCollider?.destroy()
				} */

		if (this.mrBlue.health <= 0) {
			this.playerLizardsCollider?.destroy()
		}
	}

	update(t: number, dt: number) {
		/* 		if (this.faune)
				{
					this.faune.update(this.cursors)
				} */

		if (this.mrBlue) {
			this.mrBlue.update(this.cursors)
		}
	}
}
