export interface GSTResult {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  rate: number;
  isInclusive: boolean;
  isInterState: boolean;
}

export function calculateGST({
  amount,
  rate,
  isInclusive = false,
  isInterState = false,
}: {
  amount: number;
  rate: number;
  isInclusive?: boolean;
  isInterState?: boolean;
}): GSTResult {
  const safeAmount = Math.max(0, amount);
  const safeRate = Math.max(0, rate);

  let baseAmount = 0;
  let gstAmount = 0;
  let totalAmount = 0;

  if (isInclusive) {
    // Gross amount includes GST
    baseAmount = (safeAmount * 100) / (100 + safeRate);
    gstAmount = safeAmount - baseAmount;
    totalAmount = safeAmount;
  } else {
    // Add GST to base amount
    baseAmount = safeAmount;
    gstAmount = (safeAmount * safeRate) / 100;
    totalAmount = baseAmount + gstAmount;
  }

  // Rounding standard 2 decimal places half-up
  const roundedBase = Math.round(baseAmount * 100) / 100;
  const roundedGST = Math.round(gstAmount * 100) / 100;
  const roundedTotal = Math.round(totalAmount * 100) / 100;

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (isInterState) {
    igst = roundedGST;
  } else {
    cgst = Math.round((roundedGST / 2) * 100) / 100;
    sgst = Math.round((roundedGST - cgst) * 100) / 100;
  }

  return {
    baseAmount: roundedBase,
    gstAmount: roundedGST,
    totalAmount: roundedTotal,
    cgst,
    sgst,
    igst,
    rate: safeRate,
    isInclusive,
    isInterState,
  };
}

