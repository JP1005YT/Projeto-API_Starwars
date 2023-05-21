// Estrelas

let stars = 150
for (let i = 0; i < stars; i++) {
    let obj = document.createElement('i')
    let top = Math.random() * innerHeight- 5 
    obj.style.top = top + "px"
    let left = Math.random() * innerWidth- 5 
    obj.style.left = left + "px"
    if(top > innerHeight/2 && left > innerWidth/2){
        obj.style.animation = 'sai_bottom_right 4s infinite'
    }
    if(top < innerHeight/2 && left > innerWidth/2){
        obj.style.animation = 'sai_top_right 4s infinite'
    }
    if(top > innerHeight/2 && left < innerWidth/2){
        obj.style.animation = "sai_bottom_left 4s infinite"
    }
    if(top < innerHeight/2 && left < innerWidth/2){
        obj.style.animation = "sai_top_left 4s infinite"
    }
    obj.style.animationDelay = Math.random() * 5 + "s"
    document.querySelector('body').appendChild(obj)
}

console.log(innerHeight/2)
console.log(innerWidth/2)

// Botoes

let lis = document.querySelectorAll("li")
lis.forEach(element => "")

const botoes = document.querySelectorAll("li")
botoes.forEach(element => {
    element.addEventListener("click",e =>{
        switch (element.innerHTML) {
            case "Films":
                window.location.href = "./pages/Films/";
            break;
            case "Peoples":
                window.location.href = "./pages/Films/";
            break;
            case "Planets":
                window.location.href = "./pages/Films/";
            break;
            case "Species":
                window.location.href = "./pages/Films/";
            break;
            case "Starships":
                window.location.href = "./pages/Films/";
            break;
            case "Vehicles":
                window.location.href = "./pages/Films/";
            break;
        }
    })
})