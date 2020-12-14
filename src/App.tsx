import "./scss/main.scss";
import Slider from "@material-ui/core/Slider";
import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { primaryColor } from "./colors";

const App = () => {
  const currencyFormat = (num: number) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  };

  const calculateReturn = () => {
    let output_total =
      seedCapital * Math.pow(1 + yearlyReturn / 100, investmentDuration);
    let months = [];

    for (var i = 1; i <= investmentDuration * 12; i++) {
      months.push(i);
    }

    months.forEach((month) => {
      output_total +=
        monthlyPayment *
        Math.pow(1 + yearlyReturn / 100, (months.length - month) / 12);
    });

    return (
      output_total.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " €"
    );
  };

  const [seedCapital, setSeedCapital] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [yearlyReturn, setYearlyReturn] = useState<number>(0);
  const [investmentDuration, setInvestmentDuration] = useState<number>(0);

  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        main: primaryColor,
        light: primaryColor,
        dark: primaryColor,
      },
    },
  });

  return (
    <>
      <div className="App">
        <header className="App-header">
          <p>Calculate your investment return!</p>
        </header>
        <div className="MainDiv">
          <div className="SliderWrapper">
            <div className="Slider">
              <ThemeProvider theme={muiTheme}>
                <Slider
                  defaultValue={0}
                  getAriaValueText={currencyFormat}
                  step={500}
                  min={0}
                  max={50000}
                  valueLabelDisplay="on"
                  valueLabelFormat={currencyFormat}
                  onChangeCommitted={(
                    event: any,
                    newValue: number | number[]
                  ) => {
                    if (typeof newValue === "number") {
                      setSeedCapital(newValue);
                    }
                  }}
                />
              </ThemeProvider>
            </div>
            <p className="SliderLabel">Seed capital (in €)</p>
          </div>
          <div className="SliderWrapper">
            <div className="Slider">
              <ThemeProvider theme={muiTheme}>
                <Slider
                  defaultValue={0}
                  getAriaValueText={currencyFormat}
                  step={25}
                  min={0}
                  max={1000}
                  valueLabelDisplay="on"
                  valueLabelFormat={currencyFormat}
                  onChangeCommitted={(
                    event: any,
                    newValue: number | number[]
                  ) => {
                    if (typeof newValue === "number") {
                      setMonthlyPayment(newValue);
                    }
                  }}
                />
              </ThemeProvider>
            </div>
            <p className="SliderLabel">Monthly Payment (in €)</p>
          </div>
          <div className="SliderWrapper">
            <div className="Slider">
              <ThemeProvider theme={muiTheme}>
                <Slider
                  defaultValue={0}
                  getAriaValueText={(num: number) => {
                    return num.toString() + " %";
                  }}
                  step={1}
                  min={0}
                  max={100}
                  valueLabelDisplay="on"
                  valueLabelFormat={(num: number) => {
                    return num.toString() + "%";
                  }}
                  onChangeCommitted={(
                    event: any,
                    newValue: number | number[]
                  ) => {
                    if (typeof newValue === "number") {
                      setYearlyReturn(newValue);
                    }
                  }}
                />
              </ThemeProvider>
            </div>
            <p className="SliderLabel">Yearly return</p>
          </div>
          <div className="SliderWrapper">
            <div className="Slider">
              <ThemeProvider theme={muiTheme}>
                <Slider
                  defaultValue={0}
                  step={1}
                  min={0}
                  max={60}
                  valueLabelDisplay="on"
                  onChangeCommitted={(
                    event: any,
                    newValue: number | number[]
                  ) => {
                    if (typeof newValue === "number") {
                      setInvestmentDuration(newValue);
                    }
                  }}
                />
              </ThemeProvider>
            </div>
            <p className="SliderLabel">Investment duration (in years)</p>
          </div>
          <div className="Output">
            <p className="OutputLabel">Seed capital:</p>
            <p className="OutputValue">
              {seedCapital.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
                " €"}
            </p>
            <p className="OutputLabel">Total monthly payments:</p>
            <p className="OutputValue">
              {(monthlyPayment * investmentDuration * 12)
                .toFixed()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " €"}
            </p>
            <p className="OutputLabel">
              Total after {investmentDuration} years:
            </p>
            <p className="OutputValue" style={{ marginBottom: 0 }}>
              {calculateReturn()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
