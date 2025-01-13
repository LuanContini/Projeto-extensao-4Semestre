const itemsData = window.grupoComItens;
const selectedItems = [];

function openModal() {
    const grupoId = document.getElementById('grupoEquipamento').value;
    const modal = document.getElementById('itemModal');
    const itemBody = document.getElementById('itemBody');
    itemBody.innerHTML = '';
    selectedItems.length = 0; 
    updateSelectedItemsTable();

    if (grupoId) {
        const grupoSelecionado = itemsData.find(grupo => grupo.idGrupo == grupoId);
        if (grupoSelecionado && grupoSelecionado.itens) {
            grupoSelecionado.itens.forEach(item => {
                itemBody.innerHTML += `
                    <tr>
                        <td><input type="checkbox" class="item-checkbox" data-id="${item.idItens}" data-cod="${item.codBarras}" data-nome="${item.nome}" onchange="updateSelectedItems(this)"></td>
                        <td>${item.idItens}</td>
                        <td>${item.codBarras}</td>
                        <td>${item.nome}</td>
                    </tr>
                `;
            });
        }
    }

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('itemModal');
    modal.style.display = 'none';
}

function filterItems() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('itemTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        const tdCodBarras = tr[i].getElementsByTagName('td')[2]; 
        const tdNome = tr[i].getElementsByTagName('td')[3]; 
        if (tdCodBarras || tdNome) {
            const txtCodBarras = tdCodBarras.textContent || tdCodBarras.innerText;
            const txtNome = tdNome.textContent || tdNome.innerText;
            if (txtCodBarras.toLowerCase().indexOf(filter) > -1 || txtNome.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function updateSelectedItems(checkbox) {
    const itemId = checkbox.getAttribute('data-id');
    const itemCod = checkbox.getAttribute('data-cod');
    const itemNome = checkbox.getAttribute('data-nome');

    if (checkbox.checked) {
        selectedItems.push({ id: itemId, cod: itemCod, nome: itemNome });
    } else {
        const index = selectedItems.findIndex(item => item.id === itemId);
        if (index > -1) {
            selectedItems.splice(index, 1);
        }
    }
    updateSelectedItemsTable();
}

function updateSelectedItemsTable() {
    const selectedItemsBody = document.getElementById('selectedItemsBody');
    selectedItemsBody.innerHTML = '';

    selectedItems.forEach(item => {
        selectedItemsBody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.cod}</td>
                <td>${item.nome}</td>
                <td><span class="remove-button" onclick="removeItem('${item.id}')">Remover</span></td>
            </tr>
        `;
    });
}

function removeItem(itemId) {
    const index = selectedItems.findIndex(item => item.id === itemId);
    if (index > -1) {
        selectedItems.splice(index, 1);
        updateSelectedItemsTable();
        const checkboxes = document.querySelectorAll('.item-checkbox');
        checkboxes.forEach(checkbox => {
            if (checkbox.getAttribute('data-id') === itemId) {
                checkbox.checked = false;
            }
        });
    }
}

function confirmSelection() {
    console.log('Itens selecionados:', selectedItems);
    closeModal();
}

function finalizeMaintenance() {
    const dataInic = document.querySelector('input[name="maintenance_date"]').value;
    const dataRetorno = document.querySelector('input[name="return_date"]').value;
    const motivo = document.querySelector('textarea[name="problem_description"]').value;
    const responsavel = document.querySelector('input[name="responsavel"]').value;

        const data = {
        dataInic,
        dataRetorno,
        motivo,
        responsavel,
        selectedItems
    };

    fetch('/manutencao/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Aqui você pode adicionar lógica para lidar com a resposta, como redirecionar ou mostrar uma mensagem de sucesso
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateItems() {
    // Esta função pode ser usada para qualquer atualização necessária ao selecionar um novo grupo
}