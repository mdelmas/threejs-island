import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function Loader() {
  const { progress } = useProgress();
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => setSlideUp(true), 200);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#c6f6ff",
        zIndex: 9999,
        transform: slideUp ? "translateY(-100%)" : "translateY(0)",
        transition: "transform 0.8s ease-in-out",
        pointerEvents: slideUp ? "none" : "auto",
      }}
    />
  );
}
