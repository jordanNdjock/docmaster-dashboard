// assets
import {
  HeartFilled,
  FileTextFilled,
  CopyFilled,
  UserOutlined
} from '@ant-design/icons';

// icons
const icons = {
  HeartFilled,
  FileTextFilled,
  CopyFilled,
  UserOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Gestion',
  type: 'group',
  children: [
    {
      id: 'util-abonnements',
      title: 'Abonnements',
      type: 'item',
      url: '/abonnements',
      icon: icons.HeartFilled
    },
    {
      id: 'util-type-documents',
      title: 'Types de documents',
      type: 'item',
      url: '/type-documents',
      icon: icons.CopyFilled
    },
    {
      id: 'util-documents',
      title: 'Documents',
      type: 'item',
      url: '/documents',
      icon: icons.FileTextFilled
    },
    {
      id: 'util-users',
      title: 'Utilisateurs',
      type: 'item',
      url: '/users',
      icon: icons.UserOutlined
    },
  ]
};

export default utilities;
