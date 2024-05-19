import * as Yup from "yup"
 export const signupSchema=Yup.object({
    username:Yup.string().min(4).required("Please enter your username"),
    password:Yup.string().min(6).required("Please enter your password"),
    confirm_password:Yup.string().required().oneOf([Yup.ref('password'),""],"Password must match"),
    role:Yup.string().required("Plesae enter your role"),
})
export const signinSchema=Yup.object({
    username:Yup.string().min(4).required("Please enter your username"),
    password:Yup.string().min(6).required("Please enter your password"),
})
export const addPollSchema=Yup.object({
    title:Yup.string().required("Please enter your title "),
    option1:Yup.string().required("Please enter your option"),
    option2:Yup.string().required("Please enter your option"),
})
export const AddOptionSchema=Yup.object({
    option:Yup.string().required("Please enter your option"),
})