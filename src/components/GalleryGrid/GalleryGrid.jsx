import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import PropTypes from "prop-types";
import { useState } from "react";
import AddNewImage from "../AddNewImage/AddNewImage";
import SingleImage from "../SingleImage/SingleImage";

const GalleryGrid = ({
  handleCheckboxChange,
  imagesData,
  selectedImages,
  handleAddNewImage,
  newImage,
  setSelectedImages,
  setImagesData,
}) => {
  // states
  const [draggedItem, setDraggedItem] = useState(null);

  // sensors attribute of dnd context
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 50 } }),
    useSensor(MouseSensor, {
      activationConstraint: { distance: 50 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 500, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // handler functions start

  // on drag start attribute of dnd context
  const onDragStart = (data) => {
    const draggedImage = imagesData?.find((img) => img?.id === data.active.id);
    setDraggedItem(draggedImage);
  };

  // on drag end attribute of dnd context
  const onDragEnd = (data) => {
    const { active, over } = data;

    if (!over || active.id === over.id) {
      return;
    }

    const activeIndex = imagesData?.findIndex((img) => img.id === active.id);
    const overIndex = imagesData?.findIndex((img) => img.id === over.id);

    if (activeIndex !== -1 && overIndex !== -1) {
      const newImagesData = [...imagesData];
      const activeObj = newImagesData[activeIndex];
      newImagesData.splice(activeIndex, 1);
      newImagesData.splice(overIndex, 0, activeObj);
      setImagesData(newImagesData);
      setDraggedItem(null);
    }
  };

  // on drag cancel attribute of dnd context
  const onDragCancel = () => setDraggedItem(null);

  // handler functions end
  return (
    <section className="p-8">
      {/* dnd context drag and drop main container */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        {/* sortable context of dnd kit */}
        <SortableContext items={imagesData} strategy={rectSortingStrategy}>
          {/* main grid */}
          <div className="2xl:max-w-7xl xl:max-w-5xl container grid grid-cols-2 mx-auto md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* images data loopings by using map */}
            {imagesData?.map(({ id, imageSrc }, index) => (
              // single image component for looping the images
              <SingleImage
                key={id}
                id={id}
                index={index}
                imageSrc={imageSrc}
                selectedImages={selectedImages}
                setSelectedImages={setSelectedImages}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}

            {/* an overlay when I will drag an image */}
            <DragOverlay
              zIndex={10}
              dropAnimation={{
                duration: 500,
                easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
              }}
              adjustScale={true}
              modifiers={[restrictToWindowEdges]}
              className="rounded-3xl bg-white shadow-xl overflow-hidden cursor-grabbing"
            >
              {draggedItem && (
                <img
                  draggable={false}
                  className="w-full object-cover object-center aspect-square"
                  alt={draggedItem?.id}
                  src={draggedItem?.imageSrc}
                />
              )}
            </DragOverlay>

            {/* add new image box */}
            {imagesData.length !== 0 && (
              <AddNewImage
                newImage={newImage}
                handleAddNewImage={handleAddNewImage}
                imagesData={imagesData}
              />
            )}
          </div>
        </SortableContext>
      </DndContext>

      {imagesData.length === 0 && (
        <div className="">
          <AddNewImage
            newImage={newImage}
            handleAddNewImage={handleAddNewImage}
            imagesData={imagesData}
            isImageDataEmpty={true}
          />
        </div>
      )}
    </section>
  );
};

// vite gives some type error that why those codes
GalleryGrid.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  setImagesData: PropTypes.func.isRequired,
  setSelectedImages: PropTypes.func.isRequired,
  imagesData: PropTypes.array.isRequired,
  selectedImages: PropTypes.array.isRequired,
  handleAddNewImage: PropTypes.func.isRequired,
  newImage: PropTypes.string,
};

export default GalleryGrid;
