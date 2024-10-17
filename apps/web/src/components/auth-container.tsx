import { PropsWithChildren } from 'react';
import { Toaster } from './ui/toaster';
type Props = {
  title: string;
};
export const AuthContainer: React.FC<PropsWithChildren<Props>> = ({
  children,
  title,
}) => {
  return (
    <section className="h-dvh  flex flex-col justify-center items-center px-4">
      <div className="max-w-screen-sm">
        <h2 className="mb-4 text-primary text-5xl">{title}</h2>
        {children}
        <Toaster />
      </div>
    </section>
  );
};
