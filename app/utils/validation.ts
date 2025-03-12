interface ValidationRules {
    required?: boolean;
    pattern?: string;
  }
  
  interface FieldConfig {
    name: string;
    label: string;
    type: string;
    validations?: ValidationRules;
  }
  
  export const validateField = (fieldConfig: FieldConfig, value: string): string => {
    if (!fieldConfig.validations) return "";
  
    if (fieldConfig.validations.required && !value.trim()) {
      return `${fieldConfig.label} is required.`;
    }
  
    if (fieldConfig.validations.pattern) {
      const regex = new RegExp(fieldConfig.validations.pattern);
      if (!regex.test(value)) {
        return `Invalid ${fieldConfig.label}.`;
      }
    }
  
    return "";
  };
  