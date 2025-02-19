'use client';

import clsx from 'clsx';
import React, { JSX } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  label?: string;
  icon?: JSX.Element;
}

const CardButton = ({ className = '', label, icon, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={clsx(
        'flex items-center gap-1 px-2 py-1 rounded-md',
        className
      )}
    >
      <span>{icon}</span>
      {label && <p className="text-xs flex-1 line-clamp-1">{label}</p>}
    </button>
  );
};

export default CardButton;
