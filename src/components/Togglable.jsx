import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.showButtonLabel || 'show'}</button>
      </div>
      <div style={showWhenVisible}>
        {!props.childrenBelowButton && props.children}
        <button onClick={toggleVisibility}>{props.hideButtonLabel || 'hide'}</button>
        {props.childrenBelowButton && props.children}
      </div>
    </div>
  );
});

export default Togglable;
