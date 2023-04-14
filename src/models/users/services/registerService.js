import createError from 'http-errors';

export const checkingForExistingUsers = async (dbConn, reqUrl, email) => {
  const existingUser = await dbConn.collection(reqUrl).findOne({ userEmail: email });

  if (existingUser) {
    throw createError(400, 'This user already exists!');
  }

  return null;
};
