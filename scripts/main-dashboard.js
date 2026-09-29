

const createSpecialtyTable = (list, tbody, isFiltered = false) => 
    {
      tbody.innerHTML = '';
      list.forEach(item =>
        {
              const fila = document.createElement('tr');
              const filaName = document.createElement('td');
              const filaDesc = document.createElement('td');
              const filaStatus = document.createElement('td');
              const statusContainer = document.createElement('span');

              filaName.innerText = item.name;
              filaDesc.innerText = item.description;
              statusContainer.classList.add('status-container');
              /*filaStatus.innerText = item.status;*/
              statusContainer.innerText = item.status;
              
              fila.appendChild(filaName);
              fila.appendChild(filaDesc);

              filaStatus.appendChild(statusContainer);
              fila.appendChild(filaStatus);
              tbody.appendChild(fila);
        } )
      };

      const filterSpecialtyTable = (list, tbody, isFiltered = false) => 
    {
      tbody.innerHTML = '';
      list.forEach(item =>
        {
          tbody.appendChild(item);
        } )
      };

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

const contains = (a,b) => 
  {
    const normalizedA = a.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normalizedB = b.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalizedA.toLowerCase().includes(normalizedB.toLowerCase());
  }
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
const specialtyForm = document.getElementById('form-sp-name');
specialtyForm.addEventListener('submit', e => 
  {
    e.preventDefault(); 
    const specialtyName = document.getElementById('specialty-input').value;
    loadTable(specialtyName);
  });
  
const input = document.getElementById('specialty-input');

input.addEventListener('keyup',e =>
  {
    console.log(e.srcElement.value);
    if(e.srcElement.value.length > 3)
      {
        loadTable(e.srcElement.value);
      }
    else if (e.srcElement.value.length === 0) 
      {
        loadTable();
      }
  })

loadTable();
