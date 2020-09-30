import Home from '@VIEWS/TEMPLATE/Home.vue';
import UserCentre from '@VIEWS/USERCENTRE/UserCentre.vue';
import Profile from '@VIEWS/USERCENTRE/Profile.vue';

const routerConfig = {
  base: '/',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'usercentre',
          path: '/usercentre',
          component: UserCentre,
          children: [
            {
              name: 'profile',
              path: 'profile',
              component: Profile,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ],
};

export { routerConfig };
