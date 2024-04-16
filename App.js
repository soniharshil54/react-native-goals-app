import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {

  const [ goalInput, setGoalInput] = useState('')
  const [ goalList, setGoalList ] = useState([]);

  function handleGoalInputChange(input) {
    console.log('input', input)
    setGoalInput(input)
  }

  function handleGoalAdd() {
    setGoalList((previousGoalList) => [ ...previousGoalList, goalInput ])
    setGoalInput("")
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TextInput style={{width: 235}} value={goalInput} placeholder='enter goal' onChangeText={handleGoalInputChange}></TextInput>
        <Button title='add goal' onPress={handleGoalAdd}/>
      </View>
      <View style={styles.goalList}>
        {
          goalList.map((goal, i) => (
            <Text key={i}>{goal}</Text>
          ))
        }
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },

  title: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },

  goalList: {
    borderWidth: 1,
    borderColor: 'green',
    padding: 10,
    backgroundColor: '#fff',
  },

});
