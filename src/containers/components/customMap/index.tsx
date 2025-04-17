import {useEffect, useRef, useState} from "react";
import {GoogleMap, Marker} from '@react-google-maps/api';
import {MONTEVIDEO_CENTER_COORDS} from "@/constants/business.ts";
import {MapsMarker} from "@/types/businessTypes.tsx";
import {useLoadGoogleMaps} from "@/hooks/useLoadGoogleMaps.tsx";
import {OverlayView} from "@react-google-maps/api";
import {useSelector} from "react-redux";
import {getAppState} from "@/store/slices/appStateSlice.tsx";
import {Loader} from "@/containers/components/loader";
import styles from "./index.module.scss";
import homeIcon from "@assets/icons/home.svg";
import {MARKER_VIEW_TYPES} from "@/constants/auxiliar.ts";

const containerStyle = {
    width: '100%',
    height: '100%'
};

const CustomMap = (props: {
    center?: {lat: number, lng: number},
    zoom?: number,
    markerList?: MapsMarker[],
    styles?: any,
    handleMarkerClick?: any,
    selectedMarkerId?: any,
    noZoomButtons?: boolean
}) => {
    const loaded = useSelector(getAppState).googleMapsLoaded;
    // const [selectedMarker, setSelectedMarker] = useState<number|undefined>(undefined);
    const mapRef = useRef<any>(null);
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        if (loaded) {
            setIsMapReady(true);
        }
    }, [loaded]);
    useLoadGoogleMaps();

    const handleOnClick = (markerUnit) => {
        // setSelectedMarker(markerUnit.id);
        if(props.handleMarkerClick)
            props.handleMarkerClick(markerUnit);
    }
    useEffect(() => {
        if (mapRef.current && props.center) {
            mapRef.current.setCenter(props.center);
        }
    }, [props.center]);

    useEffect(() => {
        if (mapRef.current && props.zoom) {
            mapRef.current.setZoom(props.zoom);
        }
    }, [props.zoom]);

    const CustomMarker = (markerUnit, i) => {
        switch (markerUnit.markerView){
            case MARKER_VIEW_TYPES.HOME:
                return (
                    <OverlayView
                        key={i}
                        position={markerUnit.position}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <div
                            className={`${styles.customMarker} ${styles.homeMarker} ${props.selectedMarkerId === markerUnit.id ? styles.selectedMarker : undefined}`}
                            onClick={() => handleOnClick(markerUnit)}
                        >
                            <img src={homeIcon} alt={"home"}/>
                            <p style={{color: `${markerUnit.specialTextColor ?? "black"}`}}>
                                {markerUnit.title}
                            </p>
                            <div
                                className={`${styles.customMarkerArrow} ${props.selectedMarkerId === markerUnit.id ? styles.selectedMarkerArrow : undefined}`}/>
                        </div>
                    </OverlayView>
                )
            default:
                return (
                    <Marker
                        key={i}
                        position={markerUnit.position}
                        title={markerUnit.title}
                        onClick={() => handleOnClick(markerUnit)}
                    />
                )
        }
    }

    if(!loaded) return <div className={styles.loaderContainer}><Loader /></div>
    if (!isMapReady) return null;
    return (
        <GoogleMap
            mapContainerStyle={props.styles ?? containerStyle}
            center={props.center ?? MONTEVIDEO_CENTER_COORDS}
            zoom={props.zoom ?? 10}
            onLoad={(map) => {
                mapRef.current = map;
            }}
            options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                disableDefaultUI: false,
                clickableIcons: false,
                zoomControl: !props.noZoomButtons,
                styles: [
                    {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [{ visibility: "off" }]
                    }
                ]
            }}
        >
            {
                loaded && props.markerList && props.markerList.map((markerUnit, i) => CustomMarker(markerUnit, i))
            }
        </GoogleMap>
    )
}

export default CustomMap;