import validator from 'email-validator'

const EmailValidator = (Email) => {
  return validator.validate(Email);
}

export default EmailValidator