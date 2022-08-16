import axios from "axios"

const tranHisApi = {
    getTranHis(data) {
        return axios.get('http://localhost:8080/api/public/transactions', {
            params: data.data,
            headers: {
                'Authorization': 'Bearer ' + (`${data.token}`),
            },
        })
    }
}
export default tranHisApi