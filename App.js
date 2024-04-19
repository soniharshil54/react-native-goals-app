import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {

  const [ goalFormData, setGoalFormData] = useState({
    goalName: ''
  })
  const [ goalList, setGoalList ] = useState([]);

  function handleGoalInputChange(inputName, inputValue) {
    setGoalFormData({
      ...goalFormData,
      [inputName]: inputValue
    })
  }

  function handleGoalAdd() {
    setGoalList((previousGoalList) => [ ...previousGoalList, {
      ...goalFormData,
      id: new Date().getTime().toString()
    } ])
    setGoalFormData({
      goalName: ''
    })
  }

  function handleGoalDelete(id) {
    setGoalList((previousGoalList) => previousGoalList.filter((goal) => goal.id !== id))
  }

  function handleGoalView(id) {
    setGoalFormData(goalList.find((goal) => goal.id === id));
  }

  function handleGoalUpdate(id) {
    setGoalList((goalList) => {
      return goalList.map((goal) => {
        if (goal.id === id) {
          return goalFormData
        }
        return goal
      })
    })
    setGoalFormData({
      goalName: ''
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TextInput style={{width: 235}} value={goalFormData.goalName} placeholder='enter goal' onChangeText={(text) => {
          handleGoalInputChange('goalName', text)
        }}></TextInput>
        <Button title={goalFormData && goalFormData.id ? 'Update' : 'Add' } onPress={() => {
          if (goalFormData && goalFormData.id) {
            handleGoalUpdate(goalFormData.id)
          } else {
            handleGoalAdd()
          }
        }}/>
      </View>
      <View style={styles.goalList}>
        {
          goalList.map((goal, i) => (
            <View key={goal.id} style={styles.goal}>
              <Text>{goal.goalName}</Text>
              <View style={{flexDirection: 'row'}}>
              <Button title='Delete' onPress={() => handleGoalDelete(goal.id)}/>
              <Button title='Edit' onPress={() => handleGoalView(goal.id)}/>
              </View>
            </View>
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

  goal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
