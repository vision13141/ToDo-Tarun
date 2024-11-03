
const useAuth = () => {
    let data = localStorage.getItem('auth')

    if(data) {
        return true
    } else {
        return false
    }
}

export default useAuth
