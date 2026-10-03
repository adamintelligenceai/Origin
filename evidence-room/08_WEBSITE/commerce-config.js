/*
 * Paste the Lemon Squeezy checkout URLs created from
 * ../07_LEMON_SQUEEZY/PRODUCT_LISTINGS.md before publishing.
 *
 * Empty URLs intentionally fall back to a pre-filled sales email. This avoids
 * shipping a dead or fabricated checkout while keeping every offer orderable.
 */
export const STORE_CONFIG = {
  supportEmail: "hello@evidenceroom.ai",
  products: {
    starter: {
      name: "AP Agent Starter",
      price: "$79",
      checkoutUrl: "",
    },
    professional: {
      name: "AP Agent OS Professional",
      price: "$199",
      checkoutUrl: "",
    },
    team: {
      name: "AP Agent OS Team",
      price: "$499",
      checkoutUrl: "",
    },
  },
};
