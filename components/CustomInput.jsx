import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  iconName,
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'none',
  editable = true,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
}) => {
  return (
    <View style={[styles.container, !editable && styles.disabled, style]}>
      {iconName && (
        <Icon 
          name={iconName} 
          size={22} 
          color={editable ? '#4A90E2' : '#B8C5D0'} 
          style={styles.icon} 
        />
      )}
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={editable ? '#95A5A6' : '#B8C5D0'}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
        selectionColor="#4A90E2"
      />
      {rightIcon && (
        <Icon
          name={rightIcon}
          size={22}
          color={editable ? '#4A90E2' : '#B8C5D0'}
          style={styles.rightIcon}
          onPress={onRightIconPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  disabled: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    includeFontPadding: false,
    padding: 0,
    margin: 0,
    height: '100%',
    textAlignVertical: 'center',
  },
  rightIcon: {
    marginLeft: 12,
    padding: 4,
  },
});

export default CustomInput;
