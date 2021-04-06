import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Message, Icon } from "semantic-ui-react";
import { removeNotificationMessage } from "../../actions";
import { motion } from "framer-motion";
const NotificationMessage = (props) => {
  const { idMessage, content, error } = props;
  const notificationContent = useState(content)[0];
  const dispatch = useDispatch();

  useEffect(() => {
    const displayMessage = setTimeout(() => {
      dispatch(removeNotificationMessage(idMessage));
    }, 4000);
    return () => clearTimeout(displayMessage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      initial={{ y: 200, scale: 0 }}
      animate={{ y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 20,
      }}
    >
      {notificationContent &&
        (error ? (
          <Message error>
            <Message.Header>
              <Icon name="warning" />
            </Message.Header>
            <p>{content}</p>
          </Message>
        ) : (
          <Message success>
            <Message.Header>
              <Icon name="check" />
            </Message.Header>
            <p>{content}</p>
          </Message>
        ))}
    </motion.div>
  );
};
export default NotificationMessage;
