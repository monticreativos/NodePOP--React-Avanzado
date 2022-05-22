import React from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector, useContext } from 'react-redux'
import { useEffect } from 'react'
import { ReactReduxContext } from 'react-redux'
import FiltersForm from './FiltersForm'
import AdvertsList from './AdvertsList'
import EmptyList from './EmptyList'
import storage from '../../../utils/storage'
import { getAdverts } from '../../../store/selectors'

import { defaultFilters, filterAdverts } from './filters'
import useQuery from '../../../hooks/useQuery'
import { advertsLoaded } from '../../../store/actions'

const getFilters = () => storage.get('filters') || defaultFilters
const saveFilters = (filters) => storage.set('filters', filters)

const useTweets = () => {
  const dispatch = useDispatch()
  const tweets = useSelector(getAdverts)

  useEffect(() => {
    dispatch(advertsLoaded())
  }, [dispatch])

  return tweets
}
const AdvertsPage = () => {
  const adverts = useTweets()
  // console.log(adverts)
  // const dispatch = useDispatch()
  // dispatch(advertsLoaded())
  const [filters, setFilters] = React.useState(getFilters)

  React.useEffect(() => {
    saveFilters(filters)
  }, [filters])

  // if (error?.statusCode === 401) {
  //   return <Navigate to="/login" />
  // }

  const filteredAdverts = filterAdverts(adverts, filters)

  return (
    <>
      {adverts.length > 0 && (
        <FiltersForm
          initialFilters={filters}
          defaultFilters={defaultFilters}
          prices={adverts.map(({ price }) => price)}
          onFilter={setFilters}
        />
      )}
      {filteredAdverts.length ? (
        <AdvertsList adverts={filteredAdverts} />
      ) : (
        <EmptyList advertsCount={adverts.length} />
      )}
    </>
  )
}

export default AdvertsPage
