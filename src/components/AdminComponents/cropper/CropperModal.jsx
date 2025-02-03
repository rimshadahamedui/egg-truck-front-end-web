import React, { useEffect, useRef, useState } from "react";
import ImageCropper from ".";
import { X } from "lucide-react";

const CropperModal = ({ images, onClose, aspectRatio }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [croppedImages, setCroppedImages] = useState([]);
  const handleNext = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else return onClose(croppedImages);
  };

  const handleOnCrop = (image) => setCroppedImages((prev) => [...prev, image]);

  useEffect(() => {
    if (croppedImages.length > currentImageIndex) {
      handleNext();
    }
  }, [croppedImages, currentImageIndex]);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white-A700 rounded-lg p-4 relative w-full max-w-3xl">
        {/* Close button */}
        <button
          type="button"
          className="absolute top-5 right-3 text-gray-500 hover:text-gray-700 "
          onClick={() => onClose([])}
        >
          <X className="size-6" />
        </button>

        <ImageCropper
          src={images[currentImageIndex]}
          onCrop={handleOnCrop}
          aspectRatio={aspectRatio}
        />
      </div>
    </div>
  );
};

export default CropperModal;
