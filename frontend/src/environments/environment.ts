
export const environment = {
    production:false,
    tokenSession: 'TOKEN_SESSION',
    url: 'http://localhost:3000',
    listPathNoAuth: ['/user/signin'],
    routeList: [
        {code:'Home', route: 'home', security: false},
        {code:'Dashboard', route: 'home', security: true},
        {code:'Suport', route: 'suport', security: true},
        {code:'Administration', route: 'admin', security: true},
    ]
}
