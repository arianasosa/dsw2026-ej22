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

fetch('specialties.json')
.then(result => result.json())
.then(data => 
  {
    data.forEach(specialty => 
      {
      const tablaSpecialty = document.getElementById('specialty-table-body');
      const fila = document.createElement('tr');
      const sp_name = document.createElement('td');
      const sp_desc = document.createElement('td'); 

      sp_name.innerText = specialty.name;
      sp_desc.innerText = specialty.description;
      
      fila.appendChild(sp_name);
      fila.appendChild(sp_desc);

      tablaSpecialty.appendChild(fila);
    });
  }).catch(error => console.error(error));

  const btnBuscar = document.getElementById('btn-buscar');
  btnBuscar.addEventListener('click', () => 
    {
      fetch('specialties.json')
      .then(result => result.json())
      .then(data => 
        {
          const searchbarText = document.getElementById('specialty-searchbar');
          const spName = document.getElementById('form-sp-name');
          const filteredSpecialties = 
          data.filter((specialty => specialty.name == searchbarText.innerText));
          filteredSpecialties.forEach(specialty => 
                      {
                        console.log(searchbarText.innerText);
                      const tablaSpecialty = document.getElementById('specialty-table-body');
                      const fila = document.createElement('tr');
                      const sp_name = document.createElement('td');
                      const sp_desc = document.createElement('td'); 

                      sp_name.innerText = specialty.name;
                      sp_desc.innerText = specialty.description;
                      
                      fila.appendChild(sp_name);
                      fila.appendChild(sp_desc);

                      tablaSpecialty.appendChild(fila);
                    });
        })
        .catch(error => console.error(error));
    })