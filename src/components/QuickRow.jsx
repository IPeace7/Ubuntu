import React from "react";
import { ChevronRight } from "lucide-react";

export default function QuickRow({ icon, title, subtitle }) {
  return (
    <button className="quick-row">
      <span className="quick-icon">
        {React.cloneElement(icon, { size: 19, strokeWidth: 1.7 })}
      </span>
      <span className="quick-text">
        <b>{title}</b>
        <small>{subtitle}</small>
      </span>
      <ChevronRight size={16} />
    </button>
  );
}
