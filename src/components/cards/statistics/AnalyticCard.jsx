import PropTypes from 'prop-types';
import { Skeleton, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import { RiseOutlined, FallOutlined, HeartFilled, UserOutlined, ProfileOutlined, ArrowUpOutlined, ArrowDownOutlined, ArrowsAltOutlined, UserSwitchOutlined, CopyOutlined, MonitorOutlined } from '@ant-design/icons';

const iconSX = { fontSize: '1.25rem', color: '#faad14e6' };

const iconMap = {
  'Abonnements': <HeartFilled style={iconSX} />,
  'Retraits Réussies': <ArrowUpOutlined style={iconSX} />,
  'Paiements': <ArrowDownOutlined style={iconSX} />,
  'Utilisateurs Inscrits': <UserOutlined style={iconSX} />,
  'Documents Enregistrés': <ProfileOutlined style={iconSX} />,
  'Transactions Effectués': <ArrowsAltOutlined style={iconSX} />,
  'Abonnements Utilisateurs': <UserSwitchOutlined style={iconSX} />,
  'Types de Documents': <CopyOutlined style={iconSX} />,
  'Déclarations Enregistrés': <MonitorOutlined style={iconSX} />,
};

export default function AnalyticCard({ title, count }) {
  const Icon = iconMap[title] || <RiseOutlined style={iconSX} />;

  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={0.5}>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          {count === undefined || count === null ? (
            <Skeleton variant="text" width={60} height={30} />
          ) : (
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
          )}
        </Stack>
        {Icon}
      </Stack>
    </MainCard>
  );
}

AnalyticCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number
};
