import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../../../components/UserChat";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const IP_ADDRESS = "http://192.168.1.11:3000";
import { Ionicons } from "@expo/vector-icons";
import { WHITELIST_DOMAINS } from "../../../utils/constant";

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const [userId, setUserId] = useState("");
  const navigation = useNavigation();

  // fetch userid and set userid
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setUserId(userId);
        } else {
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    if (userId) {
      acceptedFriendsList();
    }
  }, [userId]);
  // fetch all friends accepted connections
  const acceptedFriendsList = async () => {
    try {
      const response = await axios.get(
        `${WHITELIST_DOMAINS}/connections/${userId}`
      );
      setAcceptedFriends(response.data.connections);
    } catch (error) {
      console.log("error showing the accepted friends", error);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />
        </View>
      ),
    });
  }, [navigation]);
  // console.log("friends", acceptedFriends);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedFriends.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
