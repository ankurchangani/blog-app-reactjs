import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import conf from "../../conf/conf";
const Tinymce = ({ value, onChange }) => {
  const apiKey = conf.tinymceURL;

  return (
    <Editor
      apiKey={apiKey}
      value={value}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "image",
          "advlist",
          "autolink",
          "lists",
          "link",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onEditorChange={(content) => onChange(content)}
    />
  );
};

export default Tinymce;
