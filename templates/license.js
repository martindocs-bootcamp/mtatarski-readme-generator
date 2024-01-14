const licenceSections = require('./licenseSections');

function generateLicense(data) {
return `
<!-- LICENSE TITLE -->
# ${data.title} License

This project is licensed under the [![License: ${data.licenseType}](${data.licenseUrl})](https://opensource.org/licenses/${data.licenseType}).

<!-- LICENSE SECTIONS -->
${licenceSections(data.licenseType)}

## Notices

- If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
- Names, trademarks, service marks, or logos associated with the software are not endorsed by [Your Name].

## Contact

If you have any questions about the license, please contact at ${data.email}.
`
}

module.exports = generateLicense;