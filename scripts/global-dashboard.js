const loadSidebar = (fileName => 
  fetch(fileName)
  .then(response => response.text())
  .then(sidebarHtml => 
    {
      const sb = document.getElementById('sidebar')
      sb.innerHTML = sidebarHtml;
    }));
document.addEventListener('DOMContentLoaded', () => 
  {
    const logoutButton = document.getElementById('logout');
    const menuBtn = document.getElementById('menu-btn');
    const sideBar = document.getElementById('sidebar');

    logoutButton.addEventListener('click', () => 
      {
        window.location.href = 'login.html';
      });
    menuBtn.addEventListener('click', () =>
    {
      sideBar.classList.toggle('open');
    });
    loadSidebar('admin-global-sidebar.html');  
  });