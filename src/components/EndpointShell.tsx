import React from 'react';

interface EndpointShellProps {
  children: React.ReactNode;
}

export const EndpointShell: React.FC<EndpointShellProps> = ({ children }) => (
  <div className="endpoint-shell bg-[#F1EFE9] pb-16">
    {children}
  </div>
);

