export function sanitizeUser<T>(user: T): Omit<T, 'password'> {
  const userObject =
    typeof user === 'object' &&
    user !== null &&
    'toObject' in user &&
    typeof user.toObject === 'function'
      ? user.toObject()
      : user;

  const { password: _password, ...sanitizedUser } = userObject as T & {
    password?: string;
  };

  return sanitizedUser;
}
