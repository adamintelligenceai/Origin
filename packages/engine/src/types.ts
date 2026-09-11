export type Txn = {
  txnId: string;
  invoiceDate: string;
  customerId: string;
  customerName: string;
  sku: string;
  skuName: string;
  productGroup: string;
  qty: number;
  listPrice: number;
  invoicePrice: number;
  netSales: number;
  erpCost: number;
  landedCost: number;
  freightCost: number;
  freightCharged: number;
  isCredit: boolean;
};

export type Agreement = {
  agreementId: string;
  customerId: string;
  sku?: string;
  productGroup?: string;
  validFrom: string;
  validTo: string;
  price: number;
};

export type RebateProgram = {
  programId: string;
  supplierId: string;
  supplierName: string;
  rebateType: 'FLAT' | 'RETROSPECTIVE_TIER' | 'INCREMENTAL_TIER';
  rate: number;
  eligiblePurchases: number;
  claimed: number;
  claimWindowOpen: boolean;
};

export type PolicySet = {
  freightRecoverable: boolean;
  minOrderValue?: number;
  minOrderSurcharge?: number;
  restockingFeePct?: number;
  marginFloor?: number;
  allowBackBilling: boolean;
};

export type EngineInput = {
  transactions: Txn[];
  agreements: Agreement[];
  rebates: RebateProgram[];
  policies: PolicySet;
  periodStart: string;
  periodEnd: string;
  salesTieOutConfirmed: boolean;
  materialityAud?: number;
};
