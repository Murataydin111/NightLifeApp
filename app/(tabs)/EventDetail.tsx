import { useFavorites } from '@/src/context/FavoritesContext';
import { getWeather } from '@/src/weatherService';
import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function EventDetail() {
  const params = useLocalSearchParams();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [userLocation, setUserLocation] = useState<{
  latitude: number;
  longitude: number;
} | null>(null);

const [distance, setDistance] = useState<number | null>(null);
const [rating, setRating] = useState(0);
const [weather, setWeather] = useState<any>(null);

  const event = {
    id: String(params.id),
    title: String(params.title),
    place: String(params.place),
    date: String(params.date),
    price: String(params.price),
    type: String(params.type),
  };

  const cityCoordinates: Record<
    string,
    { latitude: number; longitude: number }
  > = {
    Warsaw: {
      latitude: 52.2297,
      longitude: 21.0122,
    },

    Krakow: {
      latitude: 50.0647,
      longitude: 19.945,
    },

    Gdansk: {
      latitude: 54.352,
      longitude: 18.6466,
    },

    Sopot: {
      latitude: 54.4416,
      longitude: 18.5601,
    },
  };

  const location =
    cityCoordinates[String(params.location)] ||
    cityCoordinates.Warsaw;
    const capacity =
  Number(String(params.capacity || 0).replace(/\D/g, ''));

const price =
  Number(String(params.price || 0).replace(/\D/g, ''));

const recommendationScore = Math.min(
  100,
  Math.round(
    capacity / 100 +
    (100 - price) +
    rating * 10
  )
);
    useEffect(() => {
  const getUserLocation = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({});

      const latitude =
        currentLocation.coords.latitude;

      const longitude =
        currentLocation.coords.longitude;

      setUserLocation({
        latitude,
        longitude,
      });

      const distanceKm =
        Math.sqrt(
          Math.pow(latitude - location.latitude, 2) +
            Math.pow(longitude - location.longitude, 2)
        ) * 111;

      setDistance(distanceKm);
    } catch (error) {
  console.log('WEATHER ERROR:', error);
}
  };
  const loadWeather = async () => {
  try {
    const data = await getWeather(
      location.latitude,
      location.longitude
    );

    console.log('WEATHER DATA:', data);

    setWeather(data);
  } catch (error) {
    console.log('WEATHER ERROR:', error);
  }
};

loadWeather();

  getUserLocation();
}, []);

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
    Linking.openURL(url);
  };
  const shareEvent = async () => {
  try {
    await Share.share({
      message:
        `🎉 ${params.title}\n\n` +
        `📍 ${params.location}\n` +
        `📅 ${params.date}\n` +
        `💰 ${params.price}\n\n` +
        `Check out this event on NightLifeApp!`,
    });
  } catch (error) {
    console.log(error);
  }
};

  return (
  <Animated.View
    entering={FadeIn.duration(800)}
    style={{ flex: 1 }}
  >
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        {params.title}
      </Text>

      <Text style={styles.place}>
        {params.place}
      </Text>

      <View style={styles.box}>
        <Text style={styles.line}>
          📅 Date: {params.date}
        </Text>

        <Text style={styles.line}>
          💰 Price: {params.price}
        </Text>

        <Text style={styles.line}>
          🎵 Type: {params.type}
        </Text>

        <Text style={styles.line}>
          📍 Location: {params.location}
        </Text>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={String(params.title)}
            description={String(params.place)}
          />
        </MapView>

        <Pressable
  style={styles.mapButton}
  onPress={openMaps}
>
  <Pressable
    style={styles.shareButton}
    onPress={shareEvent}
  >

  <Text style={styles.shareButtonText}>
    📤 Share Event
  </Text>
</Pressable>
          <Text style={styles.mapButtonText}>
            📍 Open in Maps
          </Text>
        </Pressable>

        <Text style={styles.line}>
          👥 Capacity: {params.capacity}
        </Text>

        <Text style={styles.line}>
          🕒 Start Time: {params.startTime}
        </Text>

        <Text style={styles.line}>
          👔 Dress Code: {params.dressCode}
        </Text>

        {weather && (
  <View style={styles.weatherBox}>
    <Text style={styles.weatherTitle}>
      🌤 Weather
    </Text>

    <Text style={styles.weatherText}>
      Temperature: {weather.main.temp}°C
    </Text>

    <Text style={styles.weatherText}>
      Condition: {weather.weather[0].main}
    </Text>
  </View>
)}
     
        <View style={styles.ratingBox}>
  <Text style={styles.descriptionTitle}>
    ⭐ Rate This Event
  </Text>

  <View style={styles.starsRow}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Pressable
        key={star}
        onPress={() => setRating(star)}
      >
        <Text style={styles.star}>
          {star <= rating ? '⭐' : '☆'}
        </Text>
      </Pressable>
    ))}
  </View>

  <Text style={styles.ratingText}>
    Your Rating: {rating}/5
  </Text>
