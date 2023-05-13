
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

    pesquisar(d) {
        let despesas = this.buscar();

        if (d.ano != '') {
            despesas = despesas.filter(i => i._ano == d.ano);
            // console.log(despesas);
        }
        if (d.mes != '') {
            despesas = despesas.filter(i => i._mes == d.mes);
            // console.log(despesas);
        }
        if (d.dia != '') {
            despesas = despesas.filter(i => i._dia == d.dia);
            // console.log(despesas);
        }
        if (d.tipo != '') {
            despesas = despesas.filter(i => i._tipo == d.tipo);
            // console.log(despesas);
        }
        if (d.descricao != '') {
            despesas = despesas.filter(i => i._descricao == d.descricao);
            // console.log(despesas);
        }
        if (d.valor != '') {
            despesas = despesas.filter(i => i._valor == d.valor);
            // console.log(despesas);
        }

        return despesas;
    }


    buscar() {
        let id = localStorage.getItem('id');
        const despesas = Array();
        for (let i = 1; i <= id; i++) {
            let despesa = localStorage.getItem(i);
            if (despesa != null) {
                despesa = JSON.parse(despesa);
                despesa._id = i;//insere o atributo id ao objeto
                despesas.push(despesa);
                // console.log(despesa);
            }
        }
        return despesas;
    }


    excluir(id) {
        localStorage.removeItem(id);
    }

}
const bd = new Bd();











function cadastrarDespesas() {
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
        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
    } else {
        setModal(1);
    }
}










function removerDespesas(id) {
    bd.excluir(id);
}










//Na chamada da função sem parametros, a função deve apresentar na tabela todos os dados cadastrados
//Na chamada da função com parametro, a função deve apresentar na tabela os dados do Array de objetos recebido no param
function apresentarDespesas(param = Array()) {

    let despesas = Array();
    if (param.length > 0) { //para as chamadas da função com parametro
        despesas = param;
    } else { //para as chamadas da função sem parametro
        despesas = bd.buscar();
    }
    //Recebe um Array de objetos onde cada ogjeto equivale a uma despesa



    //Reecebe o DOM do tbody para pabela de apresentação das despesas
    let tebelaDespesas = document.getElementById('tabelaDespesas');
    tebelaDespesas.innerHTML = '';

    despesas.forEach(despesa => {

        despesa._tipo = recuperaTipo(despesa._tipo);
        let linha = tebelaDespesas.insertRow();
        linha.insertCell(0).innerHTML = `${despesa._dia}/${despesa._mes}/${despesa._ano}`;
        linha.insertCell(1).innerHTML = despesa._tipo;
        linha.insertCell(2).innerHTML = despesa._descricao;
        linha.insertCell(3).innerHTML = despesa._valor;

        let btn = document.createElement('button');
        btn.className = 'btn btn-danger';
        btn.id = despesa._id;
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.onclick = function () { removerDespesas(despesa._id) };
        linha.insertCell(4).append(btn);

    });
}








function pesquisarDespesas() {
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    const despesa = {
        ano: ano.value,
        mes: mes.value,
        dia: dia.value,
        tipo: tipo.value,
        descricao: descricao.value,
        valor: valor.value
    };


    if (ano.value == '' && mes.value == '' && dia.value == '' && tipo.value == '' && descricao.value == '' && valor.value == '') {
        apresentarDespesas(); //Para apresentação de todas as despesas caso realize a pesquisa com todos os campos vazios

    } else {
        //Se despesaFiltrada conter resultados, será apresentado na tabela
        const despesaFiltrada = bd.pesquisar(despesa);
        if (despesaFiltrada.length > 0) {
            apresentarDespesas(despesaFiltrada);
        } else {
            setModal(3);
        }
    }
}








function setModal(valor) {
    //caso 1 = Falha de cadastro
    //Caso 2 = Sucesso de cadastro
    //caso 3 = Falha de pesquisa
    let buton = document.getElementById('modal-btn');
    // console.log(valor);
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

        case 3:
            document.getElementById('modal-h').className = 'modal-header text-danger';
            document.getElementById('exampleModalLabel').innerHTML = 'Pesquisa não concluída';
            document.getElementById('modal-b').innerHTML = 'Nenhuma resultado foi encontrado com os dados inseridos';
            buton.innerHTML = 'Voltar e Corrigir';
            buton.className = 'btn btn-danger';
            $('#modalRegistrandoDespesas').modal('show');
            break;
    }
}







function recuperaTipo(tipo) {

    switch (parseInt(tipo)) {
        case 1:
            return 'Alimentação';
        case 2:
            return 'Educação';
        case 3:
            return 'Lazer';
        case 4:
            return 'Saúde';
        case 5:
            return 'Transporte';
    }
}