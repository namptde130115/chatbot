import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme } from '../../redux/messageSlice';

export const useTheme = () => {
  const theme = useSelector((state) => state.message.theme);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    //Get data from api
    async function getThemeApi() {
      await dispatch(getTheme());
      setThemeLoaded(true);
    }
    getThemeApi();
  }, [dispatch]);

  return { theme, themeLoaded };
};
