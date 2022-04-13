import React from 'react';
import { TypingIndicator } from '../../components/typing-indicator/index';

import { Link } from 'react-router-dom';
import { ChatBotLayout } from '../../layout/chatbot/index';

export const StartPage = () => {
  return (
    <ChatBotLayout>
      <Link to='/chatBot'>start chat</Link>
      <TypingIndicator />
    </ChatBotLayout>
  );
};
