export const environment = {
  production: false,
  api: {
    protocol: "http",
    host: "localhost",
    port: "3000",
    endpoints: {
      basePath: "api",
      auth: "auth",
      users: "monusers",
      tasks: "tasks",
      media: "media"
    }
  }
};