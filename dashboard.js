document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  const menuBtn = document.getElementById('menu-btn');
  const sideBar = document.getElementById('sidebar');

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
  menuBtn.addEventListener('click', () =>
    {
      sideBar.classList.toggle('open');
    });
});

const createSpecialtyTable = (list, tbody, isFiltered = false) => 
    {
      tbody.innerHTML = '';
      list.forEach(item =>
        {
              const fila = document.createElement('tr');
              const filaName = document.createElement('td');
              const filaDesc = document.createElement('td');

              filaName.innerText = item.name;
              filaDesc.innerText = item.description;

              fila.appendChild(filaName);
              fila.appendChild(filaDesc);

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


fetch('specialties.json')
.then(result => result.json())
.then(data => 
  {
    const specialtyTable = document.getElementById('specialty-table-body');
    createSpecialtyTable(data, specialtyTable)
  })
.catch(error => console.error(error));

  const contains = (a,b) => a.toLowerCase().includes(b.toLowerCase());
  const specialtyForm = document.getElementById('form-sp-name');
  specialtyForm.addEventListener('submit', e => 
    {
      e.preventDefault(); 
      const specialtyTable = document.getElementById('specialty-table-body');
      const specialties = Array.from(specialtyTable.children);

      const specialtyName = document.getElementById('specialty-input').value;
          let filterExpression = sp => true;
          let isFiltered = false;
          if(specialtyName != '')
            {
              //filterExpression = sp => contains(sp.name,specialtyName);
              filterExpression = tr => contains(tr.firstChild.innerText,specialtyName);
              isFiltered = true;
            }
          const filteredSpecialties = specialties.filter(filterExpression);
          filterSpecialtyTable(filteredSpecialties, specialtyTable,isFiltered);
        }) 



      /*fetch('specialties.json')
      .then(result => result.json())
      .then(data => 
        {
          const specialtyName = document.getElementById('specialty-input').value;
          let filterExpression = sp => true;
          let isFiltered = false;
          if(specialtyName != '')
            {
              filterExpression = sp => contains(sp.name,specialtyName);
              isFiltered = true;
            }
          const filteredData = data.filter(filterExpression);
          const specialtyTable = document.getElementById('specialty-table-body');
          createSpecialtyTable(filteredData, specialtyTable,isFiltered);
        })
        .catch(error => console.error(error));*/