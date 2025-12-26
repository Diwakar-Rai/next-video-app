"use client";
import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "@imagekit/next";
const Providers = ({ children }: { children: React.ReactNode }) => {
  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <ImageKitProvider urlEndpoint={urlEndpoint}>{children}</ImageKitProvider>
    </SessionProvider>
  );
};

export default Providers;
