import React, { useState, useEffect } from 'react';
import ChatSearchBar from '../utility/ChatSearchBar';
import User from '../../scripts/API.User';
import { useSelector } from 'react-redux';
import { SocketSendFriendRequest } from '../../event/SocketEvent';

const FindUser = ({toast}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [userSuggestions, setUserSuggestions] = useState([]);
    const [friends, setFriends] = useState([]);
    const userId = useSelector((state) => state.user.userInfo._id);
    const API = new User();
    // Fetch user suggestions based on search query
    useEffect(() => {
        const fetchUserSuggestions = async () => {
            if (searchQuery.length > 3) {
                const suggestions = await API.FindUserSearch(searchQuery);
                setUserSuggestions(suggestions);
            } else {
                setUserSuggestions([]);
            }
        };

        fetchUserSuggestions();
    }, [searchQuery]);

    // Fetch friends when the component is mounted
    useEffect(() => {
        const fetchFriends = async () => {
            const userFriends = await API.GetFriends(userId);
            setFriends(userFriends);
        };
        
        fetchFriends();
    }, [userId]);

    // Handle sending invite to the user
    const handleInviteClick = async(targetUserId) => {
        SocketSendFriendRequest(userId, targetUserId);
        toast.success('Invite sent successfully');
    };

    // Check if a user is a friend
    const isFriend = (targetUserId) => {
        return friends.friends.includes(targetUserId);
    };

    return (
        <div className="flex flex-col items-center justify-start relative">
            {/* Top Title Section */}
            <div className="flex flex-col items-center justify-start ChatLeftBar">
                <div className="flex justify-between items-center w-full px-4 py-2">
                    <div>
                        <div className="text-xl font-bold">Find User</div>
                    </div>
                </div>

                {/* Search Bar */}
                <ChatSearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
            </div>

            {/* User Suggestions List */}
            <div className="w-full mt-4 ">
                {userSuggestions.length > 0 ? (
                    userSuggestions.map((user) => (
                        <div
                            key={user.id}
                            className="p-4 flex items-center justify-between bg-white w-full rounded-lg border border-gray-200 hover:bg-slate-600 transition-colors duration-200"
                        >
                            <div className="flex items-center space-x-4">
                                <img
                                    src={user.avatar || 'https://via.placeholder.com/150'}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <div className="font-semibold text-lg text-gray-800">{user.displayname}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                            </div>

                            {/* Conditional rendering for invite button or friend symbol */}
                            {isFriend(user._id) ? (
                                <div className="text-green-500 text-sm">✔ Friend</div>
                            ) : (user._id===userId ?<></>:
                                (<button
                                    onClick={() => handleInviteClick(user._id)}
                                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                >
                                    Send Invite
                                </button>)
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No users found</div>
                )}
            </div>
        </div>
    );
};

export default FindUser;
