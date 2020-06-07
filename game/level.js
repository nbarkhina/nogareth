define(["require", "exports", "./tile", "./gameobject", "./enemy", "./data"], function (require, exports, tile_1, gameobject_1, enemy_1, data_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Level = void 0;
    class Level {
        constructor(levelData, // level data
        tileset, // tile set
        o, // object set
        no, gareth) {
            this.songID = -1;
            //link player to this object, and vice versa
            this.player = gareth;
            gareth.currentLevel = this;
            this.objectset = o;
            this.tileMap = [];
            this.tileObjects = [];
            this.objectArray = [];
            this.objectSize = 0;
            this.enemyArray = [];
            this.enemySize = 0;
            // Read in tile map and scripts
            // Split the level file by line
            let lines = levelData.split(/\r?\n/);
            var wh = lines[0].split(/\s/);
            this.width = Number(wh[0]);
            this.height = Number(wh[1]);
            //2-pass loop, first loop just fill out the space with null otherwise x/y are mixed up
            for (var i = 0; i < this.height; i++) {
                var tiles = [];
                var tileObjects = [];
                for (var j = 0; j < this.width; j++) {
                    tiles.push(null);
                    tileObjects.push(null);
                }
                this.tileMap.push(tiles);
                this.tileObjects.push(tileObjects);
            }
            // Next *height* lines are tile data
            for (var i = 0; i < this.height; i++) {
                let cellData = lines[i + 1].split(/\s/);
                var tiles = [];
                var tileObjects = [];
                for (var j = 0; j < this.width; j++) {
                    let cell = cellData[j];
                    // First three characters of cell is the tile ID
                    let tileID = Number(cell.substring(0, 3));
                    this.tileMap[j][i] = tileID;
                    this.tileObjects[j][i] = new tile_1.Tile(j * data_1.CONSTANTS.TileWidth, i * data_1.CONSTANTS.TileHeight, tileID, tileset, this);
                    // char 3 is for objects
                    let objectID = cell.charCodeAt(3) - 'a'.charCodeAt(0);
                    if (objectID >= 0 && objectID < no) {
                        this.createObject(j * data_1.CONSTANTS.TileWidth, i * data_1.CONSTANTS.TileHeight, objectID);
                    }
                    // char 4 indicates if there's an enemy
                    let enemyID = cell.charCodeAt(4) - 'a'.charCodeAt(0);
                    if ((enemyID >= 0 && enemyID < 2) || enemyID == 3) {
                        this.createEnemy(j * data_1.CONSTANTS.TileWidth, i * data_1.CONSTANTS.TileHeight, enemyID);
                    }
                }
            }
            // Read in Scripts and stuff
            var ins = null;
            var tx = -1, ty = -1;
            var immediate = false;
            var scriptTile;
            // create a temporary fake tile to execute immediate instructions
            let tempTile = new tile_1.Tile(-1, -1, this.tileMap[0][0], tileset, this);
            for (var i = this.height + 1; i < lines.length; i++) {
                let line = lines[i].trim();
                if (line == '' || line.startsWith('//')) {
                    continue;
                }
                let tokens = line.split(/\s+/);
                switch (tokens[0]) {
                    case "Immediate":
                        immediate = true;
                        tx = 0;
                        ty = 0;
                        scriptTile = tempTile;
                        continue;
                    case "Script":
                        tx = Number(tokens[1]);
                        ty = Number(tokens[2]);
                        scriptTile = this.tileObjects[tx][ty];
                        continue;
                    case "SetState":
                        var ss_inst = new tile_1.set_state_instr();
                        ss_inst.id = data_1.CONSTANTS.ScriptInstrType.SetState;
                        ss_inst.x = Number(tokens[1]);
                        ss_inst.y = Number(tokens[2]);
                        ss_inst.newState = Number(tokens[3]);
                        ins = ss_inst;
                        break;
                    case "SetStateTemp":
                        var sst_inst = new tile_1.set_state_temp_instr();
                        sst_inst.id = data_1.CONSTANTS.ScriptInstrType.SetStateTemp;
                        sst_inst.x = Number(tokens[1]);
                        sst_inst.y = Number(tokens[2]);
                        sst_inst.newState1 = Number(tokens[3]);
                        sst_inst.newState2 = Number(tokens[4]);
                        ins = sst_inst;
                        break;
                    case "ToggleState":
                        var ts_inst = new tile_1.toggle_state_instr();
                        ts_inst.id = data_1.CONSTANTS.ScriptInstrType.ToggleState;
                        ts_inst.x = Number(tokens[1]);
                        ts_inst.y = Number(tokens[2]);
                        ts_inst.newState1 = Number(tokens[3]);
                        ts_inst.newState2 = Number(tokens[4]);
                        ts_inst.time = Number(tokens[5]);
                        ts_inst.delay = Number(tokens[6]);
                        ins = ts_inst;
                        break;
                    case "Teleport":
                        var tp_inst = new tile_1.teleport_instr();
                        tp_inst.id = data_1.CONSTANTS.ScriptInstrType.Teleport;
                        tp_inst.tile_x = Number(tokens[1]);
                        tp_inst.tile_y = Number(tokens[2]);
                        ins = tp_inst;
                        break;
                    case "PlaySound":
                        var ps_inst = new tile_1.play_sound_instr();
                        ps_inst.id = data_1.CONSTANTS.ScriptInstrType.PlaySound;
                        ps_inst.sound_id = Number(tokens[1]);
                        ins = ps_inst;
                        break;
                    case "Jump":
                        var j_inst = new tile_1.jump_instr();
                        j_inst.id = data_1.CONSTANTS.ScriptInstrType.Jump;
                        j_inst.howFar = Number(tokens[1]);
                        ins = j_inst;
                        break;
                    case "JumpIfEqual":
                        var je_inst = new tile_1.jump_if_equal_instr();
                        je_inst.id = data_1.CONSTANTS.ScriptInstrType.JumpIfEqual;
                        je_inst.x = Number(tokens[1]);
                        je_inst.y = Number(tokens[2]);
                        je_inst.state = Number(tokens[3]);
                        je_inst.howFar = Number(tokens[4]);
                        ins = je_inst;
                        break;
                    case "JumpIfNotEqual":
                        var jne_inst = new tile_1.jump_if_not_equal_instr();
                        jne_inst.id = data_1.CONSTANTS.ScriptInstrType.JumpIfNotEqual;
                        jne_inst.x = Number(tokens[1]);
                        jne_inst.y = Number(tokens[2]);
                        jne_inst.state = Number(tokens[3]);
                        jne_inst.howFar = Number(tokens[4]);
                        ins = jne_inst;
                        break;
                    case "Lights":
                        var l_inst = new tile_1.lights_instr();
                        l_inst.id = data_1.CONSTANTS.ScriptInstrType.Lights;
                        l_inst.on_or_off = Boolean(Number(tokens[1]));
                        ins = l_inst;
                        break;
                    case "PlayMusic":
                        var pm_inst = new tile_1.play_music_instr();
                        pm_inst.id = data_1.CONSTANTS.ScriptInstrType.PlayMusic;
                        pm_inst.music_id = Number(tokens[1]);
                        ins = pm_inst;
                        break;
                    case "LoadLevel":
                        var ll_inst = new tile_1.load_level_instr();
                        ll_inst.id = data_1.CONSTANTS.ScriptInstrType.LoadLevel;
                        ll_inst.filename = tokens[1];
                        ins = ll_inst;
                        break;
                    case "TextBox":
                        var tb_inst = new tile_1.text_box_instr();
                        tb_inst.id = data_1.CONSTANTS.ScriptInstrType.TextBox;
                        tb_inst.text = line.substr(tokens[0].length + 1);
                        ins = tb_inst;
                        break;
                    case "WinGame":
                        var win_inst = new tile_1.win_game_instr();
                        win_inst.id = data_1.CONSTANTS.ScriptInstrType.WinGame;
                        ins = win_inst;
                        break;
                    case "RestoreHealth":
                        var rh_inst = new tile_1.restore_health_instr();
                        rh_inst.id = data_1.CONSTANTS.ScriptInstrType.RestoreHealth;
                        ins = rh_inst;
                        break;
                    case "End":
                        scriptTile.scriptLoaded = true;
                        scriptTile.numInstructions = scriptTile.script.length;
                        if (immediate) {
                            scriptTile.processScript(scriptTile);
                            immediate = false;
                        }
                        // Reset vars as sanity check
                        tx = -1;
                        ty = -1;
                        scriptTile = null;
                        ins = null;
                        continue;
                }
                scriptTile.script.push(ins);
            }
        }
        getTile(x, y) {
            let tempX = Math.floor(x / 40);
            let tempY = Math.floor(y / 40);
            return this.tileMap[tempX][tempY];
        }
        getTileObject(x, y) {
            let tempX = Math.floor(x / 40);
            let tempY = Math.floor(y / 40);
            return this.tileObjects[tempX][tempY];
        }
        createObject(x, y, oid) {
            let gameObject = new gameobject_1.GameObject(x, y, oid, this.objectset, this);
            this.objectArray.push(gameObject);
            this.objectSize = this.objectArray.length;
        }
        createEnemy(x, y, enemyId) {
            var enemy;
            if (enemyId == 0)
                enemy = new enemy_1.Enemy(x, y, enemyId, data_1.ALL_BOBS.GreyZombie, this);
            if (enemyId == 1)
                enemy = new enemy_1.Enemy(x, y, enemyId, data_1.ALL_BOBS.RedZombie, this);
            if (enemyId == 3)
                enemy = new enemy_1.Enemy(x, y, enemyId, data_1.ALL_BOBS.Sluggo, this);
            this.enemyArray.push(enemy);
            this.enemySize = this.enemyArray.length;
        }
        updateObjectList() {
            for (var i = 0; i < this.objectSize; i++) {
                if (!this.objectArray[i].alive) {
                    for (var j = i; j < this.objectSize - 1; j++) {
                        this.objectArray[j] = this.objectArray[j + 1];
                    }
                    this.objectSize--;
                }
            }
        }
        updateEnemyList() {
            for (var i = 0; i < this.enemySize; i++) {
                if (!this.enemyArray[i].alive) {
                    for (var j = i; j < this.enemySize - 1; j++) {
                        this.enemyArray[j] = this.enemyArray[j + 1];
                    }
                    this.enemySize--;
                }
            }
        }
        updateObjects() {
            for (var i = 0; i < this.objectSize; i++)
                this.objectArray[i].update();
        }
        updateEnemies() {
            for (var i = 0; i < this.enemySize; i++)
                this.enemyArray[i].update();
        }
        moveObjects() {
            for (var i = 0; i < this.objectSize; i++)
                this.objectArray[i].move();
        }
        moveEnemies() {
            for (var i = 0; i < this.enemySize; i++)
                this.enemyArray[i].move();
        }
        drawObjects() {
            for (var i = 0; i < this.objectSize; i++)
                this.objectArray[i].draw();
        }
        drawEnemies() {
            for (var i = 0; i < this.enemySize; i++)
                this.enemyArray[i].draw();
        }
    }
    exports.Level = Level;
});
//# sourceMappingURL=level.js.map