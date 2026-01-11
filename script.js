// Pegando elementos do HTML
const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');
const botoesFiltro = document.querySelectorAll('[data-filtro]');

// Carrega tarefas salvas (ou array vazio)
let tarefas = JSON.parse(localStorage.getItem('tarefas_v1')) || [];
let filtroAtual = 'todas';

// Salva no localStorage
function salvarTarefas() {
  localStorage.setItem('tarefas_v1', JSON.stringify(tarefas));
}

// Renderiza todas as tarefas na tela
function renderizar() {
  lista.innerHTML = '';

  let temAlgumaVisivel = false;

  tarefas.forEach((t, idx) => {
    const visivel =
      filtroAtual === 'todas' ||
      (filtroAtual === 'pendentes' && !t.concluida) ||
      (filtroAtual === 'concluidas' && t.concluida);

    if (!visivel) return;

    temAlgumaVisivel = true;

    const li = document.createElement('li');
    li.className = 'tarefa';

    const span = document.createElement('span');
    span.className = 'tarefa-texto ' + (t.concluida ? 'concluida' : '');
    span.textContent = t.texto;
span.title = 'Clique para editar';



span.ondblclick = () => {
  if (t.concluida) return;
  editarTarefaInline(idx, span);
};




 // pequeno delay pra pegar o novo span render

li.appendChild(span);   // ✅ span DENTRO do li
lista.appendChild(li);  // ✅ li DENTRO da lista



// Edita o texto de uma tarefa

  

 
    const divBtns = document.createElement('div');
    divBtns.className = 'botoes';

    // Botão concluir / desfazer
    const btnConcluir = document.createElement('button');
    btnConcluir.type = 'button';
    btnConcluir.className = 'botao-pequeno';
    btnConcluir.title = t.concluida ? 'Desfazer' : 'Concluir';
    btnConcluir.textContent = t.concluida ? '↺' : '✔️';
    btnConcluir.onclick = () => concluirTarefa(idx);

    // Botão excluir
    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.className = 'botao-pequeno';
    btnExcluir.title = 'Excluir';
    btnExcluir.textContent = '🗑️';
    btnExcluir.onclick = () => excluirTarefa(idx);

    divBtns.appendChild(btnConcluir);
    divBtns.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(divBtns);
    lista.appendChild(li);
  });

  if (!temAlgumaVisivel) {
    const liVazia = document.createElement('li');
    liVazia.className = 'tarefa-vazia';
    liVazia.textContent = 'Nenhuma tarefa cadastrada';
    lista.appendChild(liVazia);
  }
}

// Marca / desmarca tarefa como concluída
function concluirTarefa(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  salvarTarefas();
  renderizar();
}



// troca span pelo input




// Exclui tarefa
function excluirTarefa(index) {
  const confirmar = confirm('Tem certeza que deseja excluir esta tarefa?');

  if (!confirmar) return;

  tarefas.splice(index, 1);
  salvarTarefas();
  renderizar();
}


function editarTarefaInline(index, spanElemento) {
  const textoAntigo = tarefas[index].texto;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = textoAntigo;
  input.className = 'input-edicao';

  spanElemento.replaceWith(input);
  input.focus();
  input.select();

  function salvar() {
    const novoTexto = input.value.trim();
    if (novoTexto === '') {
      input.replaceWith(spanElemento);
      return;
function editarTarefaInline(index, span) {
  const textoAntigo = tarefas[index].texto;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = textoAntigo;
  input.className = 'input-edicao';

  span.replaceWith(input);
  input.focus();
  input.select();

  function salvar() {
    const novoTexto = input.value.trim();
    if (novoTexto === '') {
      cancelar();
      return;
    }

    tarefas[index].texto = novoTexto;
    salvarTarefas();
    renderizar();
  }

  function cancelar() {
    renderizar();
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') salvar();
    if (e.key === 'Escape') cancelar();
  });

  input.addEventListener('blur', salvar);
}

    }
setTimeout(() => {
  const spans = document.querySelectorAll('.tarefa-texto');
  if (spans[index]) {
    spans[index].classList.add('editado');
  }
}, 50);

    tarefas[index].texto = novoTexto;
    salvarTarefas();
    renderizar();
  }

  input.addEventListener('blur', salvar);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') salvar();
    if (e.key === 'Escape') renderizar();
  });
}

// Evento de enviar o formulário
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const texto = input.value.trim();
  if (!texto) return;

  tarefas.push({ texto, concluida: false });
  salvarTarefas();

  input.value = '';
  input.focus();
  filtroAtual = 'todas';
  atualizarEstadoFiltros();
  renderizar();
});

// Filtros (Todas / Pendentes / Concluídas)
function atualizarEstadoFiltros() {
  botoesFiltro.forEach(btn => {
    const filtro = btn.getAttribute('data-filtro');
    btn.classList.toggle('ativo', filtro === filtroAtual);
  });
}

botoesFiltro.forEach(btn => {
  btn.addEventListener('click', () => {
    filtroAtual = btn.getAttribute('data-filtro');
    atualizarEstadoFiltros();
    renderizar();
  });
});

// Inicializa a tela
atualizarEstadoFiltros();
renderizar();

  

function editarTarefaInline(index, span) {
  const textoAntigo = tarefas[index].texto;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = textoAntigo;
  input.className = 'input-edicao';

  span.replaceWith(input);
  input.focus();
  input.select();

  function salvar() {
    const novoTexto = input.value.trim();
    if (novoTexto === '') {
      input.replaceWith(span);
      return;
    }

    tarefas[index].texto = novoTexto;
    salvarTarefas();
    renderizar();
    input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    salvar();
  }

  if (e.key === 'Escape') {
    input.replaceWith(span);
  }
});

input.addEventListener('blur', salvar);

  }

  input.addEventListener('blur', salvar);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') salvar();
    input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') salvar();
  if (e.key === 'Escape') renderizar();
});

  });
}
const mensagemVazia = document.getElementById('lista-vazia');

if (tarefas.length === 0) {
  mensagemVazia.style.display = 'block';
} else {
  mensagemVazia.style.display = 'none';
}

