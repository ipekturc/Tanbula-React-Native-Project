import React, {Component} from 'react';
import { StyleSheet, View, NetInfo, Alert } from 'react-native';
import Main from './src/components/Main';

export default class App extends Component {
  constructor(props) {
    super(props);
    NetInfo.isConnected.addEventListener('connectionChange', (res) => {
      if(res == false){
          Alert.alert("Please control your network connection");
      }
    })
}
  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <Main />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
