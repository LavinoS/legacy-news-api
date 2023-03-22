import bcrypt from 'bcrypt';

export default async (body) => {
  const { name, surname, password, email } = body;
  const hashedPassword = await bcrypt.hash(password, 10);

  return {
    firstName: name,
    lastName: surname,
    password: hashedPassword,
    userEmail: email
  };
}
