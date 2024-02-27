export const sliderSettings = (
  toShow: number,
  toScroll: number,
  autoplay?: boolean,
  delay?: number,
  inf: boolean = false
) => {
  const settings = {
    dots: true,
    infinite: inf,
    speed: 1000,
    slidesToShow: toShow,
    slidesToScroll: toScroll,
    arrows: false,
    autoplay: autoplay,
    autoplaySpeed: delay,
  };
  return settings;
};
