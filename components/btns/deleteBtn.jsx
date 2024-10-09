"use client";

import { useState } from "react";
import Spinner from "../skeleton/spinner";

export const DeleteBtn = () => {
  const [isLoading, setLoading] = useState(false);

  return (
    <Button
      type="submit"
      onClick={() => setLoading(true)}
      variant="destructive"
      size="icon"
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : <Trash2 className="h-4 w-4" />}
    </Button>
  );
};
