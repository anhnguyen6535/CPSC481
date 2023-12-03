import React, { ButtonHTMLAttributes } from 'react';
import styles from './CustomButton.module.scss';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';
  fill?: 'clear' | 'outline' | 'solid' | 'default';
  size?: 'small' | 'default' | 'large';
  expand?: 'full' | 'block';
  shape?: 'round';
  strong?: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, color, fill, size, expand, shape, strong, disabled, ...props }) => {
  const classList = [
    styles.CustomButton,
    color ? styles[color] : '',
    fill ? styles[fill] : '',
    size ? styles[size] : '',
    expand ? styles[expand] : '',
    shape ? styles[shape] : '',
    strong ? styles.strong : '',
    disabled ? styles.disabled : '',
  ]

  return (
    <button className={classList.join(' ')} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
  
export default CustomButton;