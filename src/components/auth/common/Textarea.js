import classNames from 'classnames';

import './Textarea.css';
import React, { useEffect, useRef } from 'react';

const Textarea = ({ className, ...props }) => {
  const textAreaRef = useRef(null);
  const rendersRef = useRef(0);

  useEffect(() => {
    // console.log(textAreaRef.current);
    textAreaRef.current.focus();
  }, []);

  useEffect(() => {
    if (rendersRef.current < 5) {
      rendersRef.current = rendersRef.current + 1;
    }
  });

  console.log('render ref', rendersRef.current);

  return (
    <div className={classNames('textarea', className)}>
      <textarea ref={textAreaRef} {...props} className="textarea-input" />
    </div>
  );
};

export default Textarea;
