import { useState } from "react";
import Image1 from "../src/assets/images/image-1.webp";
import Image10 from "../src/assets/images/image-10.jpeg";
import Image11 from "../src/assets/images/image-11.jpeg";
import Image2 from "../src/assets/images/image-2.webp";
import Image3 from "../src/assets/images/image-3.webp";
import Image4 from "../src/assets/images/image-4.webp";
import Image5 from "../src/assets/images/image-5.webp";
import Image6 from "../src/assets/images/image-6.webp";
import Image7 from "../src/assets/images/image-7.webp";
import Image8 from "../src/assets/images/image-8.webp";
import Image9 from "../src/assets/images/image-9.webp";
import "./App.css";
import GalleryGrid from "./components/GalleryGrid/GalleryGrid";
import TopBar from "./components/TopBar/TopBar";

function App() {
  // fake images data using the given images start
  const [imagesData, setImagesData] = useState([
    { id: 1, imageSrc: Image1 },
    { id: 2, imageSrc: Image2 },
    { id: 3, imageSrc: Image3 },
    { id: 4, imageSrc: Image4 },
    { id: 5, imageSrc: Image5 },
    { id: 6, imageSrc: Image6 },
    { id: 7, imageSrc: Image7 },
    { id: 8, imageSrc: Image8 },
    { id: 9, imageSrc: Image9 },
    { id: 10, imageSrc: Image10 },
    { id: 11, imageSrc: Image11 },
  ]);
  // fake images data using the given images end

  // states start

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
      // Clear the selected images after deletion
      setSelectedImages([]);
    }
  };

  // handler functions end
  return (
    <main>
      {/* top bar section */}
      <TopBar
        selectedImages={selectedImages}
        handleDeleteSelectedImages={handleDeleteSelectedImages}
      />
      {/* gallery grid section */}
      <GalleryGrid
        handleCheckboxChange={handleCheckboxChange}
        imagesData={imagesData}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        newImage={newImage}
        setNewImage={setNewImage}
      />
    </main>
  );
}

export default App;
