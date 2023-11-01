import "./GalleryGrid.css";

const GalleryGrid = ({
  handleCheckboxChange,
  imagesData,
  selectedImages,
  setSelectedImages,
  newImage,
}) => {
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
                  <h2 className="text-center mt-4 text-sm font-semibold uppercase">
                    Add New Image
                  </h2>
                  <figure>
                    <img
                      loading="lazy"
                      draggable={false}
                      src="https://i.ibb.co/4WHRpmx/image-10.png"
                      alt=""
                      className="w-10"
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
