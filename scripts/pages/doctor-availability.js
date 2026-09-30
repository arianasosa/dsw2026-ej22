const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Doc de ejemplo
const DOCTORS = {
  "1": { name: "Dr. Alejandro Martínez", license: "ID: MED-99201", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150&auto=format&fit=crop" },
  "2": { name: "Dra. Elena Rodríguez", license: "ID: MED-44102", img: "https://images.unsplash.com/photo-1594824813583-05459392d409?q=80&w=150&auto=format&fit=crop" },
  "3": { name: "Dr. James Wilson", license: "ID: MED-88319", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=150&auto=format&fit=crop" }
};

// Horarios de la demo del tpi
const defaultSchedules = {
  Lunes: { active: true, start: "08:00", end: "16:00" },
  Martes: { active: true, start: "08:00", end: "16:00" },
  Miércoles: { active: true, start: "08:00", end: "12:00" },
  Jueves: { active: true, start: "09:00", end: "18:00" },
  Viernes: { active: true, start: "08:00", end: "14:00" },
  Sábado: { active: false, start: "", end: "" },
};

document.addEventListener('DOMContentLoaded', () => {
  renderDaysTable();
  updateDoctorInfo();
  loadDoctorAvailability();

  document.getElementById('doctorSelect').addEventListener('change', () => {
    updateDoctorInfo();
    loadDoctorAvailability();
  });

  document.getElementById('availabilityForm').addEventListener('submit', handleSave);
  
  document.getElementById('btnCancel').addEventListener('click', () => {
    window.location.href = '../../dashboard.html';
  });
});

function updateDoctorInfo() {
  const docId = document.getElementById('doctorSelect').value;
  const doc = DOCTORS[docId];
  if (doc) {
    document.getElementById('docName').textContent = doc.name;
    document.getElementById('docLicense').textContent = doc.license;
    document.getElementById('docImg').src = doc.img;
  }
}

function renderDaysTable() {
  const tbody = document.getElementById('daysTableBody');
  tbody.innerHTML = '';

  DAYS.forEach(day => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="day-label">${day}</td>
      <td>
        <div class="switch-container">
          <label class="switch">
            <input type="checkbox" class="day-toggle" data-day="${day}">
            <span class="slider"></span>
          </label>
          <span class="status-text" id="status-${day}">Inactivo</span>
        </div>
      </td>
      <td>
        <input type="time" class="time-input" id="start-${day}" disabled>
      </td>
      <td>
        <input type="time" class="time-input" id="end-${day}" disabled>
      </td>
    `;
    tbody.appendChild(row);
  });

  document.querySelectorAll('.day-toggle').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const day = e.target.dataset.day;
      const isActive = e.target.checked;
      toggleDayInputs(day, isActive);
    });
  });
}

function toggleDayInputs(day, isActive) {
  const startInput = document.getElementById(`start-${day}`);
  const endInput = document.getElementById(`end-${day}`);
  const statusText = document.getElementById(`status-${day}`);

  startInput.disabled = !isActive;
  endInput.disabled = !isActive;

  if (isActive) {
    statusText.textContent = 'Activo';
    statusText.classList.add('active');
  } else {
    statusText.textContent = 'Inactivo';
    statusText.classList.remove('active');
    startInput.value = '';
    endInput.value = '';
  }
}

function loadDoctorAvailability() {
  const doctorId = document.getElementById('doctorSelect').value;
  const storageData = JSON.parse(localStorage.getItem('doctor_availabilities') || '{}');
  const doctorData = storageData[doctorId] || defaultSchedules;

  DAYS.forEach(day => {
    const config = doctorData[day] || { active: false, start: '', end: '' };
    const checkbox = document.querySelector(`.day-toggle[data-day="${day}"]`);
    const startInput = document.getElementById(`start-${day}`);
    const endInput = document.getElementById(`end-${day}`);

    checkbox.checked = config.active;
    toggleDayInputs(day, config.active);

    if (config.active) {
      startInput.value = config.start;
      endInput.value = config.end;
    }
  });
}

function handleSave(e) {
  e.preventDefault();
  const doctorId = document.getElementById('doctorSelect').value;
  const availability = {};
  let hasError = false;

  DAYS.forEach(day => {
    const isActive = document.querySelector(`.day-toggle[data-day="${day}"]`).checked;
    const start = document.getElementById(`start-${day}`).value;
    const end = document.getElementById(`end-${day}`).value;

    if (isActive) {
      if (!start || !end) {
        alert(`Por favor defina horario de entrada y salida para el ${day}.`);
        hasError = true;
        return;
      }
      if (start >= end) {
        alert(`En el día ${day}, la hora de entrada debe ser anterior a la de salida.`);
        hasError = true;
        return;
      }
      availability[day] = { active: true, start, end };
    } else {
      availability[day] = { active: false, start: '', end: '' };
    }
  });

  if (hasError) return;

  const allAvailabilities = JSON.parse(localStorage.getItem('doctor_availabilities') || '{}');
  allAvailabilities[doctorId] = availability;
  localStorage.setItem('doctor_availabilities', JSON.stringify(allAvailabilities));

  alert('¡Disponibilidad guardada correctamente en LocalStorage!');
}