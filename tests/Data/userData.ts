export const users = {
    valid: { name: 'user3 name', email: 'user41@mail.com', password: '12345', phone: '123' },
    duplicate: { name: 'user3 name', email: 'user41@mail.com', password: '12345', phone: '123'},
    empty: { name: '', email: '', password: '', phone: '' },
    wrongPassword: { email: 'user41@mail.com', password: '1234' },
    wrongEmail: { email: 'r3@mail.com', password: '12345' },
    update: { name:'user4 name', phone:'0000' },
  };