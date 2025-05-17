// assets
import {
  HeartOutlined,
  FileTextOutlined,
  CopyOutlined,
  UserOutlined,
  MonitorOutlined
} from '@ant-design/icons';

// icons
const icons = {
  HeartOutlined,
  FileTextOutlined,
  CopyOutlined,
  UserOutlined,
  MonitorOutlined
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
      icon: icons.HeartOutlined
    },
    {
      id: 'util-type-documents',
      title: 'Types de documents',
      type: 'item',
      url: '/type-documents',
      icon: icons.CopyOutlined
    },
    {
      id: 'util-documents',
      title: 'Documents',
      type: 'item',
      url: '/documents',
      icon: icons.FileTextOutlined
    },
    {
      id: 'util-declarations',
      title: 'Déclarations',
      type: 'item',
      url: '/declarations',
      icon: icons.MonitorOutlined
    },
    {
      id: 'util-users',
      title: 'Utilisateurs',
      type: 'item',
      url: '/utilisateurs',
      icon: icons.UserOutlined
    },
  ]
};

export default utilities;
