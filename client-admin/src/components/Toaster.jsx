import { Position, Toaster } from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
// export const AppToasterTop = Toaster.create({
//     className: "recipe-toaster",
//     position: Position.TOP_RIGHT,
// });

export const AppToaster = Toaster.create({
    maxToasts: 7,
    className: "recipe-toaster",
    position: Position.TOP_RIGHT,
});

