function tarefa() {

    const inputTarefa = document.querySelector('.input-tarefa');
    const listaTarefa = document.querySelector('.lista-tarefa');
    
    function criarLi() {
        const li = document.createElement('li'); 
        return li;
    }

    function limpaInput() {
        inputTarefa.value = '';
        inputTarefa.focus();
    }
    
    function criarBtnDelete(li) {
        li.innerText += ' ';
        const btnDelete = document.createElement('button')
        btnDelete.innerText = 'Deletar';
        btnDelete.setAttribute('class', 'deletar');
        btnDelete.setAttribute('title', 'Deletar esta tarefa');
        li.appendChild(btnDelete);
    }
    
    function criarTarefa(textoInput) {
        const li = criarLi();
        li.innerText = textoInput;
        listaTarefa.appendChild(li);
        limpaInput();
        criarBtnDelete(li);
        salvarTarefa();
    }


    document.addEventListener('keypress', function(e) {
        if(e.keyCode === 13){
            if(!inputTarefa.value) return;
            criarTarefa(inputTarefa.value);
        }
    });

    document.addEventListener('click', function(e) {
        const el = e.target;

        if(el.classList.contains('btn-tarefa')) {
            if(!inputTarefa.value) return;
            criarTarefa(inputTarefa.value);
        }

        if(el.classList.contains('deletar')) {
            el.parentElement.remove();
            salvarTarefa();
        }
    });

    function salvarTarefa() {
        const liTarefas = listaTarefa.querySelectorAll('li');
        const listaDeTarefas = [];

        for(let tarefa of liTarefas) {
            let tarefaTexto = tarefa.innerText;
            tarefaTexto = tarefaTexto.replace('Deletar', '').trim();
            listaDeTarefas.push(tarefaTexto);
        }

        const tarefaJSON = JSON.stringify(listaDeTarefas);
        localStorage.setItem('tarefas', tarefaJSON);
    }

    function addTarefaSalva() {
        const tarefas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefas);

        for(let tarefa of listaDeTarefas) {
            criarTarefa(tarefa);
        }
    }

    addTarefaSalva();
}

tarefa();