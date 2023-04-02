const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatar: {
      type: String,
    },

    token: {
      type: String,
      default: null,
    },
    favorites: Array,
    recipes: Array,
    shopingList: Array,
  },
  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

module.exports = User;
