let users = JSON.parse(localStorage.getItem('users')) || [
  { id: 1, name: 'Bob', age: 30, password: '', email: '', phone: '', card: '' },
  { id: 2, name: 'Alice', age: 25, password: '', email: '', phone: '', card: '' }
];