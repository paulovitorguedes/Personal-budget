class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this._ano = ano;
        this._mes = mes;
        this._dia = dia;
        this._tipo = tipo;
        this._descricao = descricao;
        this._valor = valor;
    }
}



class Bd {
    constructor() {
        if (localStorage.getItem('id') == null) {
            localStorage.setItem('id', 0);
        }
    }

    getProximoId() {
        return parseInt(localStorage.getItem('id')) + 1;
    }

 
    gravar(d) {
        //Adiciona o objeto despesa no localStorage
        localStorage.setItem(this.getProximoId(), JSON.stringify(d));
        localStorage.setItem('id', this.getProximoId());   
    }
}

let bd = new Bd();






function cadastrar() {
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');


    const despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value,
    )

    bd.gravar(despesa);
}