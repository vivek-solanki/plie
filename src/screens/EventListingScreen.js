import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice"; // Import the action
import { getEvents } from "../utils/api";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EventListingScreen = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const favorites = useSelector((state) => state.favorites); // Access favorites from Redux
  const dispatch = useDispatch(); // Create a dispatch function

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await getEvents(token);
          setEvents(response?.data?.events || []);
        } else {
          setError("No token found");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>;
  }

  const handleFavoriteToggle = (item) => {
    dispatch(toggleFavorite(item)); // Dispatch toggleFavorite action
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some(
      (fav) => fav.event_date_id === item.event_date_id
    );

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.event_profile_img }} style={styles.image} />
        <View style={styles.infoContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.eventName}>{item.event_name}</Text>
            <Icon name="arrow-forward" size={24} color="#000" />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.eventDate}>{`${item.readable_from_date} - ${
              item.readable_to_date || "TBD"
            }`}</Text>
            <Text
              style={styles.location}
            >{`${item.city}, ${item.country}`}</Text>
          </View>
          <Text
            style={styles.price}
          >{`$${item.event_price_from} - $${item.event_price_to}`}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.tagContainer}>
              {item.keywords?.map((keyword, index) => (
                <Text key={index} style={styles.tag}>
                  {keyword}
                </Text>
              ))}
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <Icon name="share" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleFavoriteToggle(item)}>
                <Icon
                  name={isFavorite ? "favorite" : "favorite-border"}
                  size={24}
                  color="#34A853"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerMaintxt}>Hello Renzo!</Text>
        <Text style={styles.headertxt}>Are you ready to dance?</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={events}
          keyExtractor={(item) => item.event_date_id.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    height: 106,
  },
  headerMaintxt: {
    fontSize: 26,
    fontWeight: "600",
  },
  headertxt: {
    fontSize: 16,
    fontWeight: "400",
    color: "#828282",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    height: 102,
    padding: 10,
    marginVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "500",
  },
  eventDate: {
    fontSize: 12,
    color: "#34A853",
  },
  location: {
    fontSize: 11,
    color: "#828282",
  },
  price: {
    fontSize: 11,
    color: "#828282",
  },
  tagContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  tag: {
    backgroundColor: "#F5F7FC",
    borderRadius: 25,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    fontSize: 12,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

export default EventListingScreen;
