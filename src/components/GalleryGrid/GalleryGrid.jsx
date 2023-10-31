import { useState } from "react";
import Image1 from "../../assets/images/image-1.webp";
import Image10 from "../../assets/images/image-10.jpeg";
import Image11 from "../../assets/images/image-11.jpeg";
import Image2 from "../../assets/images/image-2.webp";
import Image3 from "../../assets/images/image-3.webp";
import Image4 from "../../assets/images/image-4.webp";
import Image5 from "../../assets/images/image-5.webp";
import Image6 from "../../assets/images/image-6.webp";
import Image7 from "../../assets/images/image-7.webp";
import Image8 from "../../assets/images/image-8.webp";
import Image9 from "../../assets/images/image-9.webp";
import "./GalleryGrid.css";

const GalleryGrid = () => {
  // fake images data using the given images start
  const imagesData = [
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
  ];
  // fake images data using the given images end

  // states start
  const [newImage, setNewImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  // states end

  // handler functions start

  // checkbox handler
  const handleCheckboxChange = (isChecked, imageId) => {
    if (isChecked && !selectedImages.includes(imageId)) {
      setSelectedImages([...selectedImages, imageId]);
    } else {
      const updatedImages = selectedImages.filter((id) => id !== imageId);
      setSelectedImages(updatedImages);
    }
  };

  // handler functions end

  return (
    <section className="p-8">
      {/* main grid */}
      <div className="container grid grid-cols-2 p-4 mx-auto md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* images data loopings by using map */}
        {imagesData.map((image) => (
          <label
            key={image.id}
            htmlFor={`checkbox${image.id}`}
            className={` ${
              image.id === 1
                ? "hover:scale-95 col-span-2 row-span-2 min-h-96 md:col-start-1 md:row-start-1"
                : "hover:scale-105 min-h-48"
            } shadow-md rounded-3xl aspect-square w-full h-full border duration-500 cursor-pointer relative group`}
          >
            {/* featured banner for the featured image only */}
            {image.id === 1 && (
              <div className={`ribbon-featured ribbon-top-right z-30`}>
                <span className="">Featured</span>
              </div>
            )}
            <img
              src={image.imageSrc}
              alt=""
              className="rounded-3xl shadow-md group-hover:duration-1000"
            />
            {/* shadow that comes on the hover */}
            <div
              className={`${
                selectedImages.includes(image.id)
                  ? "opacity-60"
                  : " opacity-0 group-hover:opacity-40"
              } h-full w-full p-4 bg-black duration-500  absolute rounded-3xl shadow-md top-0 right-0 group-hover:z-20 flex items-center justify-center`}
            >
              {/* checkbox input */}
              <input
                type="checkbox"
                className="h-8 hidden invisible w-8 cursor-pointer rounded-full"
                id={`checkbox${image.id}`}
                onChange={(e) =>
                  handleCheckboxChange(e.target.checked, image.id)
                }
              />
              {/* tick images link if the id is in the array then it will show the green ticked icon and if not then it will show a white tick icon */}
              {selectedImages.includes(image.id) ? (
                <img
                  src="https://i.ibb.co/bb9xyLQ/icons8-tick-80-1.png"
                  alt="Tick Mark Ticked"
                  className=""
                />
              ) : (
                <img
                  src="https://i.ibb.co/Px0CxkP/icons8-tick-80.png"
                  alt="Tick Mark Unticked"
                  className=""
                />
              )}
            </div>
          </label>
        ))}

        {/* add new image box */}
        <label className="w-full h-full rounded-3xl shadow-md border-dashed border-2 min-h-48 aspect-square group relative">
          <div className="h-full overflow-hidden rounded-md">
            {newImage === null ? (
              <>
                {" "}
                <label
                  htmlFor="addNewImage"
                  className="flex items-center justify-center h-full flex-col-reverse cursor-pointer"
                >
                  <h2 className="text-center mt-4 text-sm capitalize">
                    Add New Image
                  </h2>
                  <figure>
                    <img
                      loading="lazy"
                      draggable={false}
                      src="https://i.ibb.co/zxPs4Tq/gallery.png"
                      alt=""
                      className="w-7"
                    />
                  </figure>
                </label>
                <input
                  //   onChange={handleCoverImage}
                  type="file"
                  id="addNewImage"
                  className="hidden invisible"
                />
              </>
            ) : (
              <img
                loading="lazy"
                draggable={false}
                src={newImage}
                alt=""
                className="imageDiv h-full w-full object-cover"
              />
            )}
          </div>
        </label>
      </div>
    </section>
  );
};

export default GalleryGrid;
