const clients = window.clients;

const clientTableBody = document.getElementById("clientTableBody");

document.addEventListener("DOMContentLoaded", function () {
  const clientRows = document.querySelectorAll(".clients-table tbody tr");
  const clientDetails = document.getElementById("clientDetails");
  const editButton = document.getElementById("editButton");
  const clientForm = document.getElementById("clientForm");
  const tipoDocumento = document.getElementById("tipoDocumento");
  const documentoInput = document.getElementById("documento");
  const deleteButton = document.getElementById("deleteButton");
  let isEditing = false;
  let currentClientId = null;

  const telefoneMask = new Inputmask("(99) 99999-9999");
  telefoneMask.mask(document.querySelectorAll('input[name="telefone"]'));

  function aplicarMascaraDocumento() {
    if (tipoDocumento.value === "cpf") {
      const cpfMask = new Inputmask("999.999.999-99");
      cpfMask.mask(documentoInput);
    } else if (tipoDocumento.value === "cnpj") {
      const cnpjMask = new Inputmask("99.999.999/9999-99");
      cnpjMask.mask(documentoInput);
    }
  }

  aplicarMascaraDocumento();

  tipoDocumento.addEventListener("change", function () {
    aplicarMascaraDocumento();
  });

  function populateClientDetails(clientData) {
    const clientId = clientData.id; 
    const clientDataFound = clients.find(client => client.id === clientId); 

    if (!clientDataFound) {
        console.error("Cliente não encontrado com o ID:", clientId);
        return; 
    }

    deleteButton.style.display = "block";
    clientForm.nome.value = clientDataFound.nome;

    if (clientDataFound.cpf) {
        tipoDocumento.value = "cpf";
        documentoInput.value = clientDataFound.cpf;
    } else if (clientDataFound.cnpj) {
        tipoDocumento.value = "cnpj";
        documentoInput.value = clientDataFound.cnpj;
    } else {
        tipoDocumento.value = ""; 
        documentoInput.value = ""; 
    }

    clientForm.email.value = clientDataFound.email;
    clientForm.telefone.value = clientDataFound.telefone;
    document.getElementById("observacao").value = clientDataFound.observacao || ""; 

    aplicarMascaraDocumento(); 
}

  clientRows.forEach((row) => {
    row.addEventListener("click", function () {
      clientRows.forEach((r) => r.classList.remove("selected"));
      this.classList.add("selected");

      currentClientId = this.dataset.id;
      const selectedClient = clients.find(
        (client) => client.idContratante == currentClientId
      );

      if (selectedClient) {
        populateClientDetails(selectedClient);
        clientDetails.style.display = "block";
      }
    });
  });

  editButton.addEventListener("click", async function () {
    isEditing = !isEditing;
    const inputs = clientForm.querySelectorAll("input");
    const select = document.getElementById("tipoDocumento");

    if (isEditing) {
      editButton.textContent = "SALVAR";
      inputs.forEach((input) => (input.disabled = false));
      select.disabled = false;
    } else {
      editButton.textContent = "EDITAR";
      inputs.forEach((input) => (input.disabled = true));
      select.disabled = true;

      const novoCliente = {
        nome: clientForm.nome.value.trim(),
        email: clientForm.email.value.trim(),
        telefone: limparValor(clientForm.telefone.value),
        observacao: document.getElementById("observacao").value.trim(), // Incluir a observação
        imagem: document.getElementById("imagem").files[0] || null, // Incluir a imagem
        cpf:
          tipoDocumento.value === "cpf"
            ? limparValor(documentoInput.value)
            : null,
        cnpj:
          tipoDocumento.value === "cnpj"
            ? limparValor(documentoInput.value)
            : null,
      };

      console.log("Dados do novo cliente:", novoCliente);
      if (!novoCliente.email) {
        alert("O email não pode ser vazio.");
        return;
      }

      try {
        const response = await fetch(
          currentClientId ? `/clientes/${currentClientId}` : "/clientes/",
          {
            method: currentClientId ? "PUT" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(novoCliente),
          }
        );

        if (response.ok) {
          const clienteCriado = await response.json();
          alert(
            currentClientId
              ? "Cliente atualizado com sucesso!"
              : "Cliente criado com sucesso!"
          );
          currentClientId
            ? atualizarTabelaClientes(clienteCriado)
            : adicionarClienteTabela(clienteCriado);
        } else {
          const errorData = await response.json();
          alert(
            `Erro ao ${currentClientId ? "atualizar" : "criar"} o cliente: ${
              errorData.err
            }`
          );
        }
      } catch (error) {
        console.error("Erro:", error.err);
        alert("Erro ao processar a solicitação. Tente novamente.");
      }
    }
  });

  document
    .querySelector(".add-client-btn")
    .addEventListener("click", function () {
      currentClientId = null;
      clientForm.reset();
      clientDetails.style.display = "block";
      isEditing = true;
      editButton.textContent = "SALVAR";
      deleteButton.style.display = "none";
      const inputs = clientForm.querySelectorAll("input");
      const select = document.getElementById("tipoDocumento");
      inputs.forEach((input) => (input.disabled = false));
      select.disabled = false;
    });

  document
    .getElementById("deleteButton")
    .addEventListener("click", async function () {
      const confirmDelete = confirm(
        "Tem certeza que deseja excluir este cliente?"
      );
      if (!confirmDelete) return;

      try {
        const response = await fetch(`/clientes/${currentClientId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Cliente excluído com sucesso!");
          const linhaExistente = clientTableBody.querySelector(
            `tr[data-id="${currentClientId}"]`
          );
          if (linhaExistente) {
            clientTableBody.removeChild(linhaExistente);
          }
          clientDetails.style.display = "none";
        } else {
          const errorData = await response.json();
          alert(`Erro ao excluir o cliente: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao processar a solicitação de exclusão. Tente novamente.");
      }
    });
  document
    .querySelector(".search-input")
    .addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase(); // Obtém o valor da busca em minúsculas
      const clientRows = document.querySelectorAll(".clients-table tbody tr"); // Seleciona todas as linhas da tabela

      clientRows.forEach((row) => {
        const clientId = row
          .querySelector("td:first-child")
          .textContent.toLowerCase(); // ID do cliente
        const clientName = row
          .querySelector("td:nth-child(2)")
          .textContent.toLowerCase(); // Nome do cliente

        // Verifica se o ID ou o nome do cliente contém o termo de busca
        if (clientId.includes(searchTerm) || clientName.includes(searchTerm)) {
          row.style.display = ""; // Mostra a linha se corresponder
        } else {
          row.style.display = "none"; // Oculta a linha se não corresponder
        }
      });
    });

  function adicionarClienteTabela(cliente) {
    const novaLinha = document.createElement("tr");
    novaLinha.setAttribute("data-id", cliente.idContratante);
    novaLinha.innerHTML = `
                                        <td>${cliente.idContratante}</td>
                                        <td>${cliente.nome}</td>
                                        <td>${cliente.telefone}</td>
                                        <td>${cliente.email}</td>
                                    `;
    clientTableBody.appendChild(novaLinha);
  }

  // Função para atualizar a tabela de clientes
  function atualizarTabelaClientes(clienteAtualizado) {
    const linhaExistente = clientTableBody.querySelector(
      `tr[data-id="${clienteAtualizado.idContratante}"]`
    );
    if (linhaExistente) {
      linhaExistente.innerHTML = `
                                            <td>${clienteAtualizado.idContratante}</td>
                                            <td>${clienteAtualizado.nome}</td>
                                            <td>${clienteAtualizado.telefone}</td>
                                            <td>${clienteAtualizado.email}</td>
                                        `;
    }
  }
});

function limparValor(valor) {
  return valor.replace(/[^\d]/g, "");
}
