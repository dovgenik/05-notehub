import css from "./NoteModal.module.css";
import NoteForm from "../NoteForm/NoteForm"
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface NoteModalProps {
  onClose: () => void;
}

export default function NoteModal( {onClose}:NoteModalProps) {

useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };

  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  


  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>{<NoteForm closeForm={onClose}/>}</div>
    </div>,
    document.body
  );
}
