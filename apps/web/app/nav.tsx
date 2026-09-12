import Link from "next/link";

const PRODUCT_NAME = "Project Chief";

export function SiteNav() {
  return (
    <nav>
      <Link href="/">{PRODUCT_NAME}</Link>
      <div className="nav-links">
        <Link href="/product">Product</Link>
        <Link href="/trust">Trust</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/docs">Docs</Link>
        <Link href="/download">Download</Link>
        <Link href="/waitlist">Join</Link>
      </div>
    </nav>
  );
}
