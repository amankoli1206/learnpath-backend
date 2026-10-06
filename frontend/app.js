const API_URL = 'http://localhost:5001/api';

const els = {
  authScreen: document.getElementById('auth-screen'),
  dashboardScreen: document.getElementById('dashboard-section'),
  authForm: document.getElementById('auth-form'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  authErr: document.getElementById('auth-error'),
  toggleAuth: document.getElementById('toggle-auth'),
  authSubtitle: document.getElementById('auth-subtitle'),
  authSubmit: document.getElementById('auth-submit'),
  logoutBtn: document.getElementById('logout-btn'),
  navItems: document.querySelectorAll('.nav-item'),
  views: document.querySelectorAll('.view-section'),
  
  // Skills
  addSkillForm: document.getElementById('add-skill-form'),
  skillsList: document.getElementById('skills-list'),
  
  // Milestones
  addMilestoneForm: document.getElementById('add-milestone-form'),
  milestonesList: document.getElementById('milestones-list'),
  
  // Resources & Enrollments
  resourcesList: document.getElementById('resources-list'),
  enrollmentsList: document.getElementById('enrollments-list'),
  
  // Logs
  addLogForm: document.getElementById('add-log-form'),
  logEnrollmentSelect: document.getElementById('log-enrollment'),
  logsList: document.getElementById('logs-list'),
  
  // AI
  runAiBtn: document.getElementById('run-ai-btn'),
  aiResults: document.getElementById('ai-results'),
  aiRecommendations: document.getElementById('ai-recommendations')
};

let isLogin = true;
let token = localStorage.getItem('learnpath_token');
let userId = localStorage.getItem('learnpath_userid');
let globalEnrollments = [];

function init() {
  if (token) showDashboard();
  else showAuth();
}

function showAuth() {
  els.authScreen.classList.remove('hidden');
  els.dashboardScreen.classList.add('hidden');
}

function showDashboard() {
  els.authScreen.classList.add('hidden');
  els.dashboardScreen.classList.remove('hidden');
  fetchAllData();
}

async function fetchAllData() {
  await fetchSkills();
  await fetchMilestones();
  await fetchResources();
  await fetchEnrollments();
  await fetchLogs();
  await fetchProgress();
}

// Auth Handlers
els.toggleAuth.addEventListener('click', () => {
  isLogin = !isLogin;
  els.authSubtitle.innerText = isLogin ? 'Sign in to your account' : 'Create a new account';
  els.authSubmit.innerText = isLogin ? 'Continue' : 'Register';
  els.toggleAuth.innerText = isLogin ? 'Create yours now.' : 'Sign in here.';
});

els.authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  els.authErr.innerText = '';
  
  const email = els.email.value;
  const password = els.password.value;
  const endpoint = isLogin ? '/auth/login' : '/auth/register';
  const body = { email, password };
  if (!isLogin) body.name = email.split('@')[0];
  
  els.authSubmit.innerText = 'Processing...';
  
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) {
      token = data.token;
      userId = data.user._id;
      localStorage.setItem('learnpath_token', token);
      localStorage.setItem('learnpath_userid', userId);
      els.email.value = ''; els.password.value = '';
      showDashboard();
    } else {
      els.authErr.innerText = data.error || 'Auth failed';
    }
  } catch(err) {
    els.authErr.innerText = 'Server connection failed.';
  } finally {
    els.authSubmit.innerText = isLogin ? 'Continue' : 'Register';
  }
});

els.logoutBtn.addEventListener('click', () => {
  token = null; userId = null;
  localStorage.removeItem('learnpath_token');
  localStorage.removeItem('learnpath_userid');
  showAuth();
});

// Sidebar Navigation
els.navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    els.navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    
    const target = item.getAttribute('data-target');
    els.views.forEach(view => view.classList.add('hidden'));
    document.getElementById(target).classList.remove('hidden');
  });
});

