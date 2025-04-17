import {useDispatch, useSelector} from "react-redux";
import {getAppState, setGoogleMapsLoaded} from "@/store/slices/appStateSlice.tsx";
import {MAPS_API_KEY} from "@/constants/business.ts";


export const useLoadGoogleMaps = () => {
  const loaded = useSelector(getAppState).googleMapsLoaded;
  const dispatch = useDispatch();

  // useEffect(() => {
  if (loaded)
    return;

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=marker`;
  script.async = true;
  script.onload = () => {
    dispatch(setGoogleMapsLoaded())
  };
  script.onerror = () => console.error("Error al cargar Google Maps");
  document.head.appendChild(script);
  // }, [apiKey]);
};
