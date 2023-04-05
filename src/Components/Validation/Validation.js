import * as yup from "yup"
const validateSchema = yup.object({
    title: yup.string()
      .required('title is Required!'),
    catagory: yup.string()
    .required('catagoty is required!'),
    price: yup.string()
    .required('price is required!'),
  });
  
  export default validateSchema