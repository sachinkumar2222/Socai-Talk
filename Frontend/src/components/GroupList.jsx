import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Users } from "lucide-react";

const GroupList = () => {
    const { groups, getGroups, selectedGroup, setSelectedGroup, isMessageLoading } = useChatStore();

    useEffect(() => {
        getGroups();
    }, [getGroups]);

    if (groups.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-4 opacity-50 space-y-2">
                <Users className="size-8" />
                <p className="text-sm font-medium">No groups yet</p>
            </div>
        );
    }

    return (
        <div className="overflow-y-auto w-full p-2 space-y-1">
            {groups.map((group) => (
                <button
                    key={group._id}
                    onClick={() => setSelectedGroup(group)}
                    className={`
            group flex items-center gap-3 px-3 py-3 w-full text-left rounded-xl transition-all duration-200
            ${selectedGroup?._id === group._id
                            ? "bg-primary/20 border-l-4 border-primary shadow-sm"
                            : "hover:bg-base-content/5 hover:pl-4 border-l-4 border-transparent"
                        }
          `}
                >
                    <div className="relative">
                        <img
                            src={group.groupPic || "/avatar.png"}
                            alt={group.name}
                            className="size-12 object-cover rounded-full border-2 border-base-100 group-hover:border-primary/50 transition-colors"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className={`font-semibold truncate ${selectedGroup?._id === group._id ? "text-primary" : "text-base-content"}`}>
                            {group.name}
                        </p>
                        <p className="text-xs text-base-content/50 truncate">
                            {group.members?.length} members
                        </p>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default GroupList;
