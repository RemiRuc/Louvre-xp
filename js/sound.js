let Sounds ={
    main: new Audio("../Ressources/sound/music.mp3"),
    porte: new Audio("../Ressources/sound/porte.mp3"),
    mouse: new Audio("../Ressources/sound/mouse.mp3"), /** Dont play this, we created this file directly in the Mouse Class to have 4 different audio files (otherwise, it's the same file played by 4 differents mouses and it create bugs) */
    walk: new Audio("../Ressources/sound/marche-sable.mp3"),
    transition: new Audio("../Ressources/sound/menu-transition.mp3"),
    finished: new Audio("../Ressources/sound/level-finished.mp3"),
    back: new Audio("../Ressources/sound/back-menu.mp3"),
    unlock: new Audio("../Ressources/sound/unlock.mp3"),
    door: new Audio("../Ressources/sound/porte.mp3"),
}

Sounds.walk.loop = true
Sounds.main.loop = true