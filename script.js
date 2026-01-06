let tarefas = [];
let proximoId = 1;

document.getElementById("form-tarefa").addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome-tarefa").value;
  const prioridade = document.getElementById("prioridade").value;

  const tarefa = {
    id: proximoId++,
    nome: nome,
    prioridade: prioridade,
    status: false
  };

  tarefas.push(tarefa);
  exibirTarefas();
  document.getElementById("form-tarefa").reset();
});

document.getElementById("filtro-prioridade").addEventListener("change", (e) => {
  exibirTarefas(e.target.value);
});

function exibirTarefas(filtro = "todas") {
  const lista = document.getElementById("tarefas");
  lista.innerHTML = "";

  const tarefasFiltradas = filtro === "todas" ? tarefas : tarefas.filter(tarefa => tarefa.prioridade === filtro);

  tarefasFiltradas.forEach(tarefa => {
    const li = document.createElement("li");
    li.className = `tarefa ${tarefa.prioridade} ${tarefa.status ? "concluida" : ""}`;
    li.innerHTML = `
      <span>${tarefa.nome}</span>
      <div>
        <button onclick="marcarConcluida(${tarefa.id})">${tarefa.status ? "Desmarcar" : "Concluir"}</button>
        <button onclick="removerTarefa(${tarefa.id})">Remover</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

function marcarConcluida(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (tarefa) {
    tarefa.status = !tarefa.status;
    exibirTarefas(document.getElementById("filtro-prioridade").value);
  }
}

function removerTarefa(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  exibirTarefas(document.getElementById("filtro-prioridade").value);
}

exibirTarefas();