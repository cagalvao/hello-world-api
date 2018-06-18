
function getSwaggerBase (basePath) {
  return {
    swagger: '2.0',
    info: {
      title: 'ConfirmeNovo',
      description: 'Endpoints para a API do ConfirmeNovo',
      version: '1.0.0'
    },
    basePath: '/',
    host: 'localhost:5000',
    paths: {
      $ref: basePath + '/paths.json'
    },
    securityDefinitions: {
      Authorization: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    definitions: {
      $ref: basePath + '/definitions.json'
    }
  }
}

module.exports = {
  getSwaggerBase
}
