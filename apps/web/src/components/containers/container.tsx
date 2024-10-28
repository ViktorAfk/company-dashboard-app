import { PropsWithChildren } from 'react';

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="p-5 h-full bg-card rounded-xl overflow-auto">
      {children}
    </section>
  );
};
