import React, { useState, useEffect, useCallback } from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { DotButton } from "./slider-carousel-buttons";
import { useRecursiveTimeout } from "./useRecursiveTimeout";
import { useEmblaCarousel } from "embla-carousel/react";

import "./slider-carousel.styles.scss";

import useBreakpoints from '../../hooks.js';
import { selectMobileView } from '../../redux/app/app.selectors.js';

import media1 from '../../assets/slide-1-large.jpg';
import media2 from '../../assets/slide-2-large.jpg';
import media3 from '../../assets/slide-3-large.jpg';
import media4 from '../../assets/slide-4-large.jpg';
import media1Mobile from '../../assets/slide-1-small.jpg';
import media2Mobile from '../../assets/slide-2-small.jpg';
import media3Mobile from '../../assets/slide-3-small.jpg';
import media4Mobile from '../../assets/slide-4-small.jpg';

const AUTOPLAY_INTERVAL = 6000;

const EmblaCarousel = ({ slides, isMobile }) => {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true });
  // const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  // const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const breakpoints = useBreakpoints();

  let media = [];
  if (breakpoints.active === "xs") {
    media = [media1Mobile, media2Mobile, media3Mobile, media4Mobile]
  } else {
    media = [media1, media2, media3, media4]
  }
  
  // sections.map(section => media.push(section.imageUrl));
  const mediaByIndex = index => media[index % media.length];

  const autoplay = useCallback(() => {
    if (!embla) return;
    if (embla.canScrollNext()) {
      embla.scrollNext();
    } else {
      embla.scrollTo(0);
    }
    }, [embla]);

  const { play, stop } = useRecursiveTimeout(autoplay, AUTOPLAY_INTERVAL);

  // const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  // const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
    embla
  ]);

  // const scrollNext = useCallback(() => {
  //   if (!embla) return;
  //   embla.scrollNext();
  //   stop();
  // }, [embla, stop]);

  // const scrollPrev = useCallback(() => {
  //   if (!embla) return;
  //   embla.scrollPrev();
  //   stop();
  // }, [embla, stop]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    // setPrevBtnEnabled(embla.canScrollPrev());
    // setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);


  useEffect(() => {
    play();
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [play, embla, setScrollSnaps, onSelect, stop]);



  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">
                <img
                  className="embla__slide__img"
                  src={mediaByIndex(index)}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>
        <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
        </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isMobile: selectMobileView
});

export default connect(mapStateToProps)(EmblaCarousel);