import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState()
  const [error, setError] = useState()
  const [fetchedData, setFetchedData] = useState()

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true)
      try {
        const data = await fetchFn()
        setUserPlaces(data)
      } catch (error) {
        setErrorUpdatingPlaces({ message: error.message || "Failed to fetch data" })
      }
      setIsFetching(false)
    }

    fetchPlaces()
  }, [fetchFn])

  return {
    isFetching,
    error,
    setFetchedData,
    fetchedData
  }
}