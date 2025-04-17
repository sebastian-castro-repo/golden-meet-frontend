import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {es} from "date-fns/locale";
// import Moment from "moment";
// import stylesPicker from "./datePicker.module.scss";
// import {Box} from "@mui/material";
// import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
// import styles from "./index.module.scss";
// import moment from "moment";
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker";

export const CustomDatePicker = (props:{
    selectedDate: any,
    setSelectedDate: any,
    calendarOpen: boolean,
    setCalendarOpen: any,
    notAvailableDate: any,
    disabledPast?: boolean,
    disabledFuture?: boolean,
    small?: boolean,
    defaultDate?: any,
    specialView?: any[],
    openTo?: string,
    inputFormat?: string,
    label?: string,
    shouldDisableYear?: any,
    minWidth?: any,
}) => {

    // const getDayStyle = (day) => {
    //
    //     if(Moment(props.selectedDate?.value).format("MM/DD/YYYY") === Moment(day).format("MM/DD/YYYY")) {
    //         return stylesPicker.selectedDate
    //     }
    //         // else if(nonWorkingDays(day))
    //     //     return stylesPicker.nonWorkingDate
    //     else if(!props.notAvailableDate(day))
    //         return stylesPicker.availableDate
    //     else
    //         return stylesPicker.disabledDate
    // }
    // const yesterday = Moment();


    const datePickerProps = () => {
        return ({
            disabled : false,
            views : props.specialView ? props.specialView : ["year", "month", "day"],
            // openTo : props.openTo ? props.openTo : "day",
            inputFormat : props.inputFormat ? props.inputFormat : "dd/MM/yyyy",
            defaultValue : props.defaultDate ? props.defaultDate : undefined,
            open : props.calendarOpen,
            onOpen : () => props.setCalendarOpen(true),
            onClose : () => props.setCalendarOpen(false),
            shouldDisableYear : props.shouldDisableYear,
            // maxDate: {yesterday} ,

            onChange : (value) => {
                props.setSelectedDate({value: new Date(value)});
            },
            disablePast : props.disabledPast,
            disableFuture: props.disabledFuture,
            shouldDisableDate : (date: Date) => props.notAvailableDate(date),
            slots: {
                toolbar: () => null,
                actionBar: () => null,
            },
            // displayStaticWrapperAs: "desktop",
            // renderInput : ({ inputRef, inputProps, InputProps }) => (
            //     <Box sx={{width: "100%", display: 'flex', alignItems: 'center', zIndex: 99999 }} style={{position: "relative", zIndex: 99999}}>
            //         <div className={stylesPicker.ddlBtnAdornment} onClick={() => props.setCalendarOpen(!props.calendarOpen)}>
            //             {/*{InputProps?.endAdornment}*/}
            //             <EventOutlinedIcon />
            //         </div>
            //         <span className={props.small ? styles.ddlTitleSmall : styles.ddlTitle}>{props.label ? props.label : "Seleccione fecha"}</span>
            //         <input
            //             ref={inputRef} className={styles.ddlBtn} {...inputProps} onClick={() => props.setCalendarOpen(!props.calendarOpen)}
            //             style={{minWidth: `${props.minWidth ? `${props.minWidth}px` : "250px"}`}}
            //         />
            //     </Box>
            // ),
        });
    }

    const arrowStyles= {
        background: '#F3F6F9',
        borderRadius: "100%",
        width: '32px',
        height: '32px',
        padding: '6px',
        color: '#292C2D',
        transition: 'none',
        '&:hover': {
            background: '#f9f3f4',
            transform: 'none',
        }
    };

    const dayStyles= {
        '&.Mui-selected': {
            backgroundColor: '#E9F5F9',
            color: '#292C2D',
            border: '1pt solid #A6D8E8',
            borderRadius: '8px',
            '&:active': {
                border: '1pt solid #292C2D',
                borderRadius: '8px',
                backgroundColor: '#E9F5F9',
                color: '#292C2D',
            },
            '&:focus': {
                border: '1pt solid #A6D8E8',
                borderRadius: '8px',
                backgroundColor: '#E9F5F9',
                color: '#292C2D',
            },
        },
        '&:not(.Mui-selected)': {
            backgroundColor: 'white',
            color: '#292C2D',
            '&:hover': {
                border: '1pt solid #292C2D',
                borderRadius: '8px'
            }
        },
        '&.MuiPickersDay-today': {
            border: 'none',
            backgroundColor: 'white',
            color: '#292C2D',
            '&:hover': {
                border: '1pt solid #292C2D',
                borderRadius: '8px',
                backgroundColor: 'white',
            },
            '&.MuiPickersDay-today.Mui-selected': {
                border: '1pt solid #A6D8E8',
                borderRadius: '8px',
                backgroundColor: '#E9F5F9',
                color: '#292C2D',
            },
            '&.Mui-focusVisible': {
                border: '1pt solid #A6D8E8',
                borderRadius: '8px',
                backgroundColor: '#E9F5F9',
                color: '#292C2D',
            },
        },
    };

    const calendarHeaderStyles = {
        "& .MuiPickersCalendarHeader-label": {
            textTransform: "capitalize",
            fontSize: '18px',
            fontWeight: '600',
            display: "inline",
        },
        "& .MuiPickersCalendarHeader-labelContainer": {
            pointerEvents: "none",
            display: "flex",
        },
        "& .MuiPickersCalendarHeader-switchViewButton": {
            display: "none",
        },
        "& .MuiPickersCalendarHeader-yearSelectionSwitcher": {
            display: "none",
        },
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <StaticDatePicker
                {...datePickerProps()}
                value={props.selectedDate ? props.selectedDate?.value : undefined}
                slotProps={{
                    leftArrowIcon: {
                        sx: arrowStyles
                    },
                    rightArrowIcon: {
                        sx: arrowStyles
                    },
                    day: {
                        sx: dayStyles
                    },
                    calendarHeader: {
                        sx: calendarHeaderStyles
                    },
                    layout: {
                        sx: {
                            border: '1pt solid #F3F6F9',
                            borderRadius: '8px',
                            width: 'max-content',
                            padding: '24px',
                            margin: 'auto'
                        }
                    }
                }}
                showDaysOutsideCurrentMonth
            />
        </LocalizationProvider>
    )
}