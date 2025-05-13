import CardModel from '../models/cards.js';

// busca os cartões
async function listCards() {
  try {
    const cards = await CardModel.find();
    return cards;
  } catch (error) {
    throw new Error(
      'Não foi possivel encontrar os cartºoes',
    ).mongoError('Mongo - get cards');
  }
}

async function storeCard(items, userId) {
  try {
    const { title, titleJapanese, images, synopsis } = items;

    if (!title || !images) {
      throw new Error('Nome e link são obrigatórios');
    }

    const newCard = new CardModel({
      title,
      titleJapanese,
      images,
      synopsis,
      owner: userId,
    });
    const createdCard = await newCard.save();

    return createdCard;
  } catch (error) {
    throw new Error('Não foi possível criar o cartão');
  }
}

// remove cartão
async function removeCard(cardId, userId) {
  try {
    const card = await CardModel.findById(cardId).orFail(() => {
      const error = new Error('Cartão não encontrado');
      error.statusCode = 404;
      throw error;
    });

    if (card.owner.toString() !== userId) {
      throw new Error(
        'Você não tem permissão para deletar este cartão',
      );
    }

    await CardModel.findByIdAndDelete(cardId);
    return { message: 'Cartão foi deletado com sucesso' };
  } catch (error) {
    console.error('Erro ao deletar cartão:', error);
    throw new Error(
      error.statusCode === 404
        ? 'Cartão não encontrado'
        : 'Não foi possível deletar o cartão',
    );
  }
}

export { listCards, storeCard, removeCard };