</View>

        <View style={styles.descriptionBox}>
          {userLocation && (
  <View>
    <Text style={styles.line}>
      👤 Your Location:
    </Text>

    <Text style={styles.line}>
      {userLocation.latitude.toFixed(4)},
      {' '}
      {userLocation.longitude.toFixed(4)}
    </Text>

    <Text style={styles.line}>
      📏 Distance to Event:
      {' '}
      {distance?.toFixed(1)} km
    </Text>
  </View>
)}
<View style={styles.scoreBox}>
  <Text style={styles.scoreTitle}>
    🤖 Recommendation Score
  </Text>

  <Text style={styles.scoreValue}>
  {recommendationScore}/100
</Text>
</View>

          <Text style={styles.descriptionTitle}>
            📝 Description
          </Text>

          <Text style={styles.descriptionText}>
            {params.description}
          </Text>
        </View>
      </View>

      <Pressable
        style={styles.favBtn}
        onPress={() => toggleFavorite(event)}
      >
        <Text style={styles.favBtnText}>
          {isFavorite(event.id)
            ? 'Remove Favorite'
            : 'Add to Favorites'}
        </Text>
      </Pressable>

      <Pressable
        style={styles.btn}
        onPress={() => router.back()}
      >
        <Text style={styles.btnText}>
          Back
        </Text>
      </Pressable>
        </ScrollView>
  </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },

  place: {
    color: '#94a3b8',
    marginTop: 6,
    fontSize: 16,
  },

  box: {
    marginTop: 20,
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 14,
  },

  line: {
    color: '#e2e8f0',
    fontSize: 16,
    marginBottom: 10,
  },

  map: {
    height: 220,
    borderRadius: 12,
    marginVertical: 10,
    overflow: 'hidden',
  },

  mapButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  mapButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },

  descriptionBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },

  descriptionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  descriptionText: {
    color: '#cbd5e1',
    lineHeight: 22,
  },

  favBtn: {
    marginTop: 18,
    backgroundColor: '#334155',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  favBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

  btn: {
    marginTop: 14,
    backgroundColor: '#22c55e',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  btnText: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ratingBox: {
  marginTop: 15,
},

starsRow: {
  flexDirection: 'row',
  marginTop: 10,
},

star: {
  fontSize: 32,
  marginRight: 8,
},

ratingText: {
  color: '#cbd5e1',
  marginTop: 10,
  fontSize: 16,
},
shareButton: {
  backgroundColor: '#7c3aed',
  padding: 12,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 15,
},

shareButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 15,
},
scoreBox: {
  backgroundColor: '#0f172a',
  padding: 14,
  borderRadius: 12,
  marginTop: 15,
  marginBottom: 15,
},

scoreTitle: {
  color: '#94a3b8',
  fontSize: 16,
},

scoreValue: {
  color: '#22c55e',
  fontSize: 28,
  fontWeight: 'bold',
  marginTop: 6,
},
weatherBox: {
  backgroundColor: '#0f172a',
  padding: 14,
  borderRadius: 12,
  marginTop: 15,
  marginBottom: 15,
},

weatherTitle: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 8,
},

weatherText: {
  color: '#cbd5e1',
  fontSize: 16,
  marginBottom: 4,
},

});