url = "https://swapi.dev/api/planets/"

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
        img.setAttribute("src",`http://localhost/starWars2.0/resources/planetas/${element.name.toLowerCase()}.jpg`)
        img.setAttribute("width","300px")
        span.innerHTML = element.name
        div.appendChild(img)
        div.appendChild(span)
        div.addEventListener("click",e =>{
            window.location.href = `http://localhost/starWars2.0/pages/planets?id=${number}`
        })
        document.querySelector("body").appendChild(div)
    })
}

async function ConstruirCada(array){
    // Item que é a pagina
    console.log(array)
    let div_o = document.querySelector("#one")
    div_o.classList.toggle("ativo")

    div_o.querySelector("img").setAttribute("src",`http://localhost/starWars2.0/resources/planetas/${array.name.toLowerCase()}.jpg?c=${Math.random()}`)

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
                    let primeira_pagina_peoples = await pegarInfos("https://swapi.dev/api/people/")
                    let url = resposta['url'].slice(0, -1);
                    let ultimoDigito = url.slice(-1).charAt(0);
                    switch (element) {
                        // esse switch monta link por link
                        case "films":
                            let link = document.createElement("a")
                            link.setAttribute("href",`http://localhost/starWars2.0/pages/${element}?id=${ultimoDigito}`)
                            link.innerHTML = resposta['title']
                            document.querySelector(`#${element}`).appendChild(link)
                            break;
                        case "residents":
                            let linkc = document.createElement("a")
                                primeira_pagina_peoples.results.forEach(cadaum => {
                                    if(resposta['name'] === cadaum['name']){
                                        linkc.setAttribute("href",`http://localhost/starWars2.0/pages/peoples?id=${ultimoDigito}`)
                                    }
                                })
                                linkc.innerHTML = resposta['name']
                                document.querySelector(`#${element}`).appendChild(linkc)
                            break;
                    }
                })
            }else{
                // Se for texto cai nesse
                let span = document.createElement("span")
                if(array[element].includes("https")){
                    // let ultimoDigito = array[element].slice(-2).charAt(0);
                    pegarInfos(array[element])
                    .then((resultado) => {
                        span.innerHTML = resultado.name
                    })
                }else{
                    span.innerHTML = array[element]
                }
                
                document.querySelector(`#${element}`).appendChild(span)
            }
        }
    })
}