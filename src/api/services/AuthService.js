import api from '../config'

export default class AuthService {
  static async login(username, password) {
    console.log(username, password)
    return api.post('/auth/login', { username, password })
  }

  static async register(username, password, role = '') {
    return api.post('/auth/register', { username, password, role })
  }

  static async logout() {
    return api.post('/auth/logout')
  }
}
