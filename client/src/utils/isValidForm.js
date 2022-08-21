function isValidForm(formObject) {
  const nameLen = formObject.name.length;
  const descriptionLen = formObject.description.length;

  if(nameLen > 99 || nameLen < 1) return {status: false, message: "Name should be in range 0 < name.length < 99"};
  if(formObject.price < 0) return {status: false, message: "Price can not be less 0"};
  if(formObject.rooms < 1) return {status: false, message: "Room count can not be less then 0 or equal to"};
  if(descriptionLen > 99) return {status: false, message: "Description is too long"};

  return {status: true, message: "Valid!"}
}

export default isValidForm;