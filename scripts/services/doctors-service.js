
/* FUNCIÓN PARA CREAR LA TABLA */
const createDoctorsTable = (list, tbody) => 
    {
      tbody.innerHTML = '';
      list.forEach(item =>
        {
              const fila = document.createElement('tr');
              const filaName = document.createElement('td');
              const filaSpec = document.createElement('td');
              const filaStatus = document.createElement('td');
              const filaAction = document.createElement('td');
              const statusContainer = document.createElement('span');
              const actionEdit = document.createElement('button');
              const actionDelete = document.createElement('button');

              filaName.innerText = item.name;
              filaSpec.innerText = item.specialty;
              
              statusContainer.classList.add('status-container');
              statusContainer.innerText = item.status;
              filaStatus.appendChild(statusContainer);
              
              actionEdit.innerText = "Modificar"
              actionDelete.innerText = "Borrar"
              filaAction.appendChild(actionEdit);
              filaAction.appendChild(actionDelete);
              
              fila.appendChild(filaName);
              fila.appendChild(filaSpec);
              fila.appendChild(filaStatus);
              fila.appendChild(filaAction);
              tbody.appendChild(fila);
        } )
      };

/* FUNCIÓN PARA LEVANTAR DATOS DEL JSON */
const fetchDoctors = async () => 
  {
    try
    {
      const response = await fetch('/data/doctors.json');
      const doctors = await response.json();
      return doctors;
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
    const doctors = await fetchDoctors();
    const tbody = document.getElementById('doctor-table-body');

    if(filterCriteria.length)
      {
        const doctorsFiltered = doctors.filter(doc => contains(doc.name, filterCriteria));
        createDoctorsTable(doctorsFiltered, tbody);
      }
    else
      {
        createDoctorsTable(doctors, tbody);
      }
  }

window.loadTable = loadTable;
