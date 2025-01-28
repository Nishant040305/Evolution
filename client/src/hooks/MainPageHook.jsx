import { useSocketConnect } from '../hooks/SocketConnect';
import { connectRooms } from '../event/connectRooms';
import { LoadNotifications } from './LoadNotifications';
import { useSocketMarkAsRead } from '../event/markAsRead';
import { useSocketRecieveMessage } from '../event/recieveMessage';
import { useSocketUserReadReceipts } from '../event/recieveRecipient';
import { useSocketDeleteMessage } from '../event/deleteMessage';
import { useSocketNotifications } from '../event/Notifications';
import { useSocketAcceptFriendRequest } from '../event/AcceptRequest';
import { useSocketOrganizationChanges } from '../event/OrgChange';
import { useSocketGroupChatName } from '../event/ChatGroupName';
import { useSocketGroupChatIcon } from '../event/ChatGroupIcon';        
import { LoadChats } from './LoadChats';
export const MainPageHook = () => {
  useSocketConnect();
  connectRooms();
  LoadNotifications();
  useSocketMarkAsRead();
  useSocketRecieveMessage();
  useSocketUserReadReceipts();
  useSocketDeleteMessage();
  useSocketNotifications();
  useSocketAcceptFriendRequest();
  useSocketOrganizationChanges();
  useSocketGroupChatName();
  useSocketGroupChatIcon();
  LoadChats();
}