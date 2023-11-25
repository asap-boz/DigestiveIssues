let playerHealth = 100;
let npcHealth = 100;
let npcMoving = false;
let npcDamage = 10;
let playerDamage = 10;
console.log("Hello world");
// Create player sprite
let playerSprite = sprites.create(img`
    . . . . . 6 6 6 6 6 6 . . . . . 
    . . . . 6 9 9 9 9 9 9 6 . . . . 
    . . . . 6 9 9 5 5 9 9 6 . . . . 
    . . . . f f f 5 5 f f f . . . . 
    . . . . 6 5 5 5 5 5 5 6 . . . . 
    . . . . 6 9 9 5 5 9 9 6 . . . . 
    . . 6 6 6 9 9 5 5 9 9 6 6 6 . . 
    . . 6 9 9 6 6 6 6 6 6 9 9 6 . . 
    . . . 6 6 2 2 2 2 2 2 6 6 . . . 
    . . 6 9 6 9 2 2 2 2 9 6 9 6 . . 
    . . 6 9 6 9 9 2 2 9 9 6 9 6 . . 
    . . 6 9 6 9 9 9 2 9 9 6 9 6 . . 
    . . 6 9 6 9 9 9 9 9 9 6 9 6 . . 
    . . . 6 f f f f f f f f 6 . . . 
    . . . . 6 6 6 . . 6 6 6 . . . . 
    . . 6 6 6 6 6 . . 6 6 6 6 6 . . 
`, SpriteKind.Player);

// Create NPC sprite
let npcSprite = sprites.create(img`
    ........................
    ........................
    ........................
    ........................
    ..........ffff..........
    ........ff1111ff........
    .......fb111111bf.......
    .......f11111111f.......
    ......fd11111111df......
    ......fd11111111df......
    ......fddd1111dddf......
    ......fbdbfddfbdbf......
    ......fcdcf11fcdcf......
    .......fb111111bf.......
    ......fffcdb1bdffff.....
    ....fc111cbfbfc111cf....
    ....f1b1b1ffff1b1b1f....
    ....fbfbffffffbfbfbf....
    .........ffffff.........
    ...........fff..........
    ........................
    ........................
    ........................
    ........................
`, SpriteKind.Enemy);

// Create sword sprite
let swordSprite = sprites.create(img`
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    .....88.........
    .....868........
    ......868.......
    .......868......
    .......866......
    .......8676.....
    ......67656.....
    .....656758.....
    ....65775868....
    ....65656868....
    ....87678868....
    ....87678668....
    ....87677668....
    ....8776768.....
    .....87678......
    ......8768......
`, SpriteKind.Projectile);

playerSprite.setPosition(80, 100);
// Initial NPC sprite position
npcSprite.setPosition(80, 50);
// Initial sword sprite position (same as player's position)
swordSprite.setPosition(playerSprite.x, playerSprite.y);

game.splash("Welcome to the Attack Game!", "Use arrow keys to move, A to attack NPC");



controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let playerDamage = Math.randomRange(5, 15); // Random damage between 5 and 15

    // Check for hitbox overlap between player and NPC sprites
    if (playerSprite.overlapsWith(npcSprite)) {
        npcHealth -= playerDamage;
        game.splash("Player attacked NPC for " + playerDamage + " damage!");
    } else {
        game.splash("Player missed the attack!");
    }
});

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    // Move the player sprite to the left when the left arrow key is pressed
    playerSprite.x -= 10;
    swordSprite.x -= 10; // Update sword position to follow player
    updateTilesBasedOnColor();
});

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    // Move the player sprite to the right when the right arrow key is pressed
    playerSprite.x += 10;
    swordSprite.x += 10; // Update sword position to follow player
});

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    // Move the player sprite up when the up arrow key is pressed
    playerSprite.y -= 10;
    swordSprite.y -= 10; // Update sword position to follow player
});

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    // Move the player sprite down when the down arrow key is pressed
    playerSprite.y += 10;
    swordSprite.y += 10; // Update sword position to follow player
});

game.onUpdateInterval(500, function () {
    // Toggle NPC movement
    npcMoving = !npcMoving;
    if (npcMoving) {
        // Move the NPC sprite horizontally
        npcSprite.x += Math.randomRange(-8, 8);
        npcSprite.y += Math.randomRange(-8, 8);
    }
    if (npcSprite.overlapsWith(playerSprite)) {
        playerHealth -= npcDamage;
        game.splash("NPC attacked Player for " + npcDamage + " damage!");
    }
    if (swordSprite.overlapsWith(npcSprite)) {
        // Sword attacks NPC
        npcHealth -= playerDamage; // Change this to sword damage if needed
        game.splash("Sword attacked NPC for " + playerDamage + " damage!");
    }
});

function updateTilesBasedOnColor() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 10; col++) {
            // Get the tile at the current location
            let currentTile = tiles.getTileLocation(col, row);
            
            // Get the image of the current tile
            let tileImage = tiles.getTileImage(currentTile);

            // Determine the tile color based on the image
            let tileColor = tileImage.fill;

            console.log("Tile Color at (" + col + ", " + row + "): " + tileColor);

            // Your existing code for updating tiles based on color
            if (tileColor === 0) {
                tiles.setTileAt(currentTile, assets.tile`tilePath3`);
            } else if (tileColor === 1) {
                tiles.setTileAt(currentTile, assets.tile`tilePath1`);
            } else if (tileColor === 2) {
                tiles.setTileAt(currentTile, assets.tile`tilePath9`);
            }
            // Add more conditions as needed
        }
    }
}


