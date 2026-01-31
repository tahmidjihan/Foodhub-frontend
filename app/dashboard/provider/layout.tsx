import React from 'react';
import ProviderValidate from './providerValidate';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProviderValidate />
      {children}
    </>
  );
}

export default Layout;
