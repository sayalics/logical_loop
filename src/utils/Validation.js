export const isValidEmail = (email) => {
    let expression = /^\S+@\S+\.\S+$/;
    // let expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return expression.test(String(email).toLowerCase());
  };
    
export const isValidName = (name) => {
    if (name == "" || name == undefined || name == null) return false;
    let expression = /^[a-zA-Z\s]+$/;
    return expression.test(name);
  };
  