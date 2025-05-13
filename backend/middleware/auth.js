import jwt from 'jsonwebtoken';
import CustomError from '../utils/CustomError.js';

const auth = async (req, res, next) => {
  try {
    // 1. Extrair o token do header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError(
        'Token não fornecido',
        401,
        'Autenticação',
      );
    }

    const token = authHeader.split(' ')[1];

    // 2. Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Adicionar o usuário à requisição
    req.user = {
      id: decoded.id, // Mantenha compatibilidade
      _id: decoded.id, // Padrão MongoDB
    };

    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }

    res.status(error.statusCode || 500).json({
      message: error.message || 'Erro na autenticação',
    });
  }
};

export default auth;

// const { JWT_SECRET } = process.env;

// const auth = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return res
//       .status(401)
//       .send({ message: 'Autorização necessária' });
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     return res
//       .status(401)
//       .send({ message: 'Autorização necessária' });
//   }

//   req.user = payload;

//   next();
// };

// export default auth;
