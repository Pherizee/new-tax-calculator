export interface TaxInputs {
  annualGrossSalary: number;
  annualBasic: number;
  annualHousing: number;
  annualTransport: number;
  annualBonuses: number;
  annualRent: number;
  annualLifeInsurance: number;
  otherReliefs: number;
}

export interface TaxResults {
  grossIncome: number;
  totalReliefs: number;
  taxableIncome: number;
  totalTax: number;
  netIncome: number;
  monthlyTax: number;
  monthlyNet: number;
  reliefBreakdown: {
    rent: number;
    pension: number;
    lifeInsurance: number;
    others: number;
  };
  bracketBreakdown: {
    bracket: string;
    rate: number;
    tax: number;
  }[];
}

export const calculateTax = (inputs: TaxInputs): TaxResults => {
  const {
    annualGrossSalary,
    annualBasic,
    annualHousing,
    annualTransport,
    annualBonuses,
    annualRent,
    annualLifeInsurance,
    otherReliefs,
  } = inputs;

  const totalGrossIncome = annualGrossSalary + annualBonuses;

  if (totalGrossIncome <= 800000) {
    return {
      grossIncome: totalGrossIncome,
      totalReliefs: 0,
      taxableIncome: 0,
      totalTax: 0,
      netIncome: totalGrossIncome,
      monthlyTax: 0,
      monthlyNet: totalGrossIncome / 12,
      reliefBreakdown: { rent: 0, pension: 0, lifeInsurance: 0, others: 0 },
      bracketBreakdown: [],
    };
  }

  // Relief Calculations
  const rentRelief = Math.min(annualRent * 0.2, 500000);
  const pensionRelief = (annualBasic + annualHousing + annualTransport) * 0.08;
  const lifeInsuranceRelief = annualLifeInsurance;

  const totalReliefs =
    rentRelief + pensionRelief + lifeInsuranceRelief + otherReliefs;
  const taxableIncome = Math.max(0, totalGrossIncome - totalReliefs);

  // Progressive Brackets
  const brackets = [
    { limit: 800000, rate: 0, label: "First ₦800k" },
    { limit: 2200000, rate: 0.15, label: "Next ₦2.2m" }, // up to 3m
    { limit: 9000000, rate: 0.18, label: "Next ₦9m" }, // up to 12m
    { limit: 13000000, rate: 0.21, label: "Next ₦13m" }, // up to 25m
    { limit: 25000000, rate: 0.23, label: "Next ₦25m" }, // up to 50m
    { limit: Infinity, rate: 0.25, label: "Above ₦50m" },
  ];

  let remainingIncome = taxableIncome;
  let totalTax = 0;
  const bracketBreakdown = [];

  for (const b of brackets) {
    if (remainingIncome <= 0) break;
    const taxableAmountInBracket = Math.min(remainingIncome, b.limit);
    const taxInBracket = taxableAmountInBracket * b.rate;

    if (taxableAmountInBracket > 0) {
      totalTax += taxInBracket;
      bracketBreakdown.push({
        bracket: b.label,
        rate: b.rate * 100,
        tax: taxInBracket,
      });
    }

    remainingIncome -= taxableAmountInBracket;
  }

  const netIncome = totalGrossIncome - totalTax;

  return {
    grossIncome: totalGrossIncome,
    totalReliefs,
    taxableIncome,
    totalTax,
    netIncome,
    monthlyTax: totalTax / 12,
    monthlyNet: netIncome / 12,
    reliefBreakdown: {
      rent: rentRelief,
      pension: pensionRelief,
      lifeInsurance: lifeInsuranceRelief,
      others: otherReliefs,
    },
    bracketBreakdown,
  };
};
