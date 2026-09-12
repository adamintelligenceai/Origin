import type { ReactNode } from "react";
import { SiteNav } from "./nav";
import "./styles.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
