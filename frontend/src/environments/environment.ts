
export const environment = {
    production:false,
    tokenSession: 'TOKEN_SESSION',
    url: 'http://localhost:4050',
    urlCloud: 'http://localhost:3050',
    listPathNoAuth: ['/user/signin'],
    routeList: [
        {code:'Monitor', route: 'dashboard', security: true },
        {code:'Automations', route: 'support', security: false},        
        {code:'Support', route: 'support', security: true},        
        {code:'Administration', route: 'admin', security: true},
    ],
}
