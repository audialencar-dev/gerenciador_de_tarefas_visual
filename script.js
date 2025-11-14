// Pegando os elementos do HTML
const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');

// Carrega as tarefas salvas no navegador (localStorage)
let tarefas = JSON.parse(localStorage.getItem('tarefas_v1')) || [];

// Salva as tarefas no localStorage
function salvarTarefas() {
  localStorage.setItem('tarefas_v1', JSON.stringify(tarefas));
}

// Renderiza todas as tarefas na tela
function renderizar() {
  lista.innerHTML = '';

  if (tarefas.length === 0) {
    lista.innerHTML = '<p>Nenhuma tarefa cadastrada.</p>';
    return;
  }

  tarefas.forEach((t, idx) => {
    const li = document.createElement('li');
    li.className = 'tarefa';

    const span = document.createElement('span');
    span.className = 'tarefa-texto' + (t.concluida ? ' concluida' : '');
    span.textContent = t.texto;

    const divBtns = document.createElement('div');
    divBtns.className = 'btns';

  // Botão concluir/desfazer
// Botão concluir/desfazer
const btnConcluir = document.createElement('button');
btnConcluir.className = 'botao-pequeno';
btnConcluir.innerHTML = t.concluida
  ? '<i class="fa-solid fa-rotate-left"></i>'
  : '<i class="fa-solid fa-check"></i>';

btnConcluir.addEventListener('click', () => {
  tarefas[idx].concluida = !tarefas[idx].concluida;
  salvarTarefas();
  renderizar();
});

// Botão excluir
const btnExcluir = document.createElement('button');
btnExcluir.className = 'botao-pequeno excluir';
btnExcluir.innerHTML = '<i class="fa-solid fa-trash"></i>';


    divBtns.appendChild(btnConcluir);
    divBtns.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(divBtns);
    lista.appendChild(li);
  });
}

// Evento de adicionar tarefa
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;

  tarefas.push({ texto, concluida: false });
  salvarTarefas();
  input.value = '';
  input.focus();
  renderizar();
});

// Inicializa a lista
renderizar();
