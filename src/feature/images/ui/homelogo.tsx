'use client';

import { SvgIcon } from '@mui/material';
import Home from '@public/assets/icons/header/mobile_logo.svg';

const HomeLogo = () => {
  return (
    <SvgIcon
      component={Home}
      inheritViewBox
      sx={{ width: 'auto', height: '40px' }}
    />
  );
};
export default HomeLogo;
