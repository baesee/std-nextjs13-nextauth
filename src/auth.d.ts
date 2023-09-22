import NextAuth, {DefaultSession, User} from 'next-auth';

// user 객체에 id와 acceessToken 프로퍼티 타입을 추가함
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      memberNo?: string;
      nickName?: string;
      roles?: string;
    };
    accessToken: string | unknown;
    refreshToken: string | unknown;
  }
}
