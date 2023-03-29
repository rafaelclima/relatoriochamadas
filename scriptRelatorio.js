const filterBtn = document.getElementById('filter-csv')
const inputRamal = document.getElementById('input-ramal')
const mediaExtCall = document.getElementById('mediaExt-call')
const mediaIntCall = document.getElementById('mediaInt-call')
const divCards = document.getElementById('divCards')
const dataInicial = document.getElementById('start-date')
const dataFinal = document.getElementById('end-date')
const inputDestino = document.getElementById('input-ramal-destino')

const intEfetuadaOcupado = document.getElementById('internas-efetuada-ocupado')
const intEfetuadaAtendida = document.getElementById('internas-efetuada-atendida')
const intEfetuadaNaoAtendida = document.getElementById('internas-efetuada-nao-atendida')
const intEfetuadaFalha = document.getElementById('internas-efetuada-falha')

const extEfetuadaOcupado = document.getElementById('externas-efetuada-ocupado')
const extEfetuadaAtendida = document.getElementById('externas-efetuada-atendida')
const extEfetuadaNaoAtendida = document.getElementById('externas-efetuada-nao-atendida')
const extEfetuadaFalha = document.getElementById('externas-efetuada-falha')

const resumoEfetuadaOcupado = document.getElementById('resumo-efetuada-ocupado')
const resumoEfetuadaAtendida = document.getElementById('resumo-efetuada-atendida')
const resumoEfetuadaNaoAtendida = document.getElementById('resumo-efetuada-nao-atendida')
const resumoEfetuadaFalha = document.getElementById('resumo-efetuada-falha')

let qtdIntEfetuadaOcupado = 0
let qtdIntEfetuadaAtendida = 0
let qtdIntEfetuadaNaoAtendida = 0
let qtdIntEfetuadaFalha = 0

let qtdExtEfetuadaOcupado = 0
let qtdExtEfetuadaAtendida = 0
let qtdExtEfetuadaNaoAtendida = 0
let qtdExtEfetuadaFalha = 0


let arrCsv = []
let duracaoMediaExt = 0
let duracaoMediaInt = 0

function segundosParaMinutos(segundos) {
  const vlrTotal = segundos / qtdChamadasExt
  const minutos = Math.floor(vlrTotal / 60);
  const segundosRestantes = vlrTotal % 60;
  return `${minutos}m ${Math.round(segundosRestantes)}s`;
}
function segundosParaMinutosInt(segundos) {
  const vlrTotal = segundos / qtdChamadasInt
  const minutos = Math.floor(vlrTotal / 60);
  const segundosRestantes = vlrTotal % 60;
  return `${minutos}m ${Math.round(segundosRestantes)}s`;
}
function converterTempo(segundos) {
  const vlrTotal = segundos
  const minutos = Math.floor(vlrTotal / 60);
  const segundosRestantes = vlrTotal % 60;
  return `${minutos}m ${Math.round(segundosRestantes)}s`;
}

filterBtn.addEventListener('click', function() {
  divCards.style.opacity = 1
  Papa.parse(document.getElementById('input-csv').files[0], {
    download: true,
    header: true,
    delimiter: ",",
    newline: "",
    quoteChar: '"',
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: function(results) {
      // const data = results.data;
      // código para extrair as informações
      arrCsv = results.data.map(item => ({
        Data: item.Data,
        Origem: item.Origem,
        Estado: item.Estado,
        Destino: item.Destino,
        Duracao: item.Duracao
      }));
    
      

      const expressao = /^([\d.]+)s/; // expressão regular para encontrar a parte da string a ser removida
      for (let i = 0; i < arrCsv.length; i++) {
        const duracao = arrCsv[i].Duracao;
        const resultado = duracao.match(expressao);
        const valor = resultado[1];
        arrCsv[i].Duracao = valor
      }

      arrCsv.forEach(function(ramaisOrigem){
          const csvData = ramaisOrigem.Data;
          const mes = csvData.split("-")[1];
          let toNumber = Number(ramaisOrigem.Duracao)
          let toString = ramaisOrigem.Destino.toString()
          const regexFiltroData = /^(\d{4}-\d{2}-\d{2}).*/;
          const regexFiltroHora = /\d{4}-\d{2}-\d{2}\s(\d{2}:\d{2}:\d{2})/
          // const dataFiltrada = ramaisOrigem.Data.replace(regexFiltroData, "$1");
          const dataInicio = new Date(dataInicial.value).getTime();
          const dataFim = new Date(dataFinal.value).getTime();

          if(dataInicial !== "" && dataFinal !== "") {

            if(inputRamal.value == ramaisOrigem.Origem) {

              const dataFiltrada = ramaisOrigem.Data.replace(regexFiltroData, "$1");
              const horaFiltrada = ramaisOrigem.Data.match(regexFiltroHora)[1]
              // Filtra os dados dentro do intervalo de tempo
              const data = new Date(dataFiltrada).getTime();

               if(data >= dataInicio && data <= dataFim) {

                //CHAMADAS INTERNAS REALIZADAS
                if(toString.length <= 5 && ramaisOrigem.Estado === "BUSY") {
                  qtdIntEfetuadaOcupado++
                  intEfetuadaOcupado.innerText = qtdIntEfetuadaOcupado                  
                }else if (toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
                  qtdIntEfetuadaAtendida++
                  intEfetuadaAtendida.innerText = qtdIntEfetuadaAtendida                                    
                }else if (toString.length <= 5 && ramaisOrigem.Estado === "NO ANSWER") {
                  qtdIntEfetuadaNaoAtendida++
                  intEfetuadaNaoAtendida.innerText = qtdIntEfetuadaNaoAtendida                  
                }else if (toString.length <= 5 && ramaisOrigem.Estado === "FAILED") {
                  qtdIntEfetuadaFalha++
                  intEfetuadaFalha.innerText = qtdIntEfetuadaFalha

                //CHAMADAS EXTERNAS REALIZADAS
                }else if (toString.length > 5 && ramaisOrigem.Estado === "BUSY") {
                  qtdExtEfetuadaOcupado++
                  extEfetuadaOcupado.innerText = qtdExtEfetuadaOcupado                  
                }else if (toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
                  qtdExtEfetuadaAtendida++
                  extEfetuadaAtendida.innerText = qtdExtEfetuadaAtendida                  
                }else if (toString.length > 5 && ramaisOrigem.Estado === "NO ANSWER") {
                  qtdExtEfetuadaNaoAtendida++
                  extEfetuadaNaoAtendida.innerText = qtdExtEfetuadaNaoAtendida                  
                }else if (toString.length > 5 && ramaisOrigem.Estado === "FAILED") {
                  qtdExtEfetuadaFalha++
                  extEfetuadaFalha.innerText = qtdExtEfetuadaFalha                  
                }
                //RESUMO DE CHAMADAS REALIZADAS
                resumoEfetuadaOcupado.innerText = (qtdIntEfetuadaOcupado + qtdExtEfetuadaOcupado)
                resumoEfetuadaAtendida.innerText = (qtdIntEfetuadaAtendida + qtdExtEfetuadaAtendida)
                resumoEfetuadaNaoAtendida.innerText = (qtdIntEfetuadaNaoAtendida + qtdExtEfetuadaNaoAtendida)
                resumoEfetuadaFalha.innerText = (qtdIntEfetuadaFalha + qtdExtEfetuadaFalha)

                
            }
          }
        }
      })
    }
  })
})

