import React from 'react';

export const CustomSelectContext = React.createContext({ indicator: null });
export const PopoverContext = React.createContext();
export const PortalContext = React.createContext({
  getContainer: () => document.body,
});
