import React, { useEffect, useRef } from "react";
import Progress from "./Progress";

type ModalProps = {
  onClose: () => void;
};

export const Model: React.FC<ModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div ref={modalRef} className="max-w-full max-h-full">
        <Progress />
      </div>
    </div>
  );
};


