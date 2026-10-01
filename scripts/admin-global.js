document.addEventListener('DOMContentLoaded', () => 
  {
    const logoutButton = document.getElementById('logout');
    const menuBtn = document.getElementById('menu-btn');
    const sideBar = document.getElementById('sidebar');
   /*logoutButton.addEventListener('click', () => 
      {
        window.location.href = '/pages/auth/login.html';
      });*/
      
    menuBtn.addEventListener('click', () =>
    {
      sideBar.classList.toggle('open');
    }); 
  });