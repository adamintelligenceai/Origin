import type { ReactNode } from "react";
import { SiteNav } from "./nav";
import "./styles.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#content">
          Skip to content
        </a>
        <SiteNav />
        <div id="content">{children}</div>
      </body>
    </html>
  );
}
