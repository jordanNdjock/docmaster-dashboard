// assets
import {
  HeartFilled,
} from '@ant-design/icons';

// icons
const icons = {
  HeartFilled,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Gestion',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Abonnements',
      type: 'item',
      url: '/abonnements',
      icon: icons.HeartFilled
    },
  ]
};

export default utilities;
