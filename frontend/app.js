const API_URL = 'http://localhost:5001/api';

// DOM Elements
const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authError = document.getElementById('auth-error');
const toggleAuth = document.getElementById('toggle-auth');
const logoutBtn = document.getElementById('logout-btn');
const skillsList = document.getElementById('skills-list');
const addSkillForm = document.getElementById('add-skill-form');

let isLoginMode = true;
let token = localStorage.getItem('learnpath_token');

// Initialize App
function init() {
  if (token) {
    showDashboard();
  } else {
    showAuth();
  }
}

// UI State Toggles
function showAuth() {
  authSection.classList.remove('hidden');
  dashboardSection.classList.add('hidden');
}

function showDashboard() {
  authSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
  fetchSkills();
}

// Toggle Login / Register
toggleAuth.addEventListener('click', () => {
  isLoginMode = !isLoginMode;
  authSection.querySelector('h2').innerText = isLoginMode ? 'Sign In' : 'Create Account';
  loginForm.querySelector('button').innerText = isLoginMode ? 'Continue' : 'Register';
  
  const pTag = document.querySelector('.toggle-text');
  if (isLoginMode) {
    pTag.innerHTML = `Don't have an Apple ID? <span id="toggle-auth">Create yours now.</span>`;
  } else {
    pTag.innerHTML = `Already have an account? <span id="toggle-auth">Sign In.</span>`;
  }
  
  // Re-attach event listener since innerHTML replaced the span
  document.getElementById('toggle-auth').addEventListener('click', () => toggleAuth.click());
});

// Handle Login / Register Submit
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  authError.innerText = '';
  
  const email = emailInput.value;
  const password = passwordInput.value;
  const endpoint = isLoginMode ? '/auth/login' : '/auth/register';
  
  const body = { email, password };
  if (!isLoginMode) {
    body.name = email.split('@')[0]; // Auto-generate name from email for simplicity
  }

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    const data = await res.json();
    
    if (res.ok) {
      token = data.token;
      localStorage.setItem('learnpath_token', token);
      emailInput.value = '';
      passwordInput.value = '';
      showDashboard();
    } else {
      authError.innerText = data.error || 'Authentication failed.';
    }
  } catch (err) {
    authError.innerText = 'Could not connect to the server. Is it running on port 5001?';
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  token = null;
  localStorage.removeItem('learnpath_token');
  showAuth();
});

// Fetch Skills
async function fetchSkills() {
  try {
    const res = await fetch(`${API_URL}/skills`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (res.status === 401) {
      logoutBtn.click(); // Token expired or invalid
      return;
    }
    
    const skills = await res.json();
    renderSkills(skills);
  } catch (err) {
    console.error('Failed to fetch skills:', err);
  }
}

// Render Skills
function renderSkills(skills) {
  if (!skills || skills.length === 0) {
    skillsList.innerHTML = '<p style="text-align: center; color: #86868b; padding: 20px 0;">No skills added yet.</p>';
    return;
  }
  
  skillsList.innerHTML = skills.map(skill => `
    <div class="skill-item">
      <div class="skill-info">
        <h4>${skill.name}</h4>
        <p>${skill.category} • ${skill.description}</p>
      </div>
    </div>
  `).join('');
}

// Add Skill
addSkillForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = document.getElementById('skill-name').value;
  const category = document.getElementById('skill-category').value;
  const description = document.getElementById('skill-desc').value;
  
  try {
    const res = await fetch(`${API_URL}/skills`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, category, description })
    });
    
    if (res.ok) {
      document.getElementById('skill-name').value = '';
      document.getElementById('skill-category').value = '';
      document.getElementById('skill-desc').value = '';
      fetchSkills(); // Refresh the list
    }
  } catch (err) {
    console.error('Failed to add skill:', err);
  }
});

init();
