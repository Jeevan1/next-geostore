import Head from "next/head";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      {children}
    </>
  );
}
