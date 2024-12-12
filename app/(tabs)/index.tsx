import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Card, IconButton, Text } from 'react-native-paper'

const Starting = () => {
  const hasCameraPermission = true // Replace with actual camera permission logic

  return (
    <View style={styles.screen}>
      {/* Camera Section */}
      <View
        style={
          hasCameraPermission
            ? styles.cameraSection
            : styles.cameraDisabledSection
        }
      >
        {hasCameraPermission ? (
          <View style={styles.cameraContainer}>
            <Text style={styles.cameraPlaceholder}>Camera View</Text>
            <View style={styles.cameraOptions}>
              <IconButton icon="camera-switch" size={24} onPress={() => {}} />
              <IconButton icon="camera-off" size={24} onPress={() => {}} />
              <IconButton icon="cog" size={24} onPress={() => {}} />
            </View>
          </View>
        ) : (
          <View style={styles.cameraDisabledContainer}>
            <Text style={styles.cameraDisabledText}>Caméra désactivée</Text>
          </View>
        )}
      </View>

      {/* Starting Section */}
      <Card style={styles.startingSection}>
        <View style={styles.startingRow}>
          <View style={styles.startingElement}>
            <IconButton icon="flag" size={24} onPress={() => {}} />
            <Text>Marks</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrowTime}>5 sec</Text>
            <IconButton icon="arrow-right" size={32} onPress={() => {}} />
          </View>
          <View style={styles.startingElement}>
            <IconButton icon="run" size={24} onPress={() => {}} />
            <Text>Set</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrowTime}>5 sec</Text>
            <IconButton icon="arrow-right" size={32} onPress={() => {}} />
          </View>
          <View style={styles.startingElement}>
            <IconButton icon="pistol" size={24} onPress={() => {}} />
            <Text>Go</Text>
          </View>
        </View>
      </Card>
      {/* Start Button */}
      <Button
        mode="contained"
        onPress={() => console.log('Go')}
        style={styles.startButton}
        contentStyle={styles.startButtonContent}
      >
        Lancer procédure de départ
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  cameraSection: {
    flex: 1,
  },
  cameraDisabledSection: {
    flex: 1 / 6,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraPlaceholder: {
    color: 'gray',
    fontSize: 18,
  },
  cameraOptions: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  cameraDisabledContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 16,
  },
  cameraDisabledText: {
    fontSize: 16,
    color: '#888',
  },
  startingSection: {
    flex: 5 / 6,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 16,
  },
  startingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  startingElement: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  arrowContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  arrowTime: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  startButton: {
    height: '12.5%', // 1/8 of the screen
    justifyContent: 'center',
  },
  startButtonContent: {
    height: '100%', // Ensures the button content fills its height
  },
})

export default Starting
