import localforage from 'localforage'

export const useToken = () => {
  const getToken = async () => await localforage.getItem('token')

  const setToken = async (newToken) => await localforage.setItem('token', newToken)

  const removeToken = async () => await localforage.removeItem('token')

  return { getToken, setToken, removeToken }
}
