import React, { useState } from 'react'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
const TinyMCEEditor = (props) => {
    const editorRef = useRef(null);
    const [data, setdata] = useState()
    const log = () => {
        if (editorRef.current) {
            setdata()
            console.log(editorRef.current.getContent());
            props.dataFunc(editorRef.current.getContent())

        }
    };
    return (
        <div>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={props.objDesc ? props.objDesc : "Add Description"}
                value={data}
                onChange={log}
                tinymceScriptSrc='/path/to/tinymce.min.js'
                init={{
                    selector: "textarea",
                    height: 500,
                    menubar: true,
                    mobile: {
                        menubar: true
                    },
                    a11y_advanced_options: true,
                    importcss_append: true,
                    spellchecker_rpc_url: 'spellchecker.php',
                    paste_data_images: true,
                    paste_as_text: true,
                    paste_block_drop: true,
                    contextmenu: false,
                    plugins: [
                        "advlist", "a11ychecker", "lists", "image", "charmap", "print", "preview", "anchor", "contextmenu",
                        "searchreplace", "visualblocks", "code", "fullscreen", "link",
                        "insertdatetime", "media", "table", "paste", "code", "help", "wordcount", "importcss", "insertdatetime", "quickbars", "spellchecker", "visualchars", "template"
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify media spellchecker visualchars insertdatetime searchreplace paste pastetext link | bullist numlist outdent indent | ' +
                        'removeformat code image' + 'editimage | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            {/* <button onClick={log}>Log editor content</button> */}
        </div>
    )
}

export default TinyMCEEditor