import pick from './pick'
import texts from './forTest.json'

describe('pick', () => {
  it('should return a string', () => {
    const result = pick({ path: 'save', texts })
    expect(result).toBe('Sauvegarder')
  })
  it('should return an empty string if the key is not found', () => {
    const result = pick({ path: 'hello', texts })
    expect(result).toBe('')
  })
  it('should return the singular form if the key is found and the quantity is less than 3', () => {
    const result = pick({ path: 'user', texts, quantity: 1 })
    expect(result).toBe('Utilisateur')
  })
  it('should return the plural form if the key is found and the quantity is greater than 2', () => {
    const result = pick({ path: 'user', texts, quantity: 2 })
    expect(result).toBe('Utilisateurs')
  })
})
