import React from 'react';

const Message = ({ variant, children }) => {
  // variant can be 'info', 'success', 'error'
  return (
    <div className={`message ${variant}`}>
      {children}
    </div>
  );
};

Message.defaultProps = {
variant: 'info', };
export default Message;
