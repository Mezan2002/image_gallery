import PropTypes from "prop-types";
import Logo from "../../assets/images/gallery.png";
const TopBar = ({
  selectedImages,
  handleDeleteSelectedImages,
  handleSelectAll,
  imagesData,
  handleUnSelectAll,
}) => {
  return (
    <section className="sticky top-0 z-50 bg-white border-b py-4 px-8">
      <div className="2xl:max-w-7xl xl:max-w-5xl mx-auto flex items-center justify-between">
        {selectedImages.length > 0 ? (
          <div className="flex items-center">
            <img
              draggable={false}
              src="https://i.ibb.co/bb9xyLQ/icons8-tick-80-1.png"
              alt="Tick Mark Ticked"
              className="md:w-6 w-3"
            />
            <h1 className="md:text-2xl text-sm font-semibold md:ml-3 ml-1">
              {selectedImages.length} File Selected
            </h1>
          </div>
        ) : (
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="mr-3" />
            <h1 className="md:text-xl text-sm font-semibold uppercase">
              Image Gallery
            </h1>
          </div>
        )}
        {/* large device buttons */}
        <div className="md:block hidden">
          {imagesData.length !== 0 &&
            imagesData.length !== selectedImages.length && (
              <button
                onClick={() => handleSelectAll()}
                className=" md:text-sm uppercase md:rounded-xl rounded-md text-white bg-gray-500 text-xs font-medium p-1 md:py-2 md:px-3 cursor-pointer"
              >
                Select All Files
              </button>
            )}
          {imagesData.length === selectedImages.length &&
            imagesData.length > 0 && (
              <button
                onClick={() => handleUnSelectAll()}
                className="md:text-sm uppercase md:rounded-xl rounded-md text-white bg-gray-500 text-xs font-medium p-1 md:py-2 md:px-3 cursor-pointer"
              >
                Unselect All Files
              </button>
            )}
          {selectedImages.length > 0 && (
            <button
              onClick={() => handleDeleteSelectedImages(selectedImages)}
              className="md:text-sm uppercase md:rounded-xl rounded-md text-white bg-red-500 text-xs font-medium p-1 md:py-2 md:px-3 cursor-pointer ml-5"
            >
              Delete Files
            </button>
          )}
        </div>
        {/* small device buttons */}
        <div className="md:hidden block">
          {imagesData.length !== 0 &&
            imagesData.length !== selectedImages.length && (
              <button
                onClick={() => handleSelectAll()}
                className="md:text-sm uppercase md:rounded-xl rounded-md text-white bg-gray-500 text-xs font-medium p-1 md:py-2 md:px-3 cursor-pointer"
              >
                Select All
              </button>
            )}
          {imagesData.length === selectedImages.length &&
            imagesData.length > 0 && (
              <button
                onClick={() => handleUnSelectAll()}
                className="md:text-sm uppercase md:rounded-xl rounded-md text-white bg-gray-500 text-xs font-medium p-1 md:py-2 md:px-3 cursor-pointer"
              >
                Unselect All
              </button>
            )}

          {selectedImages.length > 0 && (
            <button
              onClick={() => handleDeleteSelectedImages(selectedImages)}
              className="md:text-sm uppercase md:rounded-xl rounded-md text-white bg-red-500 text-xs font-medium p-1 md:py-2 md:px-3 cursor-pointer ml-2"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

TopBar.propTypes = {
  handleDeleteSelectedImages: PropTypes.func.isRequired,
  handleSelectAll: PropTypes.func.isRequired,
  handleUnSelectAll: PropTypes.func.isRequired,
  selectedImages: PropTypes.array.isRequired,
  imagesData: PropTypes.array.isRequired,
};

export default TopBar;
