populateUF();
// quando seleciona uma UF, popula o menu de cidades com os municípios da respectiva UF
document.querySelector("select[name=uf]").addEventListener("change", (e) => populateCity(e.target.value));

function populateUF() {
    const ufSelect = document.querySelector("select[name=uf");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => res.json() )
    .then( ufs => {
        for (let state of ufs) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }        
    })
}

function populateCity(value) {
    const citySelect = document.querySelector("select[name=city");
    // zera o menu, caso já tenha sido selecionada uma UF incorreta antes
    citySelect.innerHTML = `<option value="0">Selecione a cidade</option>`;
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${value}/distritos`)
    .then( (res) => res.json() )
    .then( cities => {
        for (let city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
        }  
        citySelect.disabled = false;  
    })
}

// seleção de itens de coleta
const itemsCollect = document.querySelectorAll(".items-grid li");
const inputSelectedItems = document.getElementById("selectedItems");
let selectedItems = [];

for (let item of itemsCollect) {
    item.addEventListener("click", e => {
        const itemId = event.target.dataset.id;
        event.target.classList.toggle("selected");
        let alreadySelected = selectedItems.findIndex(item => item == itemId);
        if (alreadySelected != -1) {
            const filtered = selectedItems.filter(item => item != itemId);
            selectedItems = filtered;
        }
        else {
            selectedItems.push(parseInt(itemId));
        }
        inputSelectedItems.value = selectedItems;
    });
}

