let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = criarNumeroRandom();
let tentativas = 1;

//Função para deixar o código mais limpo e substituir varias linhas
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //Comando para habilitar voz para o texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.0});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto'); //Parâmetros tag e texto
    exibirTextoNaTela('p', 'Digite um número entre 1 e 10');
}

exibirMensagemInicial();

function criarNumeroRandom(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return criarNumeroRandom();
    }
    else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

//Criando uma função para ser implementada no html
function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);

        //comando para buscar um elemento no HTML e remover um atributo
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = criarNumeroRandom();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
