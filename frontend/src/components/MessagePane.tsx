import React from 'react';

interface MessagePaneProps {
  style: React.CSSProperties;
}

const MessagePane: React.FC<MessagePaneProps> = ({ style }) => (
  <div className="message-pane" style={style}>
    Message Pane
  </div>
);

export default MessagePane;