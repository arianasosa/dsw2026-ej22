document.addEventListener('DOMContentLoaded', () =>
  {
    const form = document.getElementById('doctor-create-form');
    const cancelButton = document.getElementById('cancel-btn');

    form.addEventListener('submit', async event =>
      {
        event.preventDefault();

        const name = document.getElementById('nombre').value.trim();
        const specialty = document.getElementById('specialty').value;
        const license = document.getElementById('inputLicense').value.trim();

        if (!name || !specialty || !license)
        {
          alert('Complete todos los campos para guardar el doctor.');
          return;
        }

        await addDoctor(
          {
            name,
            specialty,
            license,
            status: 'Active'
          });

        window.location.href = 'doctors-list.html';
      });

    cancelButton.addEventListener('click', () =>
      {
        window.location.href = 'doctors-list.html';
      });
  });
