import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🎉 NightLifeApp
      </Text>

      <Text style={styles.version}>
        Version 1.0
      </Text>

      <Text style={styles.description}>
        NightLifeApp helps users discover concerts,
        festivals and nightlife events.
      </Text>

      <Text style={styles.info}>
        Built with React Native, Expo Router,
        AsyncStorage, Maps and Haptics.
      </Text>

      <Text style={styles.footer}>
        Mobile Programming Laboratory Project
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  version: {
    color: '#22c55e',
    fontSize: 18,
    marginBottom: 20,
  },

  description: {
    color: '#cbd5e1',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },

  info: {
    color: '#94a3b8',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },

  footer: {
    color: '#64748b',
    textAlign: 'center',
    fontSize: 14,
  },
});