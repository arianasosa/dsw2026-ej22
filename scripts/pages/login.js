document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        
        if(username === 'admin' && password === 'admin') {
            
            window.location.href = '../../pages/admin/specialties-list.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
});