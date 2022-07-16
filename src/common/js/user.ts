import CryptoJS from 'crypto-js'
import sha1 from 'sha1'

interface UserProps {
  username: string
}

const LOCAL_USER_KEY = sha1('user_info')
function save_user_info (user: UserProps): void {
  const secret_string = CryptoJS.AES.encrypt(JSON.stringify(user), 'secret_key').toString()
  window.localStorage.setItem(LOCAL_USER_KEY, secret_string)
}

function get_user_info (): UserProps | null {
  try {
    const secret_string = window.localStorage.getItem(LOCAL_USER_KEY)
    if (!secret_string) return null
    const bytes = CryptoJS.AES.decrypt(secret_string, 'secret_key')
    const user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    if (!user) return null
    return user
  } catch (err) {
    return null
  }
}

export {
  get_user_info,
  save_user_info
}
