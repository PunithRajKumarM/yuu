// check valid password
export function validatePassword(password: string) {
  // Check if the password is at least 8 characters long and contains at least one letter and one number
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s])\S{8,}$/;
  const result = regex.test(password);
  return result;
}
