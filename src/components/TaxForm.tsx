import React from "react";

interface TaxFormProps {
  inputs: {
    annualGrossSalary: number;
    annualBasic: number;
    annualHousing: number;
    annualTransport: number;
    annualBonuses: number;
    annualRent: number;
    annualLifeInsurance: number;
    otherReliefs: number;
  };
  setInputs: React.Dispatch<React.SetStateAction<any>>;
}

const TaxForm: React.FC<TaxFormProps> = ({ inputs, setInputs }) => {
  const formatValue = (val: number) => {
    if (val === 0) return "";
    return new Intl.NumberFormat("en-US").format(val);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Remove commas before parsing
    const numericValue = parseFloat(value.replace(/,/g, "")) || 0;
    setInputs((prev: any) => ({
      ...prev,
      [name]: numericValue,
    }));
  };

  return (
    <div className="tax-form">
      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>
        Income & Relief Details
      </h2>

      <div className="form-group">
        <label>Total Annual Gross Salary (Base)</label>
        <input
          type="text"
          name="annualGrossSalary"
          value={formatValue(inputs.annualGrossSalary)}
          onChange={handleChange}
          placeholder="e.g. 5,000,000"
        />
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div className="form-group">
          <label>Basic (Annual)</label>
          <input
            type="text"
            name="annualBasic"
            value={formatValue(inputs.annualBasic)}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Housing (Annual)</label>
          <input
            type="text"
            name="annualHousing"
            value={formatValue(inputs.annualHousing)}
            onChange={handleChange}
          />
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div className="form-group">
          <label>Transport (Annual)</label>
          <input
            type="text"
            name="annualTransport"
            value={formatValue(inputs.annualTransport)}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Bonuses/Others (Annual)</label>
          <input
            type="text"
            name="annualBonuses"
            value={formatValue(inputs.annualBonuses)}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="divider" />

      <h2 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>
        Relief Information
      </h2>

      <div className="form-group">
        <label>Rent per Annum</label>
        <input
          type="text"
          name="annualRent"
          value={formatValue(inputs.annualRent)}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Life Insurance Premium (Annual)</label>
        <input
          type="text"
          name="annualLifeInsurance"
          value={formatValue(inputs.annualLifeInsurance)}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Other Allowed Reliefs (NHF, NHIS, etc)</label>
        <input
          type="text"
          name="otherReliefs"
          value={formatValue(inputs.otherReliefs)}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default TaxForm;
