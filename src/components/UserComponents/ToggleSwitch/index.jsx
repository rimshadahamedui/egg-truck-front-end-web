const ToggleSwitch = ({ isOn, handleToggle }) => {
    return (
      <div
        className={`w-12 h-6 flex items-center  rounded-full p-1 cursor-pointer ${isOn ? 'bg-blue-500' : 'bg-gray-300'}`}
        onClick={handleToggle}
      >
        <div
          className={`bg-white-A700_87 w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${isOn ? 'translate-x-6 bg-red-600' : 'bg-green-600'}`}
        ></div>
      </div>
    );
  };

  export default ToggleSwitch;