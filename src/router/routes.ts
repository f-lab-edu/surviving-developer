import { Route } from './types.ts';

const route: Route[] = [
  {
    path: '/question/:id/:abc',
    name: 'question',
    title: '질문에 답을 해보시오! 🐳',
  },
  {
    path: '/manage/:filter',
    name: 'manage',
    title: '질문을 관리 해보시오! 💅',
  },
  {
    path: '/*',
    name: 'notFound',
    title: '페이지를 찾을 수 없습니다!',
  },
];

export default route;
