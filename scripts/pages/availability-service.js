const AVAILABILITY_KEY = 'doctor_availabilities';

const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

/* HORARIOS POR DEFECTO (demo del TPI) */
const DEFAULT_SCHEDULES =
{
  Lunes:     { active: true,  start: '08:00', end: '16:00' },
  Martes:    { active: true,  start: '08:00', end: '16:00' },
  Miércoles: { active: true,  start: '08:00', end: '12:00' },
  Jueves:    { active: true,  start: '09:00', end: '18:00' },
  Viernes:   { active: true,  start: '08:00', end: '14:00' },
  Sábado:    { active: false, start: '',      end: '' }
};

const readAllAvailabilities = () =>
{
  try
  {
    return JSON.parse(localStorage.getItem(AVAILABILITY_KEY) || '{}');
  }
  catch(e)
  {
    console.error(e);
    return {};
  }
};

/* LEER DISPONIBILIDAD DE UN DOCTOR */
const getAvailability = (doctorId) =>
{
  return readAllAvailabilities()[doctorId] || DEFAULT_SCHEDULES;
};

/* GUARDAR DISPONIBILIDAD DE UN DOCTOR */
const saveAvailability = (doctorId, availability) =>
{
  const all = readAllAvailabilities();
  all[doctorId] = availability;
  localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(all));
};