import type { Access } from 'payload'

/** Herkese açık okuma (sitede gösterilen içerikler için). */
export const anyone: Access = () => true

/** Yalnızca panele giriş yapmış kullanıcılar. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)
