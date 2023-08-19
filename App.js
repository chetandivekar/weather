import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
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
  const [textInputValue, setTextInputValue] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [location, setLocation] = useState("Mumbai");
  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=4fbacb367b2b4a8ca9f74202231708&q=${location}&aqi=no`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("API error:", error);
        setData(null); // Set data to null on error
      });
  }, [location]);
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null; // You might want to show a loading indicator here
  }
  const handleInputChange = (text) => {
    setTextInputValue(text);
  };

  const handleButtonPress = () => {
    setDisplayText(textInputValue);
    setLocation(textInputValue);
  };

  return (
    <ImageBackground
      source={require("./assets/bg.png")}
      style={styles.backgroundImage}
      blurRadius={50}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            height: 30,
            
            alignItems: "center",

            marginTop: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              style={{
                borderWidth: 2,

                borderColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: 10,
                width: 200,
                color: "#FFF",
                fontFamily: "Roboto_400Regular",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
              placeholder="Enter Location"
              onChangeText={handleInputChange}
              value={textInputValue}
            />
            <TouchableOpacity
              style={styles.customButton}
              onPress={handleButtonPress}
            >
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={{ marginTop: 20 }}>{displayText}</Text>
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
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
            >
              <View style={styles.boxs}>
                <View>
                  <Image
                    source={require("./assets/wind.png")}
                    style={{ width: 25, height: 25 }}
                  />
                </View>
                <View>
                  <Text style={styles.color}>
                    {data && data.current && data.current.wind_kph} Kph
                  </Text>
                </View>
              </View>
              <View style={styles.boxs}>
                <View>
                  <Image
                    source={require("./assets/drop.png")}
                    style={{ width: 25, height: 25 }}
                  />
                </View>
                <View>
                  <Text style={styles.color}>
                    {data && data.current && data.current.humidity}%
                  </Text>
                </View>
              </View>
              <View style={styles.boxs}>
                <View>
                  <Image
                    source={require("./assets/date.png")}
                    style={{ width: 23, height: 23 }}
                  />
                </View>
                <View>
                  <Text style={styles.color}>
                    {data &&
                      data.current &&
                      data.location.localtime.split(" ")[1]}
                  </Text>
                </View>
              </View>
            </View>
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
  boxs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    fontFamily: "Roboto_500Medium",
  },
});

export default HorizontalScrollViewExample;
