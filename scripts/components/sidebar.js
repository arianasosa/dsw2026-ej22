const loadSidebar = (fileName, sideBar) => 
  {
    fetch(fileName)
    .then(response => response.text())
    .then(sidebarHtml => 
      {
        /*const sb = document.getElementById('sidebar')*/
        sideBar.innerHTML = sidebarHtml;
      }); 
  }
    const menuBtn = document.getElementById('menu-btn');
    const sideBar = document.getElementById('sidebar');
    menuBtn.addEventListener('click', () =>
    {
      sideBar.classList.toggle('open');
    });
    loadSidebar('components/sidebar.html',sideBar);
