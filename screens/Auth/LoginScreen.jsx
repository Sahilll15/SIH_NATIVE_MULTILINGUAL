import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import baseUrl from "../../config";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import { login } from "../../utils";


const LoginScreen = ({ navigation }) => {
  const [modalVisiblee, setModalVisiblee] = useState(false);

  const { selectedLang } = useAuth();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedType, setSelectedType] = useState("");
  const { setUserDetailsFunctions, setTokenFunction, setSelectedlangFunction } = useAuth();

  useEffect(() => {
    console.log(selectedLang);
  }, [selectedLang]);

  const handleLogin = async () => {
    if (selectedType === "Lawyer") {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/v1/lawyer/loginLawyer`,
          {
            email: email.toLocaleLowerCase(),
            password,
          }
        );

        if (response.status === 200) {
          console.log(response.data);
          const { lawyer, token } = response.data;
          console.log("lawyer", lawyer);
          setUserDetailsFunctions(lawyer);
          setTokenFunction(token);

          navigation.navigate("Home");
        } else {
          // Alert.alert('Error');
          navigation.navigate("Home");
        }
      } catch (error) {
        // console.log(error.message);
        // Alert.alert(error.response.data.message);
        navigation.navigate("Home");
      }
    } else {
      try {
        const response = await axios.post(
          `http://localhost:8000/api/v1/priosioner/login/`,
          {
            email: email.toLocaleLowerCase(),
            password,
          }
        );

        if (response.status === 200) {
          setUserDetailsFunctions(
            response.data.user
            // response.data.token
          );
          setTokenFunction(response.data.token);
          console.log(response.data.user);
          console.log(response.data.token);
          Alert.alert("logged");
          navigation.navigate("Home");
        }
      } catch (error) {
        navigation.navigate("Home");
        // console.log(error.message);
        // Alert.alert(error.response.data.message);
      }
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setModalVisiblee(false); // Close Language Modal when opening/closing the Lawyer Modal
  };

  const toggleModall = () => {
    setModalVisiblee(!isModalVisiblee);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    toggleModal();
  };

  useEffect(() => {
    console.log(selectedType);
  }, [selectedType]);

  // new@gmail.com
  //new

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require("../../assets/logo.png")}
      />
      <StatusBar barStyle="light-content" />



      <View style={styles.inputContainer}>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisiblee}
          onRequestClose={() => setModalVisiblee(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalItem}>
                <Pressable
                  style={styles.modalOption}
                  onPress={() => {
                    console.log("Hindi")
                    setSelectedlangFunction("Hindi")
                    setModalVisiblee(false)
                  }}
                >
                  <Text>HINDI</Text>
                </Pressable>
                <Pressable
                  style={styles.modalOption}
                  onPress={() => {
                    console.log("ENGLISH")
                    setSelectedlangFunction("English")
                    setModalVisiblee(false)
                  }}
                >
                  <Text>ENGLISH</Text>
                </Pressable>
                {/* Add more options as needed */}
                <Pressable
                  style={styles.modalClose}
                  onPress={() => setModalVisiblee(false)}
                >
                  <Text>Close</Text>
                </Pressable>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {selectedLang === "Hindi" ? login[0].Hindi : login[0].English}
          </Text>
        </View>
        <TouchableOpacity style={styles.input} onPress={toggleModal}>
          <Text>{selectedType}</Text>
        </TouchableOpacity>
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modal}>
            <Pressable
              style={styles.modalOption}
              onPress={() => handleTypeSelect("Prisioner")}
            >
              <Text>Prisioner</Text>
            </Pressable>
            <Pressable
              style={styles.modalOption}
              onPress={() => handleTypeSelect("Lawyer")}
            >
              <Text>Lawyer</Text>
            </Pressable>
            {/* Add more options as needed */}
            <Pressable style={styles.modalClose} onPress={toggleModal}>
              <Text>Close</Text>
            </Pressable>
          </View>
        </Modal>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {selectedLang === "Hindi" ? login[1].Hindi : login[1].English}
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          onChangeText={(text) => setemail(text)}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {selectedLang === "Hindi" ? login[2].Hindi : login[2].English}
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setModalVisiblee(true)}
          >
            <Text> Select Language</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>
            {selectedLang === "Hindi" ? login[3].Hindi : login[3].English}
          </Text>
        </TouchableOpacity>

        <View style={styles.dwcontainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate()}
            style={styles.helpLink}
          >
            <Text style={styles.helpText}>
              {selectedLang === "Hindi" ? login[6].Hindi : login[6].English}
            </Text>
          </TouchableOpacity>

          <Text style={styles.helpLink}> | </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate()}
            style={styles.helpLink}
          >
            <Text style={styles.helpText}>
              {selectedLang === "Hindi" ? login[7].Hindi : login[7].English}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dcontainer}>
          <Text>
            {selectedLang === "Hindi" ? login[4].Hindi : login[4].English}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpSelection")}
            style={styles.signupLink}
          >
            <Text style={styles.signupText}>
              {selectedLang === "Hindi" ? login[5].Hindi : login[5].English}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <TouchableOpacity style={styles.ChatBody} onPress={handleLogin}>
          <Text style={styles.ChatText}>
            {selectedLang === "Hindi" ? login[8].Hindi : login[8].English}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: "50%",
    height: "20%",
    position: "absolute",
    top: 20,
    left: 10,
    borderRadius: 50,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#FFFF",
    position: "relative",
  },

  inputContainer: {
    width: "100%",
    marginBottom: 10,
    marginTop: "40%",
  },
  labelContainer: {
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: "black",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "black",
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  loginButton: {
    backgroundColor: "red",
    width: "50%",
    padding: 10,
    marginTop: "5%",
    marginBottom: "5%",
    borderRadius: 5,
    alignSelf: "center",
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  signupLink: {
    marginTop: 20,
    fontSize: 16,
  },
  signupText: {
    color: "blue",
    fontSize: 16,
    marginTop: 7,
  },
  dcontainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: 50,
  },
  dwcontainer: {
    flexDirection: "row",
    marginTop: 5,
    alignSelf: "center",
  },
  helpLink: {
    marginTop: -12,
  },
  ChatBody: {
    width: "70%",
    alignSelf: "center",
  },

  ChatText: {
    color: "white",
    backgroundColor: "blue",
    padding: 10,
    fontSize: 12,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalClose: {
    backgroundColor: "lightgray",
    padding: 10,
    marginTop: 10,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  dropdown: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2980b9', // Border color
  },
});

export default LoginScreen;