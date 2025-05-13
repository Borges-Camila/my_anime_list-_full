import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/users.js';
import CustomError from '../utils/CustomError.js';

// const { JWT_SECRET } = process.env;

// função para o hash
function createHash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

async function getUserById(id) {
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error(
        'Não foi possivel encontrar o usuário especificado',
      ).mongoError('Mongo - get user by id');
    }
    return user;
  } catch (error) {
    throw new Error(
      'Não foi possivel encontrar o usuário especificado',
    ).mongoError('Mongo - get user by id');
  }
}

async function createUser(items) {
  try {
    const {
      name,
      password,
      email,
      avatar = 'https://mystickermania.com/cdn/stickers/anime/mashle-mash-burnedead-eats-512x512.png',
    } = items;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new CustomError(
        'Email já cadastrado',
        500,
        'Conflito',
      );
    }
    const newUser = new UserModel({
      name,
      password: createHash(password),
      email,
      avatar,
    });
    const creatUser = await newUser.save();
    return creatUser;
  } catch (error) {
    throw new CustomError(
      'Não foi possível criar o usuário',
      400,
      'Erro de validação',
    );
  }
}

async function updateUserInfo(_id, body = {}) {
  try {
    const { name, avatar } = body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      { name, avatar },
      {
        new: true,
        runValidators: true,
      },
    ).exec(); // Adicione .exec() para garantir a execução

    if (!updatedUser) {
      throw new CustomError(
        'Usuário não encontrado',
        404,
        'Recurso',
      );
    }

    return updatedUser;
  } catch (error) {
    console.error('Erro na atualização:', error);
    throw new CustomError(
      error.message || 'Erro ao atualizar usuário',
      error.statusCode || 500,
      'MongoDB',
    );
  }
}

async function login(items) {
  try {
    const { email, password } = items;

    if (!email || !password) {
      throw new CustomError(
        'Email e senha são obrigatórios',
        400,
        'Validação',
      );
    }

    const foundUser = await UserModel.findUserByCredentials({
      email,
      password,
    });

    if (!foundUser) {
      throw new CustomError(
        'Credenciais inválidas',
        401,
        'Autenticação',
      );
    }

    // Verifique se JWT_SECRET está definido
    if (!process.env.JWT_SECRET) {
      throw new Error('Chave JWT não configurada');
    }

    const token = jwt.sign(
      { id: foundUser._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    return {
      user: {
        id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
      },
      token,
    };
  } catch (error) {
    console.error('Erro no login:', error);
    throw new CustomError(
      error.message || 'Erro ao realizar login',
      error.statusCode || 500,
      'Autenticação',
    );
  }
}

export { getUserById, createUser, updateUserInfo, login };
