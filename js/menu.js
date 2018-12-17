let Menu = {}

Menu.hideMenu = function(){
    document.getElementById("menu").style.display = "none";
    document.getElementById("myCanvas").style.display = "block"
}

Menu.showMenu = () => {
    document.getElementById("menu").style.display = "flex";
    document.getElementById("interaction").style.display = "none"
    document.getElementById("myCanvas").style.display = "none"
}



Menu.lvlFinished = function(lvl){
    document.querySelector(`img[data-lvl="${lvl}"]`).classList.add("active");
    document.querySelector(`.lvl_btn[data-lvl="${lvl}"]`).classList.add("active");
}

document.querySelectorAll("#lvl_btn").forEach((el) => {
    console.log(el)    
})

Menu.showMenu()