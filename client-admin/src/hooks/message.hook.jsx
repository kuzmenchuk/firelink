// import React from 'react'
import { Position, Toaster, Intent } from "@blueprintjs/core";
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';


const AppToaster = Toaster.create({
    maxToasts: 7,
    className: "recipe-toaster",
    position: Position.TOP,
});



// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

export const useMessage = () => {
    const showToast = (msg, intent, icon) => {
        switch (intent) {
            case 'error':
                return AppToaster.show({ message: msg, intent: Intent.WARNING, icon: icon ? icon : "warning-sign" });

            case 'success':
                return AppToaster.show({ message: msg, intent: Intent.SUCCESS, icon: icon ? icon : "tick" });

            case 'primary':
                return AppToaster.show({ message: msg, intent: Intent.PRIMARY, icon: icon ? icon : "tick" });

            default:
                return null;
        }

    }

    // const [open, setOpen] = React.useState(false);

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpen(false);
    // };

    // const showToast = (msg, intent, icon) => {
    //     switch (intent) {
    //         case 'error':
    //             return AppToaster.show({ message: msg, intent: Intent.WARNING, icon: icon ? icon : "warning-sign" });

    //         case 'success':
    //             setOpen(true);
    //             return (
    //                 <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    //                     <Alert onClose={handleClose} severity="success">
    //                         {msg}
    //                     </Alert>
    //                 </Snackbar>
    //             )

    //         case 'primary':
    //             return AppToaster.show({ message: msg, intent: Intent.PRIMARY, icon: icon ? icon : "tick" });

    //         default:
    //             return null;
    //     }

    // }

    return { showToast }
}