import * as yup from "yup"
const validateSchema = yup.object({
    title: yup.string()
      .required('title is Required!'),
    category: yup.string()
    .required('catagoty is required!'),
    price: yup.string()
    .required('price is required!'),
  });
  
  export default validateSchema