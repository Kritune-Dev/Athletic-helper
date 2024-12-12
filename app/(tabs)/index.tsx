import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, IconButton, Text } from 'react-native-paper'

const Starting = () => {
  const hasCameraPermission = false // Replace with actual camera permission logic

  return (
    <View style={styles.screen}>
      {/* Camera Section */}
      <View style={styles.cameraSection}>
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
      <View style={styles.startingSection}>
        <View style={styles.startingRow}>
          <View style={styles.startingElement}>
            <IconButton icon="flag" size={24} onPress={() => {}} />
            <Text>Marks</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrowTime}>5s</Text>
            <Text style={styles.arrow}>→</Text>
          </View>
          <View style={styles.startingElement}>
            <IconButton icon="run" size={24} onPress={() => {}} />
            <Text>Set</Text>
          </View>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrowTime}>5s</Text>
            <Text style={styles.arrow}>→</Text>
          </View>
          <View style={styles.startingElement}>
            <IconButton icon="pistol" size={24} onPress={() => {}} />
            <Text style={styles.goText}>Go</Text>
          </View>
        </View>
        <Button mode="contained" onPress={() => {}}>
          Lancer procédure de départ
        </Button>
      </View>
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
    flex: 1,
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
    flex: 1,
    justifyContent: 'space-evenly',
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
    fontSize: 12,
    color: '#555',
  },
  arrow: {
    fontSize: 24,
    color: '#000',
  },
  goText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  divider: {
    marginVertical: 4,
    backgroundColor: 'red',
  },
})

export default Starting
