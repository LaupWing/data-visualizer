import { Navbar } from "./_components/navbar";
import { PasswordGate } from "./_components/password-gate";
import { checkAuth } from "./lib/auth";

export default async function AntiqueWarehouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    return <PasswordGate />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Antique Warehouse
              <span className="text-[#C41E3A] ml-2">Data Explorer</span>
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              antiquewarehouse.nl — Custom PHP → WordPress
            </p>
          </div>
        </div>
      </header>
      <Navbar />
      <main className="max-w-[1400px] mx-auto px-6 py-8">{children}</main>
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <p className="text-xs text-slate-400 text-center">
            Migration dashboard for antiquewarehouse.nl — Data-driven overview
            of PHP → WordPress transition
          </p>
        </div>
      </footer>
    </div>
  );
}
