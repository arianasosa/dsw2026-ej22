document.addEventListener('DOMContentLoaded', () => 
  {
    const logoutButton = document.getElementById('logout');
    const menuBtn = document.getElementById('menu-btn');

    /*logoutButton.addEventListener('click', () => 
      {
        window.location.href = 'login.html';
      });*/
      
    menuBtn.addEventListener('click', () =>
    {
      sideBar.classList.toggle('open');
    }); 
  });