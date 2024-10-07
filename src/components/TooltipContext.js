import React, { createContext, useContext, useState, useCallback } from 'react';

const TooltipContext = createContext();

export const TooltipProvider = ({ children }) => {
  const [tooltip, setTooltip] = useState({
    text: '',
    position: { x: 0, y: 0 },
    visible: false,
  });

  const [selectedExoplanet, setSelectedExoplanet] = useState({});

  // Show the tooltip with specified text and position
  const showTooltip = useCallback((text, position) => {
    setTooltip({
      text,
      position,
      visible: true,
    });
  }, []);

  // Hide the tooltip
  const hideTooltip = useCallback(() => {
    setTooltip((tooltip) => ({ ...tooltip, visible: false }));
  }, []);

  return (
    <TooltipContext.Provider value={{ tooltip, showTooltip, hideTooltip, selectedExoplanet, setSelectedExoplanet }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => useContext(TooltipContext);
