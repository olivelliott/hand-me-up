import decode from 'jwt-decode'

class AuthService {
  getProfile() {
    return decode(this.getToken())
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // use type coersion to check if token is NOT undefined and the token is NOT expired
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token)
      if (decoded.exp < Date.now() / 1000) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.log(err)
      return false
    }
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken)
    window.location.assign('/')
  }

  logout() {
    localStorage.removeItem('id_token')
    window.location.assign('/')
  }
}

export default new AuthService()