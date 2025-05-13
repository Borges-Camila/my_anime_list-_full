import mongoose, { Schema } from 'mongoose';

const linkRegex = /^https?:\/\//;

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 2,
    },
    titleJapanese: {
      type: String,
      minlength: 2,
    },
    images: {
      type: String,
      required: true,
      validate: {
        validator(validity) {
          return linkRegex.test(validity);
        },
        message: (props) => `'${props.value}' é um link inválido`,
      },
    },
    synopsis: {
      type: String,
      minlength: 2,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    versionKey: false,
  },
);

const CardModel = mongoose.model('cards', cardSchema);
export default CardModel;
