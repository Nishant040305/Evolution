import React from 'react';
import ChatLeftBlockTop from './ChatLeftBlockTop';
import ChatLeftBlockInfo from './ChatLeftBlockInfo';
const ChatLeftBar = () => {
    const fakeChatData = [
        {
          chat_id: "chat_id_1",
          chat_name: "Family Chat",
          chat_type: "group", // Group chat
          last_message: "Let's meet at the park tomorrow!",
          last_message_time: "2024-12-12T18:30:00Z",
          avatar:"http://www.pngall.com/wp-content/uploads/2016/04/Github-PNG-Image.png",
          unread_messages:1,
          participants: [
            {
              user_id: "user_id_1",
              username: "John",
              avatar: "path_to_avatar1.jpg"
            },
            {
              user_id: "user_id_2",
              username: "Jane",
              avatar: "path_to_avatar2.jpg"
            }
          ]
        },
        {
          chat_id: "chat_id_2",
          chat_name: "Work Chat",
          chat_type: "group", // Group chat
          last_message: "Meeting at 3 PM.",
          avatar:"http://www.pngall.com/wp-content/uploads/2016/04/Github-PNG-Image.png",
          last_message_time: "2024-12-12T14:23:45Z",
          unread_messages:20,
          participants: [
            {
              user_id: "user_id_3",
              username: "Alice",
              avatar: "path_to_avatar3.jpg"
            },
            {
              user_id: "user_id_4",
              username: "Bob",
              avatar: "path_to_avatar4.jpg"
            }
          ]
        },
        {
          chat_id: "chat_id_3",
          chat_name: "Individual Chat with Alice",
          chat_type: "individual", // Individual chat
          last_message: "See you soon!",
          last_message_time: "2024-12-13T09:00:00Z",
          avatar:"http://www.pngall.com/wp-content/uploads/2016/04/Github-PNG-Image.png",
          unread_messages:10,
          participants: [
            {
              user_id: "user_id_1",
              username: "John",
              avatar: "path_to_avatar1.jpg"
            },
            {
              user_id: "user_id_3",
              username: "Alice",
              avatar: "path_to_avatar3.jpg"
            }
          ]
        },
        {
          chat_id: "chat_id_4",
          chat_name: "Team Chat",
          chat_type: "group", // Group chat
          last_message: "The deadline is approaching, let's hurry up!",
          last_message_time: "2024-12-11T17:45:00Z",
          avatar:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          unread_messages:200,
          participants: [
            {
              user_id: "user_id_2",
              username: "Jane",
              avatar: "path_to_avatar2.jpg"
            },
            {
              user_id: "user_id_4",
              username: "Bob",
              avatar: "path_to_avatar4.jpg"
            }
          ]
        },
        {
          chat_id: "chat_id_5",
          chat_name: "Individual Chat with Bob",
          chat_type: "individual", // Individual chat
          last_message: "Got the report, thanks!",
          avatar:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          last_message_time: "2024-12-13T10:30:00Z",
          unread_messages:5,
          participants: [
            {
              user_id: "user_id_1",
              username: "John",
              avatar: "path_to_avatar1.jpg"
            },
            {
              user_id: "user_id_4",
              username: "Bob",
              avatar: "path_to_avatar4.jpg"
            }
          ]
        }
        ,
        {
            chat_id: "chat_id_5",
            chat_name: "Individual Chat with Bob",
            chat_type: "individual", // Individual chat
            last_message: "Got the report, thanks!",
            avatar:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            last_message_time: "2024-12-13T10:30:00Z",
            unread_messages:5,
            participants: [
              {
                user_id: "user_id_1",
                username: "John",
                avatar: "path_to_avatar1.jpg"
              },
              {
                user_id: "user_id_4",
                username: "Bob",
                avatar: "path_to_avatar4.jpg"
              }
            ]
          },
          {
            chat_id: "chat_id_5",
            chat_name: "Individual Chat with Bob",
            chat_type: "individual", // Individual chat
            last_message: "Got the report, thanks!",
            last_message_time: "2024-12-13T10:30:00Z",
            avatar:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            unread_messages:5,
            participants: [
              {
                user_id: "user_id_1",
                username: "John",
                avatar: "path_to_avatar1.jpg"
              },
              {
                user_id: "user_id_4",
                username: "Bob",
                avatar: "path_to_avatar4.jpg"
              }
            ]
          }
          ,{
            chat_id: "chat_id_5",
            chat_name: "Individual Chat with Bob",
            chat_type: "individual", // Individual chat
            last_message: "Got the report, thanks!",
            last_message_time: "2024-12-13T10:30:00Z",
            avatar:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            unread_messages:5,
            participants: [
              {
                user_id: "user_id_1",
                username: "John",
                avatar: "path_to_avatar1.jpg"
              },
              {
                user_id: "user_id_4",
                username: "Bob",
                avatar: "path_to_avatar4.jpg"
              }
            ]
          }
      ];
      
  return (
    <div className="flex flex-col items-center justify-start ChatLeftBar ">
      {/* Left Block Top */}
      <ChatLeftBlockTop />
      {/* Left Block Info */}
      <div className="flex flex-col items-center justify-start w-full  bg-white shadow-md rounded-lg space-y-4 overflow-y-scroll leftSideChatBar" >
        {fakeChatData.map((Chat) => (
          <ChatLeftBlockInfo Chat={Chat} key={Chat.chat_id} />
        ))}
      </div>
    </div>
  );
};
export default ChatLeftBar;