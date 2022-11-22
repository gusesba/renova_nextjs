import Link from 'next/link';
import React from 'react';

export interface IHeader extends React.ComponentPropsWithoutRef<'header'> {}

const Header: React.FC<IHeader> = ({ className, ...headerProps }) => {
  return (
    <header
      {...headerProps}
      className={`w-full flex flex-row justify-between ${className}`}
    >
      <div className="space-x-5 m-5">
        <Link className="hover:underline" href="/">
          Home
        </Link>
        <Link className="hover:underline" href="/">
          Store
        </Link>
      </div>
      <div className="space-x-5 m-5">
        <Link href="/" className="hover:underline hidden sm:inline">
          Gmail
        </Link>
        <Link href="/" className="hover:underline hidden sm:inline">
          Images
        </Link>
      </div>
    </header>
  );
};

export default Header;
