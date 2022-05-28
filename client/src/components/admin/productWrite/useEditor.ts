import { useEffect, useState } from 'react';
import { store } from 'modules/store';
import { productSelector, setWriteForm } from 'modules/product/product';
import { useSelector } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

function useEditor() {
  const { writeForm } = useSelector(productSelector);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [initState, setInitState] = useState(false);

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  useEffect(() => {
    if (editorState) {
      store.dispatch(
        setWriteForm({
          key: 'content',
          value: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        }),
      );
    }
  }, [editorState]);

  useEffect(() => {
    if (writeForm.id && writeForm.content && !initState) {
      const blocksFromHtml = htmlToDraft(writeForm.content);

      if (blocksFromHtml) {
        const { contentBlocks, entityMap } = blocksFromHtml;

        const contentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap,
        );

        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
        setInitState(true);
      }
    }
  }, [writeForm.content]);

  return { editorState, onEditorStateChange };
}

export default useEditor;
