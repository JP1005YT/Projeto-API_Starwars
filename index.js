let stars = 150

for (let i = 0; i < stars; i++) {
    let obj = document.createElement('i')
    obj.style.animationDelay = Math.random() * 5 + "s"
    obj.style.top = Math.random() * innerHeight- 5 + "px"
    obj.style.left = Math.random() * innerWidth- 5 + "px"
    document.querySelector('body').appendChild(obj)
}

let lis = document.querySelectorAll("li")
lis.forEach(element => "")