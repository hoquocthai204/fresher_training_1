const register = {
    submit({ config, navigate }) {
        return (
            fetch(`http://localhost:8080/api/register`, config)
                .then(res => {
                    if (Math.trunc(res.status / 100) !== 2) {
                        throw new Error("Error to register");
                    }
                    navigate('/login')
                    return res.json()
                })
        )
    }
}

export default register