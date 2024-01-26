export const MortgageForm = () => {
  return (
    <form>
      <fieldset>
        <legend>Sobre o bem</legend>
        <div className="row">
          <div className="col">
            <label htmlFor="assetValue" className="form-label">Valor do bem</label>
            <input type="number" className="form-control" id="assetValue" min="0" step="0.01" />
          </div>
          <div className="col">
            <label htmlFor="downPayment" className="form-label">Valor de entrada</label>
            <input type="number" min="0" step="0.01" className="form-control"
              id="downPayment" aria-describedby="minDownPayment" />
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
              aria-describedby="maxInstallment" />
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
                    <input className="form-check-input" type="checkbox" id="hasFGTS" />
                    <label className="form-check-label" htmlFor="hasFGTS">
                      Recebe FGTS
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col offset-md-2">
                  <label htmlFor="fgtsFunds" className="form-label">Saldo FGTS atual</label>
                  <input type="number" className="form-control" id="fgtsFunds" min="0" step="0.01" />
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
              id="mortgageTable">
              <option selected>PRICE - Parcela fixa</option>
              <option value="1">SAC - Parcela diminui ao longo do tempo</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="interest" className="form-label">Juros nominais (%)</label>
            <input type="number" className="form-control" id="interest" min="0" step="any" />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col">
            <label htmlFor="numberOfMonths" className="form-label">Prazo (em meses)</label>
            <input type="number" className="form-control" id="numberOfMonths" min="0" step="1" />
          </div>
          <div className="col">
            <label htmlFor="insurance" className="form-label">Seguro</label>
            <input type="number" className="form-control" id="insurance" min="0" step="0.01" />
          </div>
          <div className="col">
            <label htmlFor="insurance" className="form-label">Taxa de Admnistração</label>
            <input type="number" className="form-control" id="insurance" min="0" step="0.01" value={25}/>
          </div>
        </div>
      </fieldset>
      <br />
      <fieldset>
        <legend>Sobre o pagamento</legend>
        <div className="row">
          <div className="col">
            <label htmlFor="monthlyAmortization" className="form-label">Pagamento adicional mensal</label>
            <input type="number" className="form-control" id="monthlyAmortization" min="0" step="0.01" />
          </div>
          <div className="col">
            <label htmlFor="annualAmortization" className="form-label">Pagamento adicional anual</label>
            <input type="number" className="form-control" id="annualAmortization" min="0" step="0.01" />
            <div id="annualAmortizationExplained" className="form-text">
              Uma vez ao ano, se soma o valor mensal ao anual
            </div>
          </div>
        </div>
      </fieldset>
      <br />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}
