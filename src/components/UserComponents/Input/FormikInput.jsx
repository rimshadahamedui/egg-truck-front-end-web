export const FormikInput = ({ label, className = "", ...rest }) => {
  return (
    <>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-900 dark:text-white-A700"
      >
        {label}
      </label>
      <div className="bg-gray-50 dark:bg-gray-600  border dark:border-gray-500 px-1 rounded-md">
        <input
          className={`${className} text-gray-900 text-sm rounded-lg block h-10 w-full p-2.5 
         dark:placeholder-gray-400 dark:text-white-A700`}
          {...rest}
        />
      </div>
    </>
  );
};
