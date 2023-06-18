import bcrypt from 'bcrypt';
import { format } from 'date-fns';

export default async (body) => {
  const { name, surname, password, email } = body;
  const hashedPassword = await bcrypt.hash(password, 10);

  return {
    firstName: name,
    lastName: surname,
    password: hashedPassword,
    userEmail: email,
    role: 'user',
    registeredAt: format(new Date(), 'dd-MM-yyyy')
  };
}
