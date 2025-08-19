import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import CharacterCount from '@tiptap/extension-character-count';

type Props = {
  value?: string;
  onChange?: (html: string) => void;
  max?: number;
};

export default function RichEditor({ value = '', onChange, max = 5000 }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: '여기에 글을 작성하세요...' }),
      Link.configure({ openOnClick: false }),
      Image,
      CharacterCount.configure({ limit: max }),
    ],
    content: value,
    autofocus: true,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'outline-none ring-0 focus:outline-none focus:ring-0',
      },
    },
  });

  if (!editor) return null;

  const setLink = () => {
    const prev = editor.getAttributes('link').href || '';
    const url = window.prompt('링크 URL', prev);
    if (url === null) return;
    if (url === '') editor.chain().focus().unsetLink().run();
    else editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50">
        <button onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'font-bold' : ''}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'italic' : ''}>I</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'underline' : ''}>H2</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>“ Quote</button>
        <button onClick={setLink}>🔗 Link</button>
        <button onClick={() => {
          const url = window.prompt('이미지 URL');
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }}>🖼️ Image</button>
        <button onClick={() => editor.chain().focus().undo().run()}>↩︎ Undo</button>
        <button onClick={() => editor.chain().focus().redo().run()}>↪︎ Redo</button>
      </div>

      <EditorContent editor={editor} className="prose h-100 p-4 bg-white overflow-y-auto focus:outline-none" />

      <div className="p-2 text-right text-sm text-gray-500 bg-white">
        {editor.storage.characterCount.characters()}/{max}
      </div>
    </div>
  );
}