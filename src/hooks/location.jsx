import { useState, useEffect } from "react";
import axios from "axios";

export const Location = () => {
  const [position, setPosition] = useState({
    lat: 43.6532,
    lng: 23.917,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude });
      },
      (blocked) => {
        if (blocked) {
          const fetch = async () => {
            try {
              const { data } = await axios.get("https://ipapi.co/json");
              setPosition({ lat: data.latitude, lng: data.longitude });
            } catch (err) {
              console.error(err);
            }
          };
          fetch();
        }
      }
    );
  }, []);
  return { position };
};