// Helper for generic API Fetching
async function apiGet(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`, { headers: { 'Authorization': `Bearer ${token}` } });
  if (res.status === 401) { els.logoutBtn.click(); throw new Error('Unauthorized'); }
  return await res.json();
}
async function apiPost(endpoint, body) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(body)
  });
  return res;
}

// SKILLS
async function fetchSkills() {
  try {
    const skills = await apiGet('/skills');
    if (!skills.length) {
      els.skillsList.innerHTML = '<p style="color:var(--text-muted); font-size:15px;">Your portfolio is empty. Add a skill.</p>';
      return;
    }
    els.skillsList.innerHTML = skills.map(s => `
      <div class="skill-card">
        <span class="category">${s.category}</span>
        <h4>${s.name}</h4>
        <p>${s.description}</p>
      </div>
    `).join('');
    
    // Populate profile skill dropdown
    const profileSkillSelect = document.getElementById('profile-skill');
    if (profileSkillSelect) {
      profileSkillSelect.innerHTML = '<option value="" style="color: black;">Select a Skill...</option>' + 
        skills.map(s => `<option value="${s._id}" style="color: black;">${s.name}</option>`).join('');
    }
  } catch (err) { console.error(err); }
}

els.addSkillForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('skill-name').value;
  const category = document.getElementById('skill-category').value;
  const description = document.getElementById('skill-desc').value;
  const btn = els.addSkillForm.querySelector('button'); btn.innerText = 'Saving...';
  
  try {
    const res = await apiPost('/skills', { name, category, description });
    if (res.ok) { els.addSkillForm.reset(); fetchSkills(); }
  } catch (err) { console.error(err); }
  finally { btn.innerText = 'Save Skill'; }
});

const updateProfileForm = document.getElementById('update-profile-form');
if (updateProfileForm) {
  updateProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const skillId = document.getElementById('profile-skill').value;
    const currentLevel = document.getElementById('profile-current').value;
    const desiredLevel = document.getElementById('profile-desired').value;
    const btn = updateProfileForm.querySelector('button'); 
    btn.innerText = 'Updating...';
    
    try {
      const res = await fetch(`${API_URL}/skill-profiles`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          skillProfile: [{ skill: skillId, currentLevel, desiredLevel }]
        })
      });
      if (res.ok) { 
        alert('Skill Profile Updated!');
        updateProfileForm.reset(); 
      } else {
        const err = await res.json();
        alert('Failed: ' + (err.error || err.message));
      }
    } catch (err) { console.error(err); }
    finally { btn.innerText = 'Update Profile'; }
  });
}

// MILESTONES
async function fetchMilestones() {
  try {
    const milestones = await apiGet('/milestones');
    if (!milestones.length) {
      els.milestonesList.innerHTML = '<p style="color:var(--text-muted); font-size:15px;">No goals set yet.</p>';
      return;
    }
    els.milestonesList.innerHTML = milestones.map(m => `
      <div class="skill-card">
        <span class="category">${m.isAchieved ? 'Completed ✅' : 'In Progress ⏳'}</span>
        <h4>${m.title}</h4>
        <p>${m.description || 'No description'}</p>
      </div>
    `).join('');
  } catch (err) { console.error(err); }
}

els.addMilestoneForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('milestone-title').value;
  const description = document.getElementById('milestone-desc').value;
  const btn = els.addMilestoneForm.querySelector('button'); btn.innerText = 'Saving...';
  
  try {
    const res = await apiPost('/milestones', { title, description });
    if (res.ok) { els.addMilestoneForm.reset(); fetchMilestones(); }
  } catch (err) { console.error(err); }
  finally { btn.innerText = 'Set Goal'; }
});

// RESOURCES & ENROLLMENTS
async function fetchResources() {
  try {
    const resources = await apiGet('/resources');
    if (!resources.length) {
      els.resourcesList.innerHTML = '<p style="color:var(--text-muted); font-size:15px;">No resources available right now.</p>';
      return;
    }
    els.resourcesList.innerHTML = resources.map(r => `
      <div class="skill-card">
        <span class="category">${r.type || 'Course'}</span>
        <h4>${r.title}</h4>
        <p><a href="${r.url}" target="_blank" style="color:var(--primary-black); font-weight: 500; text-decoration: underline;">View Material</a></p>
        <button class="btn-primary" style="margin-top: auto; padding:12px 20px; font-size:15px; width:100%; border-radius: 20px;" onclick="enroll('${r._id}')">Enroll Now</button>
      </div>
    `).join('');
  } catch (err) { console.error(err); }
}

window.enroll = async function(resourceId) {
  try {
    const res = await apiPost('/enrollments', { resource: resourceId });
    if (res.ok) {
      alert("Successfully enrolled!");
      fetchEnrollments();
    } else {
      const err = await res.json();
      alert(err.message || "Could not enroll");
    }
  } catch(err) { console.error(err); }
}

async function fetchEnrollments() {
  try {
    const enrollments = await apiGet('/enrollments');
    globalEnrollments = enrollments; // Save for Logs dropdown
    
    // Populate dropdown
    els.logEnrollmentSelect.innerHTML = '<option value="">Select Enrollment...</option>' + 
      enrollments.map(e => `<option value="${e._id}">${e.resource?.title || 'Unknown Resource'}</option>`).join('');
      
    if (!enrollments.length) {
      els.enrollmentsList.innerHTML = '<p style="color:var(--text-muted); font-size:15px;">You have not enrolled in anything yet.</p>';
      return;
    }
    els.enrollmentsList.innerHTML = enrollments.map(e => `
      <div class="skill-card">
        <span class="category">Status: ${e.status}</span>
        <h4>${e.resource?.title || 'Unknown Resource'}</h4>
        <p>Enrolled on: ${new Date(e.enrolledAt).toLocaleDateString()}</p>
      </div>
    `).join('');
  } catch (err) { console.error(err); }
}

// LOGS
async function fetchLogs() {
  try {
    const logs = await apiGet('/learning-logs');
    if (!logs.length) {
      els.logsList.innerHTML = '<p style="color:var(--text-muted); font-size:15px;">No logs recorded yet.</p>';
      return;
    }
    els.logsList.innerHTML = logs.map(l => `
      <div class="skill-card">
        <span class="category">${l.hoursSpent} Hours</span>
        <h4>Notes</h4>
        <p>${l.notes}</p>
        <p style="font-size:12px; margin-top:10px; color:#ccc;">Date: ${new Date(l.date).toLocaleDateString()}</p>
      </div>
    `).join('');
  } catch (err) { console.error(err); }
}

els.addLogForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const enrollmentId = els.logEnrollmentSelect.value;
  const hoursSpent = document.getElementById('log-hours').value;
  const notes = document.getElementById('log-notes').value;
  const btn = els.addLogForm.querySelector('button'); btn.innerText = 'Saving...';
  
  try {
    const res = await apiPost('/learning-logs', { enrollmentId, hoursSpent, notes });
    if (res.ok) { els.addLogForm.reset(); fetchLogs(); }
  } catch (err) { console.error(err); }
  finally { btn.innerText = 'Submit Log'; }
});

// AI Engine
els.runAiBtn.addEventListener('click', async () => {
  els.runAiBtn.innerText = 'Analyzing...';
  els.runAiBtn.style.opacity = '0.7';
  try {
    const data = await apiGet('/analysis/skill-gap');
    els.aiResults.classList.remove('hidden');
    if (data.aiRecommendations && data.aiRecommendations.length > 0) {
      els.aiRecommendations.innerHTML = data.aiRecommendations.map(rec => `<li>${rec}</li>`).join('');
    } else {
      els.aiRecommendations.innerHTML = `<li>${data.recommendations ? data.recommendations[0] : 'No data'}</li>`;
    }
  } catch(err) { console.error(err); } 
  finally { els.runAiBtn.innerText = 'Run Deep Analysis'; els.runAiBtn.style.opacity = '1'; }
});

// PROGRESS & SHARE
async function fetchProgress() {
  if (!userId) return;
  try {
    const data = await apiGet(`/progress/user/${userId}`);
    const statsDiv = document.getElementById('progress-stats');
    if (statsDiv) {
      statsDiv.innerHTML = `
        <h4 style="margin-bottom: 10px; color: var(--accent-blue);">Total Study Logs: ${data.totalLogs || 0}</h4>
        <p style="color: var(--text-muted);">Keep up the great work! Every hour you log brings you closer to your goals.</p>
      `;
    }
  } catch(err) { console.error(err); }
}

const shareForm = document.getElementById('share-progress-form');
if (shareForm) {
  shareForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mentorEmail = document.getElementById('share-email').value;
    const message = document.getElementById('share-message').value;
    const btn = shareForm.querySelector('button'); 
    btn.innerText = 'Sharing...';
    
    try {
      const res = await apiPost('/share', { mentorEmail, message });
      if (res.ok) { 
        alert('Progress shared successfully!');
        shareForm.reset(); 
      }
    } catch (err) { console.error(err); }
    finally { btn.innerText = 'Share'; }
  });
}

init();
