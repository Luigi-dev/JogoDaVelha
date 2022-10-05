var canvas = document.querySelector("canvas")
var desenha = canvas.getContext('2d')
var jogo = document.getElementById('jogo')
var classeQuadrados = document.getElementsByClassName('quadrados')
var quadrados = [...classeQuadrados]
var quadradosId = [] 
var a = document.getElementById('a')
var b = document.getElementById('b')
var c = document.getElementById('c')
var d = document.getElementById('d')
var e = document.getElementById('e')
var f = document.getElementById('f')
var g = document.getElementById('g')
var h = document.getElementById('h')
var i = document.getElementById('i')
var caractereVez = 'X' 
var marcados = []
var marcadosX = []
var marcadosO = [] 
var contadorDeJogadas = 0

document.onload = comecar()
function marca(div) {
    div.style.position = 'relative'
    div.style.left = '25%'
    div.style.top = '10%'
    div.style.fontSize = '6em'
    div.innerHTML = caractereVez
    div.addEventListener('click', () => {
        if(marcados.includes(div.id) == false) {
            atualizaQuadradosMarcados(div.id)
            marcadosX.push(div.id)
            defineVez()
        }
    })
    div.addEventListener('mouseleave', () => {
        if(marcados.includes(div.id) == false) {
            div.innerHTML = ''
        }
    })
}
function marcaComputador() {
    let numMax = quadradosId.length - 1
    let index = obtemNumeroAleatorio(numMax)
    quadrados[index].style.position = 'relative'
    quadrados[index].style.left = '25%'
    quadrados[index].style.top = '10%'
    quadrados[index].style.fontSize = '6em'
    quadrados[index].innerHTML = caractereVez
    marcadosO.push(quadradosId[index])
    atualizaQuadradosMarcados(quadradosId[index])
    defineVez()
}
function defineVez() {
    contadorDeJogadas++
    if(contadorDeJogadas >= 5) {
        confereQuemGanhou(caractereVez)
    }
    caractereVez = trocaVez()
    if(quadradosId.length == 0) {
        jogoEncerrado()
    } 
    else if(caractereVez == 'X') {
        jogadorUm()
    } 
    else if(caractereVez == 'O') {
        marcaComputador()
    }
}
function jogadorUm() {
    if(caractereVez == "X") {
        [a,b,c,d,e,f,g,h,i].forEach((z) => {
            z.addEventListener('mouseenter', () => {
                if(marcados.includes(z.id) == false) {
                    marca(z) 
                } 
                else {
                    jogadorUm()
                }
            })
        })
    }
}
function atualizaQuadradosMarcados(adicionar) {
    marcados.push(adicionar)
    marcados.forEach((m) => {
        if(quadradosId.includes(m)){
            let marcadoIndex = quadradosId.indexOf(m)
            quadrados.splice(marcadoIndex,1)
            quadradosId.splice(marcadoIndex,1)
        }
    })
}
function trocaVez() {
    if(caractereVez == 'X') {
        agoraVez = 'O'
    }
    else if (caractereVez == 'O') {
        agoraVez = 'X'
    }
    return agoraVez
}
function comecar() {
    desenhandoJogoDaVelha()
    capturaQuadrados()
    jogadorUm()
}
function capturaQuadrados() {
    quadrados.forEach((q) => {
        quadradosId.push(q.id)
    })
}
function obtemNumeroAleatorio(max) {
    var numeroAleatorio = Math.round(Math.random() * (max - 0) + 0)
    return numeroAleatorio
}
function desenhandoJogoDaVelha() {
    desenha.strokeStyle = 'black';
    desenha.lineWidth = 10;

    desenha.beginPath()
    desenha.moveTo(b.offsetLeft, b.offsetTop)
    desenha.lineTo(h.offsetLeft, (h.offsetTop + h.offsetHeight)) 
    desenha.stroke() 

    desenha.beginPath()
    desenha.moveTo(c.offsetLeft, c.offsetTop)
    desenha.lineTo(i.offsetLeft, (i.offsetTop + i.offsetHeight))
    desenha.stroke() 

    desenha.beginPath()
    desenha.moveTo(d.offsetLeft, d.offsetTop)
    desenha.lineTo((f.offsetLeft + f.offsetWidth), f.offsetTop)
    desenha.stroke()

    desenha.beginPath()
    desenha.moveTo(g.offsetLeft, g.offsetTop)
    desenha.lineTo((i.offsetLeft + i.offsetWidth), i.offsetTop)
    desenha.stroke()
}

function confereQuemGanhou(avaliado) {
    var marcasDoAvaliado
    if(avaliado == "X") {
        marcasDoAvaliado = marcadosX
    }
    else if(avaliado == "O") {
        marcasDoAvaliado = marcadosO
    }
    var possiveisVitorias = [
        [a,d,g],
        [b,e,h],
        [c,f,i],
        [a,b,c],
        [d,e,f],
        [g,h,i],
        [c,e,g],
        [a,e,i]
    ]
    possiveisVitorias.forEach((gabarito) => {
        if(marcasDoAvaliado.includes(gabarito[0].id)) {
            if(marcasDoAvaliado.includes(gabarito[1].id)) {
                if(marcasDoAvaliado.includes(gabarito[2].id)) {
                    jogoEncerrado(avaliado)
                }
            }
        }
    })
    console.log(avaliado)
    console.log(marcasDoAvaliado)
}
function jogoEncerrado(quemGanhou) {
    var quadroVitoria = document.createElement("div")
    quadroVitoria.offsetWidth = '100%'
    quadroVitoria.style.fontSize = "100px"
    quadroVitoria.innerHTML = `${quemGanhou} ganhou o jogo!`
    document.body.appendChild(quadroVitoria)
    
    
}