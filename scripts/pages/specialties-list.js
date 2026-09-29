document.addEventListener('DOMContentLoaded', () => 
  {
    const logoutButton = document.getElementById('logout');
    const menuBtn = document.getElementById('menu-btn');
    const input = document.getElementById('specialty-input');
    const specialtyForm = document.getElementById('form-sp-name');
    
    /*logoutButton.addEventListener('click', () => 
      {
        window.location.href = 'login.html';
      });*/
      
    loadTable();

    
    menuBtn.addEventListener('click', () =>
    {
      sideBar.classList.toggle('open');
    }); 
    
    specialtyForm.addEventListener('submit', e => 
    {
        e.preventDefault(); 
        const specialtyName = document.getElementById('specialty-input').value;
        loadTable(specialtyName);
    });
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
  });