import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer/Footer";
import QuickCart from "@/components/QuickCart";
export const metadata = {
  title: "Home",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <QuickCart />
      <div className="min-h-[44vh]"> {children}</div>
      <Footer />
    </>
  );
}
