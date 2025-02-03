import { useState } from "react";
import Cropper from "react-easy-crop";
import useCropperMethods from "../../../Hooks/useCropperMethods";
import { toast } from "react-toastify";

const ImageCropper = ({ src, onCrop, aspectRatio = 1 }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const { getCroppedImg } = useCropperMethods();

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(src, croppedAreaPixels);
      onCrop(croppedImage);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 bg-white-A700 rounded-lg shadow-lg">
      {/* Image Cropper */}
      <div className="relative h-80 w-full rounded overflow-hidden shadow-md">
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <button
        type="button"
        className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
        onClick={showCroppedImage}
      >
        Crop
      </button>
    </div>
  );
};
export default ImageCropper;
