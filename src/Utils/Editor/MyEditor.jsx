import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import EDITOR_JS_TOOLS from './tools.js';

const EditorComponent = () => {
  const editorRef = useRef(null); // Reference to store the Editor.js instance
  const [htmlContent, setHtmlContent] = useState(''); // State to store the HTML content

  // Function to initialize Editor.js
  const initEditor = () => {
    try {
      if (!editorRef.current) {
        const editor = new EditorJS({
          holder: 'editorjs', // The ID of the container where the editor will be rendered
          tools: EDITOR_JS_TOOLS,
          autofocus: true, // Automatically focus on the editor when it loads
          placeholder: 'Enter your content here...',
          onReady: () => {
            editorRef.current = editor; // Store the editor instance
          },
          onChange: () => {
            console.log('Content changed');
          },
        });
      }
    } catch (error) {
      console.error('Failed to initialize Editor.js:', error);
    }
  };

  const onSave = async () => {
    try {
      if (editorRef.current) {
        const content = await editorRef.current.save(); // Save the editor content
        console.log(content); // Log the content to the console
        // Convert Editor.js content to HTML and update the state
        const html = convertToHTML(content);
        setHtmlContent(html);
      } else {
        console.error('Editor instance is null.');
      }
    } catch (error) {
      console.error('Failed to save content:', error); // Handle save errors
    }
  };

  const convertToHTML = (data) => {
    // Implement a function to convert Editor.js JSON content to HTML
    // This is a placeholder function. You may need to use a library or write a custom function to handle the conversion.
    // Example:
    // return data.blocks.map(block => `<p>${block.data.text}</p>`).join('');
    // Adjust the implementation based on your needs and Editor.js data structure
    return JSON.stringify(data, null, 2); // For demonstration, using JSON string representation
  };

  useEffect(() => {
    // Initialize the editor on component mount
    initEditor();

    // Cleanup the editor instance on component unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null; // Clear the reference
      }
    };
  }, []);

  return (
    <div>
      <div id="editorjs"></div> {/* Container for the Editor.js */}
      <button onClick={onSave}>Save</button>
      <div>
        <h3>Editor Output:</h3>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div> {/* Display the HTML content */}
      <img class="image-tool__image-picture" src="http://localhost:9000/storage/images/attachments/image-1724467289.png"></img>
      </div>
    </div>
  );
};

export default EditorComponent;
