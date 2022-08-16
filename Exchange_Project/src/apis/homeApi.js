const homeApi = {
    currencyList() {
        return (
            fetch('http://localhost:8080/api/common/currencies')
                .then(res => {
                    if (Math.trunc(res.status / 100) !== 2) {
                        throw new Error("Error to get currencyApi");
                    }
                    return res.json()
                })
        )
    },
    languageList() {
        return (
            fetch('http://localhost:8080/api/common/languages')
                .then(res => {
                    if (Math.trunc(res.status / 100) !== 2) {
                        throw new Error("Error to get languageApi");
                    }
                    return res.json()
                })
        )
    },
    coinList() {
        return (
            fetch('http://localhost:8080/api/common/coins')
                .then(res => {
                    if (Math.trunc(res.status / 100) !== 2) {
                        throw new Error("Error to get languageApi");
                    }
                    return res.json()
                })
        )
    }
}
export default homeApi