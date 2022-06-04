import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FiltersForm from './FiltersForm'
import AdvertsList from './AdvertsList'
import EmptyList from './EmptyList'
import storage from '../../../utils/storage'
import { getAdverts } from '../../../store/selectors'

import { defaultFilters, filterAdverts } from './filters'
import { advertsLoaded } from '../../../store/actions'

const getFilters = () => storage.get('filters') || defaultFilters
const saveFilters = (filters) => storage.set('filters', filters)

const useAdverts = () => {
  const dispatch = useDispatch()
  const adverts = useSelector(getAdverts)

  React.useEffect(() => {
    dispatch(advertsLoaded())
  }, [dispatch])

  return adverts
}
const AdvertsPage = () => {
  const adverts = useAdverts()
  const [filters, setFilters] = React.useState(getFilters)

  React.useEffect(() => {
    saveFilters(filters)
  }, [filters])

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
