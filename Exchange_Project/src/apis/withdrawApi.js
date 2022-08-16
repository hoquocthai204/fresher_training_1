import axios from "axios"

const withdrawApi = {
    postWithdraw(data) {
        return axios.post(`http://localhost:8080/api/public/wallets/withdraw/${data.coin}`, data.data, {
            headers: {
                'Authorization': 'Bearer ' + (`${data.token}`),
            },
        })
    }
}
export default withdrawApi