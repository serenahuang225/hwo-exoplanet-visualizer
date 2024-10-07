import React from 'react';
import { useTooltip } from './TooltipContext';

const Tooltip = () => {
  const { tooltip } = useTooltip();

  if (!tooltip.visible) return null;

  const { text, position } = tooltip;
  const style = {
    position: 'absolute',
    zIndex: 5,
    top: position.y,
    left: position.x,
    background: 'ffffff75',
    color: '#fff',
    padding: '5px',
    borderRadius: '4px',
    transform: 'translate(-50%, -100%)',
    pointerEvents: 'none',
  };

  return <div style={style}>{text}</div>;
};

export default Tooltip;