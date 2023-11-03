import PropTypes from "prop-types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./GalleryGrid.css";

const GalleryGrid = ({
  handleCheckboxChange,
  imagesData,
  selectedImages,
  handleAddNewImage,
  newImage,
  setImagesData,
}) => {
  const handleOnDragEnd = (result) => {
    /* if (!result.destination) return;

    const items = Array.from(imagesData);
    const [reorderedItem] = items.splice(result.source.index, 1);

    // If the dragged item is moved within the same droppable container
    if (result.source.droppableId === result.destination.droppableId) {
      items.splice(result.destination.index, 0, reorderedItem);
    } else {
      // If the dragged item is moved to another droppable container
      const otherItems = Array.from(imagesData);
      otherItems.splice(result.destination.index, 0, reorderedItem);
      setImagesData(otherItems);
    }

    setImagesData(items); */
  };
  return (
    <section className="p-8">
      {/* drag and drop main container */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {/* main grid */}
        <Droppable droppableId="images">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="container grid grid-cols-2 mx-auto md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {imagesData.map(({ id, imageSrc }, index) => (
                <Draggable key={id} draggableId={id.toString()} index={index}>
                  {(provided) => (
                    <label
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      htmlFor={`checkbox${id}`}
                      className={`${
                        id === 1
                          ? "hover:scale-95 col-span-2 row-span-2 min-h-96 md:col-start-1 md:row-start-1"
                          : "hover:scale-105 min-h-48"
                      } shadow-md rounded-3xl aspect-square w-full h-full border duration-500 cursor-pointer relative group`}
                    >
                      {/* featured banner for the featured image only */}
                      {id === 1 && (
                        <div
                          className={`ribbon-featured ribbon-top-right z-30`}
                        >
                          <span className="">Featured</span>
                        </div>
                      )}
                      <img
                        src={imageSrc}
                        alt=""
                        className="rounded-3xl h-full w-full object-cover object-center shadow-md group-hover:duration-1000"
                      />
                      {/* shadow that comes on the hover */}
                      <div
                        className={`cursor-grab${
                          selectedImages.includes(id)
                            ? "opacity-60"
                            : " opacity-0 group-hover:opacity-40"
                        } h-full w-full p-4 bg-black duration-500  absolute rounded-3xl shadow-md top-0 right-0 group-hover:z-20 flex items-center justify-center`}
                      >
                        {/* checkbox input */}
                        <input
                          type="checkbox"
                          className="h-8 hidden invisible w-8 cursor-pointer rounded-full"
                          id={`checkbox${id}`}
                          onChange={(e) =>
                            handleCheckboxChange(e.target.checked, id)
                          }
                        />
                        {/* tick images link if the id is in the array then it will show the green ticked icon and if not then it will show a white tick icon */}
                        {selectedImages.includes(id) ? (
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
                  )}
                </Draggable>
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
              {provided.placeholder}
            </div>
          )}
          {/* images data loopings by using map */}
        </Droppable>
      </DragDropContext>
    </section>
  );
};
// vite gives some type error that why those codes
GalleryGrid.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  setImagesData: PropTypes.func.isRequired,
  imagesData: PropTypes.array.isRequired,
  selectedImages: PropTypes.array.isRequired,
  handleAddNewImage: PropTypes.func.isRequired,
  newImage: PropTypes.string,
};

export default GalleryGrid;
