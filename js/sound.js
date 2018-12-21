let Sounds ={
    main: new Audio("../Ressources/sound/music.mp3"),
    porte: new Audio("../Ressources/sound/porte.mp3"),
    souris: new Audio("../Ressources/sound/mouse.mp3"),
    souris_mort: new Audio("../Ressources/sound/souris-mort.mp3"),
}

Sounds.main.loop = true
Sounds.porte.volume = 0.5;
Sounds.souris.volume = 0.3;