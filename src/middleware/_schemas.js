import 'regenerator-runtime';
import Joi from '@hapi/joi';

const schemas = {};

const email = Joi.string()
  .trim()
  .lowercase()
  .email()
  .required()
  .label('Email is required and should look like this : example@email.com!');
const password = Joi.string()
  .min(3)
  .required()
  .label('Password is required,  it must have at least 5 letters');

const oldpassword = Joi.string()
  .min(3)
  .required()
  .label('Old password is required,  it must have at least 5 letters');

const newpassword = Joi.string()
  .min(3)
  .required()
  .label('New Password is required,  it must have at least 5 letters');
const name = Joi.string()
  .min(3)
  .required()
  .label('Name is required,  it must have at least 3 letters');

const pname = Joi.string()
  .min(3)
  .required()
  .label('Patient Name is required,  it must have at least 3 letters');

const phone = Joi.string()
  .min(10)
  .required()
  .label('Phone is required,  it must have at least 10 digits');
const address = Joi.string()
  .min(3)
  .required()
  .label('Addrss is required,  it must have at least 3 letters');
const website = Joi.string()
  .min(5)
  .label('Website is required,  it must have at least 5 letters');

const speciality = Joi.string()
  .min(3)
  .required()
  .label('Speciality is required,  it must have at least 3 letters');

const clinic = Joi.string()
  .min(3)
  .required()
  .label('Clinic is required,  it must have at least 3 letters');

const image = Joi.string().min(5).label('Image is required,  it must be a url');
const properties = Joi.string()
  .required()
  .min(3)
  .label('Medicine properties are required, must be atleast 3 letters');

const decription = Joi.string()
  .required()
  .min(3)
  .label('Medicine decription is required, must be atleast 10 letters');

const price = Joi.number()
  .min(1)
  .required()
  .label('Medicine price is required');

const type = Joi.string().min(3).required().label('Medicine type is required');

const country = Joi.string().min(3).required().label('Country is required');
const town = Joi.string().min(3).required().label('Town is required');
const street = Joi.string()
  .min(3)
  .required()
  .label('Street number is required');
const nid = Joi.string().min(16);
const mid = Joi.string().min(3).required().label('Medicine id is required');
const phid = Joi.string().min(3).required().label('Pharmacy id is required');
const patid = Joi.string().min(3).required().label('Patient id is required');
const prescription = Joi.string().min(3).label('Prescription is required');
const role = Joi.string().min(3).required().label('Role is required');
const uid = Joi.string().min(3).required().label('User id is required');
const docid = Joi.string().min(3).required().label('Doctor id is required');
const deasese = Joi.string().min(3).required().label('Disease id is required');
const content = Joi.string().min(10).required().label('Health tip content is required, atleast 10 characters');
const title = Joi.string()
  .min(3)
  .required()
  .label('Health tip title is required');
const category = Joi.string()
  .min(3)
  .required()
  .label('Health tip category is required');

schemas.login = Joi.object().keys({
  email,
  password,
});
schemas.createuser = Joi.object().keys({
  email,
  role,
  name,
  email,
  phone,
  speciality,
  clinic,
  image,
});
schemas.signup = Joi.object().keys({
  email,
  role,
  password,
});

schemas.updateuser = Joi.object().keys({
  email,
  role,
});

schemas.resetpass = Joi.object().keys({
  newpassword,
  oldpassword,
  uid,
});

schemas.resetPassword = Joi.object().keys({
  userid: Joi.any().required().label('User id is required'),
  password,
});

schemas.pharmacy = Joi.object().keys({
  name,
  email,
  phone,
  address,
  website,
});

schemas.doctor = Joi.object().keys({
  name,
  email,
  phone,
  speciality,
  clinic,
  image,
});

schemas.medicine = Joi.object().keys({
  name,
  properties,
  decription,
  image,
  price,
  type,
});

schemas.patient = Joi.object().keys({
  name,
  email,
  phone,
  address,
  country,
  town,
  street,
  nid,
});

schemas.order = Joi.object().keys({
  mid,
  phid,
  prescription,
  pname,
  patid,
});

schemas.appointment = Joi.object().keys({
  patid,
  docid,
  deasese,
});

schemas.tips = Joi.object().keys({
  uid,
  category,
  title,
  content,
  image: Joi.string().required().min(5).label('Health tip image is required,  it must be a url')
});
export default schemas;
