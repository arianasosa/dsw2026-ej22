
const DOCTORS_STORAGE_KEY = 'medportal.doctors';

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

/* LEE LA LISTA PERSISTIDA O LA CARGA DESDE EL JSON POR ÚNICA VEZ */
const getDoctors = async () =>
  {
    const storedDoctors = localStorage.getItem(DOCTORS_STORAGE_KEY);

    if (storedDoctors) 
    {
      return JSON.parse(storedDoctors);
    }

    try
    {
      const response = await fetch('../../data/doctors.json');

      if (!response.ok)
      {
        throw new Error(`No se pudo cargar doctores: ${response.status}`);
      }

      const doctors = await response.json();
      saveDoctors(doctors);
      return doctors;
    }
    catch(e)
    {
      console.error(e);
      return [];
    }
  };

const saveDoctors = (doctors) =>
  {
    localStorage.setItem(DOCTORS_STORAGE_KEY, JSON.stringify(doctors));
  };

const addDoctor = async (doctorData) =>
  {
    const doctors = await getDoctors();
    const lastDoctorNumber = doctors.reduce((highestNumber, doctor) =>
      {
        const doctorNumber = Number(doctor.id.replace('D', '')) || 0;
        return Math.max(highestNumber, doctorNumber);
      }, 0);

    const newDoctor =
      {
        id: `D${lastDoctorNumber + 1}`,
        ...doctorData
      };

    doctors.push(newDoctor);
    saveDoctors(doctors);
    return newDoctor;
  };

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
    const doctors = await getDoctors();
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
window.addDoctor = addDoctor;
