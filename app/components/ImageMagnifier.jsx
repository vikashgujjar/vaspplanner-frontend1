import React, { useState, useRef } from "react";

export default function ImageMagnifier({ activeImg }) {
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const imgSrc = activeImg && typeof activeImg === "string" && activeImg.trim() !== "" 
    ? activeImg 
    : "/placeholder.png";

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Use clientX/clientY for viewport-relative coordinates to match getBoundingClientRect
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    // Constrain to 0-100%
    const constrainedX = Math.max(0, Math.min(100, x));
    const constrainedY = Math.max(0, Math.min(100, y));
    
    setPosition({ x: constrainedX, y: constrainedY });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-zoom-in bg-white flex items-center justify-center"
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={handleMouseMove}
    >
      <img 
        className={`w-full h-full transition-opacity duration-300 ${zoom ? 'opacity-0' : 'opacity-100'} object-contain`} 
        src={imgSrc} 
        alt="Product" 
      />
      {zoom && (
        <div
          className="absolute inset-0 bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "200%", // Zoom level
            backgroundPosition: `${position.x}% ${position.y}%`,
            backgroundColor: "white"
          }}
        ></div>
      )}
    </div>
  );
}
