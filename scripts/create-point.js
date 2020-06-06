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
    console.log("flw");
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

