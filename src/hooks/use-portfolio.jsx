import { createContext, useContext } from 'react';
import DataObjectIcon from '@mui/icons-material/DataObject';
import PaletteIcon from '@mui/icons-material/Palette';
import BoltIcon from '@mui/icons-material/Bolt';
import HubIcon from '@mui/icons-material/Hub';
import GitHubIcon from '@mui/icons-material/GitHub';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';

export const PortfolioContext = createContext(null);

const ICON_MAP = {
  'orange-diamond': <DataObjectIcon />,
  'palette': <PaletteIcon />,
  'zap': <BoltIcon />,
  'atom': <HubIcon />,
  'github': <GitHubIcon />,
  'figma': <DesignServicesIcon />,
  'sparkles': <AutoAwesomeIcon />,
  'flow': <AccountTreeIcon />,
  'storage': <StorageIcon />,
  'cloud': <CloudIcon />,
};

export const CATEGORY_COLORS = {
  Web: '#F4845F',
  Framework: '#7AB5E8',
  'Planning & UX': '#E8A23E',
  Design: '#A855C8',
  'Backend & Data': '#4BAE76',
  Tools: '#888888',
  'AI Workflow': '#2CA6A4',
};

export function getSkillIcon(iconName) {
  return ICON_MAP[iconName] || <DataObjectIcon />;
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}
