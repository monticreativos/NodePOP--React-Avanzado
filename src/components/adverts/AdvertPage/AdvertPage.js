import React from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'

import AdvertDetail from './AdvertDetail'
import { getAdvert, deleteAdvert } from '../service'
import useQuery from '../../../hooks/useQuery'
import useMutation from '../../../hooks/useMutation'
import { useDispatch } from 'react-redux'
import { advertDeleted } from '../../../store/actions'

function AdvertPage() {
  const { advertId } = useParams()
  const navigate = useNavigate()
  const getAdvertById = React.useCallback(() => getAdvert(advertId), [advertId])
  const { isLoading, error, data: advert } = useQuery(getAdvertById)
  // const mutation = useMutation(deleteAdvert)
  const dispatch = useDispatch()

  const handleDelete = () => {
    // dispatch(tweetDeleted(advertId))
    // mutation.execute(advertId).then(() => navigate('/'))
  }

  // if (error?.statusCode === 401 || mutation.error?.statusCode === 401) {
  //   return <Navigate to="/login" />
  // }

  if (error?.statusCode === 404) {
    return <Navigate to="/404" />
  }

  return <>{advert && <AdvertDetail {...advert} />}</>
}

export default AdvertPage
