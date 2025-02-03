import kakao from '../assets/kakao.png';
import google from '../assets/google.png';
import github from '../assets/github.png';

export const LoginButton = [
  { id: 1, img: kakao, title: 'kakao', link: '' },
  {
    id: 2,
    img: google,
    title: 'google',
    link: 'https://accounts.google.com/o/oauth2/v2/auth?client_id=877767008504-iq3dn2jdum3dhilejajhhotek0rdelts.apps.googleusercontent.com&redirect_uri=http://localhost:8080/login/oauth2/code/google&response_type=code&scope=email profile',
  },
  { id: 3, img: github, title: 'github', link: '' },
];
