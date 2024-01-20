import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import ReactQuill from 'react-quill'; // Import the ReactQuill component
import 'react-quill/dist/quill.snow.css';


function BlogEditor() {
    const [content, setContent] = useState('');
  
    const handleChange = (value) => {
      setContent(value);
    };
  
    return (
      <div>
        {/* You can customize the toolbar options based on your requirements */}
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image', 'video'],
              ['color'],
              ['clean'],
            ],
          }}
          formats={[
            'header',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'list',
            'bullet',
            'link',
            'image',
            'video',
            'color',
          ]}
        />
      </div>
    );
  }
  
  export default BlogEditor;
  