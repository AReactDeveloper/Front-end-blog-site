import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import EDITOR_JS_TOOLS from './tools.js';

const EditorComponent = ({setEditorOutput}) => {
  const editorRef = useRef(null); // Reference to store the Editor.js instance


  useEffect(()=>{
    const editorContainer = document.querySelector('#editorjs');
    const showInlineToolbar = () => {
        const toolbars = editorContainer.querySelectorAll('.codex-editor__toolbar');
        toolbars.forEach(toolbar => {
            toolbar.style.display = 'block';
            toolbar.style.opacity = '1';
        });
    };

    // Call the function initially
    showInlineToolbar();
  },[])

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
          onChange: async () => {
             try {
              if (editorRef.current) {
                const editorOutput = await editorRef.current.save(); // Save the editor content
                setEditorOutput(editorOutput)
                console.log(editorOutput)
              } else {
                console.error('Editor instance is null.');
              }
            } catch (error) {
              console.error('Failed to save content:', error); // Handle save errors
            }
          },
        });
      }
    } catch (error) {
      console.error('Failed to initialize Editor.js:', error);
    }
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
      <div id='editorjs'></div>
    </div>
  );
};

export default EditorComponent;
