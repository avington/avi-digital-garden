import React, { PropsWithChildren, ReactElement } from 'react';

interface ProviderCollectionProps {
  providers: ReactElement[];
}

export const ProviderCollection = ({ providers, children }: PropsWithChildren<ProviderCollectionProps>) => {
  return (
    <>
      {providers.reduceRight((acc, provider) => {
        return React.cloneElement(provider, { children: acc });
      }, children)}
    </>
  );
};

export default ProviderCollection;
