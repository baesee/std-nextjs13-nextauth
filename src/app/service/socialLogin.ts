export type SocialLoginInfo = {
  status: string;
  message: string;
  code: string;
  data: {
    accessToken: string | null | undefined;
    refreshToken: string | null | undefined;
    socialId: string;
    email: string;
    accountType: string;
  };
};

export async function socialLogin(
  access_token: string,
): Promise<SocialLoginInfo> {
  console.log(' 카카오 엑세스 토큰 파라미터 : ', access_token);
  const res = await fetch(
    'http://localhost:8080/miribojob/api/v1/oauth2/kakao/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({accessToken: access_token}),
    },
  );

  const result = await res.json();
  return result;
}
