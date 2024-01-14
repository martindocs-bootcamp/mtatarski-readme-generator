function generateLicenseSections(licenseType) {
  switch (licenseType) {
    case 'MIT':
      return `
### Permissions

- Commercial use
- Modification
- Distribution
- Private use

### Limitations

- Liability
- Warranty

### Conditions

- Include original license
`;
    case 'BSD3':
      return `
### Permissions

- Commercial use
- Modification
- Distribution
- Patent use
- Private use

### Limitations

- Liability
- Warranty

### Conditions

- Include original license
- State changes
- Disclose source
`;
  case 'GPLv3':
    return `
### Permissions

- Commercial use
- Modification
- Distribution
- Patent use
- Private use

### Limitations

- Warranty

### Conditions

- Include original license
- State changes
- Disclose source
- Same license for derivative works
- Notify changes
`;
  case 'MPL2':
    return `
### Permissions

- Commercial use
- Modification
- Distribution
- Patent use
- Private use

### Limitations

- Liability
- Warranty

### Conditions

- Include original license
- Disclose source
- Same license for derivative works
- Notify changes
`;
  case 'Apache2':
    return `
### Permissions

- Commercial use
- Modification
- Distribution
- Patent use
- Private use

### Limitations

- Liability
- Warranty

### Conditions

- Include original license
- State changes
- Disclose source
- Same license for derivative works
`;
    
  default:
    return `
### Permissions

- [Describe the permissions granted by the license.]

### Limitations

- [Describe the limitations imposed by the license.]

### Conditions

- [Describe the conditions required by the license.]
`;
  }
}

module.exports = generateLicenseSections;