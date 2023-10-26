function validateInput(inputElement, errorMessageElement, regex, errorMessage) {
  if (!regex.test(inputElement.value)) {
    errorMessageElement.innerText = errorMessage;
    return false;
  }
  errorMessageElement.innerText = '';
  return true;
}

function refreshUserList() {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  users.forEach(user => {
    const userElement = document.createElement('div');
    userElement.innerHTML = `
      ${user.name}, ${user.age} 
      <button class="edit-button" data-id="${user.id}">Edit</button>
      <button class="view-button" data-id="${user.id}">View</button>
      <button class="remove-button" data-id="${user.id}">Delete</button>
    `;
    userList.appendChild(userElement);
  });
  localStorage.setItem('users', JSON.stringify(users));
}

function viewUser(id) {
  const userView = document.getElementById('user-view');

  if (currentUserId === id) {
    userView.innerHTML = '';
    currentUserId = null;
  } else {
    const user = users.find(user => user.id === id);
    
    const userFields = {
      'id number': user.id,
      'Name': user.name,
      'Age': user.age,
      'Password': user.password,
      'Email': user.email,
      'Phone': user.phone,
      'Card': user.card
    };
    
    let userDetails = '<table>';
    
    for (let fieldName in userFields) {
      userDetails += `<tr><td>${fieldName}</td><td>${userFields[fieldName]}</td></tr>`;
    }
    
    userDetails += '</table>';
    
    userView.innerHTML = userDetails;
    currentUserId = id;
  }
}

function editUser(id) {
  currentUser = users.find(user => user.id === id);
  document.getElementById('user-name').value = currentUser.name;
  document.getElementById('user-age').value = currentUser.age;
  document.getElementById('user-password').value = currentUser.password;
  document.getElementById('user-email').value = currentUser.email;
  document.getElementById('user-phone').value = currentUser.phone;
  document.getElementById('user-card').value = currentUser.card;
  document.getElementById('user-form').style.display = 'block';
}

function removeUser(id) {
  modal.style.display = 'block';
  currentUserId = id;
}