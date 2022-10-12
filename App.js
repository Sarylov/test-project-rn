import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import Map from "./components/Map";
import getLocation from "./helper/useLocation";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  
  const start = async ()=>{
    // должна быть разработана логика добавления пользователя в базу данных и подтягивания актуальных позиций 
    setIsLoading(true)
    let response = await getLocation()
    if (response.coords){
      setLocation(response);
      setIsLoading(false)
    }
    else 
      setErrorMsg("ошибка подключения");
  }

  const reload = async()=>{
    // должна быть разработана логика обнавления базы данных и подтягивания актуальных позиций 
    setIsLoading(true)
    let response = await getLocation()
    if (response.coords){
      setLocation(response);
      setIsLoading(false)
    }
    else 
      setErrorMsg("ошибка подключения");
  }

  const disable = ()=>{
    //  должна быть разработана логика удаления из базы данных
    setLocation(null)
  }

  return (
    <View style={styles.container}>
      {!location && <Text style={styles.info}>имя видно всем пользователям</Text>}
      {!location && <TextInput style ={styles.input} placeholder="имя" value={name} onChangeText={text => setName(text)} autoFocus = {true}/>}
      {!location && <Button title = "начать" onPress={start} disabled={name=="" ? true : false}/>}
      {location && <Map position={location} />}
      {location && <View style = {styles.btnWrapper}>
        <Button title="обновить" onPress={reload} />
        <Button title="отключиться" onPress={disable}/>
      </View>}
      {isLoading && <Text>waiting...</Text>}
      {errorMsg && <Text>{errorMsg}</Text>}      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  btnWrapper:{
    width:"100%",
    flexDirection: "row",
    justifyContent:"space-around",
    padding:15,
  },

  info:{
    color:"gray"
  },

  input:{
    minWidth:"50%",
    margin:15,
    borderWidth: 1,
    padding: 10,
  }
});
