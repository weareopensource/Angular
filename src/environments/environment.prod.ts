export const environment = {
    production: true,
    backend: {
        protocol: 'http',
        host: 'localhost',
        port: '3000',
        endpoints: {
          base: 'api',
          signup: 'auth/signup',
          signin: 'auth/signin',
          articles : 'articles',
          users : 'users',
          profile : 'users/me',
          password: 'users/password'
        }
    }
};
