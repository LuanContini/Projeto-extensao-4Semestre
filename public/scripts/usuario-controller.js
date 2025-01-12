document.addEventListener("DOMContentLoaded", function () {
    const usuariosData = window.usuarios;

    const userTableBody = document.getElementById("userTableBody");
    const userRows = document.querySelectorAll(".usuarios-table tbody tr");
    const userDetails = document.getElementById("userDetails");
    const editButton = document.getElementById("editButton");
    const userForm = document.getElementById("userForm");
    const inputs = userForm.querySelectorAll("input, select, textarea"); 
    let isEditing = false;
    let currentUserId = null;

    if (typeof Inputmask === 'undefined') {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/inputmask/dist/inputmask.min.js";
        script.onload = function() {
            applyInputMasks();
        };
        document.head.appendChild(script);
    } else {
        applyInputMasks();
    }

    function applyInputMasks() {
        Inputmask("999.999.999-99").mask(document.getElementById("cpf")); 
        Inputmask("(99) 99999-9999").mask(document.getElementById("telefone")); 
    }
    userRows.forEach((row) => {
        row.addEventListener("click", function () {
            userRows.forEach((r) => r.classList.remove("selected"));
            this.classList.add("selected");

            currentUserId = this.dataset.id;
            const selectedUser  = usuariosData.find(
                (user) => user.idUsuario == currentUserId
            );

            if (selectedUser ) {
                populateUserDetails(selectedUser );
                userDetails.style.display = "block";
            }
        });
    });

    editButton.addEventListener("click", async function () {
        isEditing = !isEditing;
        const inputs = userForm.querySelectorAll("input, select, textarea"); 
    
        if (isEditing) {
            editButton.textContent = "SALVAR";
            resetInputs();
        } else {
            editButton.textContent = "EDITAR";
            inputs.forEach((input) => (input.disabled = true));
    
            const tipo = document.getElementById("tipo").value;
    
            const nome = userForm.nome.value.trim();
            const cpf = cleanInput(userForm.cpf.value);
            const email = userForm.email.value.trim() || null;
            const telefone = cleanInput(userForm.telefone.value);
            const dataNasc = userForm.dataNasc.value;
            const imagem = document.getElementById("imagem").files[0] || null;
            const senha = userForm.senha.value.trim();
            const repetirSenha = userForm.repetirSenha.value.trim();
    
            if (!nome) {
                alert("O campo Nome é obrigatório.");
                resetInputs();
                return;
            }
            if (!cpf) {
                alert("O campo CPF é obrigatório.");
                editButton.textContent = "SALVAR";
                resetInputs();
                return;
            }
            if (currentUserId === null && !senha) {
                alert("O campo Senha é obrigatório ao criar um usuário.");
                resetInputs();
                return;
            }
            if (senha && senha !== repetirSenha) {
                alert("As senhas não coincidem.");
                resetInputs();
                return;
            }
    
    
            const updatedUser  = {
                nome: nome,
                cpf: cpf,
                email: email,
                telefone: telefone,
                dataNasc: dataNasc,
                imagem: imagem,
                senha: senha ? senha : undefined, 
                tipo: tipo 
            };
    
            console.log("Dados do usuário atualizado:", updatedUser );
    
            try {
                const response = await fetch(
                    currentUserId ? `/usuario/${currentUserId}` : "/usuario/",
                    {
                        method: currentUserId ? "PUT" : "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedUser ),
                    }
                );
    
                if (response.ok) {
                    const userCreated = await response.json();
                    alert(
                        currentUserId
                            ? "Usuário atualizado com sucesso!"
                            : "Usuário criado com sucesso!"
                    );
                    currentUserId
                        ? updateUserTable(userCreated)
                        : addUserToTable(userCreated);
                } else {
                    const errorData = await response.json();
                    console.log(errorData);
                    alert(
                        `Erro ao ${currentUserId ? "atualizar" : "criar"} o usuário: ${errorData.err}`
                    );
                    resetInputs();
                }
            } catch (error) {
                console.error("Erro:", error);
                alert("Erro ao processar a solicitação. Tente novamente.");
                resetInputs();
                editButton.textContent = "EDITAR"; 
            }
        }
    });

    document
    .querySelector(".add-user-btn")
    .addEventListener("click", function () {
        currentUserId = null; 
        userForm.reset(); 
        userDetails.style.display = "block"; 
        isEditing = true; 
        editButton.textContent = "SALVAR"; 

        resetInputs(); 

        document.getElementById("tipo").value = "Operador"; 
    });

    document
        .getElementById("mostrarSenha")
        .addEventListener("change", function () {
            const senhaInput = document.getElementById("senha");
            const repetirSenhaInput = document.getElementById("repetirSenha");
            if (this.checked) {
                senhaInput.type = "text"; 
                repetirSenhaInput.type = "text"; 
            } else {
                senhaInput.type = "password"; 
                repetirSenhaInput.type = "password"; 
            }
        });

    document
        .getElementById("deleteButton")
        .addEventListener("click", async function () {
            const confirmDelete = confirm(
                "Tem certeza que deseja excluir este usuário?"
            );
            if (!confirmDelete) return;

            try {
                const response = await fetch(`/usuario/${currentUserId}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    alert("Usuário excluído com sucesso!");
                    const existingRow = userTableBody.querySelector(
                        `tr[data-id="${currentUserId}"]`
                    );
                    if (existingRow) {
                        userTableBody.removeChild(existingRow);
                    }
                    userDetails.style.display = "none";
                } else {
                    const errorData = await response.json();
                    alert(`Erro ao excluir o usuário: ${errorData.err}`);
                }
            } catch (error) {
                console.error("Erro:", error);
                alert("Erro ao processar a solicitação de exclusão. Tente novamente.");
            }
        });

    document
        .querySelector(".search-input")
        .addEventListener("input", function () {
            const searchTerm = this.value.toLowerCase();
            const userRows = document.querySelectorAll(".usuarios-table tbody tr");

            userRows.forEach((row) => {
                const userId = row
                    .querySelector("td:first-child")
                    .textContent.toLowerCase();
                const userName = row
                    .querySelector("td:nth-child(2)")
                    .textContent.toLowerCase();

                if (userId.includes(searchTerm) || userName.includes(searchTerm)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });

    function populateUserDetails(userData) {
        userForm.nome.value = userData.nome;
        userForm.cpf.value = userData.cpf;
        userForm.telefone.value = userData.telefone;
        userForm.email.value = userData.email;
        
        if (userData.dataNasc) {
            const date = new Date(userData.dataNasc);
            const formattedDate = date.toISOString().split("T")[0];
            userForm.dataNasc.value = formattedDate;
        } else {
            userForm.dataNasc.value = "";
        }
        userForm.tipo.value = userData.tipo;
    }

    function addUserToTable(user) {
        const newRow = document.createElement("tr");
        newRow.setAttribute("data-id", user.idUsuario);
        newRow.innerHTML = `
            <td>${user.idUsuario}</td>
            <td>${user.nome}</td>
            <td>${user.cpf}</td>
            <td>${user.email}</td>
        `;
        userTableBody.appendChild(newRow);
    }

    function updateUserTable(updatedUser ) {
        const existingRow = userTableBody.querySelector(
            `tr[data-id="${updatedUser .idUsuario}"]`
        );
        if (existingRow) {
            existingRow.innerHTML = `
                <td>${updatedUser .idUsuario}</td>
                <td>${updatedUser .nome}</td>
                <td>${updatedUser .cpf}</td>
                <td>${updatedUser .email}</td>
            `;
        }
    }

    function cleanInput(input) {
        return input.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    }

    function resetInputs(){
        editButton.textContent = "SALVAR";
        inputs.forEach((input) => (input.disabled = false));
    }
});