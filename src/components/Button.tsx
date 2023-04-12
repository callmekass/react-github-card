import React from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'primary' | 'danger' | 'secondary';
  outline?: boolean;
  fontBold?: boolean;
  pill?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  outline,
  fontBold,
  pill,
  ...props
}) => {
  const classNames = `btn btn-${outline ? 'outline-' : ''}${variant}${
    fontBold ? ' btn-bold' : ''
  }${pill ? ' btn-pill' : ''}`;
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};
