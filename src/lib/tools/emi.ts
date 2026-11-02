export interface AmortizationRow {
  month: number;
  openingBalance: number;
  emi: number;
  principal: number;
  interest: number;
  closingBalance: number;
}

export interface EMIResult {
  monthlyEMI: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  schedule: AmortizationRow[];
}

export function calculateEMI({
  principal,
  annualRate,
  tenureMonths,
}: {
  principal: number;
  annualRate: number;
  tenureMonths: number;
}): EMIResult {
  const p = Math.max(0, principal);
  const n = Math.max(1, Math.round(tenureMonths));
  const rate = Math.max(0, annualRate);

  if (p === 0) {
    return {
      monthlyEMI: 0,
      totalPayment: 0,
      totalInterest: 0,
      principal: 0,
      schedule: [],
    };
  }

  let monthlyEMI = 0;
  const r = rate / 12 / 100;

  if (r === 0) {
    monthlyEMI = p / n;
  } else {
    const pow = Math.pow(1 + r, n);
    monthlyEMI = (p * r * pow) / (pow - 1);
  }

  const roundedEMI = Math.round(monthlyEMI * 100) / 100;

  // Build full amortization table
  let balance = p;
  const schedule: AmortizationRow[] = [];
  let cumulativeInterest = 0;

  for (let month = 1; month <= n; month++) {
    const interest = r === 0 ? 0 : balance * r;
    let principalPaid = monthlyEMI - interest;

    // Handle last month balance adjustment
    if (month === n || balance - principalPaid <= 0.05) {
      principalPaid = balance;
    }

    const currentEMI = principalPaid + interest;
    const closingBalance = Math.max(0, balance - principalPaid);

    schedule.push({
      month,
      openingBalance: Math.round(balance * 100) / 100,
      emi: Math.round(currentEMI * 100) / 100,
      principal: Math.round(principalPaid * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      closingBalance: Math.round(closingBalance * 100) / 100,
    });

    cumulativeInterest += interest;
    balance = closingBalance;
  }

  const totalPayment = p + cumulativeInterest;

  return {
    monthlyEMI: roundedEMI,
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(cumulativeInterest),
    principal: p,
    schedule,
  };
}

