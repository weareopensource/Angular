export const environment = {
  production: false,
  authentication: {
    providers: {
      google: {
        id: ''
      },
      facebook: {
        id: ''
      },
      twitter: {
        id: ''
      },
      github: {
        id: ''
      }
    }
  },
  api: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      basepath: 'api',
      auth: 'auth',
      users: 'users',
      tasks: 'tasks',
      media: 'media',
      baseurl: 'api2'
    }
  }
};
