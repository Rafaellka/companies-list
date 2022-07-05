import React, {ReactNode, useState} from "react";

interface IEditableProps {
    text: string;
    children: ReactNode;
}

export const Editable: React.FC<IEditableProps> = ({text, children}) => {
    const [isEditing, setEditing] = useState(false);

    return (
        <>
            {isEditing ? (
                <div onBlur={() => setEditing(false)}>
                    {children}
                </div>
            ) : (
                <div onClick={() => setEditing(true)}>
                    {text}
                </div>
            )}
        </>
    );
};