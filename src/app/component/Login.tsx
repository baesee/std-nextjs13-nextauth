'use client'; // 필수!
import {data} from 'autoprefixer';
import {signIn, signOut, useSession} from 'next-auth/react';
import React from 'react';

export default function Login() {
  const {data: session} = useSession();

  console.log('나는 accessToken? ', session?.accessToken);
  console.log('나는 refreshToken? ', session?.refreshToken);

  if (session) {
    return (
      <>
        {session.user?.name}님 반가워요잉 <br />
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }
  return (
    <div>
      로그인 되지 않았다.
      <br />
      <button onClick={() => signIn()}>로그인 버튼</button>
    </div>
  );
}
