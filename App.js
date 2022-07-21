import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import Icon from 'react-native-vector-icons/Ionicons';

const App = () => {
  const [laps, setLaps] = useState(0)
  const [start, setStart] = useState(false)
  const [reset, setReset] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [running, setRunning] = useState(false)

  const startStopwatch = () => {
    setReset(false)
    setRunning(true)
    setStart(true)
  }

  const stopStopwatch = () => {
    setReset(false)
    setStart(false)
  }

  const resetWarning = () => {
    if (reset) {
      return;
    }
    Alert.alert(
      "Done with your run?",
      "Resetting removes all progress.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Reset", onPress: () => resetStopwatch() }
      ],
      {
        cancelable: true,
      }
    );
  }
  const resetStopwatch = () => {
    setStart(false)
    setReset(true)
    setRunning(false)
    setStartTime(0)
    setLaps(0)
  }

  const addLap = () => {
    setLaps(laps + 1)
  }

  const minusLap = () => {
    if (laps > 0) {
      setLaps(laps - 1)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Stopwatch options={styles.stopwatch} start={start} msecs={true} reset={reset} startTime={startTime} />

        <Text style={styles.lapCount}>{laps}</Text>
        <Text style={styles.text}>Lap Number</Text>
      </View>
      <View style={styles.midContainer}>
        <TouchableOpacity style={styles.midButton} onPress={startStopwatch}>
          <Icon name="play" size={70} color={'white'} />
          {/* <Text style={styles.text}>Start Stopwatch</Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.midButton} onPress={stopStopwatch}>
          <Icon name="stop" size={70} color={'white'} />
          {/* <Text style={styles.text}>Stop Stopwatch</Text> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.midButton} onPress={resetWarning}>
          <Icon name="ios-refresh-circle" size={70} color={'white'} />
          {/* <Text style={styles.text}>Reset Stopwatch</Text> */}
        </TouchableOpacity>
      </View>
      {running ? <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={minusLap}>
          <Icon name="arrow-down-circle" size={150} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={addLap}>
          <Icon name="arrow-up-circle" size={150} color={'white'} />
        </TouchableOpacity>
      </View> : <View style={styles.bottomContainer} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'stretch'
  },

  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '5%',
    borderWidth: 0,
    borderColor: 'white'
  },

  midContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0,
    borderColor: 'white',
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },

  lapCount: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 200,
    borderColor: 'white',
    borderwidth: 0,
  },

  text: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 0,
    alignSelf: 'center'
  },

  stopwatch: {
    container: {
      backgroundColor: '#000',
      paddingTop: 20,
      borderRadius: 5,
      width: 220,
      alignSelf: 'center',
    },
    text: {
      fontSize: 30,
      color: '#FFF',
      marginLeft: 7,
      alignSelf: 'center',
      borderColor: 'white',
      borderwidth: 0,
    }
  },

  midButton: {
    margin: 10,
    padding: 5,
    borderColor: 'green',
    borderwidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
});

export default App;
