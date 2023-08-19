import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
} from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_300Light,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

const HorizontalScrollViewExample = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(
      "http://api.weatherapi.com/v1/current.json?key=4fbacb367b2b4a8ca9f74202231708&q=india&aqi=no"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("API error:", error);
        setData(null); // Set data to null on error
      });
  }, []);
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null; // You might want to show a loading indicator here
  }

  return (
    <ImageBackground
      source={require("./assets/bg.png")}
      style={styles.backgroundImage}
      blurRadius={50}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {data ? (
          <View style={styles.main}>
            <View style={styles.flex}>
              <View>
                <Text style={[styles.mainheading, styles.light]}>
                  {data && data.location && data.location.name},{" "}
                </Text>
              </View>
              <View>
                <Text style={styles.mainheading}>
                  {data && data.location && data.location.country}
                </Text>
              </View>
            </View>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri:
                    data &&
                    data.current &&
                    "https:" + data.current.condition.icon,
                }}
              />
            </View>
            <View>
              <Text style={styles.degree}>
                {data && data.current && data.current.temp_c}°
              </Text>
            </View>
            <View>
              <Text style={styles.weather}>
                {data && data.current && data.current.condition.text}
              </Text>
            </View>
            <View></View>
            <View style={{ width: "100%" }}>
              <Text style={styles.forecast}>Daily Forecasts</Text>
            </View>
            <View style={{ marginTop: 30, marginLeft: 10 }}>
              <ScrollView horizontal>
                <View style={styles.box}>
                  <Text style={styles.color}>Item 1</Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.color}>Item 2</Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.color}>Item 3</Text>
                </View>
              </ScrollView>
            </View>
            <View></View>
          </View>
        ) : (
          <View>
            <Text>Not found</Text>
          </View>
        )}
      </ScrollView>
      <StatusBar />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 120,
    height: 120,
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  light: {
    fontFamily: "Roboto_500Medium",
  },
  image: {
    width: 150,
    height: 150,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    marginTop: 150,
  },
  mainheading: {
    color: "#FFF",
    fontSize: 25,
    fontFamily: "Roboto_300Light",
  },
  degree: {
    fontFamily: "Roboto_700Bold",
    color: "#FFF",
    fontSize: 45,
  },
  weather: {
    fontFamily: "Roboto_400Regular",
    fontSize: 17,
    color: "#FFF",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' for different scaling behavior
  },
  main: {
    marginTop: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  forecast: {
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    width: "100%",
    fontSize: 20,
    marginTop: 20,
    marginLeft: 15,
    textAlign: "left",
  },
  color: {
    color: "#FFF",
    fontFamily: "Roboto_400Regular",
  },
});

export default HorizontalScrollViewExample;
