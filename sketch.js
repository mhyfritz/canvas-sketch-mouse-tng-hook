import canvasSketch from "canvas-sketch";
import { TNG, useState, useEffect } from "tng-hooks";

const settings = {
  animate: true,
  dimensions: "a4"
};

function useMouse({ canvas, width, height }) {
  const [mouse, updateMouse] = useState({
    x: 0,
    y: 0,
    event: null
  });

  useEffect(() => {
    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      updateMouse({
        x: (e.clientX - rect.left) * (width / rect.width),
        y: (e.clientY - rect.top) * (height / rect.height),
        event: e
      });
    }
    canvas.addEventListener("mousemove", handleMouseMove);
  }, []);

  return mouse;
}

const sketch = ({ width, height }) => {
  const gradient = document.createElement("canvas");
  gradient.width = width;
  gradient.height = height;
  const gradientContext = gradient.getContext("2d");
  const fill = gradientContext.createLinearGradient(0, 0, width, height);
  fill.addColorStop(0, "cyan");
  fill.addColorStop(1, "orange");
  gradientContext.fillStyle = fill;
  gradientContext.fillRect(0, 0, width, height);

  return TNG(({ canvas, context }) => {
    const mouse = useMouse({ canvas, width, height });
    const imageData = gradientContext.getImageData(mouse.x, mouse.y, 1, 1);
    context.fillStyle = `rgb(${imageData.data[0]},${imageData.data[1]},${
      imageData.data[2]
    })`;
    context.fillRect(0, 0, width, height);
  });
};

canvasSketch(sketch, settings);
