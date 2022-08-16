import axios from 'axios'

const fiatApi = {
    getWalletList({ curr, token }) {
        return axios.get(`http://localhost:8080/api/public/wallets`, {
            params: {
                valuation: curr
            },
            headers: {
                'Authorization': 'Bearer ' + (`${token}`),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
    }
}
export default fiatApi
