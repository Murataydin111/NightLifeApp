import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<
  React.PropsWithChildren,
  State
> {
  constructor(props: React.PropsWithChildren) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error) {
    console.log('Error Boundary:', error);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            Something went wrong
          </Text>

          <Pressable
            style={styles.button}
            onPress={this.handleReset}
          >
            <Text style={styles.buttonText}>
              Try Again
            </Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
    padding: 20,
  },

  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: '#0f172a',
    fontWeight: 'bold',
  },
});