import { useEffect, useState } from 'react';
import './App.scss';
import './App.less';
import { ThemeProvider } from 'styled-components';
import { ChatBot } from './page/chat/index';
import { useTheme } from './theme/chatbot/useTheme';
import { Routes, Route } from 'react-router-dom';

//component
import { StartPage } from './page/start/index';

function App() {
  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  return (
    <>
      {themeLoaded && (
        <div className='App'>
          <ThemeProvider theme={selectedTheme}>
            <Routes>
              <Route path='/' element={<StartPage />} />
              <Route path='/chatBot' element={<ChatBot />} />
            </Routes>
          </ThemeProvider>
        </div>
      )}
    </>
  );
}

export default App;
