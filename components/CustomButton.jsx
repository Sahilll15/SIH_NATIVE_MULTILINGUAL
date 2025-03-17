import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';

const CustomButton = ({ 
  onPress, 
  title, 
  loading = false, 
  disabled = false,
  variant = 'primary', // primary, secondary, outline
  size = 'medium', // small, medium, large
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button];
    
    // Add variant styles
    switch (variant) {
      case 'secondary':
        buttonStyle.push(styles.buttonSecondary);
        break;
      case 'outline':
        buttonStyle.push(styles.buttonOutline);
        break;
      default:
        buttonStyle.push(styles.buttonPrimary);
    }

    // Add size styles
    switch (size) {
      case 'small':
        buttonStyle.push(styles.buttonSmall);
        break;
      case 'large':
        buttonStyle.push(styles.buttonLarge);
        break;
      default:
        buttonStyle.push(styles.buttonMedium);
    }

    // Add disabled state
    if (disabled || loading) {
      buttonStyle.push(styles.buttonDisabled);
    }

    // Add custom style
    if (style) {
      buttonStyle.push(style);
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyleArray = [styles.text];

    // Add variant text styles
    switch (variant) {
      case 'outline':
        textStyleArray.push(styles.textOutline);
        break;
      default:
        textStyleArray.push(styles.textPrimary);
    }

    // Add size text styles
    switch (size) {
      case 'small':
        textStyleArray.push(styles.textSmall);
        break;
      case 'large':
        textStyleArray.push(styles.textLarge);
        break;
      default:
        textStyleArray.push(styles.textMedium);
    }

    // Add disabled state
    if (disabled || loading) {
      textStyleArray.push(styles.textDisabled);
    }

    // Add custom text style
    if (textStyle) {
      textStyleArray.push(textStyle);
    }

    return textStyleArray;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#4A90E2' : '#FFFFFF'} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonPrimary: {
    backgroundColor: '#4A90E2',
  },
  buttonSecondary: {
    backgroundColor: '#34495E',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonMedium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonDisabled: {
    backgroundColor: '#B8C5D0',
    borderColor: '#B8C5D0',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textOutline: {
    color: '#4A90E2',
  },
  textSmall: {
    fontSize: 14,
  },
  textMedium: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 18,
  },
  textDisabled: {
    color: '#FFFFFF',
  },
});

export default CustomButton;
