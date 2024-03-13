import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Task Management App',
    version: '1.0.0',
    description: 'Manage Task',
  },
  servers: [
    {
      url: 'http://localhost:3002',
      description: 'Local server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/swagger.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
