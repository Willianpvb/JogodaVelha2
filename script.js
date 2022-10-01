// Inicio das declaraçoes de variaveis

let historico_de_partidas = [];

let j2 = document.getElementsByClassName("jogador2");
let j1 = document.getElementsByClassName("jogador1");

let vitoria = 0;
let derrota = 0;
let empate = 0;

let partidaFinalizada = false;
let vezdoJogador = true;
let svitorias = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
var jogadas = ['','','','','','','','',''];
// fim variaveis

localStorage.setItem("vitoria",vitoria);
localStorage.setItem("derrota",derrota);
localStorage.setItem("empate",empate);

imprimirPlacar();

//funções
function imprimirTabuleiro(){
  
  for(let i = 0; i <= 8;  i++){
    document.getElementById(i+1).textContent = jogadas[i];
  }
}

function imprimirPlacar(){
  document.getElementById("vitoria").innerHTML = vitoria;
  document.getElementById("derrota").innerHTML = derrota;
  document.getElementById("empate").innerHTML =  empate;

  document.getElementById("vitoria2").innerHTML = derrota;
  document.getElementById("derrota2").innerHTML = vitoria;
  document.getElementById("empate2").innerHTML =  empate;
}

function limparTabuleiro(){
  partidaFinalizada = false;
  /* document.getElementById("game").disabled = false; */
  this.jogadas = ['','','','','','','','',''];
  imprimirTabuleiro();
}

//salvar os jogadores e colocalos no loclStorage ou seja salvar os players no cashe
let savePlayers = () => {
  
  localStorage.setItem("nome-jogador1",j1[0].value);
  localStorage.setItem("simbolo-jogador1",j1[1].value);

  localStorage.setItem("nome-jogador2",j2[0].value);
  localStorage.setItem("simbolo-jogador2",j2[1].value);

  document.getElementsByClassName("name-jogador-um")[0].innerHTML = localStorage.getItem("nome-jogador1");
  document.getElementsByClassName("name-jogador-dois")[0].innerHTML = localStorage.getItem("nome-jogador2");

  document.getElementsByClassName("name-jogador-um")[1].innerHTML = localStorage.getItem("nome-jogador1");
  document.getElementsByClassName("name-jogador-dois")[1].innerHTML = localStorage.getItem("nome-jogador2");
  
  document.getElementById("esconder").style.display = "block";
}

function saber_resultado(simbolo_jogador){

  var contador_de_jogadas = this.jogadas.join('').length

  if(contador_de_jogadas >= 5){

    let vitorias = this.vitorias(simbolo_jogador);
    
    if(!vitorias ){
      this.empates(contador_de_jogadas);
    }

    localStorage.setItem("vitoria",vitoria);
    localStorage.setItem("derrota",derrota);
    localStorage.setItem("empate",empate);

    imprimirPlacar()
  }

}

function vitorias(simbol){

  for(i in svitorias){
  //Só irá passar caso uma das sequencias de vitorias se equivala ao tabuleiro atual
    if (this.jogadas[svitorias[i][0]] == simbol &&
        this.jogadas[svitorias[i][1]] == simbol &&
        this.jogadas[svitorias[i][2]] == simbol )
    {
      //se o simbulo adicionado for do primeiro jogador então será adicionado uma vitoria para ele
      if(simbol === localStorage.getItem("simbolo-jogador1")){
        vitoria = 1 + vitoria; 
        registrarPartidas(this.jogadas, localStorage.getItem("nome-jogador1"));                    
      //se o simbulo adicionado não é do primeiro jogador então é do segundo jogador, portanto será adicionado uma derrota ao primeiro jogador 
      }else{
        derrota = 1 + derrota;
        registrarPartidas(this.jogadas, localStorage.getItem("nome-jogador2")); 
      }

      //paralisar o tabuleiro
      partidaFinalizada = true;
      //desabilitarTabuleiro();

      console.log("VICTORY CHARGE!!!!",svitorias[i]);
      
      
      return true;
    } 
  }  
  return false;
}

function empates(numero_de_jogadas){
  
  if(numero_de_jogadas == 9){
      empate++
      //paralisar o tabuleiro
      partidaFinalizada = true;
      console.log("DRAW CHARGE!!!!");
    
  }
}

let jogada = (id) => {
  if(document.getElementById(id).textContent === "" && !partidaFinalizada){

    if(vezdoJogador){ 

      this.jogadas[id-1] = localStorage.getItem("simbolo-jogador1");
      document.getElementById(id).textContent = localStorage.getItem("simbolo-jogador1");
      saber_resultado(localStorage.getItem("simbolo-jogador1"));

    }else{  

      this.jogadas[id-1] = localStorage.getItem("simbolo-jogador2");
      document.getElementById(id).textContent = localStorage.getItem("simbolo-jogador2");
      saber_resultado(localStorage.getItem("simbolo-jogador2"));
    }
  }

  vezdoJogador = !vezdoJogador;
  
  imprimirTabuleiro()
  
}

function registrarPartidas(tabuleiro, vencedor){
  let tabuleiro2 ='';
  for( let i = 0; i < 3; i++){
    tabuleiro2  += 'Linha '+(i+1)+':'+tabuleiro[i]+
                                    tabuleiro[i+1]+
                                    tabuleiro[i+2];
  }
    
    let partida = [historico_de_partidas.length+1, tabuleiro2, vencedor];

    historico_de_partidas.push(partida);

    console.log(historico_de_partidas);
    imprimirHistorico();
}

function imprimirHistorico(){

    let trs = document.querySelectorAll('.historico #table tr');
    if( trs.length > 0){
      trs.forEach((valor) => { valor.remove() })
    }

    let table = document.querySelector('.historico table');

    for(let i = 0; i < historico_de_partidas.length; i++){

        let tr = document.createElement('tr');

        historico_de_partidas[i].forEach((valor) => {
            let td = document.createElement('td');
            let texto = document.createTextNode(valor);

            td.appendChild(texto);

            tr.appendChild(td);

            });
        
        table.appendChild(tr);
        
    }
    
    
}


