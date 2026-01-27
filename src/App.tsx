import { useState, useMemo } from "react";
import TaxForm from "./components/TaxForm";
import TaxResultsDisplay from "./components/TaxResults";
import { calculateTax } from "./utils/taxCalculator";
import type { TaxInputs } from "./utils/taxCalculator";

function App() {
  const [inputs, setInputs] = useState<TaxInputs>({
    annualGrossSalary: 0,
    annualBasic: 0,
    annualHousing: 0,
    annualTransport: 0,
    annualBonuses: 0,
    annualRent: 0,
    annualLifeInsurance: 0,
    otherReliefs: 0,
  });

  const results = useMemo(() => calculateTax(inputs), [inputs]);

  return (
    <div className="glass-card">
      <h1 className="title">Nigeria Tax Calculator</h1>
      <p
        style={{
          textAlign: "center",
          color: "var(--text-muted)",
          marginBottom: "2.5rem",
          marginTop: "-1.5rem",
        }}
      >
        Updated for the 2025 Tax Act
      </p>

      <div className="grid">
        <TaxForm inputs={inputs} setInputs={setInputs} />
        <TaxResultsDisplay results={results} />
      </div>

      <footer
        style={{
          marginTop: "3rem",
          textAlign: "center",
          fontSize: "0.75rem",
          color: "var(--text-muted)",
        }}
      >
        <p>
          Disclaimer: This is for estimation purposes only. Please consult a tax
          professional for accurate filing.
        </p>
      </footer>
    </div>
  );
}

export default App;
