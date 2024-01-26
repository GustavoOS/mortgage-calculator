import { CalculatePaymentRequest, MortgageType } from "@/service/port/in"
import { ChangeEvent, useState } from "react"

type ParamsChanger = (param: CalculatePaymentRequest) => void;

interface MortgageFormProps {
  submitMortgageParams: ParamsChanger;
}

class Request implements CalculatePaymentRequest {
  constructor(
    readonly grossPay: number,
    readonly hasFGTS: boolean,
    readonly extraExpenses: number,
    readonly mortgageType: MortgageType,
    readonly annualPayments: number,
    readonly monthlyPayments: number,
    readonly value: number,
    readonly annualInterestRate: number,
    readonly numberOfMonths: number,
    readonly initialFunds: number,
    readonly downPayment: number
  ) { }
}

export const MortgageForm: React.FC<MortgageFormProps> = ({ submitMortgageParams }) => {
  const defaultState = {
    admFee: 25,
    hasFGTS: false,
    insurance: 60.78,
    downPayment: 0,
    minDownPayment: 0,
    mortgageType: MortgageType.PRICE,
    monthlyPayments: 0,
    annualPayments: 0,
    numberOfMonths: 1,
    interest: 9.6239,
    assetValue: 0,
    grossPay: 0,
    initialFunds: 0
  }
  const [formData, setFormData] = useState(defaultState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target
    const checked = (e.target as HTMLInputElement).checked

    const newForm = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    }
    if (name === 'assetValue')
      newForm.minDownPayment = newForm.assetValue / 5
    setFormData(newForm);
  }

  const submitMortgage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitMortgageParams(new Request(
      formData.grossPay,
      formData.hasFGTS,
      formData.insurance + formData.admFee,
      formData.mortgageType,
      formData.annualPayments,
      formData.monthlyPayments,
      formData.assetValue,
      formData.interest,
      formData.numberOfMonths,
      formData.initialFunds,
      formData.downPayment))
  }


  return (
    <>
      <form onSubmit={submitMortgage}>
        <fieldset>
          <legend>Sobre o bem</legend>
          <div className="row">
            <div className="col">
              <label htmlFor="assetValue" className="form-label">Valor do bem</label>
              <input type="number" className="form-control" id="assetValue" min="0" step="0.01"
                onChange={handleChange}
                name="assetValue"
                value={formData.assetValue}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="downPayment" className="form-label">Valor de entrada</label>
              <input type="number" min={formData.minDownPayment} step="0.01" className="form-control"
                id="downPayment" aria-describedby="minDownPayment" name="downPayment" onChange={handleChange}
                value={formData.downPayment}
                required
              />
              <div id="minDownPayment" className="form-text">
                Entrada deve ser de pelo menos 20% do valor do bem.
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Sobre quem está financiando</legend>
          <div className="row">
            <div className="col">
              <label htmlFor="grossPay" className="form-label">Renda Bruta</label>
              <input type="number" className="form-control" id="grossPay" min="0" step="0.01"
                aria-describedby="maxInstallment" name="grossPay" onChange={handleChange}
                value={formData.grossPay} required
              />
              <div id="maxInstallment" className="form-text">
                Parcela não pode comprometer mais que 30% da renda bruta.
              </div>
            </div>
            <div className="col">
              <fieldset>
                <div className="row">
                  <div className="col-md-2">
                    <legend>FGTS</legend>
                  </div>
                  <div className="col">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="hasFGTS"
                        onChange={handleChange} checked={formData.hasFGTS} name="hasFGTS" />
                      <label className="form-check-label" htmlFor="hasFGTS">
                        Recebe FGTS
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col offset-md-2">
                    <label htmlFor="fgtsFunds" className="form-label">Saldo FGTS atual</label>
                    <input type="number" className="form-control" id="fgtsFunds" min="0" step="0.01"
                      disabled={!formData.hasFGTS} onChange={handleChange} name="initialFunds"
                      value={formData.initialFunds}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Sobre o financiamento</legend>
          <div className="row">
            <div className="col">
              <label htmlFor="mortgageTable" className="form-label">Selecione o sistema de amortização</label>
              <select className="form-select" aria-label="Selecione o sitema de amortização"
                id="mortgageTable" value={formData.mortgageType} onChange={handleChange} name="mortgageTable">
                <option value={MortgageType.PRICE}>PRICE - Parcela fixa</option>
                <option value={MortgageType.SAC}>SAC - Parcela diminui ao longo do tempo</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="interest" className="form-label">Juros nominais (%)</label>
              <input type="number" className="form-control" id="interest" min="0" step="any" name="interest"
                value={formData.interest} onChange={handleChange} required />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <label htmlFor="numberOfMonths" className="form-label">Prazo (em meses)</label>
              <input type="number" className="form-control" id="numberOfMonths" min="0" step="1"
                name="numberOfMonths" value={formData.numberOfMonths} onChange={handleChange}
                max="420" required
              />
            </div>
            <div className="col">
              <label htmlFor="insurance" className="form-label">Seguro</label>
              <input type="number" className="form-control" id="insurance" min="0" step="0.01"
                value={formData.insurance}
                onChange={handleChange}
                name="insurance"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="insurance" className="form-label">Taxa de Admnistração</label>
              <input type="number" className="form-control" id="insurance" min="0" step="0.01"
                value={formData.admFee}
                onChange={handleChange}
                name="admFee"
                required
              />
            </div>
          </div>
        </fieldset>
        <br />
        <fieldset>
          <legend>Sobre o pagamento</legend>
          <div className="row">
            <div className="col">
              <label htmlFor="monthlyAmortization" className="form-label">Pagamento adicional mensal</label>
              <input type="number" className="form-control" id="monthlyAmortization" min="0" step="0.01"
                value={formData.monthlyPayments} onChange={handleChange} name="monthlyPayments"
                required
              />
            </div>
            <div className="col">
              <label htmlFor="annualAmortization" className="form-label">Pagamento adicional anual</label>
              <input type="number" className="form-control" id="annualAmortization" min="0" step="0.01"
                value={formData.annualPayments} name="annualPayments" onChange={handleChange}
                required
              />
              <div id="annualAmortizationExplained" className="form-text">
                Uma vez ao ano, se soma o valor mensal ao anual
              </div>
            </div>
          </div>
        </fieldset>
        <br />
        <button type="submit" className="btn btn-primary">Calcular</button>
      </form>
      <br />
    </>
  )
}
