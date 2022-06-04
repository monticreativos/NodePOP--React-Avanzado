import React from 'react';
import { useParams } from 'react-router-dom';

import AdvertDetail from './AdvertDetail';
import { getAdvert } from '../../../store/selectors';
import { advertLoaded } from '../../../store/actions';
import useStoreAction from '../../../hooks/useStoreAction';
import useStoreData from '../../../hooks/useStoreData';

function AdvertPage() {
  const { advertId } = useParams();
  const loadAdvertAction = useStoreAction(advertLoaded);
  const advert = useStoreData(state => getAdvert(state, advertId));

  React.useEffect(() => {
    loadAdvertAction(advertId);
  }, [loadAdvertAction, advertId]);


  return <>{advert && <AdvertDetail {...advert} />}</>
}

export default AdvertPage
