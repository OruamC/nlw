

function poputaleUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for(const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

poputaleUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        citySelect.innerHTML = ""

        for(const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false

    })
}


document
     .querySelector("select[name=uf]")
     .addEventListener("change", getCities)

// itens de coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com JavaScript 
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    // console.log(event.target.dataset.id)

    // Verificar se existem itens selecionados, se sim
    // pegar o itens selecionados
    
    const alreadySelected = selectedItens.findIndex( item => {
        const itemFound = item == itemId //Retorna um booleano
        return itemFound
    })

    // Se ja estiver selecionado, tirar da seleção

    if(alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItens.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        // console.log(filteredItems)
        selectedItens = filteredItems
    } else {
        // Se não estiver selecionado, adicionar a seleção
        // adicionar a seleção
        selectedItens.push(itemId)
    }

    // console.log(selectedItens)
    
    // Atualizar o campo escondido com os itens selecionados
    
    collectedItens.value = selectedItens
}