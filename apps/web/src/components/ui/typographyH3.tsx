import { PropsWithChildren } from 'react';

export const TypographyH3: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
};
