import React from "react";
import { Chip } from "@mui/material";

export const MultiSelect = (list) => {
    return <div>
        {list.map((item) => <Chip label="Clickable" onClick={handleClick} />
)}
        </div>;
}