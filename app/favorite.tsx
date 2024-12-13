import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Divider, Surface, Text } from 'react-native-paper'

import { getFavorites } from '@/lib/services/favoriteService'

const Favorites = () => {
  const [favorites, setFavorites] = useState<{ name: string; url: string }[]>(
    [],
  )

  // Charger les favoris au montage du composant
  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await getFavorites()
      setFavorites(storedFavorites)
    }

    fetchFavorites()
  }, [])

  const renderItem = ({ item, index }: any) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            router.push(`/modal?url=${encodeURIComponent(item.url)}`)
          }}
          style={[styles.listItem, index % 2 === 0 && styles.evenItem]}
        >
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        <Divider />
      </>
    )
  }

  return (
    <Surface style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.url}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.emptyMessage}>Aucun favori enregistré.</Text>
      )}
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 20,
    flex: 1,
  },
  arrow: {
    fontSize: 26,
    color: '#007BFF',
  },
  evenItem: {
    opacity: 0.8, // Nuance pour un item sur deux
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
    marginTop: 20,
  },
})

export default Favorites
