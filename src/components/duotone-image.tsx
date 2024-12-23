import React, { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import { StaticImageData } from "next/image";

interface DuotoneImageProps extends Omit<ImageProps, "src"> {
  src: string | StaticImageData;
  lightColor?: string;
  darkColor?: string;
  contrastFactor?: number; // Added contrast control
  sharpnessFactor?: number; // Added sharpness control
}

const DuotoneImage: React.FC<DuotoneImageProps> = ({
  src,
  width,
  height,
  className = "",
  alt = "",
  lightColor = "#E0FFFF",
  darkColor = "#004D4D",
  contrastFactor = 1.2, // Default contrast enhancement
  sharpnessFactor = 0.5, // Default sharpness
  ...props
}) => {
  const [processedImageUrl, setProcessedImageUrl] = useState<string>("");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");

    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      if (ctx) {
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const light = hexToRgb(lightColor);
        const dark = hexToRgb(darkColor);

        if (light && dark) {
          // Process each pixel
          for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
              const i = (y * canvas.width + x) * 4;

              // Calculate brightness with increased contrast
              let brightness =
                (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) /
                255;

              // Apply contrast enhancement
              brightness = (brightness - 0.5) * contrastFactor + 0.5;
              brightness = Math.max(0, Math.min(1, brightness));

              // Apply sharpening by emphasizing differences from neighbors
              if (
                x > 0 &&
                x < canvas.width - 1 &&
                y > 0 &&
                y < canvas.height - 1
              ) {
                const center = brightness;
                const left =
                  (data[i - 4] * 0.299 +
                    data[i - 3] * 0.587 +
                    data[i - 2] * 0.114) /
                  255;
                const right =
                  (data[i + 4] * 0.299 +
                    data[i + 3] * 0.587 +
                    data[i + 2] * 0.114) /
                  255;
                const top =
                  (data[i - canvas.width * 4] * 0.299 +
                    data[i - canvas.width * 4 + 1] * 0.587 +
                    data[i - canvas.width * 4 + 2] * 0.114) /
                  255;
                const bottom =
                  (data[i + canvas.width * 4] * 0.299 +
                    data[i + canvas.width * 4 + 1] * 0.587 +
                    data[i + canvas.width * 4 + 2] * 0.114) /
                  255;

                const sharpenedBrightness =
                  center +
                  (center - (left + right + top + bottom) / 4) *
                    sharpnessFactor;
                brightness = Math.max(0, Math.min(1, sharpenedBrightness));
              }

              // Apply duotone colors with enhanced contrast
              data[i] = Math.round(lerp(dark.r, light.r, brightness));
              data[i + 1] = Math.round(lerp(dark.g, light.g, brightness));
              data[i + 2] = Math.round(lerp(dark.b, light.b, brightness));
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
        setProcessedImageUrl(canvas.toDataURL("image/png"));
      }
    };

    const imgSrc = typeof src === "string" ? src : src.src;
    img.src = imgSrc;

    return () => {
      if (processedImageUrl) {
        URL.revokeObjectURL(processedImageUrl);
      }
    };
  }, [
    src,
    lightColor,
    darkColor,
    contrastFactor,
    sharpnessFactor,
    processedImageUrl,
  ]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const lerp = (start: number, end: number, amount: number): number => {
    return start * (1 - amount) + end * amount;
  };

  if (!processedImageUrl) {
    return null;
  }

  return (
    <Image
      {...props}
      src={processedImageUrl}
      width={width}
      height={height}
      className={className}
      alt={alt}
      unoptimized
    />
  );
};

export default DuotoneImage;
