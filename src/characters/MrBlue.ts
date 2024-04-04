import Phaser from 'phaser'
import Chest from '../items/Chest'

import { sceneEvents } from '../events/EventsCenter'

declare global {
	namespace Phaser.GameObjects {
		interface GameObjectFactory {
			mrBlue(x: number, y: number, texture: string, frame?: string | number): MrBlue
		}
	}
}

enum HealthState {
	IDLE,
	DAMAGE,
	DEAD
}

export default class MrBlue extends Phaser.Physics.Arcade.Sprite {
	private healthState = HealthState.IDLE
	private damageTime = 0

	private _health = 3
	private _coins = 0

	private knives?: Phaser.Physics.Arcade.Group
	private activeChest?: Chest
	private direction = 'Left'

	get health() {
		return this._health
	}

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
		super(scene, x, y, texture, frame)

		this.anims.play('walkDown_mrBlue')
	}

	setKnives(knives: Phaser.Physics.Arcade.Group) {
		this.knives = knives
	}

	setChest(chest: Chest) {
		this.activeChest = chest
	}

	handleDamage(dir: Phaser.Math.Vector2) {
		if (this._health <= 0) {
			return
		}

		if (this.healthState === HealthState.DAMAGE) {
			return
		}

		--this._health

		if (this._health <= 0) {
			// TODO: die
			this.healthState = HealthState.DEAD
			//this.anims.play('faune-faint')
			this.setVelocity(0, 0)
		}
		else {
			this.setVelocity(dir.x, dir.y)

			this.setTint(0xff0000)

			this.healthState = HealthState.DAMAGE
			this.damageTime = 0
		}
	}

	private throwKnife() {
		if (!this.knives) {
			return
		}

		const knife = this.knives.get(this.x, this.y, 'knife') as Phaser.Physics.Arcade.Image
		if (!knife) {
			return
		}

		//const parts = this.anims.currentAnim.key.split('-')
		//const direction = parts[2]

		const vec = new Phaser.Math.Vector2(0, 0)

		switch (this.direction) {
			case 'up':
				vec.y = -1
				break

			case 'down':
				vec.y = 1
				break

			case 'left':
				vec.x = -1
				break
			case 'right':

				vec.x = 1

				break
		}

		const angle = vec.angle()

		knife.setActive(true)
		knife.setVisible(true)

		knife.setRotation(angle)

		knife.x += vec.x * 16
		knife.y += vec.y * 16

		knife.setVelocity(vec.x * 300, vec.y * 300)
	}

	preUpdate(t: number, dt: number) {
		super.preUpdate(t, dt)

		switch (this.healthState) {
			case HealthState.IDLE:
				break

			case HealthState.DAMAGE:
				this.damageTime += dt
				if (this.damageTime >= 250) {
					this.healthState = HealthState.IDLE
					this.setTint(0xffffff)
					this.damageTime = 0
				}
				break
		}
	}

	update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
		if (this.healthState === HealthState.DAMAGE
			|| this.healthState === HealthState.DEAD
		) {
			return
		}

		if (!cursors) {
			return
		}

		if (Phaser.Input.Keyboard.JustDown(cursors.space!)) {
			if (this.activeChest) {
				const coins = this.activeChest.open()
				this._coins += coins

				sceneEvents.emit('player-coins-changed', this._coins)
			}
			else {
				this.throwKnife()
			}
			return
		}

		const speed = 100

		const leftDown = cursors.left?.isDown
		const rightDown = cursors.right?.isDown
		const upDown = cursors.up?.isDown
		const downDown = cursors.down?.isDown

		if (leftDown) {
			this.anims.play('walkLeft_mrBlue', true)
			this.setVelocity(-speed, 0)
			this.direction = 'left'
			//this.scaleX = -1
			this.body.offset.x = 24
		}
		else if (rightDown) {
			this.anims.play('walkRight_mrBlue', true)
			this.setVelocity(speed, 0)
			this.direction = 'right'
			//this.scaleX = 1
			this.body.offset.x = 8
		}
		else if (upDown) {
			this.anims.play('walkUp_mrBlue', SVGComponentTransferFunctionElement)
			this.setVelocity(0, -speed)
		}
		else if (downDown) {
			//	this.anims.play('walkDown_mrBlue',true)
			//	this.setVelocity(0, speed)
		}
		else {

			this.anims.play('stop_mrBlue')
			this.setVelocity(0, 0)
		}

		if (leftDown || rightDown || upDown || downDown) {
			this.activeChest = undefined
		}
	}
}

Phaser.GameObjects.GameObjectFactory.register('mrBlue', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number) {
	var sprite = new MrBlue(this.scene, x, y, texture)

	this.displayList.add(sprite)
	this.updateList.add(sprite)

	this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

	sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.8)

	return sprite
})
