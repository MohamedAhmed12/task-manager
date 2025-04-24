import {Header} from "./components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-3">
      <Header />
      <main className="mt-15">{children}</main>
    </div>
  );
}
