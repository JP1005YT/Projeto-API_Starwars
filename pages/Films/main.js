url = "https://swapi.dev/api/films/"

const queryString = window.location.search
const params = new URLSearchParams(queryString)

if(params.has("id")){
    pegarPessoasPorId(params.get("id"))
}else{
    pegarPessoas()
}

async function pegarPessoas(){
    const dados = await fetch(url)
    .then((resultado) => {
        return resultado.json();
    })
    ConstruirTodos(dados)
}

async function pegarPessoasPorId(id){
    const dados = await fetch(url + id)
    .then((resultado) => {
        return resultado.json();
    })
    ConstruirCada(dados)
}

async function pegarInfos(link) {
    const resposta = await fetch(link);
    const dados = await resposta.json();
    return dados;
  }

function ConstruirTodos(array){
    array.results.forEach(function(element,n){
        let number = n + 1
        let div = document.createElement('div')
        let img = document.createElement('img')
        let span = document.createElement('span')
        img.setAttribute("src",`http://localhost/starWars2.0/resources/filmes/${element.title.toLowerCase()}.jpg`)
        img.setAttribute("width","300px")
        span.innerHTML = element.title
        div.appendChild(img)
        div.appendChild(span)
        div.addEventListener("click",e =>{
            window.location.href = `http://localhost/starWars2.0/pages/Films?id=${number}`
        })
        document.querySelector("body").appendChild(div)
    });
}

async function ConstruirCada(array){
    // Item que é a pagina
    console.log(array)
    document.querySelector("#one").classList.toggle("ativo")
    let objetos = Object.keys(array)
    objetos.forEach(element =>{
        // Cada objeto ou texto desse item
        if(document.querySelector(`#${element}`)){
            if(typeof array[element] === "object"){
                // Se for Objeto
                let div = document.createElement("div")
                array[element].forEach(async function(link){
                    // Faz o Fetch e puxa o nome do bixo
                    let resposta = await pegarInfos(link)
                    let url = resposta['url'].slice(0, -1);
                    let ultimoDigito = url.slice(-1).charAt(0);
                    switch (element) {
                        // esse switch monta link por link
                        case "planets":
                            let link = document.createElement("a")
                            link.setAttribute("href",`http://localhost/starWars2.0/pages/${element}?id=${ultimoDigito}`)
                            link.innerHTML = resposta['name']
                            document.querySelector(`#${element}`).appendChild(link)
                            break;
                        case "species":
                            let links = document.createElement("a")
                            links.setAttribute("href",`http://localhost/starWars2.0/pages/${element}?id=${ultimoDigito}`)
                            links.innerHTML = resposta['name']
                            document.querySelector(`#${element}`).appendChild(links)
                            break
                        case "starships":
                            let linkst = document.createElement("a")
                            linkst.setAttribute("href",`http://localhost/starWars2.0/pages/${element}?id=${ultimoDigito}`)
                            linkst.innerHTML = resposta['name']
                            document.querySelector(`#${element}`).appendChild(linkst)
                            break
                        case "vehicles":
                                let linkv = document.createElement("a")
                                linkv.setAttribute("href",`http://localhost/starWars2.0/pages/${element}?id=${ultimoDigito}`)
                                linkv.innerHTML = resposta['name']
                                document.querySelector(`#${element}`).appendChild(linkv)
                                break
                        case "characters":
                                let linkc = document.createElement("a")
                                linkc.setAttribute("href",`http://localhost/starWars2.0/pages/${element}?id=${ultimoDigito}`)
                                linkc.innerHTML = resposta['name']
                                document.querySelector(`#${element}`).appendChild(linkc)
                                break
                        default:
                            break;
                    }
                })
            }else{
                // Se for texto cai nesse
                let span = document.createElement("span")
                span.innerHTML = array[element]
                document.querySelector(`#${element}`).appendChild(span)
            }
        }
    })
}