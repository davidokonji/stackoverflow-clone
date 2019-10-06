export default {
  validUserReg: {
    email: 'test@gmail.com',
    password: 'password1234',
    firstname: 'john',
    lastname: 'doe',
    username: 'john doe'
  },
  invalidUserReg: {
    password: 'password1234',
    firstname: 'john',
    lastname: 'doe',
  },
  invalidPassword: {
    email: 'test@gmail.com',
    password: 'pass',
    firstname: 'john',
    lastname: 'doe',
    username: 'john doe'
  },
  validEmailLogin: {
    email: 'test@gmail.com',
    password: 'password1234',
  },
  validUsernameLogin: {
    username: 'john doe',
    password: 'password1234',
  },
  invalidLogin: {
    email: 'test1@gmail.com',
    password: 'password1234'
  },
  invalidLoginEmail: {
    email: 'test@gmail',
    password: 'password1234'
  }
}