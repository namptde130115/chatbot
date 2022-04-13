import { useTheme } from 'styled-components';
import styled from 'styled-components';
import styles from './index.module.scss';
import { IconWrap } from '../icon-wrap';
import { ArowInput } from '../../assets/icons/ArowInput';

const InputChatBox = styled.input`
  background-color: ${(props) => props.theme?.inputBackground};
  font-size: ${(props) => props.theme?.inputFontSize};
`;

export const CommonInput = () => {
  const theme = useTheme();
  return (
    <>
      <InputChatBox
        inputBackground={theme.inputBackground}
        inputFontSize={theme.inputFontSize}
        type='text'
        placeholder={theme.inputPlaceholder}
      />
      <IconWrap
        className={styles.iconWrap}
        size={20}
        icon={<ArowInput />}
        color={theme.iconColor}
      />
    </>
  );
};
