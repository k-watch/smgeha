import { styled } from '@mui/material/styles';
import useEditor from './useEditor';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { grey } from '@mui/material/colors';

const Wrap = styled('div')(() => ({
  '& .wrapper-class': {
    marginBottom: 32,
  },
  '& .editor': {
    height: 500,
    border: `1px solid ${grey[100]}`,
    padding: 5,
  },
}));

function WriteEditor() {
  const { editorState, onEditorStateChange } = useEditor();

  return (
    <Wrap>
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor"
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
        placeholder="내용을 작성해주세요."
        localization={{
          locale: 'ko',
        }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </Wrap>
  );
}

export default WriteEditor;
