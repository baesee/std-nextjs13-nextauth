import {useSession} from 'next-auth/react';
import LoginButton from './component/Login';
import Login from './component/Login';
import {getServerSession} from 'next-auth';

export default async function Home() {
  const aa = await getServerSession();
  console.log(' Home() aa : ', aa);
  return (
    <main>
      <h2>안녕안녕안녕안녕안녕안녕안녕 안녕안녕안녕안녕</h2>
      <Login />
    </main>
  );
}
