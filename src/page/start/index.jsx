import React from 'react';
import { TypingIndicator } from '../../components/typing-indicator/index';

import { Link, useNavigate } from 'react-router-dom';
import { ChatBotLayout } from '../../layout/chatbot/index';

export const StartPage = () => {
  let navigate = useNavigate();

  return (
    <ChatBotLayout>
      <Link to='/chatBot'>start chat</Link>
      <TypingIndicator />
    </ChatBotLayout>
  );
};
