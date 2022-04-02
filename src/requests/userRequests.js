import { requestHandler } from "../helpers/requestHandler";
import { handleError } from "../helpers/utils";

export const onAddUserData = (formData, callback) => {
  requestHandler({ type: "post", route: "/api/users", body: formData }).then((data) => {
    if (data.success) {
      callback();
    } else {
      handleError(data.errors || "There was an error");
    }
  });
};
