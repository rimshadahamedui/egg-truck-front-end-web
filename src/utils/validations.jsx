import { categoryRegex, nameRegex, phoneRegex } from "../constants";
import * as Yup from "yup";

export const categoryValidation = Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .matches(
      categoryRegex,
      "Name should start with an uppercase and numbers not allowed"
    ),
  image: Yup.string().required(
    "Image is required, Please click the upload button after selecting the images."
  ),
});

export const subCategoryValidation = Yup.object({
  name: Yup.string()
    .required("Category name is required")
    .matches(
      categoryRegex,
      "Name should start with an uppercase and numbers not allowed"
    ),
  categoryId: Yup.string().required("Category is required"),
});

const IsB2BChecked = (isB2B, schema, fieldName) => {
  return isB2B ? schema.required(`${fieldName} is required`) : schema;
};
export const productValidation = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name is required.")
    .min(5, "Name should be at least 5 characters long."),

  description: Yup.string()
    .trim()
    .required("Description is required.")
    .min(10, "Description should be at least 10 characters long."),

  stock: Yup.number()
    .integer("Stock must be a non-negative integer.")
    .min(0, "Stock must be a non-negative integer.")
    .required("Stock is required."),

  price: Yup.number()
    .positive("Price must be a positive number.")
    .required("Price is required."),

  images: Yup.array()
    .of(Yup.string())
    .min(
      1,
      "At least one image is required, Please select the images then click the upload button."
    ),
  categoryId: Yup.string().required("Category is required."),
  subCategoryId: Yup.string().required("Subcategory is required."),
  returnPolicy: Yup.number().required("Return policy is required"),
  email: Yup.string()
    .when("isB2B", ([isB2B], schema) => IsB2BChecked(isB2B, schema, "email"))
    .email("Please enter a valid email address."),

  whatsApp: Yup.string()
    .when("isB2B", ([isB2B], schema) => IsB2BChecked(isB2B, schema, "whatsApp"))
    .matches(phoneRegex, "Please enter a valid WhatsApp number."),

  phone: Yup.string()
    .when("isB2B", ([isB2B], schema) => IsB2BChecked(isB2B, schema, "phone"))
    .matches(phoneRegex, "Please enter a valid phone number."),
});

export const loginValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerValidation = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(
      nameRegex,
      "Name should start with uppercase,can include last name seperated by space"
    ),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(/[a-z]/, "Password must contain lowercase letters.")
    .matches(/[A-Z]/, "Password must contain uppercase letters.")
    .matches(/\d/, "Password must contain at least one digit.")
    .min(8, "Password must contain at least 8 characters")
    .max(15, "Password must be less than or equal to 15 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Password is not matching"),
});

export const validateOffer = Yup.object().shape({
  offerName: Yup.string()
    .required("Offer name is required")
    .min(5, "Offer name should be at least 5 characters")
    .max(15, "Offer name should be less than 15 characters"),

  offerCode: Yup.string()
    .required("Offer code is required")
    .min(3, "Offer code should be at least 3 characters")
    .max(1, "Offer code should be less than 10 characters"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description should be at least 10 characters")
    .max(100, "Description should be less than 100 characters"),

  startDate: Yup.date()
    .required("Start date is required")
    .typeError("Start date must be a valid date"),
  endDate: Yup.date()
    .required("End date is required")
    .typeError("End date must be a valid date")
    .min(Yup.ref("startDate"), "End date must be after the start date"),

  discountValue: Yup.number()
    .required("Discount value is required")
    .min(1, "Discount should have a minimum value of 1 percentage")
    .max(50, "Discount should be less than 50 percentage"),

  discountType: Yup.string()
    .oneOf(["percentage", "flat"], "Invalid discount type")
    .required("Discount type is required"),

  minOrderValue: Yup.number()
    .required("Minimum order value is required")
    .min(0, "Minimum order value cannot be negative"),
});

export const validateOtp = (otp) => {
  const otpPattern = /^[0-9]{6}$/; // Regular expression for 6 digits only
  return otpPattern.test(otp);
};

export const validateAddress = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 3 characters")
    .max(15, "Name cannot exceed 15 characters"),

  address: Yup.string()
    .required("Address is required")
    .min(15, "Address must be at least 15 characters")
    .max(100, "Address cannot exceed 250 characters"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),

  pin: Yup.string()
    .required("Pin code is required")
    .matches(/^[0-9]{6}$/, "Pin code must be exactly 6 digits"),
});

export const bannerValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Title should be at least 3 characters")
    .max(30, "Title should not exceed 30 characters")
    .required("Title is required"),

  description: Yup.string()
    .max(50, "Description should not exceed 50 characters")
    .required("Description is required"),
  url: Yup.string().required("URL is required"),

  image: Yup.string().required("Image URL is required"),

  isB2B: Yup.boolean().required("Option is required"),

  type: Yup.string()
    .oneOf(
      ["primary", "secondary"],
      "Type must be either 'primary' or 'secondary'"
    )
    .required("Type is required"),

  // startDate: Yup.date()
  //   .required("Start date is required")
  //   .min(new Date(), "Start date cannot be in the past")
  //   .typeError("Invalid date format"),

  // endDate: Yup.date()
  //   .required("End date is required")
  //   .typeError("Invalid date format")
  //   .min(Yup.ref("startDate"), "End date cannot be before start date"),
});
