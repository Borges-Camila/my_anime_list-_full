import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import validator from 'validator';
import {
  getUserById,
  updateUserInfo,
} from '../controllers/users.js';

const router = Router();

const urlValidator = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error('string.uri');
  }
  return value;
};

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    avatar: Joi.string().custom(urlValidator).required(),
  }),
});

// procura usuário pelo id

router.get('/me', async (request, response, next) => {
  try {
    const user = await getUserById(request.user.id);
    return response.json(user);
  } catch (error) {
    next(error);
  }
});

// atualização de usuário (name, avatar)

router.patch(
  '/me',
  validateUserUpdate,
  async (request, response, next) => {
    try {
      const { name, avatar } = request.body;
      const userId = request.user._id;
      if (!userId) {
        return response
          .status(400)
          .json({ error: 'ID do usuário não fornecido' });
      }
      const updatedUserInfo = await updateUserInfo(userId, {
        name,
        avatar,
      });
      return response.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
