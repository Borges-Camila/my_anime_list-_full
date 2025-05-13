import jwt from 'jsonwebtoken';
import CustomError from '../utils/CustomError.js';

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError(
        'Token não fornecido',
        401,
        'Autenticação',
      );
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      _id: decoded.id,
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
