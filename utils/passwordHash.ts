import Crypto from 'crypto';

const hashPassword = (password: string, salt: string) => {
  return Crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha1').toString(
    'base64'
  );
};

const generateSaltHash = (password: string) => {
  let randomBytesBuf = Crypto.randomBytes(25);
  let salt = randomBytesBuf.toString('hex');

  password = hashPassword(password, salt);

  return {
    password: password,
    salt: salt,
  };
};

const verifySaltHash = (
  salt: string,
  hashedPassword: string,
  password: string
) => {
  let newHashedPassword = hashPassword(password, salt);
  if (hashedPassword === newHashedPassword) return true;

  return false;
};

const saltHash = { generateSaltHash, verifySaltHash };

export default saltHash;
