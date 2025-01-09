// export const validateUser = (user: User) => {
//     const errors: Record<string, string | undefined> = {};
  
//     if (!validateRequired(user.firstName)) errors.firstName = 'First name is required';
//     if (!validateRequired(user.lastName)) errors.lastName = 'Last name is required';
//     if (!validateEmail(user.email)) errors.email = 'Invalid email';
//     if (!validateRequired(user.state)) errors.state = 'State is required';
  
//     return errors;
//   };
  
//   const validateRequired = (value: string) => !!value.length;
//   const validateEmail = (email: string) =>
//     !!email.length &&
//     email
//       .toLowerCase()
//       .match(
//         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//       );
  

export const validateFields = (values: Record<string, any>): Record<string, string | undefined> => {
  const errors: Record<string, string | undefined> = {};
  if (!values.firstName) errors.firstName = 'First name is required';
  if (!values.lastName) errors.lastName = 'Last name is required';
  if (!values.email || !/\S+@\S+\.\S+/.test(values.email))
    errors.email = 'Valid email is required';
  return errors;
};
