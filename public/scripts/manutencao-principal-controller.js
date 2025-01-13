const itens = window.itensEmManutencao;

function openModal(idManutencao, nomeGrupo) {
    const modal = document.getElementById('itemModal');
    const modalBody = document.getElementById('modalBody');
    modal.style.display = 'flex';

    // Verifica se a manutenção existe nos itens
    if (itens[idManutencao]) {
        modalBody.innerHTML = `
            <h4>Itens da Manutenção ID: ${idManutencao} - Grupo: ${nomeGrupo}</h4>
            <table class="item-table">
                <thead>
                    <tr>
                        <th>ID Item</th>
                        <th>Código de Barras</th>
                        <th>Data de Locação</th>
                    </tr>
                </thead>
                <tbody>
                    ${itens[idManutencao].itens.map(item => `
                        <tr>
                            <td>${item.idItens}</td>
                            <td>${item.codBarras}</td>
                            <td>${new Date(item.dataLocacao).toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    } else {
        modalBody.innerHTML = `<p>Nenhum item encontrado para esta manutenção.</p>`;
    }
}

function closeModal() {
    const modal = document.getElementById('itemModal');
    modal.style.display = 'none';
}

function confirmDeletion(idManutencao) {
    const confirmation = confirm("Tem certeza que deseja deletar esta manutenção?");
    if (confirmation) {
        deleteManutencao(idManutencao); 
    }
}

function filterTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('manutencaoTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        const tdGrupo = tr[i].getElementsByTagName('td')[1]; 
        const tdResponsavel = tr[i].getElementsByTagName('td')[2]; 
        if (tdGrupo || tdResponsavel) {
            const txtGrupo = tdGrupo.textContent || tdGrupo.innerText;
            const txtResponsavel = tdResponsavel.textContent || tdResponsavel.innerText;
            if (txtGrupo.toLowerCase().indexOf(filter) > -1 || txtResponsavel.toLowerCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

async function deleteManutencao(idManutencao) {
    const url = `/manutencao/${idManutencao}`; 

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const message = `Erro ao deletar: ${response.status} - ${response.statusText}`;
            throw new Error(message);
        }

        const data = await response.json(); 
        console.log('Deleção bem-sucedida:', data);
        window.location.reload();
    } catch (error) {
        console.error('Erro:', error);
    }
}