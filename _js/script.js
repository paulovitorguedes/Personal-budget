
//Classe com os atributos do formulário
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this._ano = ano;
        this._mes = mes;
        this._dia = dia;
        this._tipo = tipo;
        this._descricao = descricao;
        this._valor = valor;
    }

    //Função para validar os campos do form, retorna false contendo qualquer campo undefined ou null ou vazio
    validar() {
        for (const i in this) {
            if (this[i] == undefined || this[i] == null || this[i] == '') {
                return false;
            }
        }
        return true;
    }

}




//Classe de acesso ao localStorage
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

        try {
            //Adiciona o objeto despesa no localStorage
            localStorage.setItem(this.getProximoId(), JSON.stringify(d));
            localStorage.setItem('id', this.getProximoId());

            setModal(2);

        } catch (e) {

        }
    }

    recuperarDespesas() {
        let id = localStorage.getItem('id');
        const despesas = Array();
        for (let i = 1; i <= id; i++) {
            let despesa = localStorage.getItem(i);
            if (despesa != null) {
                despesas.push(JSON.parse(despesa));
            }
        }
        return despesas;
    }
}
const bd = new Bd();








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

    if (despesa.validar()) {
        bd.gravar(despesa);
    } else {
        setModal(1);
    }
}




function setModal(valor) {
    //caso 1 = Danger
    //CAso 2 = Sucesso
    let buton = document.getElementById('modal-btn');
    switch (valor) {
        case 1:
            document.getElementById('modal-h').className = 'modal-header text-danger';
            document.getElementById('exampleModalLabel').innerHTML = 'Erro de Cadastro';
            document.getElementById('modal-b').innerHTML = 'Existem campos obigatrios que não foram inseridos corretamente';
            buton.innerHTML = 'Voltar e Corrigir';
            buton.className = 'btn btn-danger';
            $('#modalRegistrandoDespesas').modal('show');
            break;

        case 2:
            document.getElementById('modal-h').className = 'modal-header text-success';
            document.getElementById('exampleModalLabel').innerHTML = 'Cadastrado com Sucesso';
            document.getElementById('modal-b').innerHTML = 'A despesa foi cadastrada com sucesso!';
            buton.innerHTML = 'Sair';
            buton.className = 'btn btn-success';
            $('#modalRegistrandoDespesas').modal('show');
            break;
    }
}


function recuperarTodasDespesas() {

    const despesas = bd.recuperarDespesas();
    let row = '';
    let tipo = '';
    despesas.forEach(despesa => {
        
        switch (parseInt(despesa._tipo)) {
            case 1:
                tipo = 'Alimentação';
                break;
            case 2:
                tipo = 'Educação';
                break;
            case 3:
                tipo = 'Lazer';
                break;
            case 4:
                tipo = 'Saúde';
                break;
            case 5:
                tipo = 'Transporte';
                break;
        }

        row += `<tr>
        <td> ${despesa._dia}/${despesa._mes}/${despesa._ano} </td>
        <td> ${tipo} </td>
        <td> ${despesa._descricao} </td>
        <td> ${despesa._valor} </td>
        </tr>`;
    });
    document.getElementById('tableDespesas').innerHTML = row;
    // console.log(despesas);
}