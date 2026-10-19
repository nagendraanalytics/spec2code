import type { Metadata } from "next";
import "./globals.css";
import { WorkspaceProvider } from "@/lib/workspace";
import Sidebar from "@/components/shell/Sidebar";
import Topbar from "@/components/shell/Topbar";

export const metadata: Metadata = {
  title: "Spec2Code",
  description: "Turn any clinical specification into reviewed, traceable code in the language your team needs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <WorkspaceProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <Topbar />
              <main className="min-w-0 flex-1 p-4 pt-14 md:p-6">{children}</main>
            </div>
          </div>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
