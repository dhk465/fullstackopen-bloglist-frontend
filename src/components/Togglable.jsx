import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

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
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.showButtonLabel || 'show'}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {!props.childrenBelowButton && props.children}
        <button onClick={toggleVisibility}>{props.hideButtonLabel || 'hide'}</button>
        {props.childrenBelowButton && props.children}
      </div>
    </>
  );
});

Togglable.propTypes = {
  showButtonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string,
  childrenBelowButton: PropTypes.bool,
};

Togglable.displayName = 'Togglable';

export default Togglable;
