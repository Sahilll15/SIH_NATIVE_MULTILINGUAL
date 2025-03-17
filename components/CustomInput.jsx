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
          size={20} 
          color={editable ? '#7F8C8D' : '#B8C5D0'} 
          style={styles.icon} 
        />
      )}
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={editable ? '#7F8C8D' : '#B8C5D0'}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
      />
      {rightIcon && (
        <Icon
          name={rightIcon}
          size={20}
          color={editable ? '#7F8C8D' : '#B8C5D0'}
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
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
  disabled: {
    backgroundColor: '#F8F9FA',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#2C3E50',
  },
  rightIcon: {
    marginLeft: 12,
    padding: 4,
  },
});

export default CustomInput;
