import { useCallback, useRef, useState } from "react";
import * as React from "react";
const useFileEffect = ({ file, onUrlChange, onFileChange, }) => {
    React.useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            if (onUrlChange)
                onUrlChange(url);
            if (onFileChange)
                onFileChange(file);
        }
    }, [file]);
};
export function useUploadFile({ onFileChange, onUrlChange, }) {
    const [file, setFile] = useState(null);
    useFileEffect({
        file,
        onFileChange,
        onUrlChange,
    });
    const inputRef = useRef(null);
    const onInputChange = useCallback((e) => {
        const files = e.target.files;
        if (files && files.length) {
            setFile(files[0]);
        }
    }, []);
    const onAnyNodeClick = (e) => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    return {
        onInputChange,
        onAnyNodeClick,
        setFile,
        file,
        inputRef,
    };
}
