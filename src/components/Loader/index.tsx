import React from 'react';

import LoadIcon from './LoadIcon';
import CheckIcon from './CheckIcon';

const Loader = (props: { loading: boolean }) => {
  const { loading } = props;

  return (
    <div className="loader">
      {loading
        ? (
          <LoadIcon/>
        ) : (
          <CheckIcon/>
        )
      }
    </div>
  )
};

export default Loader;
