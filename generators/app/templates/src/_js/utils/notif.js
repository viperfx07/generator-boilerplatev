import Noty from "noty";
import "noty/src/noty.scss";
// import "@/modules/noty/bctheme.scss";

export const createNoty = () =>
  new Noty({
    // theme: "bctheme",
    visibilityControl: true,
    timeout: 5000,
    layout: "topCenter",
    killer: true
  });

const showNotif = (text, type = "success") => {
  const _noty = createNoty();
  return _noty
    .setType(type, true)
    .setText(text, true)
    .show();
};

export default showNotif;
