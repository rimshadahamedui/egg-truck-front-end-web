import React, { useState } from "react";
import { MIN_TEXT_AREA_HEIGHT, USER_URL } from "../../../constants";
import { useFormik } from "formik";
import { Heading } from "../Heading";
import useDynamicTextArea from "../../../Hooks/useDynamicTextArea";
import * as Yup from "yup";
import { Button } from "../Button";
import { Text } from "../Text";
import axiosInstance from "../../../utils/api/axiosInstance";
import showToast from "../../../utils/showToast";
import Stars from "../Star";

const Rating = ({ productId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      rating: 5,
      comment: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number().required("Rating value is required"),
      comment: Yup.string()
        .required("Description cannot be empty")
        .min(15, "Description must be at least 15 characters"),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true);
      axiosInstance
        .post(USER_URL + `/${productId}/feedback`, values)
        .then(() => showToast("Your feedback has been saved, Thank you"))
        .catch(({ response }) => showToast(response.data.message, "error"))
        .finally(() => setIsSubmitting(false));
    },
  });
  const { textareaRef } = useDynamicTextArea(formik.values.comment);

  const handleStarSelection = (i) => {
    formik.setFieldValue("rating", i);
  };

  return (
    <div
      className="max-w-md flex flex-col gap-2 p-2 mt-5 border rounded-md shadow-sm"
      id="rating"
    >
      <form className="p-2 space-y-2" onSubmit={formik.handleSubmit}>
        <Heading>Rate this Product</Heading>
        <div className="flex gap-2">
          <Stars
            isEditing={true}
            handleSelection={handleStarSelection}
            selected={5}
          />
        </div>
        <div className="mt-3 space-y-2">
          <label
            htmlFor="review"
            className="text-sm text-gray-800 font-medium  mt-3"
          >
            Write a review
          </label>

          <textarea
            ref={textareaRef}
            style={{
              minHeight: MIN_TEXT_AREA_HEIGHT,
              resize: "none",
            }}
            className="block p-2.5 w-full text-sm text-gray-900 scrollbar-hide  rounded-lg border border-gray-300  focus:border-gray-300 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write description here"
            {...formik.getFieldProps("comment")}
          />
          {formik.touched.comment && formik.errors.comment && (
            <Text className="text-red-500" size="s">
              {formik.errors.comment}
            </Text>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            color="gray_900"
            shape="round"
            className="font-medium"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Rating;
