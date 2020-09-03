import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLevelUpAlt,
  faMinusCircle,
  faPlus,
  faSmile,
  faEdit
} from '@fortawesome/free-solid-svg-icons';

library.add(faLevelUpAlt, faMinusCircle, faPlus, faSmile,faEdit);

const getIconProps = icon => {
  switch (icon) {
    case 'add':
      return {
        icon: 'plus',
      };
    case 'indent':
      return {
        icon: 'level-up-alt',
        rotation: 90,
      };
    case 'remove':
      return {
        icon: 'minus-circle',
      };
    case 'smile':
      return {
        icon: 'smile',
      };
      case 'edit':
      return {
        icon: 'edit',
      };
    default:
      return {};
  }
};

const Icon = ({ icon }) => {
  const iconProps = getIconProps(icon);

  return <FontAwesomeIcon {...iconProps} />;
};

export default Icon;
