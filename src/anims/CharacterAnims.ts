import Phaser from 'phaser'

const createCharacterAnims = (anims: Phaser.Animations.AnimationManager) => {
	anims.create({
		key: 'faune-idle-down',
		frames: [{ key: 'faune', frame: 'walk-down-3.png' }]
	})

	anims.create({
		key: 'faune-idle-up',
		frames: [{ key: 'faune', frame: 'walk-up-3.png' }]
	})

	anims.create({
		key: 'faune-idle-side',
		frames: [{ key: 'faune', frame: 'walk-side-3.png' }]
	})

	anims.create({
		key: 'faune-run-down',
		frames: anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png' }),
		repeat: -1,
		frameRate: 15
	})

	anims.create({
		key: 'faune-run-up',
		frames: anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png' }),
		repeat: -1,
		frameRate: 15
	})

	anims.create({
		key: 'faune-run-side',
		frames: anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png' }),
		repeat: -1,
		frameRate: 15
	})

	anims.create({
		key: 'faune-faint',
		frames: anims.generateFrameNames('faune', { start: 1, end: 4, prefix: 'faint-', suffix: '.png' }),
		frameRate: 15
	})
}


const createCharAnims = (anims: Phaser.Animations.AnimationManager, entity,) => {

	anims.create({
		key: 'walkLeft_' + entity,
		frames: anims.generateFrameNumbers(entity, { frames: [117, 118, 119, 120, 121, 122, 123, 124, 125] }),
		frameRate: 12,
		repeat: -1
	});

	anims.create({
		key: 'walkRight_' + entity,
		frames: anims.generateFrameNumbers(entity, { frames: [143, 144, 145, 146, 147, 148, 149, 150, 151] }),
		frameRate: 12,
		repeat: -1
	});

	anims.create({
		key: 'walkUp_' + entity,
		frames: anims.generateFrameNumbers(entity, { frames: [104, 105, 106, 107, 108, 109, 110, 110, 112] }),
		frameRate: 12,
		repeat: -1
	});

	anims.create({
		key: 'walkDown_' + entity,
		frames: anims.generateFrameNumbers(entity, { frames: [130, 131, 132, 133, 134, 135, 136, 137, 138] }),
		frameRate: 12,
		repeat: -1
	});

	anims.create({
		key: 'stop_' + entity,
		frames: anims.generateFrameNumbers(entity, { frames: [130, 130, 130, 130, 130, 130, 130, 130, 138] }),
		frameRate: 12,
		repeat: -1
	});

	anims.create({
		key: 'hurt_' + entity,
		frames: anims.generateFrameNumbers(entity, { frames: [260, 261, 262, 263, 264, 265] }),
		frameRate: 12,
		repeat: 0
	});
}

export {
	createCharacterAnims,
	createCharAnims,
}
