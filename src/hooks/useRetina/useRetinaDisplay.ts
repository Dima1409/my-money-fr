import { useState, useEffect } from "react";

const useRetinaDisplay = (
  regularImagePath: string,
  retinaImagePath: string
) => {
  const [imageSrc, setImageSrc] = useState<string>(regularImagePath);

  useEffect(() => {
    const isRetina = window.devicePixelRatio > 1;

    if (isRetina && retinaImagePath) {
      setImageSrc(retinaImagePath);
    } else {
      setImageSrc(regularImagePath);
    }
  }, [regularImagePath, retinaImagePath]);

  return imageSrc;
};

export default useRetinaDisplay;
