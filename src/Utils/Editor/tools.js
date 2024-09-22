import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import ImageTool from '@editorjs/image';

import axiosInstance from '../../api/axiosInstance';

const imageUpload = {
  class: ImageTool,
  config: {
    /**
     * Custom uploader
     */
    uploader: {
      /**
       * Upload file to the server and return an uploaded image data
       * @param {File} file - file selected from the device or pasted by drag-n-drop
       * @return {Promise.<{success, file: {url}}>}
       */
      uploadByFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        return axiosInstance.post('/api/file', formData)
          .then(response => {
            console.log(response.data);
            return {
              success: 1,
              file: {
                url: 'http://localhost:9000/' + response.data.url,
                // any other image data you want to store
              }
            };
          })
          .catch(error => {
            console.error('Upload failed:', error);
            return {
              success: 0,
              message: 'Upload failed'
            };
          });
      },

      /**
       * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
       * @param {string} url - pasted image URL
       * @return {Promise.<{success, file: {url}}>}
       */
      uploadByUrl(url) {
        return axiosInstance.post('/api/file', { url })
          .then(response => {
            return {
              success: 1,
              file: {
                url: response.data.url,
                // any other image data you want to store
              }
            };
          })
          .catch(error => {
            console.error('Upload failed:', error);
            return {
              success: 0,
              message: 'Upload failed'
            };
          });
      }
    }
  }
};

const EDITOR_JS_TOOLS = {
  embed: Embed,
  header: {
    class:Header,
    inlineToolbar: true, // Enable inline toolbar (e.g., bold, italic) for header block
    config: {
      placeholder: 'Enter a header'
    }
  },
  table: Table,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  raw: Raw,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  image: imageUpload, // Use the custom imageUpload configuration
};

export default EDITOR_JS_TOOLS;
