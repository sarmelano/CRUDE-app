
let currentUser = null;
let currentUserId = null;

const modal = document.getElementById('modal');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelButton = document.getElementById('cancel-delete');

const formElements = {
  name: { regex: /^[А-ЯA-Z][а-яa-z]*\s[А-ЯA-Z][а-яa-z]*$/, errorMessage: "Try again" },
  password: { regex: /^(?=.*\d).{6,}$/, errorMessage: "At list 6 symbols with 1 digit" },
  age: { regex: /^(?:1[01][0-9]|120|99|[1-9][0-9]?)$/, errorMessage: "from 1 to 99" },
  email: { regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, errorMessage: "Try again" },
  phone: { regex: /^\d{10}$/, errorMessage: "must be 10 digits" },
  card: { regex: /^\d{16}$/, errorMessage: "must be 16 digits" },
};

document.getElementById('save-button').addEventListener('click', () => {
  let isValid = true;
  for (let key in formElements) {
    const inputElement = document.getElementById(`user-${key}`);
    const errorMessageElement = document.getElementById(`error-message-${key}`);
    const { regex, errorMessage } = formElements[key];
    if (!validateInput(inputElement, errorMessageElement, regex, errorMessage)) {
      isValid = false;
    }
  }

  if (isValid) {
    // Извлечение значений из формы и сохранение в currentUser
    for (let key in formElements) {
      const inputElement = document.getElementById(`user-${key}`);
      currentUser[key] = key === 'age' ? parseInt(inputElement.value) : inputElement.value; //если age то число, иначе строка
    }

    refreshUserList();
    document.getElementById('user-form').style.display = 'none';
  }
});

document.getElementById('user-list').addEventListener('click', event => {
  const id = parseInt(event.target.dataset.id);
  if (event.target.classList.contains('view-button')) viewUser(id);
  else if (event.target.classList.contains('edit-button')) editUser(id);
  else if (event.target.classList.contains('remove-button')) removeUser(id);
});

document.getElementById('add-button').addEventListener('click', () => {
  const id = Math.max(...users.map(user => user.id), 0) + 1;
  currentUser = { id, name: '', age: '', password: '', email: '', phone: '', card: '' };
  users.push(currentUser);
  editUser(id);
});

confirmDeleteButton.addEventListener('click', function () {
  users = users.filter(user => user.id !== currentUserId);
  refreshUserList();
  modal.style.display = 'none';
});

cancelButton.addEventListener('click', function () {
  modal.style.display = 'none';
});

refreshUserList();