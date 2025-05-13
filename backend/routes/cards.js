import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import validator from 'validator';
import {
  listCards,
  storeCard,
  removeCard,
} from '../controllers/cards.js';

const router = Router();

const urlValidator = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error('string.uri');
  }
  return value;
};

const validateCardCreation = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(100),
    titleJapanese: Joi.string().min(2).max(100),
    images: Joi.string().custom(urlValidator),
    synopsis: Joi.string().max(1000),
  }),
});

const validateCardId = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

// GET - procura os cards
router.get('/', async (request, response, next) => {
  try {
    const cards = await listCards();
    return response.json(cards);
  } catch (error) {
    next(error);
  }
});

// POST /cards — cria um novo cartão
router.post(
  '/',
  validateCardCreation,
  async (request, response, next) => {
    try {
      const { title, titleJapanese, images, synopsis } =
        request.body;
      // Obtendo ID do usuário da requisição
      const userId = request.user?._id;

      if (!userId) {
        return response
          .status(401)
          .json({ error: 'Usuário não autenticado' });
      }

      const createdCard = await storeCard(
        { title, titleJapanese, images, synopsis },
        userId,
      );

      return response.status(201).json(createdCard);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE /cards/:cardId — remove um cartão por _id

router.delete(
  '/:cardId',
  validateCardId,
  async (request, response, next) => {
    try {
      const { cardId } = request.params;
      const userId = request.user?._id;

      // verifica o usuário
      if (!userId) {
        return response
          .status(401)
          .json({ error: 'Usuário não autenticado' });
      }

      const result = await removeCard(cardId, userId);
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
