import kakao from '../assets/kakao.png';
import google from '../assets/google.png';
import github from '../assets/github.png';

export const LoginButton = [
  { id: 1, img: kakao, title: 'kakao', link: '' },
  {
    id: 2,
    img: google,
    title: 'google',
    link: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_SCOPE}`,
  },
  { id: 3, img: github, title: 'github', link: '' },
];
