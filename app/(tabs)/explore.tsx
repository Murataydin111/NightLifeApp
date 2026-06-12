import EventCard from '@/components/EventCard';
import { getEvents } from '@/src/eventsService';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type EventItem = {
  id: string;
  title: string;
  place: string;
  date: string;
  price: string;
  type: string;
};

export default function ExploreScreen() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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
      setError('Could not load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const categories = ['All', 'Party', 'Techno', 'Rock', 'Hip Hop'];

  const filteredEvents = useMemo(() => {
    let result = [...events];

    if (selectedCategory !== 'All') {
      result = result.filter((event) =>
        event.type.toLowerCase().includes(
          selectedCategory.toLowerCase()
        )
      );
    }

    if (search.trim()) {
      result = result.filter((event) =>
        event.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    return result;
  }, [events, search, selectedCategory]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.infoText}>Loading events...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>

        <Pressable
          style={styles.retryButton}
          onPress={loadEvents}
        >
          <Text style={styles.retryButtonText}>
            Try Again
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search events..."
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />

      <Text style={styles.resultText}>
        Found {filteredEvents.length} events
      </Text>

      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category &&
                styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category &&
                  styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard event={item} />
        )}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 120,
        }}
        refreshing={loading}
        onRefresh={loadEvents}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
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

  input: {
    backgroundColor: '#1e293b',
    marginHorizontal: 15,
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    color: 'white',
  },

  resultText: {
    color: '#cbd5e1',
    marginLeft: 20,
    marginTop: 10,
    fontSize: 15,
  },

  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    marginTop: 10,
  },

  categoryButton: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },

  activeCategory: {
    backgroundColor: '#22c55e',
  },

  categoryText: {
    color: 'white',
    fontSize: 15,
  },

  activeCategoryText: {
    color: '#0f172a',
    fontWeight: 'bold',
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
});