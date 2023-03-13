// Inicialização
const div = document.querySelector('#inicial');
const msg = "Olá, em que posso ajudar?"; 
const temp = 30;

digita(div, msg, temp)
//conexao
async function pegarMensagem(msg){

  const resposta = await axios.post('http://179.222.232.211:8000/mensagem', {
      mensagem: msg
  })  

  carregarResposta(resposta.data)
  
}

// rolar automaticamente para o fim
function scroll(){
    var fim = document.body.scrollHeight;
    window.scrollTo(0, fim);
}

function carregarResposta(mensagem){

    // criando a div e inserindo em outra div do documento
    var div = document.createElement("div");
    div.className = 'mensagens chat-bot';
    document.getElementsByClassName('chats')[0].appendChild(div);
    // adiciondo a mensagem

    const texto = mensagem;
    const interval = 50;

    digita(div, texto, interval)
    document.getElementById('input').value = "";
    scroll();

}

function carregarMensagem(mensagem){

  // criando a div e inserindo em outra div do documento
  var div = document.createElement("div");
  div.className = 'mensagens chat-user';
  document.getElementsByClassName('chats')[0].appendChild(div);
  // adiciondo a mensagem

  div.innerHTML = "<p>" + mensagem + "</p>";
  document.getElementById('input').value = "";

  // a cada mensagem o scroll  rola até o fim da página
  pegarMensagem(mensagem);
  

}

// pegar input text
const mensagem = document.getElementById('input')

mensagem.addEventListener('keyup', function(e){
    var botao = e.which || e.keyCode;

    if(botao == 13){ // código da tecla enter
        carregarMensagem(mensagem.value)
    }
});

// botao de rolagem
var mybutton = document.getElementById("myBtn")
let doc = document.documentElement

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
let value = parseInt(100 * doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) // retorna a porcentagem de scroll rolado
  
  if (value < 40) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// // quando clicar no botão, a página rola para o topo do documento
function topFunction() {
  scroll()
  }

  // Digitação animada



function digita(div, texto, interval){
  const caracter = texto.split("").reverse();

  div.innerHTML = "<p id = 'text'>" +"</p>";
  var p = document.querySelector("#text")


  const typer = setInterval(()=> {
    if(!caracter.length){
      return clearInterval(typer);
    }
    const next = caracter.pop();
    p.innerHTML += next;

  }, interval)
  p.id = ''
}
