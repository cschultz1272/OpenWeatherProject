import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Dimensions} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [weather, setWeather] = useState();
  let watchId;

  useEffect(() => {
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [watchId]);

  watchId = Geolocation.watchPosition(async (info) => {
    setWeather(
      await fetchTemperature(info.coords.latitude, info.coords.longitude),
    );
  });

  const fetchTemperature = async (lat, long) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=a75f750a1d0854c14cebf6e40969cbfc`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json.main.temp;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Current Temperature:</Text>
        {weather && <Text style={styles.text}>{weather} &deg;</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Dimensions.get('window').height / 3,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    paddingBottom: 20,
  },
});

export default App;
