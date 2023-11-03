import PropTypes from "prop-types";

const AddNewImage = ({ newImage, handleAddNewImage }) => {
  return (
    <div>
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
