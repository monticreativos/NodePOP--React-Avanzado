import React, { useEffect } from 'react';
import useStoreAction from '../../../hooks/useStoreAction';
import useStoreData from '../../../hooks/useStoreData';

import { loadTags } from '../../../store/actions';
import { getTags } from '../../../store/selectors';

import { CheckboxGroup } from '../../common';

function SelectTags(props) {
  const loadTagsAction = useStoreAction(loadTags);
  const tags = useStoreData(getTags);

  useEffect(() => {
    loadTagsAction();
  }, [loadTagsAction]);

  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;