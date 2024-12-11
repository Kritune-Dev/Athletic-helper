/**
 * Styles
 */

import { StyleSheet } from 'react-native'

import Colors from '@/lib/ui/styles/colors'
import Themes from '@/lib/ui/styles/themes'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 16,
    padding: 32,
  },
  inputsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  resultsCard: {
    marginTop: 20,
    borderRadius: 10,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  resultDistance: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultTime: {
    fontSize: 16,
    textAlign: 'right',
  },
  divider: {
    marginVertical: 4,
  },
  placeholder: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 10,
  },
})

export { Colors, Themes, styles }
