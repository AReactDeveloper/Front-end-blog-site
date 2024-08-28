import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import EDITOR_JS_TOOLS from './tools.js';

const EditorComponent = ({ setEditorOutput, content }) => {
  const editorRef = useRef(null);

  // Function to initialize Editor.js
  const initEditor = () => {
    try {
      if (!editorRef.current) {
        const editor = new EditorJS({
          holder: 'editorjs',
          tools: EDITOR_JS_TOOLS,
          data: content ? JSON.parse(content) : {}, // if content exist like in the edit page show it if not show empty editor
          autofocus: true,
          placeholder: 'Enter your content here...',
          onReady: () => {
            editorRef.current = editor;
            showInlineToolbar(); // Ensure toolbar visibility after editor is ready
          },
          onChange: async () => {
            try {
              if (editorRef.current) {
                editorRef.current.save()
                .then((outputData) => {
                    console.log('Article data: ', outputData)
                    const jsonData = JSON.stringify(outputData);
                    setEditorOutput(jsonData)
                  }).catch((error) => {
                    console.log('Saving failed: ', error)
                  });
                showInlineToolbar(); // Optional: Ensure toolbar stays visible after changes
              } else {
                console.error('Editor instance is null.');
              }
            } catch (error) {
              console.error('Failed to save content:', error);
            }
          },
        });
      }
    } catch (error) {
      console.error('Failed to initialize Editor.js:', error);
    }
  };

  const showInlineToolbar = () => {
    const editorContainer = document.querySelector('#editorjs');
    const toolbars = editorContainer?.querySelectorAll('.codex-editor__toolbar');
    toolbars?.forEach(toolbar => {
      toolbar.style.display = 'block';
      toolbar.style.opacity = '1';
    });
  };

  useEffect(() => {
    // Initialize the editor on component mount
    initEditor();

    // Cleanup the editor instance on component unmount
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  // Handle content updates if content prop changes
  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.render(content);
    }
  }, [content]);

  return (
    <div>
      <div id='editorjs'></div>
    </div>
  );
};

export default EditorComponent;
