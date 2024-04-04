import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super('preloader')
	}

	preload()
	{
		this.load.image('tiles', 'tiles/dungeon_tiles_extruded.png')

		this.load.image('3ca3ff0a-8fa9-46f6-8fb7-ced9dc94c8ce', 'tiles/3ca3ff0a-8fa9-46f6-8fb7-ced9dc94c8ce.png')
		this.load.image('4bac9297-431b-4e3b-b855-bf463b385aa5', 'tiles/4bac9297-431b-4e3b-b855-bf463b385aa5.png')
		this.load.image('b2e9a9db-610c-43f6-9d6f-712319d1da84', 'tiles/b2e9a9db-610c-43f6-9d6f-712319d1da84.png')
		this.load.image('bb66d4f1-02d1-466d-b0cb-14e231bfce93', 'tiles/bb66d4f1-02d1-466d-b0cb-14e231bfce93.png')

		this.load.tilemapTiledJSON('Level001', 'tiles/Level001.json')

		//this.load.atlas('faune', 'character/fauna.png', 'character/fauna.json')
		this.load.spritesheet('mrBlue', 'character/1078.png', { frameWidth: 64, frameHeight: 64 });
		this.load.atlas('lizard', 'enemies/lizard.png', 'enemies/lizard.json')
		this.load.atlas('treasure', 'items/treasure.png', 'items/treasure.json')

		this.load.image('ui-heart-empty', 'ui/ui_heart_empty.png')
		this.load.image('ui-heart-full', 'ui/ui_heart_full.png')

		this.load.image('knife', 'weapons/weapon_knife.png')
	}

	create()
	{
		this.scene.start('game')
	}
}
