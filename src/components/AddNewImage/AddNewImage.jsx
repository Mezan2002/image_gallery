import PropTypes from "prop-types";

const AddNewImage = ({ newImage, handleAddNewImage, isImageDataEmpty }) => {
  return (
    <div className={`${isImageDataEmpty && ""}`}>
      {isImageDataEmpty && (
        <div className="group relative flex items-center justify-center min-h-[85vh]">
          <div className="md:h-full md:min-h-[190px] h-[150px] w-1/2 md:w-1/3 xl:w-1/4 mx-auto overflow-hidden rounded-3xl border-dashed border-2">
            {newImage === null ? (
              <>
                {" "}
                <label
                  htmlFor="addNewImage"
                  className="cursor-pointer flex items-center flex-col-reverse min-h-[22vh] md:min-h-[20vh] xl:min-h-[25vh] 2xl:min-h-[20vh] justify-center"
                >
                  <h2 className="text-center mt-4 text-xs md:text-sm font-semibold uppercase">
                    No Images <br /> Please Add New Image
                  </h2>
                  <figure>
                    <img
                      draggable={false}
                      loading="lazy"
                      src="https://i.ibb.co/4WHRpmx/image-10.png"
                      alt=""
                      className="w-10"
                    />
                  </figure>
                </label>
                <input
                  onChange={handleAddNewImage}
                  type="file"
                  id="addNewImage"
                  className="hidden invisible"
                />
              </>
            ) : (
              <img
                draggable={false}
                loading="lazy"
                src={newImage}
                alt=""
                className="imageDiv h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      )}
      {/* label of new adding image */}
      {!isImageDataEmpty && (
        <label className="w-full h-full aspect-square group relative">
          <div className="md:h-full md:min-h-[190px] h-[150px] w-full overflow-hidden rounded-3xl border-dashed border-2">
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
                      draggable={false}
                      loading="lazy"
                      src="https://i.ibb.co/4WHRpmx/image-10.png"
                      alt=""
                      className="w-10"
                    />
                  </figure>
                </label>
                <input
                  onChange={handleAddNewImage}
                  type="file"
                  id="addNewImage"
                  className="hidden invisible"
                />
              </>
            ) : (
              <img
                draggable={false}
                loading="lazy"
                src={newImage}
                alt=""
                className="imageDiv h-full w-full object-cover"
              />
            )}
          </div>
        </label>
      )}
    </div>
  );
};

// vite gives some type error that why those codes
AddNewImage.propTypes = {
  handleAddNewImage: PropTypes.func.isRequired,
  newImage: PropTypes.string,
  isImageDataEmpty: PropTypes.bool,
};

export default AddNewImage;
