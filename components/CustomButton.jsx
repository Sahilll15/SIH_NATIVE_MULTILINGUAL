import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
      case 'secondary':
        textStyleArray.push(styles.textSecondary);
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

  if (variant === 'primary' && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        style={[styles.buttonWrapper, style]}
      >
        <LinearGradient
          colors={['#4A90E2', '#5C9EE6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={getButtonStyle()}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={getTextStyle()}>{title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

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
  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
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
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    overflow: 'hidden',
  },
  buttonPrimary: {
    backgroundColor: '#4A90E2',
  },
  buttonSecondary: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  buttonSmall: {
    paddingHorizontal: 16,
    height: 40,
  },
  buttonMedium: {
    paddingHorizontal: 24,
    height: 48,
  },
  buttonLarge: {
    paddingHorizontal: 32,
    height: 56,
  },
  buttonDisabled: {
    backgroundColor: '#E2E8F0',
    borderColor: 'transparent',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    includeFontPadding: false,
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#2C3E50',
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
    color: '#95A5A6',
  },
});

export default CustomButton;
