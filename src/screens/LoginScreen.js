import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    checkData()
  },[])

  const checkData = async () => {
    const data = await AsyncStorage.getItem("token");
    if (data) {
      navigation.reset({ index: 0, routes: [{ name: "Main" }] });
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await login(email, password);
      const token = response?.data?.token;
      if (token) {
        await AsyncStorage.setItem("token", token);
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      } else {
        Alert.alert("Error", "Token not found in response");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white", height: 926 }}>
      <SafeAreaView>
        <View style={styles.container}>
          {/* App Logo */}
          <Text style={styles.title}>Pliē</Text>

          {/* Placeholder for Logo/Image */}
          <Image
            style={styles.logo}
            source={require("../../assets/images/icons/google.png")}
          />
        </View>
        <View style={styles.maincontainer}>
          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputtext}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#BDBDBD"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.inputtext}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#BDBDBD"
              secureTextEntry // Set secureTextEntry to hide the password
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <View style={styles.signincomponent}>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
          {/* Sign Up Link */}
          <TouchableOpacity style={styles.signincomponent}>
            <Text style={styles.signUpText}>
              Not a member? <Text style={styles.signUpLink}>Sign Up Here</Text>
            </Text>
          </TouchableOpacity>

          {/* Alternative Sign In Options */}
          <View style={styles.socialContainer}>
            <Text style={styles.orText}>or Sign In with:</Text>
            <View style={styles.socialIcons}>
              <View style={styles.socialIconbg}>
                <Image
                  style={styles.socialIcon}
                  source={require("../../assets/images/icons/google.png")}
                />
              </View>
              <View style={styles.socialIconbg}>
                <Image
                  style={styles.socialIcon}
                  source={require("../../assets/images/icons/apple.png")}
                />
              </View>
              <View style={styles.socialIconbg}>
                <Image
                  style={styles.socialIcon}
                  source={require("../../assets/images/icons/facebook.png")}
                />
              </View>
            </View>
          </View>

          {/* Guest Login */}
          <TouchableOpacity>
            <Text style={styles.guestText}>Enter as Guest</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    height: 363,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  maincontainer: {
    paddingHorizontal: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    paddingTop: 25,
  },
  input: {
    height: 32,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: 8,
  },
  inputtext: {
    paddingVertical: 4,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginVertical: 2,
  },
  forgotPasswordText: {
    color: "#757575",
    fontSize: 12,
  },
  signincomponent: {
    alignSelf: "flex-end",
  },
  signInButton: {
    backgroundColor: "#00C853", // Green button
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 15,
    width: 98,
    height: 35,
  },
  signInButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  signUpText: {
    color: "#757575",
    fontSize: 12,
  },
  signUpLink: {
    color: "#00C853",
    fontWeight: "bold",
  },
  socialContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  orText: {
    color: "#757575",
    fontSize: 12,
    marginVertical: 25,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  socialIconbg: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,
    elevation: 8,
    width: 56,
    height: 56,
  },
  socialIcon: {
    justifyContent: "center",
    alignSelf: "center",
    width: 50,
    height: 56,
  },
  guestText: {
    color: "#757575",
    fontSize: 16,
    alignSelf: "flex-end",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
