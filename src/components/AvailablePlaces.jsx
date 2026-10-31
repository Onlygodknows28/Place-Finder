import { sortPlacesByDistance } from '../loc.js';
import Places from './Places.jsx';
import { fetchAvailablePlaces } from '../http.js';
import ErrorPage from './ErrorPage.jsx';
import { useFetch } from '../hooks/useFetch.js';
const places = localStorage.getItem('places')

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces()

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)

      resolve(sortedPlaces)
    })
  })
}

export default function AvailablePlaces({ onSelectPlace }) {
  const { isFetching, error, fetchedData: availablePlaces, setFetchedData: setAvailablePlaces } = useFetch(fetchSortedPlaces, [])

  if (error) {
    return <ErrorPage title="An error occured!" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
