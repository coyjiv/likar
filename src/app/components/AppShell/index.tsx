import React from 'react'
import { AppShell } from '@mantine/core';
import { NavbarSimpleColored } from '../Navbar';

const withApplicationShell = (WrappedComponent:any) => {
  const WithApplicationShell = (props:any) => {
    return (
      <AppShell
        padding="md"
        navbar={<NavbarSimpleColored />}
        header={<></>}
      >
        <WrappedComponent {...props} />
      </AppShell>
    )
  }

  WithApplicationShell.displayName = `WithApplicationShell(${getDisplayName(WrappedComponent)})`;

  return WithApplicationShell;
}

function getDisplayName(WrappedComponent: { displayName: any; name: any; }) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withApplicationShell;
