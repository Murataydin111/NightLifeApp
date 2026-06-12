import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type EventItem = {
  id: string;
  title: string;
  place: string;
  date: string;
  price: string;
  type: string;
};

type FavoritesContextType = {
  favorites: EventItem[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (event: EventItem) => Promise<void>;
  loading: boolean;
  error: string | null;
};

const FavoritesContext =
  createContext<FavoritesContextType | null>(null);

const FAVORITES_STORAGE_KEY =
  'nightlifeapp_favorites';

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setError(null);

        const storedFavorites =
          await AsyncStorage.getItem(
            FAVORITES_STORAGE_KEY
          );

        console.log(
          'LOADED FROM STORAGE:',
          storedFavorites
        );

        if (storedFavorites) {
          setFavorites(
            JSON.parse(storedFavorites)
          );
        }
      } catch (err) {
        console.log(
          'Failed to load favorites:',
          err
        );

        setError(
          'Could not load favorites.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        setError(null);

        console.log(
          'Saving favorites:',
          favorites
        );

        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(favorites)
        );

        const check =
          await AsyncStorage.getItem(
            FAVORITES_STORAGE_KEY
          );

        console.log(
          'Saved successfully:',
          check
        );
      } catch (err) {
        console.log(
          'Failed to save favorites:',
          err
        );

        setError(
          'Could not save favorites.'
        );
      }
    };

    if (!loading) {
      saveFavorites();
    }
  }, [favorites, loading]);

  useEffect(() => {
    console.log(
      'CURRENT FAVORITES:',
      favorites
    );
  }, [favorites]);

  const isFavorite = (id: string) =>
    favorites.some(
      (event) => event.id === id
    );

  const toggleFavorite = async (
    event: EventItem
  ) => {
    try {
      await Haptics.selectionAsync();

      setFavorites((prev) => {
        const exists = prev.some(
          (e) => e.id === event.id
        );

        if (exists) {
          console.log(
            'Removing favorite:',
            event.title
          );

          return prev.filter(
            (e) => e.id !== event.id
          );
        }

        console.log(
          'Adding favorite:',
          event.title
        );

        return [...prev, event];
      });
    } catch (err) {
      console.log(
        'Failed to toggle favorite:',
        err
      );

      setError(
        'Could not update favorites.'
      );
    }
  };

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      loading,
      error,
    }),
    [favorites, loading, error]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx =
    useContext(FavoritesContext);

  if (!ctx) {
    throw new Error(
      'useFavorites must be used inside FavoritesProvider'
    );
  }

  return ctx;
}