import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { X } from "lucide-react";
import Select from "react-select";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const CreateDoc = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { users } = useUser();
  const [loading, setLoading] = useState(false);

  const USER_OPTIONS = users.map((u) => {
    return { value: u.username, label: u.username, email: u.email };
  });

  const handleCreate = async () => {
    if (!name.trim()) return;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = Cookies.get("token");
    if (!token) {
      alert("login again");
      return;
    }
    setLoading(true);

    const selectedEmails = new Set(selectedUsers?.map((u) => u.email));
    const collaborators = users
      .filter((u) => selectedEmails.has(u.email))
      .map((user) => ({
        userId: user._id,
        email: user.email,
      }));
    const payload = {
      name,
      content: "",
      collaborators,
    };

    try {
      await axios.post(`${backendUrl}/api/docs/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      toast.success("Created successfull");
    } catch (error) {
      setLoading(false);
      toast.error("Error");
      console.log("creating docs error", error);
    }

    setOpen(false);
    setName("");
    setSelectedUsers([]);
  };

  // Custom styles for react-select to match your UI
  const customStyles = {
    control: (base, state) => ({
      ...base,
      padding: "2px",
      borderRadius: "0.75rem", // rounded-xl
      backgroundColor: "#f8fafc", // bg-slate-50
      borderWidth: "1px",
      borderColor: state.isFocused ? "#6366f1" : "#e2e8f0", // indigo-500 : slate-200
      boxShadow: state.isFocused ? "0 0 0 2px rgba(99, 102, 241, 0.2)" : "none",
      "&:hover": { borderColor: "#6366f1" },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#e0e7ff", // indigo-100
      borderRadius: "6px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#4338ca", // indigo-700
      fontWeight: "600",
      fontSize: "12px",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#6366f1",
      "&:hover": { backgroundColor: "#6366f1", color: "white" },
    }),
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-md z-[101] outline-none">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-black text-slate-900">
              New Board
            </Dialog.Title>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Board Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Board Name
              </label>
              <input
                type="text"
                placeholder="e.g. Project Phoenix"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Multi-Select Users */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Invite Collaborators
              </label>
              <Select
                isMulti
                options={USER_OPTIONS}
                value={selectedUsers}
                onChange={setSelectedUsers}
                styles={customStyles}
                placeholder="Select teammates..."
                className="text-sm"
                isSearchable
              />
            </div>
          </div>

          <div className="flex gap-3 mt-10">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              {loading ? "Creating..." : "Create Board"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
