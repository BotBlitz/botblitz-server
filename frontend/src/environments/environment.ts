
export const environment = {
    production:false,
    tokenSession: 'TOKEN_SESSION',
    url: 'https://botblitz-backend.onrender.com',
    listPathNoAuth: ['/user/signin'],
    routeList: [
        {code:'Home', route: 'home', security: false},
        {code:'Dashboard', route: 'home', security: false},
        {code:'Suport', route: 'suport', security: false},
        {code:'Administration', route: 'admin', security: false},
    ]
}
