import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';

import { UnauthorizedException } from '@nestjs/common';

export type JwtPayload = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};

const DEFAULT_JWT_EXPIRES_IN_SECONDS = 60 * 60 * 24;

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const hashedPassword = scryptSync(password, salt, 64).toString('hex');

  return `${salt}:${hashedPassword}`;
}

export function verifyPassword(password: string, storedPassword: string) {
  const [salt, storedHash] = storedPassword.split(':');

  if (!salt || !storedHash) {
    return false;
  }

  const derivedKey = scryptSync(password, salt, 64);
  const storedKey = Buffer.from(storedHash, 'hex');

  if (derivedKey.length !== storedKey.length) {
    return false;
  }

  return timingSafeEqual(derivedKey, storedKey);
}

export function createJwtToken(
  userId: string,
  email: string,
  jwtSecret: string,
  expiresInSeconds = DEFAULT_JWT_EXPIRES_IN_SECONDS,
) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(
    JSON.stringify({ alg: 'HS256', typ: 'JWT' }),
  ).toString('base64url');
  const payload = Buffer.from(
    JSON.stringify({
      sub: userId,
      email,
      iat: now,
      exp: now + expiresInSeconds,
    } satisfies JwtPayload),
  ).toString('base64url');
  const signature = createHmac('sha256', jwtSecret)
    .update(`${header}.${payload}`)
    .digest('base64url');

  return `${header}.${payload}.${signature}`;
}

export function verifyJwtToken(token: string, jwtSecret: string): JwtPayload {
  const [header, payload, signature] = token.split('.');

  if (!header || !payload || !signature) {
    throw new UnauthorizedException('Invalid token');
  }

  const expectedSignature = createHmac('sha256', jwtSecret)
    .update(`${header}.${payload}`)
    .digest('base64url');

  if (
    signature.length !== expectedSignature.length ||
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  ) {
    throw new UnauthorizedException('Invalid token');
  }

  const decodedPayload = JSON.parse(
    Buffer.from(payload, 'base64url').toString('utf8'),
  ) as Partial<JwtPayload>;

  if (
    typeof decodedPayload.sub !== 'string' ||
    typeof decodedPayload.email !== 'string' ||
    typeof decodedPayload.exp !== 'number'
  ) {
    throw new UnauthorizedException('Invalid token');
  }

  const now = Math.floor(Date.now() / 1000);

  if (decodedPayload.exp <= now) {
    throw new UnauthorizedException('Token expired');
  }

  return decodedPayload as JwtPayload;
}

export function extractBearerToken(authorization: string | undefined) {
  if (!authorization?.startsWith('Bearer ')) {
    throw new UnauthorizedException('Authorization token is required');
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    throw new UnauthorizedException('Authorization token is required');
  }

  return token;
}
