import axios from 'axios'

const depositApi = {
    getAddress(data) {
        return axios.get(`http://localhost:8080/api/public/wallets/address/${data.coin}`, {
            headers: {
                'Authorization': 'Bearer ' + (`${data.token}`),
            },
        })
    },
    postAddress(data) {
        return axios.post(`http://localhost:8080/api/public/wallets/address/${data.coin}`,
            {
                address: null,
                coinCode: data.coin,
                tag: null
            },
            {
                headers: {
                    'Authorization': 'Bearer ' + `${data.token}`,
                }
            })
    },
    postHandleDeposit(data) {
        return axios.post(`http://localhost:8080/api/public/wallets/faucet/${data.coin}`, data.data, {
            headers: {
                'Authorization': 'Bearer ' + `${data.token}`,
                'Content-Type': 'application/vn.sparkminds.api-v1+json'
            }
        })
    }
}

export default depositApi