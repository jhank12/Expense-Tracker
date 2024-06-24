import React, { useEffect } from "react";

const Dialog = ({ dialogRef, children }) => {
  function closeDialog() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    dialogRef.current?.addEventListener("click", function (e) {
      if (e.target.className === "dialog") closeDialog();
    });

    return () => {
      dialogRef.current?.removeEventListener("click", function (e) {});
    };
  }, []);

  return (
    <dialog className="dialog" ref={dialogRef}>
      {children}
    </dialog>
  );
};

export default Dialog;
