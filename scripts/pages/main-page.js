document.addEventListener('DOMContentLoaded', () => 
  {
    const input = document.getElementById('doctor-input');
    const doctorForm = document.getElementById('form-doc-name');
    loadTable();
    
    /*doctorForm.addEventListener('submit', e => 
    {
        e.preventDefault(); 
        const doctorName = document.getElementById('doctor-input').value;
        loadTable(doctorName);
    });*/
    input.addEventListener('keyup',e =>
    {
        console.log(e.target.value);
        if(e.target.value.length > 3)
        {
            loadTable(e.target.value);
        }
        else if (e.target.value.length === 0) 
        {
            loadTable();
        }
    })
  });