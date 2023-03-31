const { HttpError, ctrlWrapper } = require('../helpers');

const Contact = require('../models/contact');

const getAll = async (req, res) => {
  const { favorite, name, email, phone, page = 1, limit = 10 } = req.query;
  const { _id } = req.user;

  const optionsObject = {};
  if (favorite) optionsObject.favorite = favorite;
  if (name) optionsObject.name = name;
  if (email) optionsObject.email = email;
  if (phone) optionsObject.phone = phone;

  const queryParams = { owner: _id, ...optionsObject };
  const paginationParams = { skip: (page - 1) * limit, limit: +limit };

  const contacts = await Contact.find(queryParams, '', paginationParams);
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result: contacts },
  });
};

const getById = async (req, res) => {
  const { _id } = req.user;
  userVerification;
  const { contactId } = req.params;
  const contact = await Contact.findOne({ _id: contactId, owner: _id });
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result: contact },
  });
};

const add = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result },
  });
};

const updateById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'missing fields');
  }
  const result = await Contact.findOne({ _id: contactId, owner: _id });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  await Contact.updateOne({ _id: contactId, owner: _id }, { $set: req.body });

  res.status(200).json({
    status: 'success',
    code: 201,
    data: { result },
  });
};

const deleteById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contact = await Contact.deleteOne({ _id: contactId, owner: _id });
  if (!contact) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: contact,
  });
};

const updateStatus = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, 'missing fields favorite');
  }
  const result = await Contact.findOne({ _id: contactId, owner: _id });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  await Contact.updateOne({ _id: contactId, owner: _id }, { $set: req.body });

  res.status(200).json({
    status: 'success',
    code: 201,
    data: { result },
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateStatus: ctrlWrapper(updateStatus),
};
