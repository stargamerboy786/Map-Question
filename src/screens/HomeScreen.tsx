import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { getData } from "./Api";

export default function HomeScreen() {
  const [lat, setlat] = useState();
  const [long, setlong] = useState();
  const [Values, setValues] = useState([]);
  const [LocationValues,setLoationValues]=useState<any[]>([])
  const getlatlong = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      // console.log("location", location);
      return {
        lat:location?.coords?.latitude,long:location?.coords?.longitude
      }
    } catch (error) {
      console.log("error", error);
    }
    
  };
  useEffect(()=>{
    const interval=setInterval(()=>{
      fatch(LocationValues)
    },5000)
    return ()=>{
      interval
    }
  },[])

  useEffect(() => {
    console.log("Location: ", LocationValues);
  }, [LocationValues]);

  const fatch = async (item) => {
    console.log("item",item);
    
    const {lat,long}=await getlatlong()
    console.log("lat", lat, long);
    if (lat == undefined || long == undefined) {
      console.log("values undefined");
      return;
    }
    
    const data = await getData(lat, long);
    // let dataValues =[...LocationValues]
    console.log("data coming --------form the fatch",LocationValues);
    console.log("data coming form the fatch",data);
    
    const dataValues = [...LocationValues, data];
    console.log("setvalues",dataValues);
    
    setLoationValues(dataValues)
    console.log("values",LocationValues);
  }

  const Onredering = (item: any) => {
    // console.log("item", item);
    return (
      <View style={styles.box}>
        <Text>street:{JSON.stringify(item.item.street)}</Text>
        <Text>city:{JSON.stringify(item.item.city)}</Text>
      </View>
    );
  };

  return (
    <View>
      {/* <Text>{JSON.stringify(Values)}</Text> */}
      <FlatList renderItem={Onredering} data={LocationValues} /
      
  >
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    height: "100%",
    width: "100%",
    backgroundColor: "skyblue",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomColor: "black",
  },
});
