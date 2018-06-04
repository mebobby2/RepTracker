import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reps: 0, recording: false };
  }

  onPress = () => {
    this.setState({ recording: !this.state.recording });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.bigText}>{this.state.reps}</Text>
        <Button
          title={this.state.recording ? "Stop" : "Start"}
          style={styles.bottom}
          onPress={this.onPress}
        >
        </Button>
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
  bottom: {
    marginTop: "auto"
  }
});
