
import React from "react";
import { User, Wrench } from "lucide-react";

interface RoleSelectorProps {
  selectedRole: "mechanic" | "user" | null;
  onChange: (role: "mechanic" | "user") => void;
}

const RoleSelector = ({ selectedRole, onChange }: RoleSelectorProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
        I am a:
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div
          className={`role-btn ${selectedRole === "user" ? "active" : ""}`}
          onClick={() => onChange("user")}
        >
          <User size={36} className="mb-2 text-mechanic-blue" />
          <span className="font-medium text-gray-800 dark:text-white">
            Vehicle Owner
          </span>
        </div>
        <div
          className={`role-btn ${selectedRole === "mechanic" ? "active" : ""}`}
          onClick={() => onChange("mechanic")}
        >
          <Wrench size={36} className="mb-2 text-mechanic-blue" />
          <span className="font-medium text-gray-800 dark:text-white">
            Mechanic
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
