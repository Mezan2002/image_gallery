import PropTypes from "prop-types";

const AddNewImage = ({ newImage, handleAddNewImage }) => {
  return (
    <div>
      {/* label of new adding image */}
      <label className="w-full h-full aspect-square group relative">
        <div className="md:h-full h-[150px] w-full overflow-hidden rounded-3xl border-dashed border-2">
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
    </div>
  );
};

// vite gives some type error that why those codes
AddNewImage.propTypes = {
  handleAddNewImage: PropTypes.func.isRequired,
  newImage: PropTypes.string,
};

export default AddNewImage;
