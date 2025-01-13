let sortDirection = [true, true, true, true, true, true, true, true]; // Define o estado da ordenação de cada coluna (true para crescente)
        
            function sortTable(columnIndex) {
                const table = document.querySelector('.grupos-table');
                const rows = Array.from(table.rows).slice(1); // Remove o cabeçalho
                const isAscending = sortDirection[columnIndex];
                
                // Alterna a direção da ordenação
                sortDirection[columnIndex] = !isAscending;
        
                // Ordena as linhas
                rows.sort((rowA, rowB) => {
                    const cellA = rowA.cells[columnIndex].innerText.trim();
                    const cellB = rowB.cells[columnIndex].innerText.trim();
        
                    if (columnIndex === 7) { // Preço (precisa ser tratado como número)
                        const priceA = parseFloat(cellA.replace('R$', '').trim());
                        const priceB = parseFloat(cellB.replace('R$', '').trim());
                        return isAscending ? priceA - priceB : priceB - priceA;
                    } else if (columnIndex === 3 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6) { // Números (Disponível, Reservado, Manutenção, Total)
                        const numA = parseInt(cellA);
                        const numB = parseInt(cellB);
                        return isAscending ? numA - numB : numB - numA;
                    } else { // Texto (Nome, Categoria)
                        return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
                    }
                });
        
                // Atualiza a tabela com as linhas ordenadas
                rows.forEach(row => table.appendChild(row));
        
                // Atualizar a direção das setas
                const arrows = table.querySelectorAll('.arrow');
                arrows.forEach((arrow, index) => {
                    if (index === columnIndex -1) {
                        arrow.innerText = isAscending ? '▲' : '▼';
                    } else {
                        arrow.innerText = '▼';
                    }
                });
            }
        
    function confirmDeletion(row, idGrupo) {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';

        const confirmBox = document.createElement('div');
        confirmBox.style.backgroundColor = 'white';
        confirmBox.style.padding = '20px';
        confirmBox.style.borderRadius = '8px';
        confirmBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        confirmBox.style.textAlign = 'center';

        const message = document.createElement('p');
        message.innerHTML = '<strong style="color: red;">Tem certeza?</strong><br>Isso irá remover todos os itens adicionados ao produto.';
        message.style.marginBottom = '20px';
        confirmBox.appendChild(message);

        const yesButton = document.createElement('button');
        yesButton.innerText = 'Sim';
        yesButton.style.margin = '0 10px';
        yesButton.style.padding = '10px 20px';
        yesButton.style.backgroundColor = '#4CAF50';
        yesButton.style.color = 'white';
        yesButton.style.border = 'none';
        yesButton.style.borderRadius = '4px';
        yesButton.style.cursor = 'pointer';
        yesButton.onclick = async function () {
            try {
                const response = await fetch(`/itens/grupo/${idGrupo}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    row.remove(); 
                    document.body.removeChild(overlay); 
                } else {
                    alert('Erro ao excluir o item. Tente novamente.');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao excluir o item. Tente novamente.');
            }
        };
        confirmBox.appendChild(yesButton);

        // Botão "Não"
        const noButton = document.createElement('button');
        noButton.innerText = 'Não';
        noButton.style.margin = '0 10px';
        noButton.style.padding = '10px 20px';
        noButton.style.backgroundColor = '#F44336';
        noButton.style.color = 'white';
        noButton.style.border = 'none';
        noButton.style.borderRadius = '4px';
        noButton.style.cursor = 'pointer';
        noButton.onclick = function () {
            document.body.removeChild(overlay); 
        };
        confirmBox.appendChild(noButton);

        overlay.appendChild(confirmBox);
        document.body.appendChild(overlay);
    }

    document.querySelectorAll('.delete-btn').forEach((btn) => {
        const idGrupo = btn.closest('tr').querySelector('a').getAttribute('href').split('/').pop(); // Pega o idGrupo da URL
        btn.onclick = () => confirmDeletion(btn.closest('tr'), idGrupo);
    });