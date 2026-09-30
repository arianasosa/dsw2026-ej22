
/* FUNCIÓN PARA CREAR LA TABLA */
const createSpecialtyTable = (list, tbody) => 
    {
      tbody.innerHTML = '';
      list.forEach(item =>
        {
              const fila = document.createElement('tr');
              const filaName = document.createElement('td');
              const filaDesc = document.createElement('td');
              const filaStatus = document.createElement('td');
              const filaAction = document.createElement('td');
              const statusContainer = document.createElement('span');
              const actionEdit = document.createElement('button');
              const actionDelete = document.createElement('button');

              filaName.innerText = item.name;
              filaDesc.innerText = item.description;
              
              statusContainer.classList.add('status-container');
              statusContainer.innerText = item.status;
              filaStatus.appendChild(statusContainer);
              
              actionEdit.innerText = "Modificar"
              actionDelete.innerText = "Borrar"
              filaAction.appendChild(actionEdit);
              filaAction.appendChild(actionDelete);
              
              fila.appendChild(filaName);
              fila.appendChild(filaDesc);
              fila.appendChild(filaStatus);
              fila.appendChild(filaAction);
              tbody.appendChild(fila);
        } )
      };

/* FUNCIÓN PARA LEVANTAR DATOS DEL JSON */
const fetchSpecialties = async () => 
  {
    try
    {
      const response = await fetch('/data/specialties.json');
      const specialties = await response.json();
      return specialties;
    }
    catch(e)
    {
      console.error(e);
    }
  }

/* FUNCIÓN DE UTILIDAD PARA NORMALIZAR LA ENTRADA DEL USUARIO A LA HORA DE FILTRAR ESPECIALIDADES */
const contains = (a,b) => 
  {
    const normalizedA = a.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normalizedB = b.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalizedA.toLowerCase().includes(normalizedB.toLowerCase());
  }

/*CARGAR TABLA*/
const loadTable = async (filterCriteria = '') =>
  {
    const specialties = await fetchSpecialties();
    const tbody = document.getElementById('specialty-table-body');

    if(filterCriteria.length)
      {
        const specialtiesFiltered = specialties.filter(sp => contains(sp.name, filterCriteria));
        createSpecialtyTable(specialtiesFiltered, tbody);
      }
    else
      {
        createSpecialtyTable(specialties, tbody);
      }
  }

window.loadTable = loadTable;
