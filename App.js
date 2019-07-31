/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
  Fragment,
  Component
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

class App extends Component {

  buttons = [
    // first row
    {
      type: "operation",
      value: "AC",
      action: this.onPressAllClear
    },
    {
      type: "operation",
      value: "C",
      action: this.onPressClear
    },
    {
      type: "operation",
      value: "%",
      action: this.onPressOperation
    },
    {
      type: "operation",
      value: "/",
      action: this.onPressOperation
    },

    // second row
    {
      type: "number",
      value: "7",
      action: this.onPressNumber
    },
    {
      type: "number",
      value: "8",
      action: this.onPressNumber
    },
    {
      type: "number",
      value: "9",
      action: this.onPressNumber
    },
    {
      type: "operation",
      value: "*",
      action: this.onPressOperation
    },

    // third row
    {
      type: "number",
      value: "4",
      action: this.onPressNumber
    },
    {
      type: "number",
      value: "5",
      action: this.onPressNumber
    },
    {
      type: "number",
      value: "6",
      action: this.onPressNumber
    },
    {
      type: "operation",
      value: "-",
      action: this.onPressOperation
    },

    // fourth row
    {
      type: "number",
      value: "1",
      action: this.onPressNumber
    },
    {
      type: "number",
      value: "2",
      action: this.onPressNumber
    },
    {
      type: "number",
      value: "3",
      action: this.onPressNumber
    },
    {
      type: "operation",
      value: "+",
      action: this.onPressOperation
    },

    // fifth row
    {
      type: "operation",
      value: "+/-",
      action: this.onPressRev
    },
    {
      type: "number",
      value: "0",
      action: this.onPressNumber
    },
    {
      type: "number",
      value: ".",
      action: this.onPressNumber
    },
    {
      type: "operation",
      value: "=",
      action: this.onPressEquals
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      cachedInput: "",
      inputText: "",
      resultText: "",
      currentOperation: "",
      changedOperation: false
    }

    this.doCalculation = this.doCalculation.bind(this);
    this.onPressNumber = this.onPressNumber.bind(this);
    this.onPressOperation = this.onPressOperation.bind(this);
  }

  onPressNumber(value) {
    var { inputText, changedOperation } = this.state;

    // validate input of decimal
    if (value == "." && inputText.indexOf(".") !== -1) {
      return;
    }

    if (changedOperation) {
      inputText = "";
      this.setState({
        changedOperation: false
      });
    }

    this.setState({
      inputText: inputText + value
    });
  }

  onPressAllClear()
  {
    this.setState({
      inputText: "",
      currentOperation: "",
      changedOperation: false,
      resultText: "",
      cachedInput: ""
    });
  }

  onPressClear()
  {
    var { inputText } = this.state;
    this.setState({
      inputText: inputText.slice(0, -1)
    });
  }

  onPressEquals()
  {
    this.doCalculation();
  }

  onPressRev()
  {
    var { inputText } = this.state;
    this.setState({
      inputText: eval(inputText + "* -1")
    })
  }

  onPressOperation(value) {
    var { inputText, currentOperation, changedOperation } = this.state;

    if (currentOperation == value) {
      this.doCalculation();
      return;
    }

    if (changedOperation) {
      this.setState({
        currentOperation: value,
      });
      return;
    }

    if (currentOperation != "" && currentOperation != value) {
      this.setState({
        currentOperation: value,
        changedOperation: true,
      });
      return;
    }

    this.setState({
      currentOperation: value,
      changedOperation: true,
      cachedInput: inputText
    });
  }

  doCalculation() {
    var { inputText, currentOperation, cachedInput } = this.state;

    if (currentOperation == "") {
      return;
    }

    var result = eval([cachedInput, currentOperation, inputText].join(""));

    this.setState({
      changedOperation: true,
      cachedInput: result,
      resultText: result
    });
  }

  render() {
    var { inputText, resultText } = this.state;

    var buttonsDisplay = this.buttons.map((b, index) => {
      var btnStyle = (b.value == this.state.currentOperation) ? { ...styles.button, ...styles.activeButtonOperation } : styles.button;

      if(b.value == this.state.currentOperation) {
        console.log(btnStyle);
      }

      return (<View key={index}>
        <TouchableOpacity style={btnStyle} onPress={b.action.bind(this, b.value)}>
          <Text style={styles.buttonText}>{b.value}</Text>
        </TouchableOpacity>
      </View>)
    });

    return (
      <Fragment>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>{inputText}</Text>
            </View>
            <View style={styles.resultContainer} >
              <Text style={styles.resultText}>{resultText}</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            {buttonsDisplay}
          </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: 'flex-end',
    alignItems: "center",
    backgroundColor: "#00060f"
  },
  inputText: {
    fontSize: 50,
    color: "#fff",
  },
  resultContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: 'flex-end',
    alignItems: "center",
    backgroundColor: "#00060f"
  },
  resultText: {
    fontSize: 30,
    color: "#cdcdcd"
  },
  buttonsContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    backgroundColor: "#00060f"
  },
  button: {
    backgroundColor: "#eee",
    padding: 5,
    margin: 15,
    height: 70,
    width: 70,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 400,
    backgroundColor: "#ccc",
  },
  buttonOperation: {
    backgroundColor: "#232323"
  },
  activeButtonOperation: {
    backgroundColor: "#fdc518"
  },
  buttonText: {
    fontSize: 28,
    fontWeight: "100",
    color: "#fff"
  }
});

export default App;