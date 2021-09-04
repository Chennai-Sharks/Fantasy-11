import connectDB from '../../config/db';
import User from '../../models/User';
import saltHash from 'password-salt-and-hash';

async function register(req, res) {
  const emailExist = await User.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.status(400).send('Email already exists');

  const phoneExist = await User.findOne({
    phone: req.body.phone,
  });

  if (phoneExist) return res.status(400).send('Phone number already in use');

  let hashPassword = saltHash.generateSaltHash(req.body.password);

  const user = new User({
    phone: req.body.phone,
    email: req.body.email,
    password: hashPassword.password,
    salt: hashPassword.salt,
  });
  try {
    const savedUser = await user.save();
    res.send({
      userId: savedUser._id,
      phone: savedUser.phone,
      email: savedUser.email,
    });
  } catch (err) {
    res.status(400).send({
      message: err,
    });
  }
}

export default connectDB(register);
