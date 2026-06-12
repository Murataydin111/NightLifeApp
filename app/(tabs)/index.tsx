import EventCard from '@/components/EventCard';
import { getEvents } from '@/src/eventsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type EventItem = {
  id: string;
  title: string;
  place: string;
  date: string;
  price: string;
  type: string;
};

export default function HomeScreen() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.log('Failed to load events:', err);
      setError('Could not load events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    const checkStorage = async () => {
      const data = await AsyncStorage.getItem(
        'nightlifeapp_favorites'
      );

      console.log('FAVORITES:', data);
    };

    checkStorage();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.infoText}>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>

        <Pressable style={styles.retryButton} onPress={loadEvents}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            <View style={styles.headerBox}>
  <Text style={styles.headerTitle}>
    🎉 NightLife Events
  </Text>

  <Text style={styles.headerSubtitle}>
    Discover the best parties, concerts and festivals
  </Text>
</View>
            <View style={styles.recommendedBox}>
              <Text style={styles.recommendedTitle}>
                🔥 Recommended Events
              </Text>

              <Text style={styles.recommendedItem}>
                🎧 Techno Festival
              </Text>

              <Text style={styles.recommendedItem}>
                🎸 Rock Concert
              </Text>

              <Text style={styles.recommendedItem}>
                🎉 DJ Night Party
              </Text>
            </View>

            <View style={styles.statsBox}>
              <Text style={styles.statsTitle}>
                📊 Event Statistics
              </Text>

              <Text style={styles.statsText}>
                🎫 Total Events: {events.length}
              </Text>

              <Text style={styles.statsText}>
                🎵 Categories: Electronic, Rock, Techno, Hip Hop, Mixed
              </Text>
            </View>
          </View>
        }
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{
          padding: 20,
          paddingTop: 60,
        }}
        refreshing={loading}
        onRefresh={loadEvents}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  infoText: {
    color: '#94a3b8',
    marginTop: 12,
    fontSize: 16,
  },

  errorText: {
    color: '#f87171',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },

  retryButton: {
    backgroundColor: '#1e293b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  recommendedBox: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },

  recommendedTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  recommendedItem: {
    color: '#22c55e',
    fontSize: 16,
    marginBottom: 6,
  },

  statsBox: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
  },

  statsTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  statsText: {
    color: '#e2e8f0',
    fontSize: 16,
    marginBottom: 6,
  },
  headerBox: {
  marginBottom: 20,
},

headerTitle: {
  color: 'white',
  fontSize: 28,
  fontWeight: 'bold',
},

headerSubtitle: {
  color: '#94a3b8',
  marginTop: 6,
  fontSize: 16,
},
});