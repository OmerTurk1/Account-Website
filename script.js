const form = document.getElementById('auth-form');
const toggleLink = document.getElementById('toggle-link');
const formTitle = document.getElementById('form-title');
const nameField = document.getElementById('name-field');

let mode = 'signup'; // varsayılan: kayıt

const scriptURL = 'https://script.google.com/macros/s/AKfycbz2PIwWyzUQdVQprFpmMkdZzqSc9tR_VCJLhB2U5k3rw4QMYlAKlpVmUpfTk08c0Vmw/exec'; // BURAYA Apps Script URL'ni yapıştır

toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  mode = mode === 'signup' ? 'login' : 'signup';
  formTitle.textContent = mode === 'signup' ? 'Sign Up' : 'Log In';
  toggleLink.textContent = mode === 'signup'
    ? 'Zaten hesabın var mı? Giriş yap'
    : 'Hesabın yok mu? Kayıt ol';
  nameField.style.display = mode === 'signup' ? 'block' : 'none';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name')?.value || '';
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const payload = {
    mode,
    name,
    email,
    password
  };

  try {
    const res = await fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'text/plain' // bu önemli!
      }
    });

    const data = await res.json();
    alert(data.message);
  } catch (err) {
    alert('Bir hata oluştu.');
    console.error(err);
  }
});
