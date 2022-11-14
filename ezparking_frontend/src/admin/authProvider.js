const authProvider = {
    login: ({ username, password }) =>  {
        const request = new Request('https://34.207.166.66:8083/login', {
            method: 'POST',
            body: JSON.stringify({"name":username, "password":password }),
            headers: new Headers({'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Login fail, Check your username and password')
            });
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('auth') ? Promise.resolve() : Promise.reject()
    },
    getPermissions: () => {
        // Required for the authentication to work
        return Promise.reject('Unknown method');
    },
    // ...
};

export default authProvider;