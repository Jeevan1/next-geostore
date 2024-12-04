import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { ClientProviders } from "@/utils/ClientProviders";
import { ReactNode } from "react";

export const metadata = {
  title: {
    default: "GEOSTORE",
    template: "%s - GEOSTORE",
  },
  description:
    "Geostore - Your one stop destination for all your fashion needs.",
  viewport: "width=device-width, initial-scale=1",
  icons: { icon: "/assets/img/favicon.ico" },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <ClientProviders>{children}</ClientProviders>
        </AuthContextProvider>
      </body>
    </html>
  );
}
