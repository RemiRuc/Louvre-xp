let Menu = {}

Menu.hideMenu = function(){
    document.getElementById("menu").style.display = "none";
    document.getElementById("myCanvas").style.display = "block"
    document.getElementById("interaction").style.display = "block"
}

Menu.showMenu = () => {
    document.getElementById("menu").style.display = "flex";
    document.getElementById("interaction").style.display = "none"
    document.getElementById("myCanvas").style.display = "none"
}



Menu.lvlFinished = function(lvl){
    Menu.showMenu();
    setTimeout(()=>{
        document.querySelector(`img[data-lvl="${lvl}"]`).classList.add("active");
        document.querySelector(`.lvl_btn[data-lvl="${lvl}"]`).classList.add("active");
    },1000);
}

document.querySelectorAll(".lvl_btn").forEach(el => {
    el.addEventListener("click", (target)=>{
        let level = parseInt(target.target.attributes[1].nodeValue)
        Menu.hideMenu()
        switch (level) {
            case 1:
                core.scene1()
                break;
        
            default:
                break;
        }
    })
})

Menu.showMenu()