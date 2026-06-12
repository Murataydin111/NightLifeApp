import EventCard from '@/components/EventCard';
import { useFavorites } from '@/src/context/FavoritesContext';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function FavoritesScreen() {
  const { favorites, loading, error } = useFavorites();

  const totalValue = favorites.reduce((sum, event) => {
    const price = Number(String(event.price).replace('€', ''));
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>⭐ No favorite events yet</Text>
          <Text style={styles.emptySubtitle}>
            Browse events and add your favorites.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard event={item} />}
          contentContainerStyle={{
  paddingHorizontal: 20,
  paddingBottom: 20,
  paddingTop: 70,
}}
          ListHeaderComponent={
            <View style={styles.statsBox}>
              <Text style={styles.statsTitle}>📊 Favorites Statistics</Text>

              <Text style={styles.statsText}>
                ⭐ Saved Events: {favorites.length}
              </Text>

              <Text style={styles.statsText}>
                💰 Total Ticket Value: {totalValue}€
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  loadingText: {
    color: '#94a3b8',
    marginTop: 12,
    fontSize: 16,
  },

  errorText: {
    color: '#f87171',
    fontSize: 16,
    textAlign: 'center',
  },

  emptyTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  emptySubtitle: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
  },

  statsBox: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },

  statsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  statsText: {
    color: '#e2e8f0',
    fontSize: 16,
    marginBottom: 6,
  },
});