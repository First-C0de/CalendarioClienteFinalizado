const meses = ['janeiro','fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'setembro', 'outubro', 'novembro', 'dezembro'];
const tableDay = document.getElementById('dias');
let date = new Date();
const mesatual = date.getMonth();
const ano = 2024;

const firebaseConfig = {
    apiKey: "AIzaSyCLX5W8fSrF_ZsR77RzdpykXR1_sapyAFE",
    authDomain: "calendario-24b21.firebaseapp.com",
    databaseURL: "https://calendario-24b21-default-rtdb.firebaseio.com",
    projectId: "calendario-24b21",
    storageBucket: "calendario-24b21.appspot.com",
    messagingSenderId: "51710976227",
    appId: "1:51710976227:web:68dcf232c867d41fb525d6"
  };

const app = firebase.initializeApp(firebaseConfig);

function pegarmes(mesatual, meses) {
    const mesescrito = meses[mesatual];
    console.log(mesescrito);
    const mesdisplay = document.querySelector('.mesatual');
    mesdisplay.innerHTML = mesescrito;
}
function modais(dias) {
    dias.addEventListener("click", function() {
        const diaSelecionado = parseInt(dias.innerHTML);

       
        const eventosRef = firebase.database().ref("Evento_" + diaSelecionado);

        // Ouvir por mudanças nos dados
        eventosRef.once('value', (snapshot) => {
            const eventosExist = snapshot.val(); 

            // Criar o modal
            const modal = document.createElement('div');
            modal.classList.add('modal');
            const countedo = document.querySelector('.conteudo');
            countedo.appendChild(modal);

            const adicionarumatarefa = document.createElement('h3');
            adicionarumatarefa.classList.add('texto');
            modal.appendChild(adicionarumatarefa);

            const divBotoes = document.createElement('div');
            divBotoes.classList.add('botoes-container');
            modal.appendChild(divBotoes);

            // Se houver eventos salvos para o dia selecionado, exiba na tela
            if (eventosExist) {
                adicionarumatarefa.innerHTML = Object.values(eventosExist).map(evento => evento.eventos).join("<br>");
            } else {
                adicionarumatarefa.innerHTML = 'Não há nenhum agendamento';
            }

            const botaofechar = document.createElement('button');
            botaofechar.innerText = 'Fechar';
            botaofechar.classList.add('botaofechar');
           divBotoes.appendChild(botaofechar);

            // Adicionando evento de fechar ao botão fechar
            botaofechar.addEventListener('click', function() {
                modal.remove();
            });
        });
    });
}

function pegardiasmes(ano, mes) {
    const primeirodiasemana = new Date(ano, mes, 1).getDay() - 1; 
    const ultimodiames = new Date(ano, mes + 1, 0).getDate(); 

    for (let i = -primeirodiasemana, index = 0; i < (42 - primeirodiasemana); i++, index++) {
        const dt = new Date(ano, mes, i);
        const dayTable = tableDay.getElementsByTagName('td')[i];
        dayTable.innerHTML = dt.getDate();

        // retirei a função criarEvento
        if (i < 1) {
            dayTable.classList.add('mes-anterior');
        }
        if (i > ultimodiames) {
            dayTable.classList.add('mes-posterior');
        }
        modais(dayTable);
    }
}

pegardiasmes(ano, mesatual);
pegarmes(mesatual, meses);

