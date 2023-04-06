const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const recipesRouter = require('./routes/api/recipes');
const authRouter = require('./routes/api/auth');
const userRouter = require('./routes/api/users');
const ownRecipesRouter = require('./routes/api/ownRecipes');
const shopingListsRouter = require('./routes/api/shopingList');

const app = express();

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'So Yummy API',
      description: 'SoYummy API Information',
      version: '0.0.1.0',
      contact: {
        name: 'Withard At Work',
      },
    },
    host: 'yummy-project-backend.onrender.com',
    schemes: ['https'],
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
    },
  },
  apis: [
    'app.js',
    './routes/api/auth.js',
    './routes/api/ownRecipes.js',
    './routes/api/recipes.js',
    './routes/api/shopingList.js',
    './routes/api/users.js',
  ],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/recipes', recipesRouter);
app.use('/user', userRouter);
app.use('/own-recipes', ownRecipesRouter);
app.use('/shopping-list', shopingListsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found app' });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
