import { useState } from "react";
import images from "../src/json/mock_images_data.json";
import TopBar from "./components/TopBar/TopBar";

export function App() {
  // states start
  const [imagesData, setImagesData] = useState(images);
  const [newImage, setNewImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  // states end
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
    if (selectedImagesId.length > 0) {
      // removing the selected images
      const updatedImages = imagesData.filter(
        (image) => !selectedImagesId.includes(image.id)
      );
      setImagesData(updatedImages);
      // Clear the selected images after deleting
      setSelectedImages([]);
    }
  };

  // function to handle adding a new image
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
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // handle grid change function
  // handler functions end
  return (
    <main>
      {/* top bar section */}
      <TopBar
        selectedImages={selectedImages}
        handleDeleteSelectedImages={handleDeleteSelectedImages}
      />
      {/* gallery grid section */}
      {/* <GalleryGrid
              handleCheckboxChange={handleCheckboxChange}
              imagesData={imagesData}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              newImage={newImage}
              setNewImage={setNewImage}
              handleAddNewImage={handleAddNewImage}
              setImagesData={setImagesData}
            /> */}
      {/* <Dnd /> */}
    </main>
  );
}
