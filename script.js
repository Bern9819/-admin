const API_BASE_URL = "https://agencee-backend.onrender.com"; // <-- Cambia con il tuo backend su Render

// LOGIN
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        loadCollaborators();
        loadEvents();
      } else {
        alert('Credenziali errate!');
      }
    })
    .catch(err => console.error('Errore login:', err));
}

// LOGOUT
function logout() {
  document.getElementById('login-container').classList.remove('hidden');
  document.getElementById('admin-panel').classList.add('hidden');
}

// CARICA COLLABORATORI
function loadCollaborators() {
  fetch(`${API_BASE_URL}/collaborators`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('collaborators-list');
      list.innerHTML = '';
      data.forEach(c => {
        const li = document.createElement('li');
        li.innerHTML = `${c.name} (${c.calendarType}): ${c.calendarUrl} <button onclick="deleteCollaborator(${c.id})">Elimina</button>`;
        list.appendChild(li);
      });
    });
}

// AGGIUNGI COLLABORATORE
function addCollaborator() {
  const name = document.getElementById('collab-name').value;
  const calendarType = document.getElementById('calendar-type').value;
  const calendarUrl = document.getElementById('calendar-url').value;

  fetch(`${API_BASE_URL}/collaborators`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, calendarType, calendarUrl })
  })
    .then(res => {
      if (res.ok) {
        alert('Collaboratore aggiunto!');
        loadCollaborators();
        document.getElementById('collab-name').value = '';
        document.getElementById('calendar-url').value = '';
      } else {
        alert('Errore durante l\'aggiunta del collaboratore.');
      }
    });
}

// ELIMINA COLLABORATORE
function deleteCollaborator(id) {
  fetch(`${API_BASE_URL}/collaborators/${id}`, { method: 'DELETE' })
    .then(res => {
      if (res.ok) {
        alert('Collaboratore rimosso');
        loadCollaborators();
      } else {
        alert('Errore durante la rimozione del collaboratore.');
      }
    });
}

// CARICA EVENTI
function loadEvents() {
  fetch(`${API_BASE_URL}/events`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('events-list');
      list.innerHTML = '';
      data.forEach(e => {
        const li = document.createElement('li');
        li.innerHTML = `${e.name} (${e.type}): ${e.location} <button onclick="deleteEvent(${e.id})">Elimina</button>`;
        list.appendChild(li);
      });
    });
}

// AGGIUNGI EVENTO
function addEventType() {
  const name = document.getElementById('event-name').value;
  const type = document.getElementById('event-type').value;
  const location = document.getElementById('event-location').value;

  fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, type, location })
  })
    .then(res => {
      if (res.ok) {
        alert('Evento aggiunto!');
        loadEvents();
        document.getElementById('event-name').value = '';
        document.getElementById('event-location').value = '';
      } else {
        alert('Errore durante l\'aggiunta dell\'evento.');
      }
    });
}

// ELIMINA EVENTO
function deleteEvent(id) {
  fetch(`${API_BASE_URL}/events/${id}`, { method: 'DELETE' })
    .then(res => {
      if (res.ok) {
        alert('Evento rimosso');
        loadEvents();
      } else {
        alert('Errore durante la rimozione dell\'evento.');
      }
    });
}
