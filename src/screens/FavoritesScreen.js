import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoritesScreen = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleFavoriteToggle = (item) => {
    dispatch(toggleFavorite(item)); // Toggle favorite status
  };

  const renderFavoriteItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: item.event_profile_img }} style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.eventName}>{item.event_name}</Text>
            <Icon name="arrow-forward" size={24} color="#000" />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.eventDate}>{`${item.readable_from_date} - ${
              item.readable_to_date || "TBD"
            }`}</Text>
            <Text style={styles.location}>{`${item.city}, ${item.country}`}</Text>
          </View>
          <Text style={styles.price}>{`$${item.event_price_from} - $${item.event_price_to}`}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
                  name="favorite"
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
        <Text style={styles.headerMaintxt}>Your Favorite Events</Text>
      </View>
      <View style={styles.container}>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.event_date_id.toString()}
          renderItem={renderFavoriteItem}
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

export default FavoritesScreen;
