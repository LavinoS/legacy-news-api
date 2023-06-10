import createError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const checkingForUser = async (dbConn, reqUrl, { email, password }) => {
  const existingUser = await dbConn.collection(reqUrl).findOne({ userEmail: email });

  if (!existingUser) {
    throw createError(401, `This user doesn't exists`);
  }

  const matchedPassword = await bcrypt.compare(password, existingUser.password);

  if (!matchedPassword) {
    throw createError(401, `Invalid password`);
  }

  const secretToken = jwt.sign({ id: existingUser._id }, 'secret');

  return { secretToken, role: existingUser.role };
};