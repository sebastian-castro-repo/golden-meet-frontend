export interface MapsMarker {
    id: number,
    position: {lat: number, lng: number},
    title: string,
    name?: string,
    address?: string,
    phone?: string,
    specialTextColor?: string,
    type?: string|number,
    markerView?: string,
}

export interface GlobalNotification {
    id: number,
    title?: string,
    message: string,
    type: string,
    active: boolean,
    timeInSecond: number
}