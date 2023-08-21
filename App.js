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
  const [futureData, setFutureData] = useState(null);
  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=4fbacb367b2b4a8ca9f74202231708&q=${location}&days=7&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) => {
        setFutureData(data.forecast.forecastday);
      })
      .catch((error) => {
        console.error("API error:", error);
        setFutureData(null); // Set data to null on error
      });
  }, [location]);

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

  const weatherData = JSON.stringify(futureData);
  // for (i in futureData) {
  //   console.log(futureData[i].date);
  // }

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=4fbacb367b2b4a8ca9f74202231708&q=${location}&aqi=no`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
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
              marginTop: 20,
            }}
          >
            <TextInput
              style={{
                borderWidth: 2,
                paddingLeft: 15,
                padding: 10,
                borderColor: "rgba(255, 255, 255, 0.3)",
                borderRadius: 10,
                width: 250,
                color: "#FFF",
                fontFamily: "Roboto_400Regular",
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
              placeholderTextColor="#FFF"
              placeholder="Enter Location"
              onChangeText={handleInputChange}
              onSubmitEditing={handleButtonPress}
              value={textInputValue}
            />
            <TouchableOpacity
              style={styles.customButton}
              onPress={handleButtonPress}
            >
              <Image
                source={require("./assets/search.png")}
                style={{ height: 22, width: 22 }}
              />
            </TouchableOpacity>
          </View>
        </View>
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
                    source={require("./assets/clock.png")}
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
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <View>
                <Image
                  source={require("./assets/date.png")}
                  style={{
                    width: 23,
                    height: 23,
                    marginLeft: 20,
                  }}
                />
              </View>

              <View>
                <Text style={styles.forecast}>Daily Forecasts</Text>
              </View>
            </View>
            <View style={{ marginTop: 30, marginLeft: 10 }}>
              <ScrollView horizontal>
                {/* <View style={styles.box}>
                  <Text style={styles.color}>Item 1</Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.color}>Item 2</Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.color}>Item 3</Text>
                </View> */}
                <View style={styles.container}>
                  {futureData &&
                    futureData.map((day) => (
                      <View key={day.date} style={styles.box}>
                        <Image
                          style={{ width: 70, height: 70 }}
                          source={{
                            uri:
                              data &&
                              data.current &&
                              "https:" + day.day.condition.icon,
                          }}
                        />
                        <Text style={styles.day}>{getDayOfWeek(day.date)}</Text>
                        <Text style={styles.temp_c}>{day.day.avgtemp_c}°</Text>
                      </View>
                    ))}
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
    height: 130,
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
    marginLeft: 15,
    textAlign: "left",
  },
  color: {
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
  },
  day: {
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
  },
  temp_c: {
    color: "#FFF",
    marginVertical: 5,
    fontSize: 21,
    fontFamily: "Roboto_500Medium",
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
  customButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
    padding: 6,
    marginLeft: 10,
  },
});

export default HorizontalScrollViewExample;
