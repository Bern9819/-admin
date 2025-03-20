const API_BASE_URL = "https://admin-back-g4cn.onrender.com";

let isLoggedIn = false;

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
        isLoggedIn = true;
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('admin-panel').classList.remove('hidden');
        loadCollaborators();
        loadEvents();
      } else {
        alert('Credenziali errate!');
      }
    })
    .catch(err => console.error(err));
}

function logout() {
  isLoggedIn = false;
  document.getElementById('login-container').classList.remove('hidden');
  document.getElementById('admin-panel').classList.add('hidden');
}

function loadCollaborators() {
  fetch(`${API_BASE_URL}/collaborators`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('collaborators-list');
      list.innerHTML = '';
      data.forEach(collab => {
        const li = document.createElement('li');
        li.innerText = `${collab.name} (${collab.calendarType})`;
        const btn = document.createElement('button');
        btn.innerText = 'Elimina';
        btn.onclick = () => deleteCollaborator(collab.id);
        li.appendChild(btn);
        list.appendChild(li);
      });
    });
}

function addCollaborator() {
  const name = document.getElementById('collab-name').value;
  const calendarType = document.getElementById('calendar-type').value;
  const calendarUrl = document.getElementById('calendar-url').value;

  fetch(`${API_BASE_URL}/collaborators`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, calendarType, calendarUrl })
  })
    .then(res => res.json())
    .then(() => {
      loadCollaborators();
      document.getElementById('collab-name').value = '';
      document.getElementById('calendar-url').value = '';
    });
}

function deleteCollaborator(id) {
  fetch(`${API_BASE_URL}/collaborators/${id}`, {
    method: 'DELETE'
  }).then(() => loadCollaborators());
}

function loadEvents() {
  fetch(`${API_BASE_URL}/events`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('events-list');
      list.innerHTML = '';
      data.forEach(event => {
        const li = document.createElement('li');
        li.innerText = `${event.name} (${event.type}) - ${event.location}`;
        const btn = document.createElement('button');
        btn.innerText = 'Elimina';
        btn.onclick = () => deleteEvent(event.id);
        li.appendChild(btn);
        list.appendChild(li);
      });
    });
}

function addEventType() {
  const name = document.getElementById('event-name').value;
  const type = document.getElementById('event-type').value;
  const location = document.getElementById('event-location').value;

  fetch(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, type, location })
  })
    .then(res => res.json())
    .then(() => {
      loadEvents();
      document.getElementById('event-name').value = '';
      document.getElementById('event-location').value = '';
    });
}

function deleteEvent(id) {
  fetch(`${API_BASE_URL}/events/${id}`, {
    method: 'DELETE'
  }).then(() => loadEvents());
}
