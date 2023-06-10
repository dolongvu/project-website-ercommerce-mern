import axios from "axios";
import { server } from "../../server";



export const getAllNavItems = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllNavbarItemsRequest",
    });

    const { data } = await axios.get(`${server}/get-all-items`);
    dispatch({
      type: "getAllNavbarItemsSuccess",
      payload: data.allNavbars,
    });
  } catch (error) {
    dispatch({
      type: "getAllNavbarItemsFailed",
      payload: error.response.data.message,
    });
  }
};
