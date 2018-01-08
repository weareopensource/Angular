export const environment = {
production: true,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: 4002,
    endpoints: {
      basePath: 'api',
      signup: 'auth/signup',
      signin: 'auth/signin',
      articles : 'articles',
      users : 'users'
    }
  }
};
