import { useDispatch } from 'react-redux';
import { setAttribute } from '../Store/webElementSlice';

export const useReloadEvents = (webElement, canvasEvents) => {
  const dispatch = useDispatch();

  const reloadEvents = () => {
    Object.keys(webElement).forEach((key) => {
      const events = canvasEvents(key);
      Object.keys(events).forEach((event) => {
        dispatch(
          setAttribute({
            id: key,
            property: event,
            value: events[event],
          })
        );
      });
    });
  };

  return { reloadEvents };
};
