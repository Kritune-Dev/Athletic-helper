import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import {
  TextInput,
  Button,
  Surface,
  Menu,
  TouchableRipple,
} from 'react-native-paper'

import { Profile } from '@/lib'
import { loadProfile, saveProfile } from '@/lib/services/profileService'
import Departement from '@/lib/types/depart'
import regionsDepartmentsData from '@/lib/utils/dep-reg.json'

const EditProfile = ({ navigation }: { navigation: any }) => {
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    club: '',
    department: { code: '', label: '' },
    region: '',
    licenseNumber: '',
    athletePage: '',
  })

  const [regions, setRegions] = useState<string[]>([])
  const [departments, setDepartments] = useState<
    { code: string; label: string }[]
  >([])
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedDepartment, setSelectedDepartment] = useState<Departement>({
    code: '',
    label: '',
  })

  const [regionMenuVisible, setRegionMenuVisible] = useState(false)
  const [departmentMenuVisible, setDepartmentMenuVisible] = useState(false)

  useEffect(() => {
    // Extraire les régions uniques
    const regions = [
      ...new Set(regionsDepartmentsData.map((item) => item.reg_name)),
    ]
    setRegions(regions)

    // Charger le profil si disponible
    const fetchProfile = async () => {
      const storedProfile = await loadProfile()
      if (storedProfile) {
        setProfile(storedProfile)
        setSelectedRegion(storedProfile.region)
      }
    }

    fetchProfile()
  }, [])

  useEffect(() => {
    // Filtrer les départements en fonction de la région sélectionnée
    if (selectedRegion) {
      const filteredDepartments = regionsDepartmentsData
        .filter((item) => item.reg_name === selectedRegion)
        .map((item) => ({
          code: item.code,
          label: `${item.code} - ${item.dep_name}`,
        }))
      setDepartments(filteredDepartments)
      setSelectedDepartment({ code: '', label: '' }) // Reset department when region changes
    }
  }, [selectedRegion])

  const handleSaveProfile = async () => {
    console.log(profile)
    await saveProfile(profile)
    router.back()
  }

  return (
    <Surface style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          label="Prénom"
          value={profile.firstName}
          onChangeText={(text) => setProfile({ ...profile, firstName: text })}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Nom"
          value={profile.lastName}
          onChangeText={(text) => setProfile({ ...profile, lastName: text })}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Club"
          value={profile.club}
          onChangeText={(text) => setProfile({ ...profile, club: text })}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Licence"
          value={profile.licenseNumber}
          onChangeText={(text) =>
            setProfile({ ...profile, licenseNumber: text })
          }
          style={styles.input}
          mode="outlined"
        />

        {/* Menu pour la régions */}
        <Menu
          visible={regionMenuVisible}
          onDismiss={() => setRegionMenuVisible(false)}
          anchor={
            <TouchableRipple
              onPress={() => setRegionMenuVisible(true)}
              style={styles.input}
            >
              <TextInput
                label="Région"
                value={selectedRegion || 'Sélectionnez une région'}
                pointerEvents="none" // Non interactif
                editable={false}
                mode="outlined"
              />
            </TouchableRipple>
          }
        >
          {regions.map((region, index) => (
            <Menu.Item
              key={index}
              title={region}
              onPress={() => {
                setSelectedRegion(region)
                setProfile({ ...profile, region })
                setRegionMenuVisible(false)
              }}
            />
          ))}
        </Menu>

        {/* Menu pour le département */}
        <Menu
          visible={departmentMenuVisible}
          onDismiss={() => setDepartmentMenuVisible(false)}
          anchor={
            selectedRegion && (
              <TouchableRipple
                onPress={() => setDepartmentMenuVisible(true)}
                style={styles.input}
              >
                <TextInput
                  label="Département"
                  value={
                    selectedDepartment.label || 'Sélectionnez un département'
                  }
                  pointerEvents="none" // Non interactif
                  editable={false}
                  mode="outlined"
                />
              </TouchableRipple>
            )
          }
        >
          {departments.map((department, index) => (
            <Menu.Item
              key={index}
              title={department.label}
              onPress={() => {
                setSelectedDepartment(department)
                setProfile({ ...profile, department })
                setDepartmentMenuVisible(false)
              }}
            />
          ))}
        </Menu>

        <Button
          mode="contained"
          onPress={handleSaveProfile}
          style={styles.button}
        >
          Sauvegarder
        </Button>
      </ScrollView>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
  },
})

export default EditProfile
