const filterBtn = document.getElementById('filter-csv')
const inputRamal = document.getElementById('input-ramal')
const callExterna = document.getElementById('ext-call')
const internasOcupado = document.getElementById('internas-ocupado')
const mediaExtCall = document.getElementById('mediaExt-call')
const mediaIntCall = document.getElementById('mediaInt-call')
const divCards = document.getElementById('divCards')
const selectMes = document.getElementById('sel-mes')
const dataInicial = document.getElementById('start-date')
const dataFinal = document.getElementById('end-date')
const inputDestino = document.getElementById('input-ramal-destino')

const intEfetuadaOcupado = document.getElementById('internas-efetuada-ocupado')
const intEfetuadaAtendida = document.getElementById('internas-efetuada-atendida')
const intEfetuadaNaoAtendida = document.getElementById('internas-efetuada-nao-atendida')
const intEfetuadaFalha = document.getElementById('internas-efetuada-falha')

let qtdIntEfetuadaOcupado = 0
let qtdIntEfetuadaAtendida = 0
let qtdIntEfetuadaNaoAtendida = 0
let qtdIntEfetuadaFalha = 0


let arrCsv = []
let ramalOrigem = []
// Array para armazenar os dados filtrados
const dadosFiltrados = []
let qtdChamadasExt = 0
let qtdChamadasInt = 0
let duracaoMediaExt = 0
let duracaoMediaInt = 0
let qtdChamadasIncompletas = 0

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
              if (data >= dataInicio && data <= dataFim) {

                if(toString <= 5 && ramaisOrigem.Estado === "BUSY") {
                  qtdIntEfetuadaOcupado++                  
                }else if (toString <= 5 && ramaisOrigem.Estado === "ANSWERED") {
                  qtdIntEfetuadaAtendida++                                    
                }else if (toString <= 5 && ramaisOrigem.Estado === "NO ANSWER") {
                  qtdIntEfetuadaNaoAtendida++                  
                }else if (toString <= 5 && ramaisOrigem.Estado === "FAILED") {
                  qtdIntEfetuadaFalha++                  
                }

              //   if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
              //     qtdChamadasExt++
              //     duracaoMediaExt = (duracaoMediaExt + toNumber)
              //     callExterna.innerText = qtdChamadasExt
              //     mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
              //   }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
              //     qtdChamadasInt++
              //     duracaoMediaInt+=toNumber
              //     internasOcupado.innerText = qtdChamadasInt
              //     mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
              //     // console.log("Nº Dest: " + ramaisOrigem.Destino + "\nQtdChInt: " + qtdChamadasInt + "\nDuração: " + toNumber)
              //   }
                

                
              //   const filtroRamal = {
              //     horario: horaFiltrada,
              //     data: dataFiltrada,
              //     destino: ramaisOrigem.Destino,
              //     estado: ramaisOrigem.Estado,
              //     duracao: converterTempo(toNumber)
              //   }
              //   dadosFiltrados.push(filtroRamal);
              // }
              // if (inputDestino.value == ramaisOrigem.Destino){
              //   console.log(
              //     "ramal orig: " + ramaisOrigem.Origem + "\nramal dest: " + ramaisOrigem.Destino + "hora: " + horaFiltrada
              //   )
              // }
              // console.log(dadosFiltrados)
          }
        }

        // if(selectMes.value === "00") {
        //   if(inputRamal.value == ramaisOrigem.Origem){
        //     // const dataFiltrada = ramaisOrigem.Data.replace(regexFiltroData, "$1");
        //     // const horaFiltrada = ramaisOrigem.Data.match(regexFiltroHora)[1]
        //     // // Filtra os dados dentro do intervalo de tempo
        //     // const data = new Date(dataFiltrada).getTime();
        //     //   if (data >= dataInicio && data <= dataFim) {

        //     //     const filtroRamal = {
        //     //       horario: horaFiltrada,
        //     //       data: dataFiltrada,
        //     //       destino: ramaisOrigem.Destino,
        //     //       estado: ramaisOrigem.Estado,
        //     //       duracao: converterTempo(toNumber)
        //     //     }
        //     //     dadosFiltrados.push(filtroRamal);
        //     //   }
        //     //   console.log(dadosFiltrados)
			  
        //     // let toString = ramaisOrigem.Destino.toString()
        //     // let toNumber = Number(ramaisOrigem.Duracao)
			
        //     if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
        //       qtdChamadasExt++
        //       duracaoMediaExt = (duracaoMediaExt + toNumber)
        //       callExterna.innerText = qtdChamadasExt
        //       mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
        //     }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
        //       qtdChamadasInt++
        //       duracaoMediaInt+=toNumber
        //       callInterna.innerText = qtdChamadasInt
        //       mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
        //       // console.log("Nº Dest: " + ramaisOrigem.Destino + "\nQtdChInt: " + qtdChamadasInt + "\nDuração: " + toNumber)
        //     }
  
        //     // if(ramaisOrigem.Estado != "ANSWERED" && toString.length > 5) {
        //     //   qtdChamadasIncompletas++
        //     //   mediaIntCall.innerText = qtdChamadasIncompletas
  
        //     // }
            
        //   }
        // }else if(selectMes.value === "01" && mes == selectMes.value) {
        //   if(inputRamal.value == ramaisOrigem.Origem){
			  
        //     let toString = ramaisOrigem.Destino.toString()
        //     let toNumber = Number(ramaisOrigem.Duracao)
        //     if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasExt++
        //       duracaoMediaExt = (duracaoMediaExt + toNumber)              
        //       callExterna.innerText = qtdChamadasExt
        //       mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
			  
        //     }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasInt++
        //       duracaoMediaInt+=toNumber
        //       callInterna.innerText = qtdChamadasInt
        //       mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
			  //       // console.log("Nº Dest: " + ramaisOrigem.Destino + "\nQtdChNInt: " + qtdChamadasInt + "\nDuração: " + toNumber + "\nData Ini: " + dataInicial.value + "\nDataFin: " + dataFinal.value)
        //     }
  
        //     // if(ramaisOrigem.Estado != "ANSWERED" && toString.length > 5) {
        //     //   qtdChamadasIncompletas++
        //     //   incompletaCall.innerText = qtdChamadasIncompletas
  
        //     // }
            
        //   }
        // }else if(selectMes.value === "02" && mes == selectMes.value) {
			
        //   if(inputRamal.value == ramaisOrigem.Origem){
			  
        //     let toString = ramaisOrigem.Destino.toString()
        //     let toNumber = Number(ramaisOrigem.Duracao)
			
        //     if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasExt++
        //       duracaoMediaExt = (duracaoMediaExt + toNumber)
        //       callExterna.innerText = qtdChamadasExt
        //       mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
			  
        //     }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasInt++
        //       duracaoMediaInt+=toNumber
        //       callInterna.innerText = qtdChamadasInt
        //       mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
        //     }
  
        //     // if(ramaisOrigem.Estado != "ANSWERED" && toString.length > 5) {
        //     //   qtdChamadasIncompletas++
        //     //   mediaIntCall.innerText = qtdChamadasIncompletas
  
        //     // }
            
        //   }
        // }else if(selectMes.value === "03" && mes == selectMes.value) {
			
        //   if(inputRamal.value == ramaisOrigem.Origem){
			  
        //     let toString = ramaisOrigem.Destino.toString()
        //     let toNumber = Number(ramaisOrigem.Duracao)
			
        //     if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasExt++
        //       duracaoMediaExt = (duracaoMediaExt + toNumber)
        //       callExterna.innerText = qtdChamadasExt
        //       mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
			  
        //     }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasInt++
        //       duracaoMediaInt+=toNumber
        //       callInterna.innerText = qtdChamadasInt
        //       mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
        //       // console.log("Qtd Chamadas: " + qtdChamadasInt + "\nDuração Media: " + duracaoMediaInt)
        //     }
  
        //     // if(ramaisOrigem.Estado != "ANSWERED" && toString.length > 5) {
        //     //   qtdChamadasIncompletas++
        //     //   mediaIntCall.innerText = qtdChamadasIncompletas
  
        //     // }
            
        //   }
        // }else if(selectMes.value === "04" && mes == selectMes.value) {
			
        //   if(inputRamal.value == ramaisOrigem.Origem){
			  
        //     let toString = ramaisOrigem.Destino.toString()
        //     let toNumber = Number(ramaisOrigem.Duracao)
			
        //     if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasExt++
        //       duracaoMediaExt = (duracaoMediaExt + toNumber)
        //       callExterna.innerText = qtdChamadasExt
        //       mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
			  
        //     }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasInt++
        //       duracaoMediaInt+=toNumber
        //       callInterna.innerText = qtdChamadasInt
        //       mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
        //     }
  
        //     // if(ramaisOrigem.Estado != "ANSWERED" && toString.length > 5) {
        //     //   qtdChamadasIncompletas++
        //     //   mediaIntCall.innerText = qtdChamadasIncompletas
  
        //     // }
            
        //   }
        // }else if(selectMes.value === "05" && mes == selectMes.value) {
			
        //   if(inputRamal.value == ramaisOrigem.Origem){
			  
        //     let toString = ramaisOrigem.Destino.toString()
        //     let toNumber = Number(ramaisOrigem.Duracao)
			
        //     if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasExt++
        //       duracaoMediaExt = (duracaoMediaExt + toNumber)
        //       callExterna.innerText = qtdChamadasExt
        //       mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
			  
        //     }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasInt++
        //       duracaoMediaInt+=toNumber
        //       callInterna.innerText = qtdChamadasInt
        //       mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
        //     }
  
        //     // if(ramaisOrigem.Estado != "ANSWERED" && toString.length > 5) {
        //     //   qtdChamadasIncompletas++
        //     //   mediaIntCall.innerText = qtdChamadasIncompletas
  
        //     // }
            
        //   }
        // }else if(selectMes.value === "06" && mes == selectMes.value) {
			
        //   if(inputRamal.value == ramaisOrigem.Origem){
			  
        //     let toString = ramaisOrigem.Destino.toString()
        //     let toNumber = Number(ramaisOrigem.Duracao)
			
        //     if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasExt++
        //       duracaoMediaExt = (duracaoMediaExt + toNumber)
        //       callExterna.innerText = qtdChamadasExt
        //       mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
        //     }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasInt++
        //       duracaoMediaInt+=toNumber
        //       callInterna.innerText = qtdChamadasInt
        //       mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
        //     }
  
        //     // if(ramaisOrigem.Estado != "ANSWERED" && toString.length > 5) {
        //     //   qtdChamadasIncompletas++
        //     //   mediaIntCall.innerText = qtdChamadasIncompletas
  
        //     // }
            
        //   }
        // }else if(selectMes.value === "07" && mes == selectMes.value) {
			
        //   if(inputRamal.value == ramaisOrigem.Origem){
			  
        //     let toString = ramaisOrigem.Destino.toString()
        //     let toNumber = Number(ramaisOrigem.Duracao)
			
        //     if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasExt++
        //       duracaoMediaExt = (duracaoMediaExt + toNumber)
        //       callExterna.innerText = qtdChamadasExt
        //       mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
        //     }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasInt++
        //       duracaoMediaInt+=toNumber
        //       callInterna.innerText = qtdChamadasInt
        //       mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
        //     }
  
        //     // if(ramaisOrigem.Estado != "ANSWERED" && toString.length > 5) {
        //     //   qtdChamadasIncompletas++
        //     //   mediaIntCall.innerText = qtdChamadasIncompletas
  
        //     // }
            
        //   }
        // }else if(selectMes.value === "08" && mes == selectMes.value) {
			
        //   if(inputRamal.value == ramaisOrigem.Origem){
			  
        //     let toString = ramaisOrigem.Destino.toString()
        //     let toNumber = Number(ramaisOrigem.Duracao)
			
        //     if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasExt++
        //       duracaoMediaExt = (duracaoMediaExt + toNumber)
        //       callExterna.innerText = qtdChamadasExt
        //       mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
        //     }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasInt++
        //       duracaoMediaInt+=toNumber
        //       callInterna.innerText = qtdChamadasInt
        //       mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
        //     }
  
        //     // if(ramaisOrigem.Estado != "ANSWERED" && toString.length > 5) {
        //     //   qtdChamadasIncompletas++
        //     //   mediaIntCall.innerText = qtdChamadasIncompletas
  
        //     // }
            
        //   }
        // }else if(selectMes.value === "09" && mes == selectMes.value) {
			
        //   if(inputRamal.value == ramaisOrigem.Origem){
			  
        //     let toString = ramaisOrigem.Destino.toString()
        //     let toNumber = Number(ramaisOrigem.Duracao)
			
        //     if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasExt++
        //       duracaoMediaExt = (duracaoMediaExt + toNumber)
        //       callExterna.innerText = qtdChamadasExt
        //       mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
        //     }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasInt++
        //       duracaoMediaInt+=toNumber
        //       callInterna.innerText = qtdChamadasInt
        //       mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
        //     }
  
        //     // if(ramaisOrigem.Estado != "ANSWERED" && toString.length > 5) {
        //     //   qtdChamadasIncompletas++
        //     //   mediaIntCall.innerText = qtdChamadasIncompletas
  
        //     // }
            
        //   }
        // }else if(selectMes.value === "10" && mes == selectMes.value) {
			
        //   if(inputRamal.value == ramaisOrigem.Origem){
			  
        //     let toString = ramaisOrigem.Destino.toString()
        //     let toNumber = Number(ramaisOrigem.Duracao)
			
        //     if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasExt++
        //       duracaoMediaExt = (duracaoMediaExt + toNumber)
        //       callExterna.innerText = qtdChamadasExt
        //       mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
        //     }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasInt++
        //       duracaoMediaInt+=toNumber
        //       callInterna.innerText = qtdChamadasInt
        //       mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
        //     }
  
        //     // if(ramaisOrigem.Estado != "ANSWERED" && toString.length > 5) {
        //     //   qtdChamadasIncompletas++
        //     //   mediaIntCall.innerText = qtdChamadasIncompletas
  
        //     // }
            
        //   }
        // }else if(selectMes.value === "12" && mes == selectMes.value) {
			
        //   if(inputRamal.value == ramaisOrigem.Origem){
        //     let toString = ramaisOrigem.Destino.toString()
        //     let toNumber = Number(ramaisOrigem.Duracao)
			
        //     if(toString.length > 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasExt++
        //       duracaoMediaExt = (duracaoMediaExt + toNumber)
        //       callExterna.innerText = qtdChamadasExt
        //       mediaExtCall.innerText = segundosParaMinutos(duracaoMediaExt)
        //     }else if(toString.length <= 5 && ramaisOrigem.Estado === "ANSWERED" && toNumber > 1) {
				
        //       qtdChamadasInt++
        //       duracaoMediaInt+=toNumber
        //       callInterna.innerText = qtdChamadasInt
        //       mediaIntCall.innerText = segundosParaMinutosInt(duracaoMediaInt)
        //     }
  
        //     // if(ramaisOrigem.Estado != "ANSWERED" && toString.length > 5) {
        //     //   qtdChamadasIncompletas++
        //     //   mediaIntCall.innerText = qtdChamadasIncompletas
  
        //     // }
            
        //   }
        // }
      })
    }    
  })
});