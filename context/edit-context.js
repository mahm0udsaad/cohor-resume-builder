"use client";

import React, { useContext, useState, useCallback } from "react";

const EditingContext = React.createContext(undefined);

// Custom hook for using the context
const useEditingContext = () => {
  const context = useContext(EditingContext);
  if (context === undefined) {
    throw new Error("useEditingContext must be used within an EditingProvider");
  }
  return context;
};

// EditingProvider component
const EditingProvider = ({ children }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  return (
    <EditingContext.Provider
      value={{ isEditing, setIsEditing, handleEdit, handleCancel }}
    >
      {children}
    </EditingContext.Provider>
  );
};

export { EditingProvider, useEditingContext };
