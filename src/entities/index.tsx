import kakao from '@public/assets/icons/social/kakao.png';
import google from '@public/assets/icons/social/google.png';
import github from '@public/assets/icons/social/github.png';

export const LoginButton = [
  { id: 2, img: kakao, title: 'kakao', link: '' },
  {
    id: 1,
    img: google,
    title: 'google',
    link: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URI}&response_type=code&scope=${process.env.NEXT_PUBLIC_GOOGLE_AUTH_SCOPE}`,
  },
  {
    id: 3,
    img: github,
    title: 'github',
    link: `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID as string}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI as string}&scope=user:email&state=${Date.now()}&login=true`,
  },
];
