// Inicio das declaraçoes de variaveis

let historico_de_partidas = [];

let j2 = document.getElementsByClassName("jogador2");
let j1 = document.getElementsByClassName("jogador1");

let vitoria = 0;
let derrota = 0;
let empate = 0;

let partidaFinalizada = false;
let vezdoJogador = true;
//Combinações para chegar a vitoria
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

(function(){

  imprimirPlacar();
  imprimirTabuleiro();

})();

//função que imprime o tabueleiro salvo na tela
function imprimirTabuleiro(){
  
  for(let i = 0; i <= 8;  i++){
    document.getElementById(i+1).textContent = jogadas[i];
  }
}

//Função que imprime o placar dos jogadores atuais
function imprimirPlacar(){
  document.getElementById("vitoria").innerHTML = vitoria;
  document.getElementById("derrota").innerHTML = derrota;
  document.getElementById("empate").innerHTML =  empate;

  document.getElementById("vitoria2").innerHTML = derrota;
  document.getElementById("derrota2").innerHTML = vitoria;
}

//Função que limpa o tabuleiro e reinicia as jogadas
let limparTabuleiro = () => {
  partidaFinalizada = false;
  /* document.getElementById("game").disabled = false; */
  this.jogadas = ['','','','','','','','',''];
  imprimirTabuleiro();
}

//salvar os jogadores e colocalos no loclStorage ou seja salvar os players no cashe
let savePlayers = () => {
  
  document.getElementsByClassName("nomeJogador1")[0].innerHTML = j1[0].value;
  document.getElementsByClassName("nomeJogador2")[0].innerHTML = j2[0].value;

  document.getElementsByClassName("nomeJogador1")[1].innerHTML = j1[0].value;
  document.getElementsByClassName("nomeJogador2")[1].innerHTML = j2[0].value;
  
  /* document.querySelector("#oponentes").classList.remove("oponentes");
  document.querySelector("#oponentes").classList.add("esconder"); */

  document.querySelector("#oponentes").setAttribute("class","esconder");

  limparTabuleiro();
}

//Qunado cada area for tocada a funçao será ativada para preencer o tabuleiro
let jogada = (id) => {
  if(document.getElementById(id).textContent === "" && !partidaFinalizada){

    if(vezdoJogador){ 

      this.jogadas[id-1] = j1[1].value;
      document.getElementById(id).textContent = j1[1].value;
      saber_resultado(j1[1].value);

    }else{  

      this.jogadas[id-1] = j2[1].value;
      document.getElementById(id).textContent = j2[1].value;
      saber_resultado(j2[1].value);
    }
  }

  vezdoJogador = !vezdoJogador;
  
  imprimirTabuleiro()
  
}

//FUNCÕES para conferir se existe um vencedor ou se deu empate

function saber_resultado(simbolo_jogador){

  var contador_de_jogadas = this.jogadas.join('').length

  if(contador_de_jogadas >= 5){

    let vitorias = this.vitorias(simbolo_jogador);
    
    if(!vitorias ){
      this.empates(contador_de_jogadas);
    }

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
      if(simbol === j1[1].value){
        vitoria = 1 + vitoria; 
        registrarPartidas(this.jogadas, j1[0].value, simbol);                    
      //se o simbulo adicionado não é do primeiro jogador então é do segundo jogador, portanto será adicionado uma derrota ao primeiro jogador 
      }else{
        derrota = 1 + derrota;
        registrarPartidas(this.jogadas, j2[0].value, simbol); 
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
//FIM das funçoes de resultado


//FUNÇOES para imprimir o historico de partidas
function registrarPartidas(tabuleiro, vencedor, simbolo){

  let l1 = 'Linha 1: '
           +tabuleiro[0]+
            tabuleiro[1]+
            tabuleiro[2];

  let l2 = ' Linha 2: '
  +tabuleiro[3]+
    tabuleiro[4]+
    tabuleiro[5];

  let l3 = ' Linha 3: '
  +tabuleiro[6]+
    tabuleiro[7]+
    tabuleiro[8];

  tabuleiro = l1 + l2 + l3;
    
  let partida = [historico_de_partidas.length+1, tabuleiro, vencedor, simbolo];

  historico_de_partidas.push(partida);

  imprimirHistorico();
}

function imprimirHistorico(){

    let trs = document.querySelectorAll('.historico table tr');
    
    trs.forEach((valor) => { valor.remove() })
    
    let table = document.querySelector('.historico table');

    linha1 = ["Nº partida", "Tabuleiro da partida", "Vencedor","Simbolo"]

    let tr = document.createElement('tr');

    linha1.forEach((valor) => {
      let td = document.createElement('td');
      let texto = document.createTextNode(valor);

      td.appendChild(texto);
      tr.appendChild(td);

      });
  
    table.appendChild(tr);
    
    if(historico_de_partidas.length > 0){
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
  
}

function reiniciarHistorico(){

  historico_de_partidas = [];

  imprimirHistorico();
}
