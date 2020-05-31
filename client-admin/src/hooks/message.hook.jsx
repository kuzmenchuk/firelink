import { Position, Toaster, Intent } from "@blueprintjs/core";


const AppToaster = Toaster.create({
    maxToasts: 7,
    className: "recipe-toaster",
    position: Position.TOP_RIGHT,
});


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

    return { showToast }
}