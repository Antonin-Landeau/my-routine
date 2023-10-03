"use client";

import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button } from "../ui/Buttons/Button";
import TextInput from "../ui/Inputs/TextInput";
import axios from "axios";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface InvitationFormProps {
  routineId: string;
}

interface User {
  email: string;
  name: string;
  image: string;
  id: string;
  sendInvitation: {
    routineId: string;
  }[];
}

const InvitationForm: FC<InvitationFormProps> = ({ routineId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  const onInvitation = async (reciverId: string) => {
    try {
      const formatedData = {
        routineId,
        reciverId,
      };
      const res = await axios.post("/api/invitation", formatedData);
      console.log(res);
      if (res.status === 200) {
        setUsers([]);
        setError("");
        setInputValue("");
      }
      toast.success(`Invitation send`);
    } catch (error) {}
  };

  const searchHandler = useCallback(async () => {
    console.log("search run");
    if (inputValue.length > 0) {
      try {
        const res = await axios.get(`/api/users?search=${inputValue}`);
        if (res.data.length === 0) {
          setError("Aucun utilisateur");
        }
        console.log(res.data);
        setUsers(res.data);
        setIsLoading(false);
      } catch (error) {}
    }
    if (inputValue.length === 0) {
      setUsers([]);
      setError("");
    }
  }, [inputValue]);

  useEffect(() => {
    setUsers([]);
    setError("");
    if (inputValue.length === 0) {
      setIsLoading(false);
    }
    if (inputValue.length > 0) {
      setIsLoading(true);
    }
    const timer = setTimeout(() => {
      searchHandler();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchHandler]);

  return (
    <div>
      <TextInput
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        label="Invitation"
        placeholder="email"
      />
      {isLoading && (
        <Loader2 className="mx-auto mt-5 h-8 w-8 animate-spin text-gray-500" />
      )}
      {error.length > 0 && (
        <div className="text-center text-xs mt-5 text-gray-500">
          Aucun utilisateur
        </div>
      )}
      {users.length > 0 && (
        <div className="border rounded-lg py-2 mt-2 px-5">
          {users.map((user, index) => {
            const isInvited = user.sendInvitation.some(
              (invite) => invite.routineId === routineId
            );
            return (
              <div key={index} className="flex items-center gap-3 p-1">
                <Image
                  src={user.image}
                  alt="user-profile-picture"
                  className="rounded-full"
                  width={20}
                  height={20}
                />
                <div className="text-sm">{user.name}</div>
                {isInvited && (
                  <Button
                    onClick={() => onInvitation(user.id)}
                    className="px-3 py-1 text-xs ml-auto text-gray-400 hover:cursor-not-allowed"
                    variant="outline"
                    disabled
                  >
                    invited
                  </Button>
                )}
                {!isInvited && (
                  <Button
                    onClick={() => onInvitation(user.id)}
                    className="px-3 py-1 text-xs ml-auto text-blue-600"
                    variant="outline"
                  >
                    Invite
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InvitationForm;
