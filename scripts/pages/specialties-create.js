document.addEventListener('DOMContentLoaded', () =>
  {
    const form = document.getElementById('specialty-create-form');
    const cancelButton = document.getElementById('cancel-btn');

    form.addEventListener('submit', async event =>
      {
        event.preventDefault();

        const name = document.getElementById('specialty-name').value.trim();
        const description = document.getElementById('inputDescription').value.trim();
        const status = document.getElementById('specialty-status').value;

        if (!name || !description || !status)
        {
          alert('Complete todos los campos para guardar la especialidad.');
          return;
        }

        await addSpecialty(
          {
            name,
            description,
            status
          });

        window.location.href = 'specialties-list.html';
      });

    cancelButton.addEventListener('click', () =>
      {
        window.location.href = 'specialties-list.html';
      });
  });
