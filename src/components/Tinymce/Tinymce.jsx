import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const Tinymce = ({ value, onChange }) => {
  return (
    <Editor
      apiKey="ywflfjos3v5cuvx47htirdmvuoq2wxwtkmj8i8i7wzjevxew"
      value={value} // Ensure value is passed
      init={{
        height: 500,
        menubar: true,
        plugins: [
          "image",
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
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
          "code",
          "help",
          "wordcount",
          "anchor",
        ],
        toolbar:
          "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onEditorChange={(content) => onChange(content)} // Ensure content is passed
    />
  );
};

export default Tinymce;
