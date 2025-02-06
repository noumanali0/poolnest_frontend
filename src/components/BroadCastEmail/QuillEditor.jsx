import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles if not already done
import ImageResize from 'quill-image-resize-module-react';
import Quill from 'quill';

Quill.register('modules/imageResize', ImageResize);

const QuillEditor = ({ onChange, placeholder }) => {
  return (
    <div>
      <ReactQuill
        onChange={onChange} // Call the parent's onChange function when content changes
        modules={QuillEditor.modules}
        formats={QuillEditor.formats}
        placeholder={placeholder}
      />
    </div>
  );
};

QuillEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  },
  imageResize: {
    modules: ['Resize', 'DisplaySize']
  }
};
QuillEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
];

QuillEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default QuillEditor;
