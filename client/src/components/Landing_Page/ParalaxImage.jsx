// ParallaxImage Component
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function ParallaxImage({ src, alt, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        style={{ y }}
        src={src}
        alt={alt}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

export default ParallaxImage;
