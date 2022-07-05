import React, {ChangeEventHandler, ReactNode, useState, KeyboardEventHandler} from "react";

interface IEditableProps {
    text: string;
    children: ReactNode;
}

export const Editable: React.FC<IEditableProps> = ({text, children}) => {
    const [isEditing, setEditing] = useState(false);
    const handleEnter: KeyboardEventHandler = (e) => {
        if (e.keyCode === 13) setEditing(false)
    }
    return (
        <>
            {isEditing ? (
                <div onBlur={() => setEditing(false)} onKeyDown={handleEnter}>
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