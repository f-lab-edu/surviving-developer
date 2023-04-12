export default [
  {
    path: '/question/:id',
    name: 'question',
  },
  {
    path: '/manage',
    name: 'manage',
  },
  {
    path: '/*',
    name: 'notFound',
  },
];
