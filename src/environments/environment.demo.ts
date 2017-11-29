export const environment = {
    production: true,
    backend: {
        protocol: 'http',
        host: 'localhost',
        port: '3010',
        endpoints: {
          signup: '/api/auth/signup',
          signin: '/api/auth/signin',
          articles : '/api/articles',
          users : '/api/users',
          profile : '/api/users/me',
          password: '/api/users/password'
        }
    }
};
