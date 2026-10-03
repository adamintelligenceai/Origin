import { STORE_CONFIG } from "./commerce-config.js";

function salesEmail(product) {
  const subject = encodeURIComponent(`Order request — ${product.name}`);
  const body = encodeURIComponent(
    `Hello Evidence Room,\n\nI would like to purchase ${product.name} (${product.price}). Please send the secure checkout link and licence details.\n\nName:\nOrganisation:\nCountry:\n`,
  );
  return `mailto:${STORE_CONFIG.supportEmail}?subject=${subject}&body=${body}`;
}

document.querySelectorAll("[data-checkout]").forEach((link) => {
  const product = STORE_CONFIG.products[link.dataset.checkout];
  if (!product) {
    link.hidden = true;
    return;
  }

  const hasCheckout = /^https:\/\/.+/.test(product.checkoutUrl);
  link.href = hasCheckout ? product.checkoutUrl : salesEmail(product);
  link.textContent = hasCheckout
    ? `Buy ${product.name} · ${product.price}`
    : `Order ${product.name} · ${product.price}`;

  if (hasCheckout) {
    link.rel = "noopener";
    link.target = "_blank";
  } else {
    link.dataset.checkoutFallback = "email";
    link.title =
      "Secure checkout is being connected. Email us to receive the order link.";
  }
});
