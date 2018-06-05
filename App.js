import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Accelerometer } from "expo";

function round(n) {
  if (!n) return 0;
  return Math.floor(n * 100) / 100;
}

export default class App extends React.Component {
  state = { reps: 0, recording: false, accelerometerData: {} };

  onPress = () => {
    const newRecording = !this.state.recording;
    this.setState(
      {
        recording: newRecording,
        reps: newRecording ? 0 : this.state.reps
      },
      this.handleSubscription
    );
  };

  handleSubscription() {
    this._moving = false;
    if (this.state.recording) {
      Accelerometer.setUpdateInterval(1000);
      this._subscription = Accelerometer.addListener(accelerometerData => {
        this.setState({ accelerometerData }, this.analyseData);
      });
    } else {
      this._subscription && this._subscription.remove();
      this._subscription = null;
    }
  }

  analyseData() {
    const z = this.state.accelerometerData.z;
    if (Math.abs(z) > 0.2) {
      this._moving = true;
    }
    if (Math.abs(z) < 0.05 && this._moving === true) {
      this._moving = false;
      this.setState({ reps: this.state.reps + 1 });
    }
  }

  render() {
    let { x, y, z } = this.state.accelerometerData;

    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>{this.state.reps}</Text>
        <Button
          title={this.state.recording ? "Stop" : "Start"}
          onPress={this.onPress}
        />
        <Text style={styles.bold}>x</Text>
        <Text>{round(x)}</Text>
        <Text style={styles.bold}>y</Text>
        <Text>{round(y)}</Text>
        <Text style={styles.bold}>z</Text>
        <Text>{round(z)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  bigText: {
    color: "#000",
    fontSize: 350
  },
  bold: {
    fontWeight: "bold"
  }
});
