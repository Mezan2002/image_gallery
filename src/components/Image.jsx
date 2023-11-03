import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { memo, useState } from "react";

const Image = memo((props) => {
  const {
    image,
    className,
    featured,
    isMarked,
    handleMarked,
    handleFeatured,
    ...sanitizedProps
  } = props;
  const [isHovered, setIsHovered] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
    transition: {
      duration: 300,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
    animateLayoutChanges: (args) =>
      defaultAnimateLayoutChanges({
        ...args,
        wasDragging: true,
      }),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    transformOrigin: "0 0",
    touchAction: "none",
  };

  // Cleaner approach
  const containerClasses = [
    "cursor-grab",
    className ?? "",
    isDragging ? "[&>*]:opacity-30 [&>*]:brightness-75 shadow-inner" : "",
    featured ? "col-span-2 row-span-2" : "",
  ]
    .join(" ")
    .trim();

  return (
    <div
      {...sanitizedProps}
      {...attributes}
      {...listeners}
      className={containerClasses}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={setNodeRef}
      style={style}
    >
      <img
        className="aspect-square w-full select-none object-contain"
        src={image?.imageSrc}
        alt={image?.id}
      />

      {/* Overlay for buttons */}
    </div>
  );
});
Image.displayName = "Image";
export default Image;
