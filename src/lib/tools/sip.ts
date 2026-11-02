export interface SIPYearlyBreakdown {
  year: number;
  investedAmount: number;
  futureValue: number;
  returns: number;
}

export interface SIPResult {
  investedAmount: number;
  futureValue: number;
  estReturns: number;
  monthlyInvestment: number;
  breakdown: SIPYearlyBreakdown[];
}

export function calculateSIP({
  monthlyInvestment,
  annualReturnRate,
  tenureYears,
  annualStepUpPercent = 0,
}: {
  monthlyInvestment: number;
  annualReturnRate: number;
  tenureYears: number;
  annualStepUpPercent?: number;
}): SIPResult {
  const p = Math.max(0, monthlyInvestment);
  const years = Math.max(1, Math.round(tenureYears));
  const rate = Math.max(0, annualReturnRate);
  const stepUp = Math.max(0, annualStepUpPercent);

  const i = rate / 12 / 100;
  const breakdown: SIPYearlyBreakdown[] = [];

  let currentMonthly = p;
  let totalInvested = 0;
  let accumulatedFV = 0;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      totalInvested += currentMonthly;
      if (i === 0) {
        accumulatedFV += currentMonthly;
      } else {
        // Payment at start of month
        accumulatedFV = (accumulatedFV + currentMonthly) * (1 + i);
      }
    }

    breakdown.push({
      year,
      investedAmount: Math.round(totalInvested),
      futureValue: Math.round(accumulatedFV),
      returns: Math.round(accumulatedFV - totalInvested),
    });

    if (stepUp > 0) {
      currentMonthly = currentMonthly * (1 + stepUp / 100);
    }
  }

  const finalInvested = Math.round(totalInvested);
  const finalFV = Math.round(accumulatedFV);

  return {
    investedAmount: finalInvested,
    futureValue: finalFV,
    estReturns: Math.round(finalFV - finalInvested),
    monthlyInvestment: p,
    breakdown,
  };
}

