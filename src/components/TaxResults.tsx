import React from "react";
import type { TaxResults } from "../utils/taxCalculator";

interface TaxResultsProps {
  results: TaxResults;
}

const TaxResultsDisplay: React.FC<TaxResultsProps> = ({ results }) => {
  const formatCurr = (val: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(val);

  return (
    <div className="results-panel">
      <div className="stat-card">
        <div className="stat-label">Estimated Annual Tax</div>
        <div className="stat-value highlight">
          {formatCurr(results.totalTax)}
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div className="stat-card">
          <div className="stat-label">Monthly Tax</div>
          <div className="stat-value" style={{ fontSize: "1.25rem" }}>
            {formatCurr(results.monthlyTax)}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Monthly Take-Home</div>
          <div className="stat-value success" style={{ fontSize: "1.25rem" }}>
            {formatCurr(results.monthlyNet)}
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Total Reliefs & Deductions</div>
        <div className="stat-value" style={{ fontSize: "1.1rem" }}>
          {formatCurr(results.totalReliefs)}
        </div>
        <div className="divider" />

        <div className="relief-item">
          <span className="relief-label">Rent Relief (20%)</span>
          <span>{formatCurr(results.reliefBreakdown.rent)}</span>
        </div>
        <div className="relief-item">
          <span className="relief-label">Pension (8% BHT)</span>
          <span>{formatCurr(results.reliefBreakdown.pension)}</span>
        </div>
        <div className="relief-item">
          <span className="relief-label">Life Insurance</span>
          <span>{formatCurr(results.reliefBreakdown.lifeInsurance)}</span>
        </div>
        {results.reliefBreakdown.others > 0 && (
          <div className="relief-item">
            <span className="relief-label">Other Reliefs</span>
            <span>{formatCurr(results.reliefBreakdown.others)}</span>
          </div>
        )}
      </div>

      <div className="stat-card">
        <div className="stat-label">Tax Bracket Breakdown</div>
        <div className="divider" />
        {results.bracketBreakdown.map((b, i) => (
          <div key={i} className="bracket-row">
            <span>
              {b.bracket} (@ {b.rate}%)
            </span>
            <span style={{ fontWeight: "600" }}>{formatCurr(b.tax)}</span>
          </div>
        ))}
        {results.bracketBreakdown.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "var(--success)",
              fontSize: "0.875rem",
              padding: "1rem 0",
            }}
          >
            🎉 You are exempt from personal income tax!
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxResultsDisplay;
