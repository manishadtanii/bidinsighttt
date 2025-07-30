import React, {useEffect} from "react";
import Button from "./Button";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileBids } from "../redux/reducer/profileBidsSlice";
gsap.registerPlugin(ScrollTrigger);

function HeroHeading({ data }) {
  const { title, para, btnText, btnLink, container, headingSize ="h1", pSize = "text-lg" } = data;
  const dispatch = useDispatch();
  const headingRef = useRef();
  const containerRef = useRef();

  const profileBids = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("persist:root"))?.login;
    if (loginData) {
      const parsedLogin = JSON.parse(loginData);
      const userId = parsedLogin?.user?.id;
      if (userId) {
        dispatch(fetchProfileBids(userId));
      }
    }
  }, [dispatch]);

  console.log("profileBids:", profileBids);
 
  return (
    <div className="hero-heading" ref={containerRef}>
      <div className={`${container}`}>
        {title && (
          <h1 className={`${headingSize} font-bold text-g font-h`} data-aos="fade-up">
            {title}
          </h1>
        )}
        {para && <p className={`${pSize} font-t mt-5 mb-8 text-gray-200`} data-aos="fade-up" data-aos-delay="100">{para}</p>}
        {btnText && (
          <div className="flex justify-center" data-aos="fade-up" data-aos-delay="200">
            <Button
              text={btnText}
              link={btnLink}
              arrowBg={"bg-primary text-white"}
              btnBg={"bg-white"}
              
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroHeading;
