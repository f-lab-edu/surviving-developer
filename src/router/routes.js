export default [
  {
    path: '/question/:id',
    name: 'question',
  },
  {
    path: '/manage/:filter',
    name: 'manage',
  },
  {
    path: '/*',
    name: 'notFound',
  },
];
