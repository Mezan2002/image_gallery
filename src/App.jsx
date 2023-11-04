import { useState } from "react";
import Swal from "sweetalert2";
import images from "../src/json/mock_images_data.json";
import GalleryGrid from "./components/GalleryGrid/GalleryGrid";
import TopBar from "./components/TopBar/TopBar";

function App() {
  // states
  const [newImage, setNewImage] = useState(null);
  const [imagesData, setImagesData] = useState(images);
  const [selectedImages, setSelectedImages] = useState([]);

  // handler functions start

  // checkbox handler
  const handleCheckboxChange = (isChecked, imageId) => {
    // if the image is checked and previously not added on the selected image array then it will add
    if (isChecked && !selectedImages.includes(imageId)) {
      setSelectedImages([...selectedImages, imageId]);
    } else {
      // if the image is already selected then it will remove
      const updatedImages = selectedImages.filter((id) => id !== imageId);
      setSelectedImages(updatedImages);
    }
  };

  // handle delete selected images
  const handleDeleteSelectedImages = (selectedImagesId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (selectedImagesId.length > 0) {
          // removing the selected images
          const updatedImages = imagesData.filter(
            (image) => !selectedImagesId.includes(image.id)
          );
          setImagesData(updatedImages);
          // Clear the selected images after deleting
          setSelectedImages([]);
          Swal.fire("Deleted!", "", "success");
        }
      }
    });
  };

  // handle select all images
  const handleSelectAll = () => {
    const allImageIds = imagesData.map((image) => image.id);
    setSelectedImages(allImageIds);
  };

  // handle un select all images
  const handleUnSelectAll = () => {
    setSelectedImages([]);
  };

  // handle adding a new image
  const handleAddNewImage = (event) => {
    // checking the max id value of the images data array
    const maxId = imagesData.reduce(
      (max, image) => (image.id > max ? image.id : max),
      0
    );
    // getting the new image as a file
    const file = event.target.files[0];
    // create a new FileReader
    const reader = new FileReader();
    // create a new image data
    reader.onloadend = () => {
      const newImageData = {
        id: maxId + 1,
        imageSrc: reader.result,
      };
      // setting the new data in the images data array in the mutalbe way
      setImagesData([...imagesData, newImageData]);
    };
    // setting the URL of the new image
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // handler functions end
  return (
    <main>
      {/* top bar section */}
      <TopBar
        selectedImages={selectedImages}
        handleDeleteSelectedImages={handleDeleteSelectedImages}
        handleSelectAll={handleSelectAll}
        imagesData={imagesData}
        handleUnSelectAll={handleUnSelectAll}
      />

      {/* gallery grid section */}
      <GalleryGrid
        handleCheckboxChange={handleCheckboxChange}
        imagesData={imagesData}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        newImage={newImage}
        setNewImage={setNewImage}
        handleAddNewImage={handleAddNewImage}
        setImagesData={setImagesData}
      />
    </main>
  );
}

export default App;
