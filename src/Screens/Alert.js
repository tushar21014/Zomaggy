import React, { useEffect, useRef } from 'react';
import '../Css/Alert.css';

function Alert(props) {
  const closeRef = useRef(null);

  useEffect(() => {
    const timeoutid = setTimeout(() => {
      if (closeRef.current) {
        closeRef.current.click();
      }
    }, 50000);

    return () => {
      clearTimeout(timeoutid);
    };
  }, []);

  const handleClose = () => {
    document.getElementById('ani').setAttribute('data-aos', 'fade-up');
  };

  return (
    props.alert && (
      <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} id='ani' role="alert">
        <strong>{props.alert.msg}</strong>
        <button type="button" className="close" data-dismiss="alert" ref={closeRef} onClick={handleClose} aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  );
}

export default Alert;
