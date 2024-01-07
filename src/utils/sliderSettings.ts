export const sliderSettings = (toShow: number, toScroll: number) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: toShow,
    slidesToScroll: toScroll,
    arrows: false,
    autoplaySpeed: 300,
  };
  return settings;
};
