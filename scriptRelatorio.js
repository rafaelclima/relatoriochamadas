const filterBtn = document.getElementById('filter-csv')
const inputRamal = document.getElementById('input-ramal')
const mediaExtCall = document.getElementById('mediaExt-call')
const mediaIntCall = document.getElementById('mediaInt-call')
const divCards = document.getElementById('menu')
const dataInicial = document.getElementById('start-date')
const dataFinal = document.getElementById('end-date')
const inputDestino = document.getElementById('input-ramal-destino')
//Campos das chamadas Internas Efetuadas
const intEfetuadaOcupado = document.getElementById('internas-efetuada-ocupado')
const intEfetuadaAtendida = document.getElementById('internas-efetuada-atendida')
const intEfetuadaNaoAtendida = document.getElementById('internas-efetuada-nao-atendida')
const intEfetuadaFalha = document.getElementById('internas-efetuada-falha')
const tempoIntEfetuada = document.getElementById('tempo-chamada-interna-efetuada')
//Campos das chamadas Internas Recebidas
const intRecebidaOcupado = document.getElementById('internas-recebidas-ocupado')
const intRecebidaAtendida = document.getElementById('internas-recebidas-atendida')
const intRecebidaNaoAtendida = document.getElementById('internas-recebidas-nao-atendida')
const intRecebidaFalha = document.getElementById('internas-recebidas-falha')
const tempoIntRecebida = document.getElementById('tempo-chamada-interna-recebida')
//Campos das chamadas Externas Efetuadas
const extEfetuadaOcupado = document.getElementById('externas-efetuada-ocupado')
const extEfetuadaAtendida = document.getElementById('externas-efetuada-atendida')
const extEfetuadaNaoAtendida = document.getElementById('externas-efetuada-nao-atendida')
const extEfetuadaFalha = document.getElementById('externas-efetuada-falha')
const tempoExtEfetuada = document.getElementById('tempo-chamada-externa-efetuada')
//Campos das chamadas Externas Recebidas
const extRecebidaOcupado = document.getElementById('externas-recebida-ocupado')
const extRecebidaAtendida = document.getElementById('externas-recebida-atendida')
const extRecebidaNaoAtendida = document.getElementById('externas-recebida-nao-atendida')
const extRecebidaFalha = document.getElementById('externas-recebida-falha')
const tempoExtRecebida = document.getElementById('tempo-chamada-externa-recebida')
//Campos do resumo das chamadas Efetuadas
const resumoEfetuadaOcupado = document.getElementById('resumo-efetuada-ocupado')
const resumoEfetuadaAtendida = document.getElementById('resumo-efetuada-atendida')
const resumoEfetuadaNaoAtendida = document.getElementById('resumo-efetuada-nao-atendida')
const resumoEfetuadaFalha = document.getElementById('resumo-efetuada-falha')
//Campos do resumo das chamadas Recebidas
const resumoRecebidaOcupado = document.getElementById('resumo-recebida-ocupado')
const resumoRecebidaAtendida = document.getElementById('resumo-recebida-atendida')
const resumoRecebidaNaoAtendida = document.getElementById('resumo-recebida-nao-atendida')
const resumoRecebidaFalha = document.getElementById('resumo-recebida-falha')

let qtdIntEfetuadaOcupado = 0
let qtdIntEfetuadaAtendida = 0
let qtdIntEfetuadaNaoAtendida = 0
let qtdIntEfetuadaFalha = 0

let qtdIntRecebidaOcupado = 0
let qtdIntRecebidaAtendida = 0
let qtdIntRecebidaNaoAtendida = 0
let qtdIntRecebidaFalha = 0

let qtdExtEfetuadaOcupado = 0
let qtdExtEfetuadaAtendida = 0
let qtdExtEfetuadaNaoAtendida = 0
let qtdExtEfetuadaFalha = 0
let tempoMedioExtEfetuada = 0

