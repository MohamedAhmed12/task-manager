import React from "react";
import {ReactNode} from "react";

const AuthLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex justify-center items-center p-4">
        {children}
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-[url('/auth-bg.jpg')] "></div>
    </div>
  );
};

export default AuthLayout;
