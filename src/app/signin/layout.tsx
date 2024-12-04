export const metadata = {
  title: {
    default: "Sign In",
    template: "%s - GEOSTORE",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
