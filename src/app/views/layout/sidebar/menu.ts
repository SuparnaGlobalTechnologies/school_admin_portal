import { MenuItem } from './menu.model';
import { AuthGuard } from 'src/app/core/guard/auth.guard';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  // {
  //   label: 'Order-Management',
  //   isTitle: true
  // },
  //  {
  //   label: 'Orders',
  //   icon: 'message-square',
  //   link: '/order-management/orders',
  // },
  // {
  //   label: 'Payments',
  //   icon: 'calendar',
  //   link: '/order-management/payments',
  //   badge: {
  //     variant: 'primary',
  //     text: 'New',
  //   }
  // },


  // {
  //   label: 'Catalog',
  //   isTitle: true
  // },
  //  {
  //   label: 'Categories',
  //   icon: 'message-square',
  //   link: '/catalog/categories',
  // },
  // {
  //   label: 'Products',
  //   icon: 'calendar',
  //   link: '/catalog/products',
  // },
  // {
  //   label: 'Offers',
  //   icon: 'calendar',
  //   link: '/catalog/offers',
  // },


  {
    label: 'User-Management',
    isTitle: true
  },
  {
    label: 'Employees',
    icon: 'calendar',
    link: '/user-management/employees',
  },
  {
    label: 'Roles',
    icon: 'calendar',
    link: '/user-management/roles',

  },

  {
    label: 'Student-Management',
    isTitle: true
  },
   {
    label: 'Students',
    icon: 'message-square',
    link: '/student-management/students',
  },
  {
    label: 'Grades',
    icon: 'calendar',
    link: '/student-management/grades',
  },


  {
    label: 'Quiz-Management',
    isTitle: true
  },
  {
    label: 'Quizes',
    icon: 'calendar',
    link: '/quiz-management/quizes',
  },

  {
    label: 'Account-Management',
    isTitle: true
  },
   {
    label: 'Branches',
    icon: 'message-square',
    link: '/account-management/branches',
  },
  // {
  //   label: 'Authentication',
  //   icon: 'unlock',
  //   subItems: [
  //     {
  //       label: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       label: 'Register',
  //       link: '/auth/register',
  //     },
  //   ]
  // },
  // {
  //   label: 'Error',
  //   icon: 'cloud-off',
  //   subItems: [
  //     {
  //       label: '404',
  //       link: '/error/404',
  //     },
  //     {
  //       label: '500',
  //       link: '/error/500',
  //     },
  //   ]
  // },
];
