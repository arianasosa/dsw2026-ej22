
/* FUNCIÓN PARA CREAR LA TABLA */
const svg = (paths) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round"
  stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const ICONS = {
  view: svg('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'),
  edit: svg('<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>'),
  delete: svg('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>')
};

const createIconButton = (type, label) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.classList.add('icon-btn', `icon-btn-${type}`);
  btn.title = label;
  btn.setAttribute('aria-label', label);
  btn.innerHTML = ICONS[type];
  return btn;
};

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
              
              // actionEdit.innerText = "Modificar"
              // actionDelete.innerText = "Borrar"
              const actions = document.createElement('div');
              actions.classList.add('actions-container');
              actions.appendChild(createIconButton('view', 'Ver'));
              actions.appendChild(createIconButton('edit', 'Modificar'));
              actions.appendChild(createIconButton('delete', 'Borrar'));
              filaAction.appendChild(actions);
              
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
