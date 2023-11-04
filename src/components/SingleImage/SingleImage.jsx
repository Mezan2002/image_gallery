import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PropTypes from "prop-types";
import "./SingleImage.css";

const SingleImage = ({
  id,
  imageSrc,
  selectedImages,
  handleCheckboxChange,
  index,
}) => {
  // attributes comes from dnd kit sortable
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    animateLayoutChanges: (args) =>
      defaultAnimateLayoutChanges({
        ...args,
        wasDragging: true,
      }),
  });

  // stylings for the draggable element when I drag it
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    transformOrigin: "0 0",
    touchAction: "none",
  };

  return (
    // main label of image
    <label
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      htmlFor={`checkbox${id}`}
      className={`${
        isDragging &&
        "bg-white opacity-30 brightness-75 shadow-inner rounded-3xl"
      } ${
        index === 0
          ? "col-span-2 row-span-2 min-h-96 md:col-start-1 md:row-start-1"
          : "min-h-48"
      } overflow-hidden shadow-md rounded-3xl aspect-square w-full h-full border duration-500 cursor-pointer relative group`}
    >
      {/* featured banner for the featured image only */}
      {index === 0 && (
        <div className={`ribbon-featured ribbon-top-right z-30`}>
          <span className="">Featured</span>
        </div>
      )}
      <img
        draggable={false}
        src={imageSrc}
        alt=""
        className="group-hover:scale-105 h-full w-full object-cover object-center duration-500"
      />

      {/* shadow that comes on the hover */}
      <div
        className={`${
          selectedImages.includes(id)
            ? "opacity-60 bg-black"
            : " opacity-0 bg-black group-hover:opacity-40"
        } cursor-grab h-full w-full p-4 duration-500  absolute rounded-3xl shadow-md top-0 right-0 group-hover:z-20 flex items-center justify-center`}
      >
        {/* checkbox input */}
        <input
          type="checkbox"
          className="h-8 hidden invisible w-8 cursor-pointer rounded-full"
          id={`checkbox${id}`}
          onChange={(e) => handleCheckboxChange(e.target.checked, id)}
        />
        {/* tick images link if the id is in the array then it will show the green ticked icon and if not then it will show a white tick icon */}
        {selectedImages.includes(id) ? (
          <img
            src="https://i.ibb.co/bb9xyLQ/icons8-tick-80-1.png"
            alt="Tick Mark Ticked"
            className="cursor-pointer"
          />
        ) : (
          <img
            src="https://i.ibb.co/Px0CxkP/icons8-tick-80.png"
            alt="Tick Mark Unticked"
            className="cursor-pointer"
          />
        )}
      </div>
    </label>
  );
};

// vite gives some type error that why those codes
SingleImage.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  selectedImages: PropTypes.array.isRequired,
  imageSrc: PropTypes.string,
  id: PropTypes.number,
  index: PropTypes.number,
};

export default SingleImage;
