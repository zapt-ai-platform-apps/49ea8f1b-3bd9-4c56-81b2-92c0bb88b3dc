import React from 'react';
import AssistantButton from './AssistantButton';
import AssistantChat from './AssistantChat';
import useAssistant from '../../hooks/useAssistant';

const Assistant = ({ todos }) => {
  const {
    isOpen,
    openAssistant,
    closeAssistant,
    messages,
    sendMessage,
    isLoading
  } = useAssistant(todos);
  
  return (
    <>
      <AssistantButton 
        openAssistant={openAssistant} 
        isOpen={isOpen} 
      />
      
      <AssistantChat
        isOpen={isOpen}
        closeAssistant={closeAssistant}
        messages={messages}
        sendMessage={sendMessage}
        isLoading={isLoading}
      />
    </>
  );
};

export default Assistant;