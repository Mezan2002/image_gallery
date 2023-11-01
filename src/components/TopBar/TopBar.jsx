const TopBar = ({ selectedImages, handleDeleteSelectedImages }) => {
  return (
    <section className="sticky top-0 z-50 bg-white flex items-center justify-between border-b py-4 px-8">
      {selectedImages.length > 0 ? (
        <div className="flex items-center">
          <img
            src="https://i.ibb.co/bb9xyLQ/icons8-tick-80-1.png"
            alt="Tick Mark Ticked"
            className="md:w-6 w-4"
          />
          <h1 className="md:text-2xl text-sm font-semibold md:ml-3 ml-1">
            {selectedImages.length} Files Selected
          </h1>
        </div>
      ) : (
        <h1 className="md:text-2xl text-sm font-semibold uppercase">
          Image Gallery
        </h1>
      )}
      {selectedImages.length > 0 && (
        <button
          onClick={() => handleDeleteSelectedImages(selectedImages)}
          className="md:text-xl text-sm font-medium text-red-400 hover:underline cursor-pointer ml-3"
        >
          Delete Files
        </button>
      )}
    </section>
  );
};

export default TopBar;
