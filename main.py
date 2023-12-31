playerHealth = 100
npcHealth = 100
npcMoving = False
npcDamage = 10
playerDamage = 10
# Create player sprite
tiles.set_current_tilemap(tilemap("""
    testlevel
"""))
playerSprite = sprites.create(img("""
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
    """),
    SpriteKind.player)
# Create NPC sprite
npcSprite = sprites.create(img("""
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
    """),
    SpriteKind.enemy)
# Create sword sprite
swordSprite = sprites.create(img("""
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
    """),
    SpriteKind.projectile)
playerSprite.set_position(80, 100)
# Initial NPC sprite position
npcSprite.set_position(80, 50)
# Initial sword sprite position (same as player's position)
swordSprite.set_position(playerSprite.x, playerSprite.y)
game.splash("Welcome to the Attack Game!",
    "Use arrow keys to move, A to attack NPC")

def on_a_pressed():
    global npcHealth
    playerDamage2 = Math.random_range(5, 15)
    # Random damage between 5 and 15
    # Check for hitbox overlap between player and NPC sprites
    if playerSprite.overlaps_with(npcSprite):
        npcHealth -= playerDamage2
        game.splash("Player attacked NPC for " + str(playerDamage2) + " damage!")
    else:
        game.splash("Player missed the attack!")
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

# Update sword position to follow player

def on_left_pressed():
    # Move the player sprite to the left when the left arrow key is pressed
    playerSprite.x -= 10
    swordSprite.x -= 10
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

# Update sword position to follow player

def on_right_pressed():
    # Move the player sprite to the right when the right arrow key is pressed
    playerSprite.x += 10
    swordSprite.x += 10
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

# Update sword position to follow player

def on_up_pressed():
    # Move the player sprite up when the up arrow key is pressed
    playerSprite.y -= 10
    swordSprite.y -= 10
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

# Update sword position to follow player

def on_down_pressed():
    # Move the player sprite down when the down arrow key is pressed
    playerSprite.y += 10
    swordSprite.y += 10
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_update_interval():
    global npcMoving, playerHealth, npcHealth
    # Toggle NPC movement
    npcMoving = not npcMoving
    if npcMoving:
        # Move the NPC sprite horizontally
        npcSprite.x += Math.random_range(-8, 8)
        npcSprite.y += Math.random_range(-8, 8)
    if npcSprite.overlaps_with(playerSprite):
        playerHealth -= npcDamage
        game.splash("NPC attacked Player for " + str(npcDamage) + " damage!")
    if swordSprite.overlaps_with(npcSprite):
        # Sword attacks NPC
        npcHealth -= playerDamage
        # Change this to sword damage if needed
        game.splash("Sword attacked NPC for " + str(playerDamage) + " damage!")
game.on_update_interval(500, on_update_interval)
