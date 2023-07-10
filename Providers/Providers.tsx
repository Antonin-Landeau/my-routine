"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </div>
  );
};

export default Providers;
