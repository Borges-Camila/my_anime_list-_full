import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { celebrate, Joi, errors } from 'celebrate';
import validator from 'validator';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import { login, createUser } from './controllers/users.js';
import auth from './middleware/auth.js';
import {
  requestLogger,
  errorLogger,
} from './middleware/logger.js';

dotenv.config();

async function connectDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/animedb', {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Database connect');
  } catch (error) {
    console.log('Error: Não foi possível conectar ao database');
  }
}

const app = express();
app.use(express.json());

// ------ Middleware de Autorização

app.use((req, res, next) => {
  req.user = {
    _id: '67d384943e818db3576451b0',
  };

  next();
});

const port = 3001;

const urlValidator = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error('string.uri');
  }
  return value;
};

const validateUserSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(urlValidator),
  }),
});

const validateUserSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

connectDatabase();

function logger(req, res, next) {
  console.log(
    `${new Intl.DateTimeFormat('pt-BR').format(Date.now())} - ${
      req.method
    } - ${req.url}`,
  );
  next();
}

app.use(cors());
app.options('*', cors());

app.use(logger);

app.use(requestLogger);

app.use('/users', auth, userRouter);

app.use('/cards', auth, cardRouter);

// ROTA SIGIN

app.post(
  '/signin',
  validateUserSignin,
  async (request, response) => {
    try {
      const { email, password } = request.body;
      const { user, token } = await login({ email, password });

      return response.status(200).json({
        user,
        token,
      });
    } catch (error) {
      console.error('Erro no signin:', error);

      return response.status(error.statusCode || 500).json({
        message: error.message || 'Erro interno no servidor',
        type: error.type || 'Erro desconhecido',
      });
    }
  },
);

// ROTA SIGNUP

app.post(
  '/signup',
  validateUserSignup,
  async (request, response) => {
    try {
      const { email, password, name, avatar } = request.body;
      const createdUser = await createUser({
        email,
        password,
        name,
        avatar,
      });
      return response.status(201).json(createdUser);
    } catch (error) {
      const { message, statusCode, type } = error;
      if (!error.statusCode) {
        error.statusCode = 400;
        error.type = 'Validação interna';
      }
      if (error.message.includes('email')) {
        error.message = 'Email já cadastrado';
      }
      return response.status(statusCode).json({
        type,
        message,
      });
    }
  },
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === 500 ? 'Ocorreu um erro no servidor' : message,
  });
});

app.use((req, res) => {
  res
    .status(404)
    .json({ message: 'A solicitação não foi encontrada' });
});
