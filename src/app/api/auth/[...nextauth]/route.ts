import {SocialLoginInfo, socialLogin} from '@/app/service/socialLogin';
import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
//import jwtDecode from 'jwt-decode';

// 전역 변수 선언
let login_accessToken: string | null | undefined = null;
let login_refreshToken: string | null | undefined = null;

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_SECRET || '',
      // clientId: '9adf6a7115b94bee14c411a2d745f47e' || '',
      // clientSecret: 'G3L5CCFxb8Pt9Km3AAHx4m37fMH9LYps' || '',
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      if (account?.access_token) {
        const result: SocialLoginInfo = await socialLogin(account.access_token); // account.access_token : 카카오톡으로 부터 전달받은 사용자의 access_token
        if (
          result.code === 'SUCCESS' ||
          result.data.accessToken === undefined
        ) {
          // 회원가입이 되어 있지 않는 사용자일 경우 회원가입 페이지로 넘겨버린다.
          return `/signup?social=${result.data.socialId}&accountType=${result.data.accountType}`;
        }
        login_accessToken = result.data.accessToken;
        login_refreshToken = result.data.refreshToken;
        return true;
      }
      return false;
    },

    async jwt({token}) {
      // const decodePayload = jwtDecode<any>(token.loginAccessToken + '');
      token.loginAccessToken = login_accessToken;
      token.loginRefreshToken = login_refreshToken;
      // token.memberNo = decodePayload.memberNo;
      // token.nickName = decodePayload.nickName;
      // token.roles = decodePayload.roles;
      return token;
    },

    async session({session, token}) {
      if (session.user != undefined) {
        session.user.memberNo = token.memberNo + '';
        session.user.nickName = token.nickName + '';
        session.user.roles = token.roles + '';
        session.accessToken = token.loginAccessToken;
        session.refreshToken = token.loginRefreshToken;
      }

      console.log('로그인 완료 된 세션 객체 보기 : ', session);

      return session;
    },
  },
});

export {handler as GET, handler as POST};