let qtdExtRecebidaOcupado = 0
let qtdExtRecebidaAtendida = 0
let qtdExtRecebidaNaoAtendida = 0
let qtdExtRecebidaFalha = 0
let tempoMedioExtRecebida = 0

let qtdRelatorioAtendida = 0
let qtdRelatorioNaoAtendida = 0
let qtdRelatorioOcupado = 0
let qtdRelatorioFalha = 0
let qtdItensRelatorio = 0


let arrCsv = []
let duracaoMediaExt = 0
let duracaoMediaInt = 0
let duracaoMediaRecebidaInt = 0
let duracaoMediaRecebidaExt = 0

function segundosParaMinutosExtEfetuada(segundos) {
  const vlrTotal = segundos / qtdExtEfetuadaAtendida
  const minutos = Math.floor(vlrTotal / 60);
  const segundosRestantes = vlrTotal % 60;
  return `${minutos}m ${Math.round(segundosRestantes)}s`;
}
function segundosParaMinutosIntEfetuada(segundos) {
  const vlrTotal = segundos / qtdIntEfetuadaAtendida
  const minutos = Math.floor(vlrTotal / 60);
  const segundosRestantes = vlrTotal % 60;
  return `${minutos}m ${Math.round(segundosRestantes)}s`;
}
function segundosParaMinutosIntRecebida(segundos) {
  const vlrTotal = segundos / qtdIntRecebidaAtendida
  const minutos = Math.floor(vlrTotal / 60);
  const segundosRestantes = vlrTotal % 60;
  return `${minutos}m ${Math.round(segundosRestantes)}s`;
}
function segundosParaMinutosExtRecebida(segundos) {
  const vlrTotal = segundos / qtdExtRecebidaAtendida
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
function transformarStatus(estado) {
  if (estado === "BUSY") {
    return "OCUPADO"    
  }else if (estado === "ANSWERED") {
    return "ATENDIDA"
  }else if (estado === "NO ANSWER") {
    return "NÃO ATENDIDA"
  }else if (estado === "FAILED") {
    return "FALHA"
  }
  
}

filterBtn.addEventListener('click', function() {

  Papa.parse(document.getElementById('input-csv').files[0], {
    download: true,
    header: true,
    delimiter: ",",
    newline: "",
    quoteChar: '"',
    dynamicTyping: true,
    skipEmptyLines: true,
    encoding: "utf-8",
    complete: function(results) {
      arrCsv = results.data.map(item => ({
        Data: item.Data,
        Origem: item.Origem,
        Estado: item.Estado,
        Destino: item.Destino,
        Duração: item.Duração
      }));
    
      

      const expressao = /^([\d.]+)s/; // expressão regular para encontrar a parte da string a ser removida
      for (let i = 0; i < arrCsv.length; i++) {
        const duracao = arrCsv[i].Duração;
        const resultado = duracao.match(expressao);
        const valor = resultado[1];
        arrCsv[i].Duração = valor
      }

      arrCsv.forEach(function(ramaisOrigem){
          const csvData = ramaisOrigem.Data;
          const mes = csvData.split("-")[1];
          let toNumber = Number(ramaisOrigem.Duração)
          let toString = ramaisOrigem.Destino.toString()
          let toNumberRecebida = Number(ramaisOrigem.Duração)
          const toStringRecebida = ramaisOrigem.Origem.toString()
          const regexFiltroData = /^(\d{4}-\d{2}-\d{2}).*/;
          const regexFiltroHora = /\d{4}-\d{2}-\d{2}\s(\d{2}:\d{2}:\d{2})/
          const dataInicio = new Date(dataInicial.value).getTime();
          const dataFim = new Date(dataFinal.value).getTime();

          if (inputDestino.value !== "" && dataInicial !== "" && dataFinal !== "" ) {
            const corpoTabela = document.getElementById('corpo-tabela')
            const filtroTabela = document.getElementById('filtro-tabela')
            divCards.style.display = 'none'
            const horaFiltrada = ramaisOrigem.Data.match(regexFiltroHora)[1]
            const dataFiltrada = ramaisOrigem.Data.replace(regexFiltroData, "$1");
            // Filtra os dados dentro do intervalo de tempo
            const data = new Date(dataFiltrada).getTime();

            if (inputRamal.value == ramaisOrigem.Origem && inputDestino.value == ramaisOrigem.Destino && data >= dataInicio && data <= dataFim) {

              const cardResumo = document.getElementById('card-resumo')
              cardResumo.style.display = 'none' 
              qtdItensRelatorio++

              // Data no formato "AAAA-MM-DD"
              var dataHora = dataFiltrada;
              // Separa a data em partes usando a função split()
              var partesDataHora = dataHora.split("-");
              // Cria um novo objeto Date() com a data separada
              var dataPadrao = new Date(partesDataHora[0], partesDataHora[1] - 1, partesDataHora[2]);
              // Usa as funções getDay(), getMonth() e getFullYear() para obter as partes da data
              var diaPadrao = dataPadrao.getDate();
              var mesPadrao = dataPadrao.getMonth() + 1;
              var anoPadrao = dataPadrao.getFullYear();
              // Formata a data no formato "DD/MM/AAAA"
              var dataFormatada = diaPadrao + "/" + mesPadrao + "/" + anoPadrao;

              if (qtdItensRelatorio >= 15) {
                cardResumo.style.display = 'block'
              }
                const relatorioTotal = document.getElementById('relatorio-total')
                const relatorioAtendida = document.getElementById('relatorio-atendida')
                const relatorioNaoAtendida = document.getElementById('relatorio-nao-atendida')
                const relatorioOcupado = document.getElementById('relatorio-ocupado')
                const relatorioFalha = document.getElementById('relatorio-falha')

                relatorioTotal.innerText = qtdItensRelatorio

              if (ramaisOrigem.Estado === "ANSWERED") {
                qtdRelatorioAtendida++
                relatorioAtendida.innerText = qtdRelatorioAtendida
              }else if (ramaisOrigem.Estado === "NO ANSWER") {
                qtdRelatorioNaoAtendida++
                relatorioNaoAtendida.innerText = qtdRelatorioNaoAtendida
              }else if (ramaisOrigem.Estado === "BUSY") {
                qtdRelatorioOcupado++
                relatorioOcupado.innerText = qtdRelatorioOcupado
              }else if (ramaisOrigem.Estado === "FAILED") {
                qtdRelatorioFalha++
                relatorioFalha.innerText = qtdRelatorioFalha
              }
              
              const trTabela = document.createElement('tr')
              const tdOrigem = document.createElement('td')
              tdOrigem.innerText = ramaisOrigem.Origem
              const tdDestino = document.createElement('td')
              tdDestino.innerText = ramaisOrigem.Destino
              const tdData = document.createElement('td')
              tdData.innerText = dataFormatada
              const tdHora = document.createElement('td')
              tdHora.innerText = horaFiltrada
              const tdStatus = document.createElement('td')
              tdStatus.innerText = transformarStatus(ramaisOrigem.Estado)
              const tdDuracao = document.createElement('td')
              tdDuracao.innerText = converterTempo(ramaisOrigem.Duração) 

              filtroTabela.style.display = 'block'

              trTabela.append(tdOrigem, tdDestino, tdData, tdHora, tdStatus, tdDuracao)
              corpoTabela.append(trTabela)
            }
            
          }else if(dataInicial !== "" && dataFinal !== "") {
            divCards.style.opacity = 1
            const dataFiltrada = ramaisOrigem.Data.replace(regexFiltroData, "$1");           
            
            // Filtra os dados dentro do intervalo de tempo
            const data = new Date(dataFiltrada).getTime();
              
            //CHAMADAS REALIZADAS (Ramal = Origem)  
            if(inputRamal.value == ramaisOrigem.Origem) {

              if(data >= dataInicio && data <= dataFim) {

                //CHAMADAS INTERNAS REALIZADAS
                if(toString.length <= 5 && ramaisOrigem.Estado === "BUSY") {
                  qtdIntEfetuadaOcupado++
                  intEfetuadaOcupado.innerText = qtdIntEfetuadaOcupado                  
                }else if (toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
                  qtdIntEfetuadaAtendida++
                  duracaoMediaInt+=toNumber
                  tempoIntEfetuada.innerText = segundosParaMinutosIntEfetuada(duracaoMediaInt) 
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
                  duracaoMediaExt+=toNumber
                  tempoExtEfetuada.innerText = segundosParaMinutosExtEfetuada(duracaoMediaExt)                  
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
            //CHAMADAS RECEBIDAS (Ramal = Destino)
            if(inputRamal.value == ramaisOrigem.Destino){
              if(data >= dataInicio && data <= dataFim) {
                //CHAMADAS INTERNAS RECEBIDAS
                if(toStringRecebida.length <= 5 && ramaisOrigem.Estado === "BUSY"){
                  qtdIntRecebidaOcupado++
                  intRecebidaOcupado.innerText = qtdIntRecebidaOcupado                
                }else if (toStringRecebida.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumberRecebida > 1){
                  qtdIntRecebidaAtendida++
                  duracaoMediaRecebidaInt+=toNumberRecebida
                  tempoIntRecebida.innerText = segundosParaMinutosIntRecebida(duracaoMediaRecebidaInt) 
                  intRecebidaAtendida.innerText = qtdIntRecebidaAtendida                
                }else if (toStringRecebida.length <= 5 && ramaisOrigem.Estado === "NO ANSWER"){
                  qtdIntRecebidaNaoAtendida++
                  intRecebidaNaoAtendida.innerText = qtdIntRecebidaNaoAtendida
                }else if (toStringRecebida.length <= 5 && ramaisOrigem.Estado === "FAILED"){
                  qtdIntRecebidaFalha++
                  intRecebidaFalha.innerText = qtdIntRecebidaFalha

                //CHAMADAS EXTERNAS RECEBIDAS  
                }else if (toStringRecebida.length > 5 && ramaisOrigem.Estado === "BUSY"){
                  qtdExtRecebidaOcupado++
                  extEfetuadaOcupado.innerText = qtdExtRecebidaOcupado 
                }else if (toStringRecebida.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumberRecebida > 1) {
                  qtdExtRecebidaAtendida++
                  extRecebidaAtendida.innerText = qtdExtRecebidaAtendida
                  duracaoMediaRecebidaExt+=toNumberRecebida
                  tempoExtRecebida.innerText = segundosParaMinutosExtRecebida(duracaoMediaRecebidaExt)                                 
                }else if (toStringRecebida.length > 5 && ramaisOrigem.Estado === "NO ANSWER") {
                  qtdExtRecebidaNaoAtendida++
                  extRecebidaNaoAtendida.innerText = qtdExtRecebidaNaoAtendida                  
                }else if (toStringRecebida.length > 5 && ramaisOrigem.Estado === "FAILED") {
                  qtdExtRecebidaFalha++
                  extRecebidaFalha.innerText = qtdExtRecebidaFalha                  
                }
                //RESUMO DE CHAMADAS RECEBIDAS
                resumoRecebidaOcupado.innerText = (qtdIntRecebidaOcupado + qtdExtRecebidaOcupado)
                resumoRecebidaAtendida.innerText = (qtdIntRecebidaAtendida + qtdExtRecebidaAtendida)
                resumoRecebidaNaoAtendida.innerText = (qtdIntRecebidaNaoAtendida + qtdExtRecebidaNaoAtendida)
                resumoRecebidaFalha.innerText = (qtdIntRecebidaFalha + qtdExtRecebidaFalha)
                              
              }
            }
        }
      })
    }
  })
})

