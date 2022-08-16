const loginApi = {
    submit: ({ config, navigate, handleShowAlert }) => {
        return (fetch(`http://localhost:8080/api/login`, config)
            .then(res => {
                if (Math.trunc(res.status / 100) !== 2) {
                    handleShowAlert()
                    throw new Error('Error to login')
                }
                navigate('/')
                return res.json()
            })
        )
    }
}
export default loginApi