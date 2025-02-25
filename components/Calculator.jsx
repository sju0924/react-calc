import * as React from "react";
import styled from "styled-components";

import Panel from "./Panel";
import Display from "./Display";
import ButtonGroup from "./ButtonGroup";
import Button from "./Button";

const Container = styled.div``;

const evalFunc = function(string) {
  // eslint-disable-next-line no-new-func
  return new Function("return (" + string + ")")();
};

class Calculator extends React.Component {
  state = {
    displayValue: "",
    hiddenValue: ""
  };

  onClickButton = key => {
    let { displayValue = "", hiddenValue = ""} = this.state;
    displayValue = "" + displayValue;
    hiddenValue = "" + hiddenValue;
   
    const lastChar = displayValue.substr(displayValue.length - 1);
    const operatorKeys = ["÷", "×", "-", "+"];
    const proc = {
      AC: () => {
        this.setState({ displayValue: "" ,hiddenValue: "" });
      },
      BS: () => {
        if (displayValue.length > 0) {
          displayValue = displayValue.substr(0, displayValue.length - 1);
          hiddenValue = hiddenValue.substr(0, hiddenValue.length - 1);
        }
        this.setState({ displayValue, hiddenValue });
      },
      "÷": () => {
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({ displayValue: displayValue + "÷" , hiddenValue :  hiddenValue + "/"});
        }

      },
      "×": () => {
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({ displayValue: displayValue + "×" , hiddenValue :  hiddenValue + "*" });
        }
      },
      "-": () => {
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({ displayValue: displayValue + "-",thiddenValue :  hiddenValue + "-" });
        }
      },
      "+": () => {
        if (lastChar !== "" && !operatorKeys.includes(lastChar)) {
          this.setState({ displayValue: displayValue + "+", hiddenValue :  hiddenValue + "+" });
        }
      },
      "=": () => {
        if (lastChar !== "" && operatorKeys.includes(lastChar)) {
          displayValue = displayValue.substr(0, displayValue.length - 1);
          hiddenValue = hiddenValue.substr(0, hiddenValue.length - 1);
        } else if (lastChar !== "") {
          displayValue = evalFunc(hiddenValue);
        }
        this.setState({ displayValue ,hiddenValue });
      },
      ".": () => {
        if (lastChar !== "" && operatorKeys.includes(lastChar)) {
          displayValue = displayValue.substr(0, displayValue.length - 1);
          hiddenValue = hiddenValue.substr(0, hiddenValue.length - 1);
        } else if (lastChar !== "") {
          displayValue = displayValue + "."; 
          hiddenValue =  hiddenValue + "." ;
        }
        this.setState({ displayValue ,hiddenValue });
      },
      "0": () => {
        if (Number(displayValue) !== 0) {
          displayValue += "0";
          hiddenValue += "0";
          this.setState({ displayValue , hiddenValue});
        }
      }
    };

    if (proc[key]) {
      proc[key]();
    } else {
      // 여긴 숫자
      this.setState({ displayValue: displayValue + key , hiddenValue: hiddenValue + key });
    }
  };

  render() {
    return (
      <Container>
        <Panel>
          <Display displayValue={this.state.displayValue} />
          <ButtonGroup onClickButton={this.onClickButton}>
            <Button size={2} color="gray">
              AC
            </Button>
            <Button size={1} color="gray">
              BS
            </Button>
            <Button size={1} color="gray">
              ÷
            </Button>

            <Button size={1}>7</Button>
            <Button size={1}>8</Button>
            <Button size={1}>9</Button>
            <Button size={1} color="gray">
              ×
            </Button>

            <Button size={1}>4</Button>
            <Button size={1}>5</Button>
            <Button size={1}>6</Button>
            <Button size={1} color="gray">
              -
            </Button>

            <Button size={1}>1</Button>
            <Button size={1}>2</Button>
            <Button size={1}>3</Button>
            <Button size={1} color="gray">
              +
            </Button>

            <Button size={2}>0</Button>
            <Button size={1}>.</Button>
            <Button size={1} color="gray">
              =
            </Button>
          </ButtonGroup>
        </Panel>
      </Container>
    );
  }
}

export default Calculator;
