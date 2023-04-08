export default async (body, dbPassword) => {
  const { password, email } = body;

  return {
    password: password,
    userEmail: email
  };
}