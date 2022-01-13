import { useEffect, useState } from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { ChatBot } from './page/chat/index';
import { useTheme } from './theme/chatbot/useTheme';
import { Routes, Route, Outlet, Link } from 'react-router-dom';

//component
import { StartPage } from './page/start/index';

function App() {
  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  console.log('selectedTheme', selectedTheme);

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
