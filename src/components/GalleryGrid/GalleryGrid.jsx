import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
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
import AddNewImage from "../AddNewImage/AddNewImage";
import SingleImage from "../SingleImage/SingleImage";
import "./GalleryGrid.css";

const GalleryGrid = ({
  handleCheckboxChange,
  imagesData,
  selectedImages,
  handleAddNewImage,
  newImage,
  draggedItem,
  setDraggedItem,
  setSelectedImages,
  setImagesData,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragStart = (data) => {
    const draggedImage = imagesData?.find((img) => img?.id === data.active.id);
    setDraggedItem(draggedImage);
  };

  const onDragEnd = (data) => {
    // console.log(data)
    const { active, over } = data;
    if (!over) return;
    if (active.id === over.id) return;
    const image = (imageFiles) => {
      const activeObj = imageFiles.find((img) => img.id === active.id);
      return imageFiles
        .toSpliced(
          imageFiles.findIndex((img) => img.id === active.id),
          1
        )
        .toSpliced(
          imageFiles.findIndex((img) => img.id === over.id),
          0,
          activeObj
        );
    };
    setImagesData(image);
    setDraggedItem(null);
  };

  const handleDragCancel = () => setDraggedItem(null);
  return (
    <section className="p-8">
      {/* drag and drop main container */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragCancel={handleDragCancel}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        <SortableContext items={imagesData} strategy={rectSortingStrategy}>
          {/* main grid */}
          <div className="container grid grid-cols-2 mx-auto md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* images data loopings by using map */}
            {imagesData?.map(({ id, imageSrc }, index) => (
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
            {/* abstract element to show on drag */}
            <DragOverlay
              dropAnimation={{
                duration: 500,
                easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
              }}
              adjustScale={true}
              modifiers={[restrictToWindowEdges]}
              className="rounded-2xl bg-white shadow-xl overflow-hidden cursor-grabbing"
            >
              {draggedItem && (
                <img
                  className="w-full object-cover object-center aspect-square"
                  alt={draggedItem?.id}
                  src={draggedItem?.imageSrc}
                />
              )}
            </DragOverlay>
            {/* add new image box */}
            <AddNewImage
              newImage={newImage}
              handleAddNewImage={handleAddNewImage}
            />
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
};
// vite gives some type error that why those codes
GalleryGrid.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  setImagesData: PropTypes.func.isRequired,
  setDraggedItem: PropTypes.func.isRequired,
  setSelectedImages: PropTypes.func.isRequired,
  imagesData: PropTypes.array.isRequired,
  selectedImages: PropTypes.array.isRequired,
  handleAddNewImage: PropTypes.func.isRequired,
  newImage: PropTypes.string,
  draggedItem: PropTypes.number,
};

export default GalleryGrid;
