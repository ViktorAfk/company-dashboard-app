import React, { ReactNode } from 'react';

type AuthButtonProps = {
  label: string;
  icon: ReactNode;
};
export const LogoutButton: React.FC<AuthButtonProps> = ({
  label,
  icon: Icon,
}) => {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-1 transition-transform hover:scale-110 active:translate-y-1"
    >
      <div className="w-9 h-9 bg-primary-foreground rounded-full flex justify-center items-center">
        {Icon}
      </div>
      <span className="text-center text-white text-base">{label}</span>
    </button>
  );
};
